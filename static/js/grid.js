/**
 * Simple animation on the grid.
 * Copyright (c) 2013 Brandon Thomas <bt@brand.io>
 * See more at http://brand.io
 */

var install_grid_anim = function() {
	window.grid_anims = [
		new GridImageView({
			el: $('#gridImgSmall1'),
		}),
		new GridImageView({
			el: $('#gridImgSmall4'),
		}),
	];
}

var GridImage = Backbone.Model.extend({
	defaults: {
		isAbove: true,
	},
	setAbove: function() {
		if(!this.get('isAbove')) {
			this.set('isAbove', true);
		}
	},
	setBelow: function() {
		if(this.get('isAbove')) {
			this.set('isAbove', false);
		}
	},
});

var GridImageView = Backbone.View.extend({
	$wrap: null,
	initialize: function() {
		var that = this;
		this.$wrap = this.$el.find('.wrap2');
		this.model = new GridImage({});
		this.model.on('change', function() {
			that.updateImage();
		});
		$(window).on('scroll', function() {
			that.scroll();
		});
	},
	scroll: function() {
		var wTop = $(window).scrollTop(),
			wHeight = $(window).height(),
			ePos = this.$el.position().top,
			eHeight = this.$el.outerHeight(),
			a = wTop + (wHeight/2),
			b = ePos + (eHeight/2);

		if(b > a) {
			this.model.setAbove();
		}
		else {
			this.model.setBelow();
		}
	},
	updateImage: function() {
		if(this.model.get('isAbove')) {
			this.$wrap.stop()
				.css('opacity', 0)
				.animate({opacity: 1}, 1000);
		}
		else {
			this.$wrap
				.stop()
				.css('opacity', 1)
				.animate({opacity: 0}, 1000);
		}
	},
});

