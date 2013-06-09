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
			stat.increment();
		});
	}

	window.stats = new Stats([
		{number: 10, description: 'states'},
		{number: 23, description: 'stops'},
		{number: 25000, add: 0.05, places: 2, description: 'miles'},
		{number: 200000, add: 597, description: 'students reached'},
	]);

	window.stats.each(function(stat, i) {
		stat.view = new StatView({model: stat});
		stat.view.$el.appendTo(STATS_CONTAINER);
	});

	console.log('stats models created');
	console.log(window.stats.length);

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
				decimal = false;
			if(places) {
				num = num.toFixed(places);
				decimal = num.toString().split('.');
				num = decimal[0];
				decimal = decimal[1];
			}
			else {
				num = num.toString();
			}

			// Commas for thousands places
			// http://stackoverflow.com/a/2901298
			num = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

			if(decimal !== false) {
				num = num + '.' + decimal;
			}
			return num;
		};

		var num = format(this.model.get('number')),
			desc = this.model.get('description');

		this.$el.html('<p>' + num + '</p><p>' + desc + '</p>');
	},
});

var Stat = Backbone.Model.extend({
	view: null,
	defaults: {
		number: 0,
		add: 0,
		places: 0,
		description: 'things',
	},
	initialize: function() {
	},
	increment: function() {
		// TODO: Should be a function of time!!
		var n = this.get('number');
		var a = this.get('add');
		this.set('number', n + a );
	}
});

var Stats = Backbone.Collection.extend({
	model: Stat,
});
