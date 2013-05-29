/**
 * Team Profiles Animation 
 * Copyright (c) 2013 Brandon Thomas <bt@brand.io>
 * See more at http://brand.io
 * TODO: Rename staff.js team.js
 */
var install_team = function() 
{
	var animate_random = function() {
		if(window.team.where({hover: true}).length) {
			return;
		}
		window.team.animateRandom();
	};

	window.team = new Persons();

	$('#staffPortraits .person').each(function() {
		var person = new Person({
				name: $(this).find('.name').html(),
				role: $(this).find('.role').html(),
				about: $(this).find('.about').html(),
				imgStatic: $(this).find('.static').attr('src'),
				imgAnimated: $(this).find('.animated').attr('src'),
			}),
			fullView = new PersonFullView({model: person}),
			iconView = new PersonIconView({
				model: person,
				el: $(this),
			});

		window.team.add(person);
	})
	.promise()
	.done(function() {
		setInterval(animate_random, 2000);
		animate_random();
	});
}

var PersonIconView = Backbone.View.extend({
	$el: null,
	model: null,
	events: {
		click: 'click',
		mouseenter: 'mouseEnter',
		mouseleave: 'mouseLeave',
	},
	initialize: function() {
		var that = this;
		this.model.on('change', function() { 
			that.syncAnimation(); 
		});
		this.syncAnimation();
	},
	mouseEnter: function() {
		window.team.animateNone();
		window.team.hoverNone();
		this.model.set('animating', true);
		this.model.set('hover', true);
	},
	mouseLeave: function() {
		window.team.animateNone();
		window.team.hoverNone();
		this.model.set('animating', false);
		this.model.set('hover', false);
	},
	click: function() {
		// TODO CLICK VIEW
	},
	syncAnimation: function() {
		if(this.model.get('animating')) {
			this.$el.find('.animated').show();
			this.$el.find('.name').show();
			this.$el.find('.static').css({display: 'none'});
			this.$el.find('.role').css({display: 'none'});
			this.$el.removeClass('inactive');
			this.$el.addClass('active');
		}
		else {
			this.$el.find('.static').show();
			this.$el.find('.role').show();
			this.$el.find('.animated').css({display: 'none'});
			this.$el.find('.name').css({display: 'none'});
			this.$el.removeClass('active');
			this.$el.addClass('inactive');
		}
	}
});

// TODO: Person view
var PersonFullView = Backbone.View.extend({
	$el: null,
	model: null,
	initialize: function() {
	},
});

var Person = Backbone.Model.extend({
	defaults: {
		name: 'Unnamed Person',
		role: 'Employee',
		about: '<p>Does some stuff for the company thing.</p>',
		imgStatic: '',
		imgAnimated: '',
		imgCur: 'static',
		selected: false,
		hover: false,
		animating: false,
	},

	initialize: function() {
	},

	// Select this person and propagate the deselection 
	// of all others.
	select: function() {
		this.team.deselectAll();
		this.set('selected', true);
		// TODO: Model triggers should enforce data state integrity
		// 		 Doing this will decouple view state and model 
		//		 state...
		//this.trigger('selected:change');
	},
});

var Persons = Backbone.Collection.extend({
	model: Person,
	initialize: function() {
	},
	animateNone: function() {
		for(var i = 0; i < this.models.length; i++) {
			this.models[i].set('animating', false);
		}
	},
	animateRandom: function() {
		var idx = Math.floor(Math.random()*this.models.length);
		this.animateNone();
		this.models[idx].set('animating', true);
	},
	hoverNone: function() {
		for(var i = 0; i < this.models.length; i++) {
			this.models[i].set('hover', false);
		}
	},
	// TODO: Unused 
	// TODO: Use underscore
	deselectAll: function() {
		for(var i = 0; i < this.models.length; i++) {
			this.models[i].set('selected', false);
		}
	},
});

