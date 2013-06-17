#!/usr/bin/env python
"""
iSchool Initiative Website Build Process
Copyright 2013 Brandon Thomas <bt@brand.io>
"""

import os
import glob
import shutil
import hashlib
import warnings
from main import *
from flask_frozen import Freezer

BUILD_DIR = './output/build'
OUTPUT_DIR = './output/final'

app.config['FREEZER_DEFAULT_MIMETYPE'] = 'text/html'
app.config['FREEZER_DESTINATION'] = BUILD_DIR
app.config['FREEZER_DESTINATION_IGNORE'] = ['/filter']
app.config['DEV_MACHINE'] = False

class Directory(object):
	"""
	Directory Management
	"""
	def __init__(self, _dir):
		self.directory = os.path.abspath(_dir)

	def join(self, path):
		return os.path.join(self.directory, path)

	def wildcard(self, extension):
		return os.path.join(self.directory, '*.%s' % extension)

	def glob(self, search, fullPath=True):
		results = glob.glob(os.path.join(self.directory, search))
		if fullPath:
			return results
		return [os.path.basename(x) for x in results]

	def exglob(self, search, fullPath=True):
		out = []
		match = self.glob(search, fullPath)
		for f in os.listdir(self.directory):
			if fullPath:
				f = os.path.join(self.directory, f)
			if f not in match:
				out.append(f)
		return out

	def mkdir(self, subdirectory=False):
		try:
			os.makedirs(self.directory)
		except:
			pass

	@classmethod
	def cleanup(self):
		for _file in os.listdir(self.directory):
			_file = os.path.join(self.directory, _file)
			try:
				if os.path.isfile(_file):
					os.unlink(_file)
			except:
				pass

buildDir = Directory(BUILD_DIR)
outputDir = Directory(OUTPUT_DIR)

def make_directories():
	buildDir.mkdir()
	outputDir.mkdir()

def generate_static_html():
	with warnings.catch_warnings():
		warnings.simplefilter('ignore')
		freezer = Freezer(app, with_static_files=False)
		freezer.freeze()

def add_html_extensions():
	files = buildDir.exglob('*html')
	for f in files:
		os.rename(f, f+'.html')

def build_is_newer():
	def file_hash(f):
		try:
			with open(f, 'r') as _f:
				return hashlib.sha1(_f.read()).hexdigest()
		except:
			return ''

	for f in buildDir.glob('*html', False):
		a = file_hash(buildDir.join(f))
		b = file_hash(outputDir.join(f))
		if a != b:
			return True

	return False

def copy_html_files():
	filesNew = buildDir.glob('*html')
	for f in filesNew:
		shutil.copy2(f, outputDir.directory)

def copy_htaccess():
	f = os.path.join(os.path.abspath('.'), '.htaccess')
	shutil.copy2(f, outputDir.directory)

def build():
	print 'Make build directories...'
	make_directories()

	print 'Building static HTML...'
	generate_static_html()
	add_html_extensions()

	if build_is_newer():
		print 'Copying HTML files...'
		copy_html_files()
	else:
		print 'Files didn\'t change.'

	print 'Copying .htaccess...'
	copy_htaccess()

if __name__ == '__main__':
	build()

