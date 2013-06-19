#!/usr/bin/env python
"""
iSchool Initiative Website
Copyright 2013 Brandon Thomas <bt@brand.io>
"""

import os
import sys
import getpass
import Image, ImageFilter # PIL
from StringIO import StringIO
from flask import Flask, render_template, url_for, request
from flask import send_from_directory, send_file

# -------------
# CONFIGURATION
# -------------

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 1
app.config['DEV_MACHINE'] = False

FLASK_PATH = os.path.dirname(os.path.abspath(__file__))

if getpass.getuser() in ['brandon', 'isiglobal', 'root']:
	app.config['DEV_MACHINE'] = True

"""
# XXX: Not working --
with app.test_request_context():
	app.add_url_rule('/favicon.ico',
        redirect_to=url_for('static', filename='img/favicon.ico'))
"""

# -------------
# WEBSITE PAGES
# -------------

@app.route('/')
def page_index():
	return render_template('index.html')

@app.route('/about')
def page_about():
	return render_template('about.html')

@app.route('/tour')
def page_tour():
	return render_template('tour.html')

@app.route('/pd')
def page_pd():
	return render_template('pd.html')

@app.route('/test')
def page_test():
	return render_template('test.html')

@app.route('/booking')
def page_booking():
	return render_template('booking.html')

@app.errorhandler(404)
@app.route('/404')
def page_404(e=None):
	if e:
		return render_template('404.html'), 404
	return render_template('404.html')

# -----------------
# DEVELOPMENT TOOLS
# -----------------

@app.route('/<filename>.html')
def page_html_file(filename):
	# TODO/FIXME: Verify can't serve content outside of dir!
	# XXX XXX : NEVER EVER PUT INTO PRODUCTION ANYWHERE
	filename = '%s.html' % filename
	return send_from_directory(
			os.path.join(app.root_path, 'static', 'pages'),
                               filename)

@app.route('/filter')
def page_image_filter():
	def get_fullpath(filename):
		if '..' in filename:
			return False
		elif './' in filename:
			return False
		if filename.startswith('/'):
			filename = filename[1:]
		return os.path.join(FLASK_PATH, filename)

	fn = '/static/img/favicon.png'
	fn = fn if 'file' not in request.args else request.args['file']
	fn = get_fullpath(fn)

	im = Image.open(fn)

	if 'gaussian' in request.args:
		kern = int(request.args['gaussian'])
		im = im.filter(Gaussian(kern))

	if 'multiply' in request.args:
		f = float(request.args['multiply'])
		im = im.point(lambda p: p * f)

	return serve_pil_image(im)

def serve_pil_image(pil_img, quality=90):
	"""
	Serve a PIL image to the browser.
	From: http://stackoverflow.com/a/10170635
	"""
	img_io = StringIO()
	pil_img.save(img_io, 'JPEG', quality=quality)
	img_io.seek(0)
	return send_file(img_io, mimetype='image/jpeg')

class Gaussian(ImageFilter.Filter):
	name = "GaussianBlur"
	def __init__(self, radius=2):
		self.radius = radius
	def filter(self, image):
		return image.gaussian_blur(self.radius)

def cache_buster():
	import random
	if not app.config['DEV_MACHINE']:
		return ''
	return '?%s' % str(random.randint(500, 9000000))

app.jinja_env.globals.update(cache_buster=cache_buster)

def main(port=5000):
	app.run(
		port = port,
		host = '0.0.0.0',
		use_reloader = True,
	)

if __name__ == '__main__':
	port = 5000 if len(sys.argv) < 2 else int(sys.argv[1])
	main(port=port)

