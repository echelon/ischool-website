
var TOUR_FORM_KEY = 'dEpueHVnMHYzOWFZQWdNaGFuRVN6Zmc6MA';
var TOUR_FORM_URL = 'https://docs.google.com/spreadsheet' +
					'/viewform?formkey=' +
					TOUR_FORM_KEY;

// For now, all we're doing is sending them to the Google Docs form
// In time, I'll write an inline, dynamic, and animated form. 
var install_form_tour = function() {
	$('article#become').click(function() {
		window.location = TOUR_FORM_URL;
	});
}

// For now, all we're doing is sending them to the Google Docs form
// In time, I'll write an inline, dynamic, and animated form. 
var install_form_tour_on_pd = function() {
	$('#book button').click(function() {
		window.location = TOUR_FORM_URL;
	});
}
