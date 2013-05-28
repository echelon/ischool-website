/**
 * Team Profiles Animation 
 * Copyright (c) 2013 Brandon Thomas <bt@brand.io>
 * See more at http://brand.io
 * TODO: Rename staff.js team.js
 */
var install_team = function() {
	window.team = new Persons();
	$('#staffPortraits .person')
	.each(function() {
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
	});
}

var PersonFullView = Backbone.View.extend({
	$el: null,
	model: null,
	initialize: function() {
	},
});

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
		window.team.hoverNone(); // XXX: Not necessary?
		this.model.set('hover', true);
	},
	mouseLeave: function() {
		window.team.hoverNone(); // XXX: Not necessary?
		this.model.set('hover', false);
	},
	click: function() {
		console.log('showFullView');
	},
	syncAnimation: function() {
		if(this.model.get('hover')) {
			this.$el.find('.animated').show();
			this.$el.find('.static').css({display: 'none'});
		}
		else {
			this.$el.find('.static').show();
			this.$el.find('.animated').css({display: 'none'});
		}
	}
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
	},

	initialize: function() {
	},

	// Select this person and propagate the deselection 
	// of all others.
	select: function() {
		this.team.deselectAll();
		this.set('selected', true);
		//this.trigger('selected:change');
	},
});

var Persons = Backbone.Collection.extend({
	model: Person,
	initialize: function() {
		//this.trigger('foo:change');
	},

	/*select: function(n) {
		if(typeof(n) != 'number') {
			return;
		}
		if(n < 0 || n >= this.models.length) {
			return;
		}
		for(var i = 0; i < this.models.length; i++) {
			this.models[i].set('selected', false);
		}
	},*/

	hoverNone: function() {
		for(var i = 0; i < this.models.length; i++) {
			this.models[i].set('hover', false);
		}
	},

	// TODO: Use underscore
	deselectAll: function() {
		for(var i = 0; i < this.models.length; i++) {
			this.models[i].set('selected', false);
		}
	},
});


