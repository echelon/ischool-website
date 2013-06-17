/**
 * Fixed elements that stick to the page top
 * Copyright (c) 2013 Brandon Thomas <bt@brand.io>
 * See more at http://brand.io
 */

/*var install_nav = function() {
	window.topnav = new TopNavView();
}*/

var install_nav = function() {
	window.nav = new FixedElementView({
		selector: 'nav#topnav'
	});
}

var install_stats_fixed = function() {
	window.stats_fixed = new FixedElementView({
		selector: '#stats',
		stop: '#justBeforeNav',
	});
}

var FixedElementView = Backbone.View.extend({
	$el: null,		 // moving element
	$wrap: null,	 // we create a wrapper placeholder
	$stop: null,	 // optional
	state: 'normal', // => normal | fixed | stuck (just for debug)

	// CTOR argument object supports the keys:
	// 	* 'selector'	(req) element that becomes fixed
	// 	* 'stop' 		(opt) element at whose top it stops
	// 	* 'zindex'		(opt) zindex to apply to element when fixed
	constructor: function(args) {
		var that = this,
			zindex = 5,
			id = this.constructor.COUNTER,
			wrapId = 'fixedWrap' + id;

		if(!('selector' in args)) {
			throw new Error('No selector argument!');
		}

		this.$el = $(args.selector);

		if('stop' in args) {
			this.$stop = $(args.stop);
		}

		if('zindex' in args) {
			zindex = args.zindex;
		}

		// XXX: I'm creating the wrapper before binding it so that
		// it gains a position() that isn't (0, 0).
		this.$el.wrap('<div id="' 
						+ wrapId + '" class="fixedWrap"></div>')
				.css({
					zIndex: zindex,
				});

		// XXX: Hack to fix width issue
		this.$el.addClass('fixedEl');

		this.$wrap = this.$el.parent('#'+wrapId);

		//this.$wrap.offset(this.$el.position())
				  /*.css({
				      left: '', // hackish reset fix
				  });*/

		$(window).on('scroll', function() { that.onScroll(); });
		$(window).on('resize', function() { that._resizeWrapper(); });

		this.constructor.COUNTER++;
	},

	onScroll: function(ev) {
		var top = $(window).scrollTop(),
			b = this.$wrap.position().top,
			c = Number.MAX_VALUE;
				
		// Necessary to prevent jumpiness @ threshold point
		// I'm continually firing this because font load/changes
		// may alter height.
		this._resizeWrapper();

		if(this.$stop) {
			c = this.$stop.position().top - this.$el.outerHeight();
		}

		if(top >= c) {
			this.state = 'stuck';
			this.$el.css({
				top: c,
				position: 'absolute',
			});
		}
		else if(top >= b) {
			this.state = 'fixed';
			this.$el.css({
				top: 0,
				position: 'fixed',
			});
		}
		else {
			this.state = 'normal';
			this.$el.css({
				top: '',
				position: '',
			});
		}
		//this.$el.attr('data-state', this.state); // debug only
	},

	_resizeWrapper: function() {
		this.$wrap.height(this.$el.outerHeight());
	},
},
// STATIC STUFF
{
	COUNTER: 0,	// STATIC: count the number of instances created.
});


