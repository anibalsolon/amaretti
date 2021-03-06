define({ "api": [
  {
    "group": "Admin",
    "type": "get",
    "url": "/services/running",
    "title": "Running/requested task count",
    "description": "<p>Returns list of counts of running/requested tasks grouped by service/resource/user</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "List",
            "description": "<p>of count groups</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/admin.js",
    "groupTitle": "Admin",
    "name": "GetServicesRunning"
  },
  {
    "type": "delete",
    "url": "/instance/:instid",
    "title": "Remove the instance",
    "group": "Instance",
    "description": "<p>Sets the remove_date to now, so that when the house keeping occurs in the next cycle, the task_dir will be removed and status will be set to &quot;removed&quot;. If the task is running, it will also set the status to &quot;stop_requested&quot; so that it will be stopped, then removed. Then, it will set config.removing on the instance</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Instance successfully scheduled for removed\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/instance.js",
    "groupTitle": "Instance",
    "name": "DeleteInstanceInstid"
  },
  {
    "group": "Instance",
    "type": "get",
    "url": "/instance",
    "title": "Query Instance",
    "description": "<p>Query instances that belongs to a user or member of the group with optional query</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "find",
            "description": "<p>Mongo find query JSON.stringify &amp; encodeURIComponent-ed - defaults to {} To pass regex, you need to use {$regex: &quot;....&quot;} format instead of js: /.../</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "sort",
            "description": "<p>Mongo sort object - defaults to _id. Enter in string format like &quot;-name%20desc&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "select",
            "description": "<p>Fields to load - defaults to 'logical_id'. Multiple fields can be entered with %20 as delimiter</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Maximum number of records to return - defaults to 100</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "skip",
            "description": "<p>Record offset for pagination (default to 0)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "List",
            "description": "<p>of instances (maybe limited / skipped) and total number of instances</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/instance.js",
    "groupTitle": "Instance",
    "name": "GetInstance"
  },
  {
    "type": "post",
    "url": "/instance",
    "title": "New Instance",
    "group": "Instance",
    "description": "<p>Create a new instance</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the instance</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "group_id",
            "description": "<p>Group ID where you want to share this process with (don't set if it's private)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "desc",
            "description": "<p>Description of the instance</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "config",
            "description": "<p>Any information you'd like to associate with this instanace</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/instance.js",
    "groupTitle": "Instance",
    "name": "PostInstance"
  },
  {
    "type": "put",
    "url": "/instance/:instid",
    "title": "Update Instance",
    "group": "Instance",
    "description": "<p>Update Instance that you own or you are member of the group that instance belongs to</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name for this instance</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "desc",
            "description": "<p>Description for this instance</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "config",
            "description": "<p>Configuration for this instance</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Instance",
            "description": "<p>created</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/instance.js",
    "groupTitle": "Instance",
    "name": "PutInstanceInstid"
  },
  {
    "group": "Resource",
    "type": "get",
    "url": "/resource",
    "title": "Query resource registrations",
    "description": "<p>Returns all resource registration instances that user has access to</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "find",
            "description": "<p>Optional Mongo query to perform</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "sort",
            "description": "<p>Mongo sort object - defaults to _id. Enter in string format like &quot;-name%20desc&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "select",
            "description": "<p>Fields to load - defaults to 'logical_id'. Multiple fields can be entered with %20 as delimiter</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Maximum number of records to return - defaults to 100</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "skip",
            "description": "<p>Record offset for pagination (default to 0)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "user_id",
            "description": "<p>(Only for amaretti:admin) Override user_id to search (default to sub in jwt). Set it to null if you want to query all users.</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "List",
            "description": "<p>of resources (maybe limited / skipped) and total number of resources</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/resource.js",
    "groupTitle": "Resource",
    "name": "GetResource"
  },
  {
    "group": "Resource",
    "type": "get",
    "url": "/resource/best",
    "title": "Find best resource",
    "description": "<p>Return a best resource to run specified service using algorithm used by sca-wf-task when it determines which resource to use for a task request</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "service",
            "description": "<p>Name of service to run (like &quot;soichih/sca-service-life&quot;)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\nscore: 10, \nresource: <resourceobj>, \nconsidered: {...}, \n_detail: <resourcedetail>, \nworkdir: <workdir>,\n_canedit: true,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/resource.js",
    "groupTitle": "Resource",
    "name": "GetResourceBest"
  },
  {
    "type": "post",
    "url": "/resource",
    "title": "Register new resource configuration",
    "name": "NewResource",
    "group": "Resource",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "config",
            "description": "<p>Configuration for resource</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "envs",
            "description": "<p>Key values to be inserted for service execution</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name of this resource instance (like &quot;soichi's karst account&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "avatar",
            "description": "<p>Avatar URL</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "hostname",
            "description": "<p>Hostname to override the resource base hostname</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": true,
            "field": "services",
            "description": "<p>Array of name: and score: to add to the service provides on resource base</p>"
          },
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": true,
            "field": "gids",
            "description": "<p>List of groups that can use this resource (only amaretti admin can enter this)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "active",
            "description": "<p>Set true to enable resource</p>"
          }
        ]
      }
    },
    "description": "<p>Just create a DB entry for a new resource - it doesn't test resource / install keys, etc..</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ __v: 0,\n user_id: '9',\n gids: [1,2,3],\n type: 'ssh',\n resource_id: 'karst',\n name: 'use foo\\'s karst account',\n config:\n  { ssh_public: 'my public key',\n    enc_ssh_private: true,\n    username: 'hayashis' },\n _id: '5758759710168abc3562bf01',\n update_date: '2016-06-08T19:44:23.205Z',\n create_date: '2016-06-08T19:44:23.204Z',\n active: true }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/resource.js",
    "groupTitle": "Resource"
  },
  {
    "type": "delete",
    "url": "/resource/:id",
    "title": "Remove resource configuration",
    "name": "RemoveResource",
    "group": "Resource",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Resource ID</p>"
          }
        ]
      }
    },
    "description": "<p>Remove resource by setting its status to &quot;removed&quot;</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ok",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/resource.js",
    "groupTitle": "Resource"
  },
  {
    "type": "get",
    "url": "/resource/usage/:id",
    "title": "Load resource usage graph",
    "name": "ResourceUsage",
    "group": "Resource",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Resource Instance ID to update</p>"
          }
        ]
      }
    },
    "description": "<p>Download resource usage grraph</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Resource",
            "description": "<p>Object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/resource.js",
    "groupTitle": "Resource"
  },
  {
    "type": "put",
    "url": "/resource/test/:resource_id",
    "title": "Test resource",
    "name": "TestResource",
    "group": "Resource",
    "description": "<p>Test resource connectivity and availability. Store status on status/status_msg fields of the resource entry</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": \"ok\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 OK\n{\n    \"message\": \"SSH connection failed\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/resource.js",
    "groupTitle": "Resource"
  },
  {
    "type": "put",
    "url": "/resource/:id",
    "title": "Update resource configuration",
    "name": "UpdateResource",
    "group": "Resource",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Resource Instance ID to update</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "config",
            "description": "<p>Resource Configuration to update</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "envs",
            "description": "<p>Resource environment parameters to update</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name of this resource instance</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "avatar",
            "description": "<p>Avatar URL path</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "hostname",
            "description": "<p>Hostname to override the resource base hostname</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": true,
            "field": "services",
            "description": "<p>Array of name: and score: to add to the service provides on resource base</p>"
          },
          {
            "group": "Parameter",
            "type": "Number[]",
            "optional": true,
            "field": "gids",
            "description": "<p>List of groups that can use this resource (only amaretti admin can update)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "active",
            "description": "<p>Set true to enable resource</p>"
          }
        ]
      }
    },
    "description": "<p>Update the resource instance (only the resource that user owns)</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Resource",
            "description": "<p>Object</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/resource.js",
    "groupTitle": "Resource"
  },
  {
    "group": "System",
    "type": "get",
    "url": "/health",
    "title": "Get API status",
    "description": "<p>Get current API status</p>",
    "name": "GetHealth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>'ok' or 'failed'</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/index.js",
    "groupTitle": "System"
  },
  {
    "type": "delete",
    "url": "/task/:taskid",
    "title": "Mark the task for immediate removal",
    "group": "Task",
    "description": "<p>Sets the remove_date to now, so that when the house keeping occurs in the next cycle, the task_dir will be removed and status will be set to &quot;removed&quot;. If the task is running, it will also set the status to &quot;stop_requested&quot; so that it will be stopped, then removed.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Task successfully scheduled for removed\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/task.js",
    "groupTitle": "Task",
    "name": "DeleteTaskTaskid"
  },
  {
    "group": "Task",
    "type": "get",
    "url": "/service/info",
    "title": "Query service info",
    "description": "<p>Returns service info</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "service",
            "description": "<p>Service Name</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "List",
            "description": "<p>of tasks (maybe limited / skipped) and total number of tasks</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/service.js",
    "groupTitle": "Task",
    "name": "GetServiceInfo"
  },
  {
    "group": "Task",
    "type": "get",
    "url": "/task",
    "title": "Query Tasks",
    "description": "<p>Returns all tasks that belongs to a user (for admin returns all) or shared via instance.group_id</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "find",
            "description": "<p>Optional Mongo query to perform (you need to JSON.stringify)</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "sort",
            "description": "<p>Mongo sort object - defaults to _id. Enter in string format like &quot;-name%20desc&quot;</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "select",
            "description": "<p>Fields to load - multiple fields can be entered with %20 as delimiter</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Maximum number of records to return - defaults to 100</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "skip",
            "description": "<p>Record offset for pagination (default to 0)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "List",
            "description": "<p>of tasks (maybe limited / skipped) and total number of tasks</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/task.js",
    "groupTitle": "Task",
    "name": "GetTask"
  },
  {
    "group": "Task",
    "type": "get",
    "url": "/task/download/:taskid/*",
    "title": "Download file/dir from task",
    "description": "<p>Download file/dir from task. If directory path is specified, it will stream tar gz-ed content</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "p",
            "description": "<p>File/directory path to download (relative to task directory. Use encodeURIComponent() to escape non URL characters</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "at",
            "description": "<p>JWT token - if user can't provide it via authentication header</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/task.js",
    "groupTitle": "Task",
    "name": "GetTaskDownloadTaskid"
  },
  {
    "group": "Task",
    "type": "get",
    "url": "/task/ls/:taskid",
    "title": "List directory on task",
    "description": "<p>Get directory listing on a task.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "p",
            "description": "<p>sub directory (relative to taskdir) to load inside the task. Use encodeURIComponent() to escape non URL characters</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"files\":[\n    {\n        \"filename\":\"config.json\",\n        \"directory\":false,\n        \"attrs\": {\n            \"mode\":33188,\n            \"mode_string\":\"-rw-r--r--\",\n            \"uid\":1170473,\n            \"owner\": \"hayashis\",\n            \"gid\":4160,\n            \"group\": \"hpss\",\n            \"size\":117,\n            \"atime\":1466517617,\n            \"mtime\":1466517617\n        },\n        \"_raw\":\"-rw-r--r--    1 odidev   odi           117 Jun 21 10:00 config.json\"\n    }\n]}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/task.js",
    "groupTitle": "Task",
    "name": "GetTaskLsTaskid"
  },
  {
    "group": "Task",
    "type": "get",
    "url": "/task/upload/:taskid",
    "title": "Upload File",
    "description": "<p>Upload a file to specified task on a specified path (task will be locked afterward)</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "p",
            "description": "<p>File/directory path to download (relative to task directory. Use encodeURIComponent() to escape non URL characters</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{file stats uploaded}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/task.js",
    "groupTitle": "Task",
    "name": "GetTaskUploadTaskid"
  },
  {
    "type": "post",
    "url": "/task",
    "title": "New Task",
    "group": "Task",
    "description": "<p>Submit a task under a workflow instance</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "instance_id",
            "description": "<p>Instance ID to submit this task</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "service",
            "description": "<p>Name of the service to run</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "service_branch",
            "description": "<p>Branch to use for the service (master by default)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name for this task</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "desc",
            "description": "<p>Description for this task</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "remove_date",
            "description": "<p>Date (in ISO format) when you want the task dir to be removed (won't override resource' max TTL). (Please note that.. housekeeping will run at next_date.)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "max_runtime",
            "description": "<p>Maximum runtime of job (in msec)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "retry",
            "description": "<p>Number of time this task should be retried (0 by default)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "preferred_resource_id",
            "description": "<p>resource that user prefers to run this service on (may or may not be chosen)</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": true,
            "field": "config",
            "description": "<p>Configuration to pass to the service (will be stored as config.json in task dir)</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "deps",
            "description": "<p>(deprecated by deps_config) task IDs that this service depends on. This task will be executed as soon as all dependency tasks are completed.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": true,
            "field": "deps_config",
            "description": "<p>task IDs that this service depends on. This task will be executed as soon as all dependency tasks are completed.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "resource_deps",
            "description": "<p>(deprecated?) List of resource_ids where the access credential to be installed on ~/.sca/keys to allow access to the specified resource</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Task successfully registered\",\n    \"task\": {...},\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/task.js",
    "groupTitle": "Task",
    "name": "PostTask"
  },
  {
    "type": "put",
    "url": "/task/poke/:taskid",
    "title": "Clear next_date",
    "group": "Task",
    "description": "<p>Clear next_date so that the task will be handled by task handler immediately</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/task.js",
    "groupTitle": "Task",
    "name": "PutTaskPokeTaskid"
  },
  {
    "type": "put",
    "url": "/task/rerun/:taskid",
    "title": "Rerun finished / failed task",
    "group": "Task",
    "description": "<p>Reset the task status to &quot;requested&quot; and reset products / next_date</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "remove_date",
            "description": "<p>Date (in ISO format) when you want the task dir to be removed (won't override resource' max TTL)</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Task successfully re-requested\",\n    \"task\": {},\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/task.js",
    "groupTitle": "Task",
    "name": "PutTaskRerunTaskid"
  },
  {
    "type": "put",
    "url": "/task/stop/:taskid",
    "title": "Request task to be stopped",
    "group": "Task",
    "description": "<p>Set the status to &quot;stop_requested&quot; if running.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"Task successfully requested to stop\",\n    \"task\": {},\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/controllers/task.js",
    "groupTitle": "Task",
    "name": "PutTaskStopTaskid"
  },
  {
    "type": "put",
    "url": "/task/:taskid",
    "title": "Update Task",
    "group": "Task",
    "description": "<p>Update a few fields in task that doesn't affect provenance</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name for this task</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "desc",
            "description": "<p>Description for this task</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>A valid JWT token &quot;Bearer: xxxxx&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/controllers/task.js",
    "groupTitle": "Task",
    "name": "PutTaskTaskid"
  }
] });
