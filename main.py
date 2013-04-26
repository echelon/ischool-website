#!/usr/bin/env python
"""
Temporary so I can use templates.
Copyright 2013 Brandon Thomas <bt@brand.io>
"""

from flask import Flask, render_template

app = Flask(__name__)

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

@app.route('/booking')
def page_booking():
	return render_template('booking.html')

if __name__ == '__main__':
	app.run()

