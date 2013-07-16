/*
  iSchool Initiative Website
  http://ischoolinitiative.org
  Copyright (c) 2013 Brandon Thomas <bt@brand.io>
*/

// Libraries
require('lib/jquery');
require('lib/jquery.easing');
require('lib/jquery.smooth-scroll.min');
require('lib/underscore-min');
require('lib/backbone-min');

// Code that runs on several (or all) pages
// Keep this stuff general-purpose and reusable.
require('fixed');
require('dev'); // TODO: Deprecate some or all functionality
require('video');
require('video_installers');
require('form_installers');

// Code that runs only on specific pages
// Doesn't have to be library-quality
require('old_video'); // TODO: Deprecate and remove
require('about_team');
require('tour_counter');
require('tour_map');
require('tour_grid');

var test = function() {
	console.log('test');
}

