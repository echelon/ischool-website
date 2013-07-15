#!/bin/bash 
# Sync to the staging and testing environment
shopt -s expand_aliases
alias rsync="rsync -zrpvu -e ssh --exclude-from=exclude.txt --progress"

function print_status() {
	status=$1
	length=${#1}
	echo ''
	echo $status
	for i in $(seq $length); do echo -n '-'; done
	echo ''
}

print_status 'Running build script'
python build.py

#
# GODADDY (ugh) STATIC FINAL DEPLOY
#

print_status 'Running rsync /output/final/ -> ischoolinitiative.org'
rsync --rsync-path=~/bin/rsync ./output/final/ ischooltravis@ischoolinitiative.org:html

print_status 'Running rsync to ischoolinitiative.org/static'
rsync --rsync-path=~/bin/rsync ./static/ ischooltravis@ischoolinitiative.org:html/static

