#!/bin/bash 
echo 'Compiling LESS...'
lessc --yui-compress static/less/design.less > design.out.css
echo 'Running rsync...'
rsync -zrpvu --exclude-from=exclude.txt --progress . isiglobal@isimobile.com:/home/isiglobal/isi.isimobile.com/flaskapp
