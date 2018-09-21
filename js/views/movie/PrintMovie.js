define(function(require) {
	var _ = require('adapters/underscore-adapter');
	var $ = require('adapters/jquery-adapter');
	var Backbone = require('adapters/backbone-adapter');
	var util = require('utilities/utils');

	var TemplatePrintMovies = require('text!views/movie/tpl/PrintMovieTemplate.html');
	var MovieModel = require('models/MovieModel');

	var PrintMovies = Backbone.View.extend({
		template : _.template(TemplatePrintMovies),

		events : {
			'click 	.save' : 'save',
		},

		ui : {
			inputId : '#inputId',
			inputPlot : '#inputPlot',
			inputTitle : '#inputTitle',
			inputYear : '#inputYear',
			inputType : '#inputType',
			inputGenre : '#inputGenre',
			inputPoster : '#inputPoster',
			inputBudget : '#inputBudget',
			inputReleaseDate : '#inputReleaseDate',
			form : '#formMovie',

			saveButton : '.button-saving',
		},

		/** First function called, like a constructor. */
		initialize : function(options) {
			var that = this;
		},

		render : function() {
			var that = this;

			var templateHtml = this.template(this.model.toJSON());

			this.$el.html(templateHtml);

			this._postRender();

			return this;
		},

		onShowView : function() {
			var that = this;

			this.uploadViewPoster = new JSetup.InputUpload({
				bindElement : that.ui.inputPoster,
				onSuccess : function(resp, options) {
					console.info('Upload da poster concluido...[ ' + resp + ' ]')
				},
				onError : function(resp, options) {
					console.error('Problemas ao uppar foto1')
				}
			});

			this.uploadPosterRegion.show(this.uploadViewPoster);
		},

		save : function() {
			var that = this;
			var movie = that.getModel();

			if (this.isValid()) {
				util.loadButton(this.ui.saveButton);
				movie.save({}, {
					success : function(_model, _resp, _options) {
						util.showSuccessMessage('Movie salvo com sucesso!');
						that.ui.inputId.val(_model.get('id'));
						that.clearForm();
						util.resetButton(that.ui.saveButton);
					},
					error : function(_model, _resp, _options) {
						util.resetButton(that.ui.saveButton);
						util.showErrorMessage('Problema ao salvar registro', _resp);
					}
				});
			}
		},

		getModel : function() {
			var that = this;
			var movie = that.model;
			movie.set({
				id : this.ui.inputId.escape(),
				plot : this.ui.inputPlot.escape(),
				title : this.ui.inputTitle.escape(),
				year : this.ui.inputYear.escape(true),
				type : this.ui.inputType.escape(),
				genre : this.ui.inputGenre.escape(),
				poster : this.ui.inputPoster.escape(),
				budget : this.ui.inputBudget.escape(true),
			});
			return movie;
		},

		clearForm : function() {
			//
		},

		_postRender : function() {

			// Configure Validation plugin for this form
			$.validate({
				modules : 'location, date, security, brazil',
				validateOnEvent : true,
				inputParentClassOnSuccess : '',
				addValidClassOnAll : true,
			});

			// Make a jquery ui´s to DOM access
			_.each(Object.keys(this.ui), function(ui) {
				var selector = this.ui[ui];
				this.ui[ui] = this.$(selector);
			}, this);

			// Using jquery-adapters plugins to format input
			this.ui.inputYear.integer();
			this.ui.inputBudget.decimal();
			this.ui.inputReleaseDate.date();
		},
		isValid : function() {
			return this.$el.isValid(null, {
				modules : 'location, date, security, brazil',
				validateOnEvent : true,
				inputParentClassOnSuccess : '',
				addValidClassOnAll : true,
			});
		},

	});

	return PrintMovies;
});