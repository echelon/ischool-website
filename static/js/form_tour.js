
var TOUR_FORM_KEY = '0AoeSZMi_gGoCdEpueHVnMHYzOWFZQWdNaGFuRVN6Zmc';
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
