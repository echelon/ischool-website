
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
}
