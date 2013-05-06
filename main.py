#!/usr/bin/env python
"""
Temporary so I can use templates.
Copyright 2013 Brandon Thomas <bt@brand.io>
"""

import sys
from flask import Flask, render_template

app = Flask(__name__)

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 1

"""
APPLICATION COMPONENTS
"""

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

@app.errorhandler(404)
def page_404(e):
	return render_template('404.html'), 404

"""
TODO: Later
@app.route('/booking')
def page_booking():
	return render_template('booking.html')
"""

if __name__ == '__main__':
	port = 5000 if len(sys.argv) < 2 \
			else int(sys.argv[1])
	app.run(
		port = port,
		host = '0.0.0.0'
	)

