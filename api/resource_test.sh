#!/bin/bash

#This script will be copied to each resource everytime resource checker test resource status and used to test the resource

#check for common binaries
which git >/dev/null
if [ ! $? -eq 0 ]; then
    echo "git not installed on PATH"
    exit 1
fi

#I am not sure about this one yet..
#which git-lfs >/dev/null
#if [ ! $? -eq 0 ]; then
#    echo "git-lfs not installed on PATH"
#    exit 1
#fi

which singularity >/dev/null
if [ ! $? -eq 0 ]; then
    echo "singularity not installed on PATH"
    #TODO _ should I check the version / configuration?
    exit 1
fi

which jq >/dev/null
if [ ! $? -eq 0 ]; then
    echo "jq not installed on PATH"
    exit 1
fi

#which singulalrity #TODO - not all resource needs singularity.. but should I make it mandetary?

#check for default abcd hook
which start >/dev/null
if [ ! $? -eq 0 ]; then
    echo "abcd-hook 'start' not installed on PATH"
    exit 1
fi

which stop >/dev/null
if [ ! $? -eq 0 ]; then
    echo "abcd-hook 'stop' not installed on PATH"
    exit 1
fi

which status >/dev/null
if [ ! $? -eq 0 ]; then
    echo "abcd-hook 'status' not installed on PATH"
    exit 1
fi

#check for access right
mkdir _resource_check && rmdir _resource_check
if [ ! $? -eq 0 ]; then
    echo "couldn't write to workdir: `pwd`"
    exit 1
fi

