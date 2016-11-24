#!/bin/bash

#TODO: replace with env variables or get automatically
WORKING_DIRECTORY='/Users/SATURN/NodeProjects'
PI='pi@192.168.2.113'

scp -r $WORKING_DIRECTORY/sparky-sdk $PI:~
echo Transferred bot folder