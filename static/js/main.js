/**
 * Misc/main scripting
 * Copyright (c) 2013 Brandon Thomas <bt@brand.io>
 * See more at http://brand.io
 */

var install_nav = function() {
	window.topnav = new TopNavView();
}

var TopNavView = Backbone.View.extend({
	id: 'topnav',

	constructor: function() {
		var that = this;
		this.$el = $('nav#topnav');
		$(window).scroll(function() { that.fade(); });
	},

	fade: function(ev) {
		var a = $(window).scrollTop(),
			b = $('header').height();
		// TODO/FIXME: 
		// I should only trigger when thresholds are passed, 
		// perhaps fire NoOps otherwise. Or does jQuery do this 
		// automatically when fadeIn()/fadeOut() calls are stacked?
		if(a >= b) {
			this.$el.fadeIn();
		}
		else {
			this.$el.fadeOut();
		}
	},
});

