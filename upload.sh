#!/bin/bash 
# Sync to the staging and testing environment
echo 'Compiling LESS...'
lessc --yui-compress static/less/design.less > static/less/design.out.css

echo ''
echo 'Running build scripts'
echo '---------------------'
python build.py

echo ''
echo 'Running rsync to isi.isimobile.com'
echo '----------------------------------'
rsync -zrpvu -e ssh --exclude-from=exclude.txt --progress . isiglobal@isimobile.com:/home/isiglobal/isi.isimobile.com/flaskapp

echo ''
echo 'Running rsync /output_build/ -> staging.isimobile.com'
echo '-----------------------------------------------------'
rsync -zrpvu -e ssh --exclude-from=exclude.txt --progress ./output_build/ isiglobal@isimobile.com:/home/isiglobal/staging.isimobile.com

echo ''
echo 'Running rsync to staging.isimobile.com/static'
echo '---------------------------------------------'
rsync -zrpvu -e ssh --exclude-from=exclude.txt --progress ./static/ isiglobal@isimobile.com:/home/isiglobal/staging.isimobile.com/static
