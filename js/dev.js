/**
 * Dev-mode scripting
 * Copyright (c) 2013 Brandon Thomas <bt@brand.io>
 * See more at http://brand.io
 */

var install_dev_mode = function() {
	$(function() {
		install_resize_helper();
		install_dev_keybindings();
		install_todo_hide();
		install_refresh_timer();
	});
};

// Chrome on my system consumes my RAM. Overflow somewhere?
var install_refresh_timer = function() {
	var minutes = 10;
	setTimeout(function() {
		window.location = window.location;
	}, 1000 * 60 * minutes);
};

// On keypress, toggle things like less watch mode. 
// *ONLY* for development!
var install_dev_keybindings = function() {
	var freeze = null;
	$(window).on('keypress', function(ev) {
		switch(String.fromCharCode(ev.which)) {
			case 'f':
				if(!freeze) {
					console.log('Freeze window');
					freeze = new ScrollFreeze($(window).scrollTop());
				}
				break;

			case 'w':
				if(!less.watchMode) {
					console.log('Watch LESS.');
					less.watch();
				}
				break;

			case 'r':
				if(ev.ctrlKey) {
					break;
				}
				console.log('Refressh LESS.');
				less.refresh();
				break;

			case 't':
				console.log('Show TODO.');
				show_focus_todo();
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

// Simply hide the 'todo' div 
var install_todo_hide = function() {
	$('#todo').on('click', function() {
		$(this).fadeOut({
			duration: 1000,
			easing: 'easeInExpo',
		});
	});
}

var show_focus_todo = function() {
	$('#todo').show();
	$(window).scrollTop(10000000000000000);
	$(window).scrollTop($('#todo').position().top);
}

// Freeze scrolling when called.
// XXX: Care enough to unbind events before deleting!
var ScrollFreeze = function(pos) {
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

