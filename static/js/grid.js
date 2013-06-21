
// Simple grid animation
// This code is rough...

var install_grid_anim = function() {
	var model = new GridImage({
		imgAbove: '/static/img/photos/grid/devices_450.png',
		imgBelow: '/static/img/photos/grid/mobile_toolkit_blur_450.png',
	});
	window.foo = new GridImageView({
		model: model,
		el: $('#gridImgSmall1'),
	});
}

var GridImage = Backbone.Model.extend({
	defaults: {
		imgAbove: '', // Above the midpoint
		imgBelow: '', // Below the midpoint
		isAbove: true,
	},
	initialize: function() {
		this.setAbove();
	},
	setAbove: function() {
		/*var cur = this.get('imgCur'),
			above = this.get('imgAbove');
		if(cur != above) {
			this.set('imgCur', above);
		}*/
		if(!this.get('isAbove')) {
			this.set('isAbove', true);
		}
	},
	setBelow: function() {
		/*var cur = this.get('imgCur'),
			below = this.get('imgBelow');
		if(cur != below) {
			this.set('imgCur', below);
		}*/
		if(this.get('isAbove')) {
			this.set('isAbove', false);
		}
	},
});

var GridImages = Backbone.Collection.extend({
	model: GridImage,
});

var GridImageView = Backbone.View.extend({
	initialize: function() {
		var that = this;
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
			console.log('above');
		}
		else {
			this.model.setBelow();
			console.log('below');
		}
	},
	updateImage: function() {
		console.log('update the image css');
		if(this.model.get('isAbove')) {
			//this.$el.find('.wrap2').fadeIn();
			this.$el.find('.wrap2')
				.css('opacity', 0)
				.animate({opacity: 1}, 1000);
		}
		else {
			//this.$el.find('.wrap2').fadeOut();
			this.$el.find('.wrap2')
				.css('opacity', 1)
				.animate({opacity: 0}, 1000);
			//this.$el.find('.wrap2').css({visibility: 'hidden'});
		}
	},
});

