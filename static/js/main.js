
var main = function() {
	var END = 200;

	$(window).scroll(function(ev) {
		var s = $(window).scrollTop();
		//var t = $('#photo p');
		var p = $('#photo').height();

		if(s >= p) {
			$('header').fadeIn();
		}
		else {
			$('header').fadeOut();
		}

		//console.log(s, p);
		//var perc = (s - 85)/END;

		//t.css('margin-left', perc*100);
		//console.log(perc);
	});

	installVideo();
}

var installVideo = function()
{
	var $script = $('<script src="https://www.youtube.com/iframe_api"></script>');
	$('#photo').append($script);
}

player = null;

function onYouTubeIframeAPIReady() {
	// Note: 'player' is the div id to attach to
	$('#photo').on('click', install2);
}

var install2 = function() {
	player = new YT.Player('player', {
		width: '1',
		height: '1',
		videoId: 'WR3Focm44ck',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}


var attached = false; 
var onPlayerReady = function(ev) {
	if(attached) {
		ev.target.playVideo();
		return;
	}
	attached = true;

	console.log('onplayerready');
	var $player = $('#player'),
		$photo = $('#photo');

	$photo.html($player);
	$player.show();
	$photo.show();

	$player.width($photo.width());
	$player.height($photo.height());

	ev.target.playVideo();
}

var onPlayerStateChange = function() {
}

