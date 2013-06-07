/**
 * Tour Statistics and Counter
 * Copyright (c) 2013 Brandon Thomas <bt@brand.io>
 * See more at http://brand.io
 */

var STATS_CONTAINER = '#stats';

var install_counter = function() {
	window.stats = new Stats([
		{number: 10, description: 'states'},
		{number: 23, description: 'stops'},
		{number: 25000, description: 'miles'},
		{number: 200000, description: 'students reached'},
	]);

	window.stats.each(function(stat, i) {
		stat.view = new StatView({model: stat});
		stat.view.$el.appendTo(STATS_CONTAINER);
	});

	console.log('stats models created');
	console.log(window.stats.length);
};

var StatView = Backbone.View.extend({
	initialize: function() {
		this.$el = $('<li>');
		this.update();
	},
	update: function() {
		var that = this;
		var format = function(num) {
			var decimals = that.model.get('decimals');
			if(decimals) {
				num = num.toFixed(decimals);
			}
			return num;
		};

		var num = format(this.model.get('number')),
			desc = this.model.get('description');

		this.$el.html(num + ' ' + desc);
	},
});

var Stat = Backbone.Model.extend({
	view: null,
	defaults: {
		number: 0,
		decimals: 0,
		description: 'things',
	},
	initialize: function() {
	},
});

var Stats = Backbone.Collection.extend({
	model: Stat,
});
