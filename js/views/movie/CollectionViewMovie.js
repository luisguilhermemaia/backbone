define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var util = require('utilities/utils');

	var CollectionViewMovieTemplate = require('text!views/movie/tpl/CollectionViewMovieTemplate.html');
	var ItemViewMovie = require('views/movie/ItemViewMovie');

	var CollectionViewMovie = Backbone.View.extend({
		// template : _.template(CollectionViewMovieTemplate),
		// tagName : "ul",
		className : "list-group bord-no row",

		initialize : function(options) {
			this.onEdit = options.onEdit;
			this.onDelete = options.onDelete;
			this.onVisualize = options.onVisualize;
			this.context = options.context;

			this.collection.on('sync', this._sync, this);
			this.collection.on('reset', this._reset, this);
		},

		_sync : function() {
			console.log('sync: ');
			this.render();
		},

		_reset : function() {
			console.log('reset: ');
			this.render();
		},

		render : function() {
			var that = this;
			this.$el.html("")

			this.collection.each(this.addOne, this);

			return this;
		},

		addOne : function(itemModel) {
			var item = new ItemViewMovie({
				model : itemModel,
				onEdit : this.onEdit,
				onDelete : this.onDelete,
				onVisualize : this.onVisualize,
				context : this.context,
			});

			this.$el.append(item.render().$el);
		}
	});
	return CollectionViewMovie;

});