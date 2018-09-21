define(function(require) {
	var $ = require('adapters/jquery-adapter');
	var _ = require('adapters/underscore-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var AppScripts = require('AppScripts');

	var util = require('utilities/utils');

	var PageMovie = require('views/movie/PageMovie');
	var FormMovie = require('views/movie/FormMovie');
	var PrintMovie = require('views/movie/PrintMovie');
	var MovieModel = require('models/MovieModel');

	util.NProgress.setBlockerPanel('block_panel');

	var AppRouter = Backbone.Router.extend({
		routes : {
			'' : 'index',
			'app/movies' : 'movies',
			'app/newMovie' : 'newMovie',
			'app/editMovie/:id' : 'editMovie',
			'app/visualizeMovie/:id' : 'visualizeMovie',
		},

		initialize : function() {

			this.on('route', function() {
				util.NProgress.start(true);
			});
		},

		index : function(path) {
			setTimeout(function() {
				util.NProgress.done(false, true);
			}, 500);
		},

		movies : function() {
			this.pageMovie = new PageMovie();
			$(".main-content").html(this.pageMovie.render().$el);
			setTimeout(function() {
				util.NProgress.done(false, true);
			}, 100);
		},

		newMovie : function() {
			var formMovie = new FormMovie({
				model : new MovieModel(),
			});
			$(".main-content").html(formMovie.render().$el);

			setTimeout(function() {
				util.NProgress.done(false, true);
			}, 300);

		},

		editMovie : function(idMovie) {
			var that = this;
			var model = new MovieModel({
				id : idMovie,
			})
			model.fetch({
				success : function(model) {
					var formMovie = new FormMovie({
						model : model,
					});
					$(".main-content").html(formMovie.render().$el);

					setTimeout(function() {
						util.NProgress.done(false, true);
					}, 300);
				},
				error : function(x, y, z) {
					console.error(x, y, z);
				}
			})
		},
		visualizeMovie : function(idMovie) {
			var that = this;
			var model = new MovieModel({
				id : idMovie,
			})
			model.fetch({
				success : function(model) {
					var formMovie = new PrintMovie({
						model : model,
					});
					$(".main-content").html(formMovie.render().$el);
					setTimeout(function() {
						util.NProgress.done(false, true);
					}, 300);
				},
				error : function(x, y, z) {
					console.error(x, y, z);
				}
			})
		},

		start : function() {
			Backbone.history.start();
		}
	});
	return AppRouter;
});
