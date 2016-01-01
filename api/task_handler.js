#!/usr/bin/node

//node
var fs = require('fs');
var path = require('path');

//contrib
var winston = require('winston');
var async = require('async');
var Client = require('ssh2').Client;

//mine
var config = require('./config');
var logger = new winston.Logger(config.logger.winston);
var db = require('./models/db');
var progress = require('./progress');

db.init(function(err) {
    if(err) return cb(err);
    run();
});

function run() {
    db.Task.find({status: "requested"}).exec(function(err, tasks) {
        if(err) throw err;
        logger.info("loaded "+tasks.length+" requested tasks");
        async.eachLimit(tasks, config.task_handler.concurrency, process_task, function(err) {
            logger.info("all done.. pausing for 5 seconds");
            setTimeout(run, 1000*5);
        });
    });
}

function failed(task, error, cb) {
    //mark task as failed so that it won't be picked up again
    progress.update(task.progress_key, {status: 'failed', msg: error.toString()});
    task.status = "failed";
    task.updated = new Date();
    task.save(function() {
        cb(error); //return task error.
    });
}

function process_task(task, cb) {
    //load compute resource
    db.Resource.findById(task.config.resource_ids.compute, function(err, resource) {
        if(err) return failed(task, err, cb);

        //run the task on the resource
        progress.update(task.progress_key, {status: 'running', progress: 0, msg: 'Processing'});
        run_task(task, resource, function(err) {
            if(err) return failed(task, err, cb);

            //all done!
            progress.update(task.progress_key, {status: 'finished', progress: 1, msg: 'Completed'});
            task.status = "finished";
            task.updated = new Date();
            task.save(cb);
        });
    });
}

function getworkdir(task, resource) {
    var detail = config.resources[resource.resource_id];
    var template = detail.workdir;
    var workdir = template
        .replace("__username__", resource.config.username)
        .replace("__workflowid__", task.workflow_id);
    return workdir; 
}

function run_task(task, resource, cb) {

    var conn = new Client();
    conn.on('ready', function() {

        var workdir = getworkdir(task, resource);
        var taskdir = workdir+"/"+task._id;
        var service_id = task.service_id;
        var service_detail = config.services[service_id];
        var envs = {
            SCA_WORKFLOW_ID: task.workflow_id,
            SCA_WORKFLOW_DIR: workdir,
            SCA_TASK_ID: task._id,
            SCA_TASK_DIR: taskdir,
            SCA_SERVICE_ID: service_id,
            SCA_SERVICE_DIR: "$HOME/.sca/services/"+service_id,
            SCA_PROGRESS_URL: config.progress.api+"/status",
            SCA_PROGRESS_KEY: task.progress_key,
        };

        async.series([
            //TODO - do error handling!
            function(next) {
                progress.update(task.progress_key, {msg: "Preparing Task"});
                progress.update(task.progress_key+".prep", {name: "Task Prep", weight: 0});
                logger.debug("making sure ~/.sca/services exists");
                conn.exec("mkdir -p .sca/services", function(err, stream) {
                    if(err) next(err);
                    stream.on('close', function() {
                        next();
                    })
                });
            },
            function(next) {
                progress.update(task.progress_key+".prep", {status: 'running', progress: 0.1, msg: 'installing/updating '+service_id+' service'});
                //logger.debug("git clone "+service_detail.giturl+" .sca/services/"+service_id);
                conn.exec("git clone "+service_detail.giturl+" .sca/services/"+service_id, function(err, stream) {
                    if(err) next(err);
                    stream.on('close', function() {
                        next();
                    })
                });
            },
            function(next) {
                logger.debug("making sure requested service is up-to-date");
                conn.exec("cd .sca/services/"+service_id+" && git pull", function(err, stream) {
                    if(err) next(err);
                    stream.on('close', function() {
                        next();
                    })
                });
            },
            function(next) {
                progress.update(task.progress_key+".prep", {status: 'running', progress: 0.6, msg: 'Preparing taskdir'});
                logger.debug("making sure taskdir("+taskdir+") exists");
                conn.exec("mkdir -p "+taskdir, function(err, stream) {
                    if(err) next(err);
                    stream.on('close', function() {
                        next();
                    })
                });
            },

            //process hpss resource (if exists..)
            function(next) { 
                if(!task.config.resource_ids.hpss) return next();
                logger.debug("installing hpss key");
                db.Resource.findById(task.config.resource_ids.hpss, function(err, resource) {
                    
                    //TODO - what if user uses nonkeytab?
                    envs.HPSS_PRINCIPAL = resource.config.username;
                    envs.HPSS_AUTH_METHOD = resource.config.auth_method;
                    envs.HPSS_KEYTAB_PATH = "$HOME/.sca/keys/"+resource._id+".keytab";

                    //create a key directory (and make sure it's 700ed)
                    conn.exec("mkdir -p .sca/keys && chmod 700 .sca/keys", function(err, stream) {
                        if(err) next(err);
                        stream.on('close', function() {
                            //now install the hpss key
                            conn.exec("cat > .sca/keys/"+resource._id+".keytab && chmod 600 .sca/keys/"+resource._id+".keytab", function(err, stream) {
                                if(err) next(err);
                                stream.on('close', function() {
                                    next();
                                })
                                var keytab = new Buffer(resource.config.keytab_base64, 'base64');
                                stream.write(keytab);
                                stream.end();
                            });
                        });
                    });
                });
            },
            
            //install request.json in the taskdir
            function(next) { 
                //progress.update(task.progress_key+".prep", {status: 'running', progress: 0.6, msg: 'Installing config.json'});
                logger.debug("installing config.json");
                conn.exec("cat > "+taskdir+"/config.json", function(err, stream) {
                    if(err) next(err);
                    stream.on('close', function() {
                        next();
                    })
                    stream.write(JSON.stringify(task.config, null, 4));
                    stream.end();
                });
            },

            //finally, run the service!
            function(next) {
                progress.update(task.progress_key+".prep", {status: 'finished', progress: 1, msg: 'Finished'});
                logger.debug("running service");
                var envstr = "";
                for(var k in envs) {
                    envstr+=k+"=\""+envs[k]+"\" ";
                }
                progress.update(task.progress_key, {msg: "Running Service"});
                //progress.update(task.progress_key+".service", {name: service_detail.label, status: 'running', progress: 0, msg: 'Starting Service'});
                conn.exec("cd "+taskdir+" && "+envstr+" ~/.sca/services/"+service_id+"/run.sh", {
                /* BigRed2 seems to have AcceptEnv disabled in sshd_config - so I have to pass env via command line
                env: {
                    SCA_SOMETHING: 'whatever',
                }*/
                }, function(err, stream) {
                    if(err) next(err);
                    //TODO - handle service error
                    stream.on('close', function() {
                        progress.update(task.progress_key, {status: 'finished', progress: 1, msg: 'Finished Successfully'}, next);
                    })
                });
            },
        ], function(err) {
            conn.end();
            cb(err); 
        }); 
    });

    var detail = config.resources[resource.resource_id];
    conn.connect({
        host: detail.hostname,
        username: resource.config.username,
        privateKey: resource.config.ssh_private,
    });
}

