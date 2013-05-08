
var main = function()
{
	window.video = new VideoView();
	window.topnav = new TopNavView();
	console.log('test test test');
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

var VideoView = Backbone.View.extend({
	$el: null,
	$player: null,
	$loader: null,
	$ytScript: null,

	tagName: 'header',
	videoId: 'WR3Focm44ck',
	player: null, // YT video API access
	playerEl: null, // YT video API access
	isYoutubeReady: false,

	events: {
		'click': 'install',
	},

	constructor: function() {
		var that = this;
	
		this.$ytScript = $('<script></script>')
							.attr('src', 
								'https://www.youtube.com/iframe_api');
		
		this.$el = $(this.tagName);
		this.$player = this.$el.find('#player');
		this.$loader = this.$el.find('#loader');

		this.$el.append(this.$ytScript);

		$(window).on('resize', function() { that.fitVideo(); });
		this.delegateEvents();
	},

	// Install the Youtube Video
	install: function() {
		var that = this;

		// TODO: If not onYouTubeIframeAPIReady yet, then
		// we need to show a 'loading' gif and continue to 
		// poll for ready flag
		this.undelegateEvents();

		this.$el.html('')
				.append(this.$loader)
				.append(this.$player);

		this.$loader.show();

		this.install2();
	},

	install2: function() {
		var that = this;

		// Check to see if script has loaded
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
				origin: 'http://localhost:7000',
				rel: 0,
				showinfo: 0,
			},
			events: {
				'onReady': function(ev) {
					that.onPlayerReady(ev);
				},
				'onStateChange': function(ev) {
					that.onPlayerStateChange(ev);
				},
			}
		});

		this.$el.html(this.$player);
		this.$player.show();

		this.fitVideo();
	},

	fitVideo: function() {
		this.$player.width(this.$el.width());
		this.$player.height(this.$el.height());
	},

	// Call YT api to play
	play: function() {
		if(!this.playerEl) {
			return;
		}
		this.playerEl.playVideo();
	},

	onPlayerReady: function(ev) {
		console.log('onPlayerReady');
		this.playerEl = ev.target;
		//this.play();
	},

	onPlayerStateChange: function(ev) {
		console.log('onPlayerStateChange');
	},
});

var onYouTubeIframeAPIReady = function() {
	window.video.isYoutubeReady = true;
}

