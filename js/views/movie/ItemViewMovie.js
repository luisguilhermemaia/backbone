define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var util = require('utilities/utils');

	var ItemViewMovieTemplate = require('text!views/movie/tpl/ItemViewMovieTemplate.html');

	var ItemViewMovie = Backbone.View.extend({

		// tagName : 'li',
		className : "col-sm-4 col-md-3",
		template : _.template(ItemViewMovieTemplate),
		events : {
			'click  .btn-edit' : 'edit',
			'click  .btn-detele' : 'delete',
			'click  .btn-visualize' : 'visualize'
		},
		
		initialize : function(options) {

			this.onEdit = options.onEdit;
			this.onDelete = options.onDelete;
			this.onVisualize = options.onVisualize;

			this.context = options.context;
		},

		edit : function() {
			this.onEdit && this.onEdit.call(this.context, this.model);
		},
		
		detele : function() {
			this.onDelete && this.onDelete.call(this.context, this.model);
		},
		visualize : function() {
			this.onVisualize && this.onVisualize.call(this.context, this.model);
		},

		render : function() {

			var templateHtml = this.template(this.model.toJSON());

			this.$el.html(templateHtml);

			return this;
		},
	});
	return ItemViewMovie;

});