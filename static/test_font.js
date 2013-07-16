// Fonts go here
// Call test() to run again
window.fonts = [
	'raleway',
	'bryant alternate',
];

var install_test_font = function() {
	$('#main').html(' ');
	for(var i = 0; i < window.fonts.length; i++) {
		var fontA = window.fonts[i];
		for(var j = 0; j < window.fonts.length; j++) {
			var fontB = window.fonts[j];
			(new FontTest({
				hFont: fontA,
				pFont: fontB,
			})).view.attach();
		}
	}
};

var test = install_test_font;

var FontTest = Backbone.Model.extend({
	view: null,
	defaults: {
		hText: 'Students Reforming Education',
		hFont: 'times new roman',
		hCaps: false,
		hBold: false,
		hItalic: false,
		pFont: 'times new roman',
		pText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce leo nulla, bibendum ut dolor eu, suscipit tincidunt quam. Nam orci justo, euismod vitae venenatis ac, ullamcorper a lacus. Morbi at ligula id lectus volutpat hendrerit mattis non lacus. In venenatis felis id sem feugiat porttitor. Morbi lectus urna, tristique non neque tincidunt, cursus lacinia felis. Suspendisse magna nunc, facilisis eu pellentesque ut, aliquam vitae est.',
	},
	initialize: function() {
		this.view = new FontTestView({model: this});
	},
});

var FontTestView = Backbone.View.extend({
	model: null,
	initialize: function(model) {
		this.$el = $('<div><h1 class="one"></h1><h1 class="two"></h1><p class="bigger"></p><p></p></div>');
		this.update();
	},
	update: function() {
		this.removeClasses();
		var headingA = this.model.get('hText'),
			headingB = headingA + ' (' + 
					this.model.get('hFont') + ' &amp; ' +
					this.model.get('pFont') + ')';

		this.$el.find('h1.one')
			.css({fontFamily: this.model.get('hFont')})
			.html(headingA);

		this.$el.find('h1.two')
			.css({fontFamily: this.model.get('hFont')})
			.html(headingB);

		this.$el.find('p')
			.css({fontFamily: this.model.get('pFont')})
			.html(this.model.get('pText'));
	},
	removeClasses: function() {
	},
	attach: function() {
		$('#main').append(this.$el);
	},
});
