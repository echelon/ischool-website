#!/bin/bash 
rsync -zrpvu --exclude-from=exclude.txt --progress . isiglobal@isimobile.com:/home/isiglobal/isi.isimobile.com/flaskapp
