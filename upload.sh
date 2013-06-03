#!/bin/bash 
rsync -zrpv --exclude-from=exclude.txt . isiglobal@isimobile.com:/home/isiglobal/isi.isimobile.com/flaskapp
