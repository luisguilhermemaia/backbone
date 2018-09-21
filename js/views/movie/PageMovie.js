define(function(require) {
	var util = require('utilities/utils');

	var PageMovieTemplate = require('text!views/movie/tpl/PageMovieTemplate.html');

	var CollectionViewMovie = require('views/movie/CollectionViewMovie');

	var MovieCollection = require('models/MovieCollection');

	var PageMovie = Backbone.View.extend({
		template : _.template(PageMovieTemplate),

		events : {
			'click 	.reset-button' : 'resetMovie',
			'keypress' : 'treatKeypress',
			'click 	.search-button' : 'searchMovie',
		},

		render : function() {
			var that = this;

			var templateHtml = this.template();

			this.$el.html(templateHtml);

			this.afterRender();

			return this;
		},

		initialize : function() {
			var that = this;
			this.movieCollection = new MovieCollection();
		},

		searchMovie : function() {
			var that = this;
			this.movieCollection.fetch({
				success : function(_coll, _resp, _opt) {

				},
				error : function(_coll, _resp, _opt) {

				},

				data : {
					title : this.$("#inputTitle").escape(),
				}
			})
		},

		resetMovie : function() {
			this.$("#inputTitle").val("");
			this.movieCollection.reset();
		},

		afterRender : function() {

			$.validate({
				modules : 'location, date, security, brazil',
				validateOnEvent : true,
				inputParentClassOnSuccess : '',
				addValidClassOnAll : true,
			});

			this.gridMovies = new CollectionViewMovie({
				onEdit : this.onEdit,
				onVisualize : this.onVisualize,
				collection : this.movieCollection,
				context : this
			});

			this.$el.find('.grid-movies').html(this.gridMovies.render().$el);
			this.searchMovie();

		},

		onEdit : function(model) {
			util.goPage("app/editMovie/" + model.get('id'));
		},

		onVisualize : function(model) {
			util.goPage("app/visualizeMovie/" + model.get('id'));
		},

		treatKeypress : function(e) {
			if (util.enterPressed(e)) {
				e.preventDefault();
				this.searchMovie();
			}
		},
	});

	return PageMovie;
});
