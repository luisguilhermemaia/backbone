define(function (require) {
	var Backbone = require('adapters/backbone-adapter');

	var MovieModel = Backbone.Model.extend({
		url: 'http://209.239.124.224:8080/movieapp/rs/crud/uploads/file',

		credentials: {
			username: 'robsonmrsp',
			password: '123456'
		},

		fixUrl: function (fileUrl) {
			return "http://209.239.124.224:8080/movieapp/" + fileUrl;
		}
	});

	return MovieModel;
});
