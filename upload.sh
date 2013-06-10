#!/bin/bash 

echo 'Compiling LESS...'
lessc --yui-compress static/less/design.less > static/less/design.out.css
echo 'Running build...'
python build.py

#echo 'Running rsync to development...'
#rsync -zrpvu -e ssh --exclude-from=exclude.txt --progress . isiglobal@isimobile.com:/home/isiglobal/isi.isimobile.com/flaskapp

echo 'Running rsync to staging...'
rsync -zrpvu -e ssh --exclude-from=exclude.txt --progress ./output_build/ isiglobal@isimobile.com:/home/isiglobal/staging.isimobile.com
rsync -zrpvu -e ssh --exclude-from=exclude.txt --progress ./static isiglobal@isimobile.com:/home/isiglobal/staging.isimobile.com
