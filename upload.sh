#!/bin/bash 

echo 'Compiling LESS...'
lessc --yui-compress static/less/design.less > design.out.css

echo 'Running rsync to development...'
rsync -zrpvu -e ssh --exclude-from=exclude.txt --progress . isiglobal@isimobile.com:/home/isiglobal/isi.isimobile.com/flaskapp

echo 'Running rsync to staging...'
rsync -zrpvu -e ssh --exclude-from=exclude.txt --progress ./output_build isiglobal@isimobile.com:/home/isiglobal/staging.isimobile.com

