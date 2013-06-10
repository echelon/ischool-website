#!/usr/bin/env python
"""
iSchool Initiative Website Build Process
Copyright 2013 Brandon Thomas <bt@brand.io>
"""

import os
import glob
import shutil
import warnings
from main import *
from flask_frozen import Freezer

BUILD_DIR = 'output_build'

app.config['FREEZER_DEFAULT_MIMETYPE'] = 'text/html'
app.config['FREEZER_DESTINATION'] = BUILD_DIR
app.config['FREEZER_DESTINATION_IGNORE'] = ['/filter']
app.config['DEV_MACHINE'] = False

class BuildDir(object):
	"""
	Build Directory Management
	TODO: Make class reusable (Rename Directory, don't keep static)
	"""
	buildDir = os.path.join(os.getcwd(), BUILD_DIR)

	@classmethod
	def wildcard(cls, extension):
		return os.path.join(cls.buildDir, '*.%s' % extension)

	@classmethod
	def glob(cls, search, fullPath=True):
		results = glob.glob(os.path.join(cls.buildDir, search))
		if fullPath:
			return results
		return [os.path.basename(x) for x in results]

	@classmethod
	def exglob(cls, search, fullPath=True):
		out = []
		match = cls.glob(search, fullPath)
		for f in os.listdir(cls.buildDir):
			if fullPath:
				f = os.path.join(cls.buildDir, f)
			if f not in match:
				out.append(f)
		return out

	@classmethod
	def make(cls):
		try:
			os.makedirs(cls.buildDir)
		except:
			print 'failure to mkdir'
			pass

	@classmethod
	def cleanup(cls):
		for _file in os.listdir(cls.buildDir):
			_file = os.path.join(cls.buildDir, _file)
			try:
				if os.path.isfile(_file):
					os.unlink(_file)
			except:
				pass

def generate_static_html():
	with warnings.catch_warnings():
		warnings.simplefilter('ignore')
		freezer = Freezer(app, with_static_files=False)
		freezer.freeze()

def move_html_files():
	files = BuildDir.exglob('*html')
	for f in files:
		os.rename(f, f+'.html')

def copy_htaccess():
	f = os.path.join(os.path.abspath('.'), '.htaccess')
	shutil.copy2(f, BuildDir.buildDir)

def build():
	print 'Generating static HTML...'
	generate_static_html()
	print 'Copying files & Changing file extensions...'
	move_html_files()
	copy_htaccess()

if __name__ == '__main__':
	build()

