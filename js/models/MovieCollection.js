define(function(require) {
	var Backbone = require('adapters/backbone-adapter');
	var MovieModel = require('models/MovieModel');

	var MovieCollection = Backbone.Collection.extend({
		model : MovieModel,

		credentials : {
			username : 'robsonmrsp',
			password : '123456'
		},
		url : 'http://209.239.124.224:8080/movieapp/rs/crud/movies/all',
	});

	return MovieCollection;
});
