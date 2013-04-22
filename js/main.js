
var main = function() {
	var END = 200;
	$(window).scroll(function(ev) {
		var s = $(window).scrollTop();
		var t = $('#photo p');

		if(s < 85) {
			return;
		}

		var perc = (s - 85)/END;

		t.css('margin-left', perc*100);


		console.log(perc);

	});
}
