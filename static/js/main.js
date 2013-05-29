/**
 * Misc/main scripting
 * Copyright (c) 2013 Brandon Thomas <bt@brand.io>
 * See more at http://brand.io
 */

var install_nav = function() {
	window.topnav = new TopNavView();

	install_resize_helper(); // TODO MOVE CALL ELSEHWERE
	install_dev_keybindings(); // TODO MOVE CALL ELSEHWERE
}

// On keypress, toggle things like less watch mode. 
// *ONLY* for development!
var install_dev_keybindings = function() {
	var freeze = null;
	$(window).on('keypress', function(ev) {
		switch(String.fromCharCode(ev.which)) {
			case 'f':
				if(!freeze) {
					console.log('Freeze window');
					freeze = new Freeze($(window).scrollTop());
				}
				break;

			case 'w':
				if(!less.watchMode) {
					console.log('Watch LESS.');
					less.watch();
				}
				break;

			case 'r':
				console.log('Refressh LESS.');
				less.refresh();
				break;

			case 'u':
				if(less.watchMode) {
					console.log('Unwatch LESS.');
					less.unwatch();
				}
				if(freeze) {
					console.log('Unfreeze Window');
					freeze.unfreeze();
					freeze = null;
				}
				break;

			default:
				break;
		}
	});
}

// Freeze scrolling when called.
// XXX: Care enough to unbind events before deleting!
var Freeze = function(pos) {
	var that = this,
		returnScroll = function() {
			$(window).scrollTop(that.position);
		};

	// Bind scrolling
	this.freeze = function(pos) {
		if(typeof pos !== 'undefined') {
			this.position = pos;
		}
		this.unfreeze();
		$(window).on('scroll', returnScroll);
	};

	// Unbind scrolling
	// XXX: Always call before deleting 'this'
	this.unfreeze = function() {
		$(window).off('scroll', '', returnScroll);
	};

	this.position = typeof pos !== 'undefined' ? pos : 0;

	// Call on init!
	this.freeze();
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

