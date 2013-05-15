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
		if(a >= b) {
			this.$el.fadeIn();
		}
		else {
			this.$el.fadeOut();
		}
	},
});

