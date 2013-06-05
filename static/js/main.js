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
		this.$wrap = $('#topnavwrap');
		$(window).scroll(function() { that.fade(); });
	},

	fade: function(ev) {
		var a = $(window).scrollTop(),
			b = this.$wrap.position().top;
				
		// Necessary to prevent jumpiness @ threshold point
		// I'm continually firing this because font load/changes
		// may alter height.
		this.$wrap.height(this.$el.outerHeight());

		if(a >= b) {
			this.fix();
		}
		else {
			this.unfix();
		}
	},

	fix: function() {
		if(this.$el.hasClass('fixed')) {
			return;
		}
		this.$el.addClass('fixed');
	},

	unfix: function() {
		if(!this.$el.hasClass('fixed')) {
			return;
		}
		this.$el.removeClass('fixed');
	},
});

