define(function(require) {
	var Backbone = require('backbone');
	var $ = require('adapters/jquery-adapter');
	var _ = require('adapters/underscore-adapter');
	var util = require('utilities/utils');

	defaultSync = Backbone.sync

	Backbone.sync = function(method, model, options) {
		var _success = options.success
		var _error = options.error

		// Ver tambem Router.js
		util.NProgress.start(true);
		options.success = function(model, data, options) {
			_success(model, data, options);
		}
		options.error = function(xhr, data, options) {
			_error(xhr, data, options);
			util.handleError(xhr, data, options);
			util.NProgress.done(false, true);
		}
		options.complete = function(model, data, options) {
			util.NProgress.done(false, true);
		}
		return defaultSync(method, model, options);
	}
	return Backbone;
});
