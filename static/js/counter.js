/**
 * Tour Statistics and Counter
 * Copyright (c) 2013 Brandon Thomas <bt@brand.io>
 * See more at http://brand.io
 */

// TODO: Set as function of time
// TODO: Decimal and thousands-place comma formatting
// TODO: Don't freeze browser
// TODO: Install and run after maps is constructed (fire event)
// TODO: Now is probably the time to consider AMD and js compiling

var STATS_CONTAINER = '#stats ul';

var install_counter = function() {
	var counterIncrement = function() {
		window.stats.each(function(stat, i) {
			stat.view.update();
		});
	}

	// 19 states last year + 7 completely new states this year
	var states = 19 + 7;

	// 22 stops last year + 22 planned stops this year
	var stops = 22 + 22;

	// 6985 miles last year
	var miles = 6985;
	var expectedMiles = miles + miles;

	// 12-15k educators last year
	// 13k attend ISTE each year
	var reach = 12000;
	var expectedReach = reach + 13000 + 400000;

	// XXX: Javascript months and days are zero-indexed !!
	window.stats = new Stats([
		{number: states, description: 'states'},
		{number: stops, description: 'stops'},
		{number: miles, 
			numberFinal: expectedMiles, 
			places: 3, 
			dateBegin: new Date(2013, 5, 0),
			dateEnd: new Date(2013, 9, 30),
			description: 'miles'},
		{number: reach, 
			numberFinal: expectedReach, 
			fraction: true,
			dateBegin: new Date(2013, 5, 0),
			dateEnd: new Date(2013, 9, 30),
			description: 'people reached'},
	]);

	window.stats.each(function(stat, i) {
		stat.view = new StatView({model: stat});
		stat.view.$el.appendTo(STATS_CONTAINER);
	});

	setInterval(function() { counterIncrement(); }, 1500);
}; 

var StatView = Backbone.View.extend({
	initialize: function() {
		var that = this;
		this.$el = $('<li>');
		this.update();
		this.model.on('change', function() { 
			that.update();
		});
	},
	update: function() {
		var that = this;
		var format = function(num) {
			var places = that.model.get('places'),
				fraction = that.model.get('fraction'),
				decimal = false;
			if(places || fraction) {
				if(!places) {
					places = 3;
				}
				num = num.toFixed(places);
				decimal = num.toString().split('.');
				num = decimal[0];
				decimal = decimal[1];
			}
			else {
				num = num.toFixed(places);
				num = num.toString();
			}

			// Commas for thousands places
			// http://stackoverflow.com/a/2901298
			num = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

			if(fraction) {
				fraction = '';
				decimal = parseFloat(decimal)/1000;
				if(decimal >= 0.75) {
					fraction = '&frac34;';
				}
				else if(decimal >= 0.50) {
					fraction = '&frac12;';
				}
				else if(decimal > 0.25) {
					fraction = '&frac14;';
				}
				num = num + '' + fraction;	
			}
			else if(decimal !== false) {
				num = num + '.' + decimal;
			}

			return num;
		};

		var num = format(this.model.getNumber()),
			desc = this.model.get('description');

		this.$el.html('<p>' + num + '</p><p>' + desc + '</p>');
	},
});

var Stat = Backbone.Model.extend({
	view: null,
	defaults: {
		number: 0,
		numberFinal: 0,
		isInterpolated: false,
		places: 0,
		fraction: false,
		description: 'things',
		dateBegin: new Date(Date.UTC(2001, 0, 0)),
		dateEnd: new Date(Date.UTC(2054, 0, 0)),
	},
	initialize: function() {
		if(this.get('numberFinal')) {
			this.set('isInterpolated', true);
		}
	},
	// Get the number per the current datetime interpolation
	getNumber: function() {
		if(!this.get('isInterpolated')) {
			return this.get('number');
		}
		var n0 = this.get('number'),
			nf = this.get('numberFinal'),
			d0 = this.get('dateBegin'),
			df = this.get('dateEnd'),
			now = Date.now(),
			nd = nf - n0;

		d0 = d0.getTime() / 1000;
		df = df.getTime() / 1000;
		now = now / 1000;

		if(now > df) {
			return nf;
		}

		return n0 + ((now-d0)/(df-d0)) * nd;
	},
});

var Stats = Backbone.Collection.extend({
	model: Stat,
});

