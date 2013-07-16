/**
 * Embed Youtube Videos across the site.
 * Copyright (c) 2013 Brandon Thomas <bt@brand.io>
 * See more at http://brand.io
 */

// ====================================

// Expected by Youtube
// TODO: Any way around YT requiring this to be defined?
var onYouTubeIframeAPIReady = function() {
	window.video.isYoutubeReady = true;
};

var YoutubeVideo = Backbone.Model.extend({
	defaults: {
		id: '',
		state: null, // 'playing', 'paused', etc. TODO UNUSED
	},
	initialize: function() {
	},
});

// Only install once!
var YoutubeApiView = Backbone.View.extend({
	CLASSNAME: 'youtubeApi',
	constructor: function() {
		// Only install the YT API JS once. 
		if($('#' + this.CLASSNAME)) {
			return;
		}
		this.$el = $('<script></script>')
						.id(this.CLASSNAME)
						.attr('src', 'https://www.youtube.com/iframe_api');
	},
	appendTo: function() {
	},
});

var VideoView = Backbone.View.extend({
	$el: null,
	$ytScript: null,

	player: null, // YT video class
	playerEl: null, // YT video API to call playVideo() on

	isYoutubeReady: false,
	isInstalled: false,

	events: {
		'click': '_install',
	},

	constructor: function() {
		var that = this;

		// Only install the YT API JS once. 
		this.$ytScript = $('<script></script>')
							.id('youtubeApi')
							.attr('src', 
								'https://www.youtube.com/iframe_api');

		if(!this.$el) {
			this.$el = $(this.tagName);
		}

		this.$el.append(this.$ytScript);

		$(window).on('resize', function() { that._fitVideo(); });
		this.delegateEvents();
	},

	// Programmatic installation and play
	// Also calls YT api to play
	play: function() {
		this._install();
		if(!this.playerEl) {
			return;
		}
		this.playerEl.playVideo();
	},

	// Install the Youtube Video
	_install: function() {
		if(this.isInstalled) {
			return;
		}
		this.isInstalled = true;
		this.undelegateEvents();

		this.$el.html('')
				.append(this.$loader)
				.append(this.$player);

		this.$loader.show();

		this._install2();
	},

	// Install the Youtube Video
	_install2: function() {
		var that = this;

		// Check to see if script has loaded
		// If not onYouTubeIframeAPIReady yet, then
		// we need to show a 'loading' gif and continue to 
		// poll for ready flag
		if(!this.isYoutubeReady) {
			console.log('YT not yet loaded...');
			that.$el.append(that.$ytScript);
			setTimeout(function() {
				that.install2();
			}, 1000);
			return;
		}

		this.player = new YT.Player('player', {
			width: '1',
			height: '1',
			videoId: this.videoId,
			// https://developers.google.com/youtube/player_parameters
			playerVars: {
				autohide: 1,
				autoplay: 1,
				color: 'white',
				controls: 1,
				modestbranding: 1,
				origin: 'http://ischoolinitiative.org',
				rel: 0,
				showinfo: 0,
			},
			events: {
				'onReady': function(ev) {
					that._onPlayerReady(ev);
				},
				'onStateChange': function(ev) {
					that._onPlayerStateChange(ev);
				},
			}
		});

		this.$player = $('#player'); // XXX: YT changes tag with ID! 
		this.$el.html(this.$player);
		this.$player.show();

		this._fitVideo();
	},

	_fitVideo: function() {
		this.$player.width(this.$el.width());
		this.$player.height(this.$el.height());
	},

	_onPlayerReady: function(ev) {
		this.playerEl = ev.target;
	},

	_onPlayerStateChange: function(ev) {
	},
});

var PlayButtonView = Backbone.View.extend({
	events: {
		'click': 'click',
	},
	constructor: function() {
		this.$el = $('#watchvid button');
		this.delegateEvents();
	},
	click: function() {
		$.smoothScroll({
			offset: 0,
			afterScroll: function() {
				window.video.play();
			},
		});
		return false;
	},
});

