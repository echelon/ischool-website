
var install_index_video = function() {
	window.button = new PlayButtonView();
	window.video = new YoutubeVideo({
		id: '0RcjojbuwxM', // TODO: Pull from HTML data attrib
	});
	window.video.view = new VideoView({
		model: window.video,
		$el: $('header'),
	});
};

var install_about_video = function() {
	window.video = new YoutubeVideo({
		id: '68KgAcx_9jU', // TODO: Pull from HTML data attrib
	});
	window.video.view = new VideoView({
		model: window.video,
		$el: $('#journeyVideo'),
	});
};

