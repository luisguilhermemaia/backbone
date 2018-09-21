define(function (require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var util = require('utilities/utils');

	var TemplateFormMovies = require('text!views/movie/tpl/FormMovieTemplate.html');
	var MovieModel = require('models/MovieModel');
	var UploadModel = require('models/UploadModel');

	var FormMovies = Backbone.View.extend({
		template: _.template(TemplateFormMovies),

		events: {
			'click 	.save': 'save',
			'click #imageView': 'forceClickInputUploadFile',

			'change #inputUploadImage': 'startUpload',

		},

		forceClickInputUploadFile: function (evt) {
			this.$("#inputUploadImage").trigger('click');
		},

		startUpload: function () {
			var that = this;

			var uploadEl = this.$('#inputUploadImage').get(0);
			if (uploadEl) {
				_.each(uploadEl.files, function (fil) {
					that.uploadOneFile(fil);
				});
			} else {

			}
		},

		uploadOneFile: function (file) {
			var that = this;

			var model = new UploadModel();
			var dataFile = new FormData();
			dataFile.append('file', file);
			model.save({}, {
				success: function (_model, _resp, _options) {
					console.log(_model, _resp, _options)
					that.$("#imageView").attr('src', model.fixUrl(_resp.dataUrl))
					that.$("#inputPoster").val(model.fixUrl(_resp.dataUrl))
				},
				error: function (_model, _resp, _options) {
					if (that.onError) {
						that.onError(_resp, _options)
					}
				},
				contentType: false,// 'multipart/form-data',
				parse: false,
				processData: false,
				data: dataFile,
			});
		},

		initialize: function (options) {

		},

		render: function () {
			var that = this;

			var templateHtml = this.template(this.model.toJSON());

			this.$el.html(templateHtml);

			that.afterRender();
			return this;
		},

		save: function () {
			var that = this;
			var movie = that.getModel();

			if (this.isValid()) {
				util.loadButton(this.$("#save"));
				movie.save({}, {
					success: function (_model, _resp, _options) {
						util.showSuccessMessage('Movie Save');
						that.$("#inputId").val(_model.get('id'));

						that.clearForm();
						util.resetButton(this.$("#save"));
					},
					error: function (_model, _resp, _options) {
						util.resetButton(this.$("#save"));
						util.showErrorMessage('Error. ', _resp);
					}
				});
			}
		},

		getModel: function () {
			var that = this;
			var movie = that.model;
			movie.set({
				id: this.$("#inputId").escape(),
				plot: this.$("#inputPlot").escape(),
				title: this.$("#inputTitle").escape(),
				year: this.$("#inputYear").escape(true),
				type: this.$("#inputType").escape(),
				genre: this.$("#inputGenre").escape(),
				poster: this.$("#inputPoster").escape(),
				releaseDate: this.$("#inputReleaseDate").escape(),
				budget: this.$("#inputBudget").escape(true),
			});
			return movie;
		},

		clearForm: function () {
			//
		},

		afterRender: function () {
			$.validate({
				modules: 'location, date, security, brazil',
				validateOnEvent: true,
				inputParentClassOnSuccess: '',
				addValidClassOnAll: true,
			});

			// Using jquery-adapters plugins to format input
			this.$("#inputYear").integer();
			this.$("#inputBudget").decimal();
			this.$("#inputReleaseDate").date();
		},

		isValid: function () {
			return this.$el.isValid(null, {
				modules: 'location, date, security, brazil',
				validateOnEvent: true,
				inputParentClassOnSuccess: '',
				addValidClassOnAll: true,
			});
		},
	});

	return FormMovies;
});