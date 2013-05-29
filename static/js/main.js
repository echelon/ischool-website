/**
 * Misc/main scripting
 * Copyright (c) 2013 Brandon Thomas <bt@brand.io>
 * See more at http://brand.io
 */

var install_nav = function() {
	window.topnav = new TopNavView();

	install_resize_helper(); // TODO MOVE CALL ELSEHWERE
}

// Jump to the element nearest the top of the browser pane 
// when browser window resizes. This aids in my personal
// development (building/testing responsive design), but 
// doesn't do much else for others.
var install_resize_helper = function() {
	var $goto = null; 
	$(window).on('scroll', function() {
		var top = $(window).scrollTop(),
			closest = 99999;
		$('#main, section').children().each(function(i) {
			var elTop = $(this).offset().top,
				dif = Math.abs(top - elTop);
			if($(this).attr('id') == 'topnav') {
				return;
			}
			if(dif < closest) {
				closest = dif;
				$goto = $(this);
			}
		});
	})
	.on('resize', function() {
		var off = 0;
		if($goto) {
			off = $goto.offset().top;
			if(off < 10) {
				$(window).scrollTop(off);
				return;
			}
			// Good enough to get nav out of way...
			$(window).scrollTop(off - $('#topnav').outerHeight());
		}
	});
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

