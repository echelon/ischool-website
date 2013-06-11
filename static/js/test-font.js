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
				hBold: false,
			})).view.attach();
			(new FontTest({
				hFont: fontA,
				pFont: fontB,
				hBold: true,
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
		this.$el = $('<div><h1></h1><p></p></div>');
		this.update();
	},
	update: function() {
		this.removeClasses();
		var heading = this.model.get('hText') + ' (' + 
					this.model.get('hFont') + ' &amp; ' +
					this.model.get('pFont') + ')';

		this.$el.find('h1')
			.css({fontFamily: this.model.get('hFont')})
			.html(heading);

		this.$el.find('p')
			.css({fontFamily: this.model.get('pFont')})
			.html(this.model.get('pText'));

		var weight = 'normal';
		if(this.model.get('hBold')) {
			weight = 'bold';
		}
		this.$el.find('h1').css({fontWeight: weight});
	},
	removeClasses: function() {
		this.$el.find('h1').css({fontFamily: ''});
		this.$el.find('h1').removeAttr('class');
		this.$el.find('h1').attr('class', '');
		this.$el.find('h1')[0].className = '';
		this.$el.find('p').css({fontFamily: ''});
		this.$el.find('p').removeAttr('class');
		this.$el.find('p').attr('class', '');
		this.$el.find('p')[0].className = '';
	},
	attach: function() {
		$('#main').append(this.$el);
	},
});
