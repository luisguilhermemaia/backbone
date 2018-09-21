require.config({
	// urlArgs : "bust=" + new Date().getTime(),
	paths : {
		'jquery' : '../vendor/jquery/jquery-1.10.2',
		'jqueryUI' : '../vendor/jquery.ui/jquery-ui-1.10.4.custom.min',

		'jqueryScrollTo' : '../vendor/jquery.scrollTo/jquery.scrollTo',

		'jqueryFormValidator' : '../vendor/jQuery-Form-Validator-2.3.54/form-validator/jquery.form-validator',

		'nprogress' : '../vendor/nprogressbar/nprogress',
		'spin' : '../vendor/spin/spin',

		'underscore' : '../vendor/underscore/underscore-1.5.1',
		'backbone' : '../vendor/backbone/backbone-1.1.2',

		'backgridColumnManager' : '../vendor/Backgrid.ColumnManager/lib/Backgrid.ColumnManager',
		'backboneSelectAll' : '../vendor/backgrid/extensions/backgrid-select-all',

		'bootstrap' : '../vendor/bootstrap/js/bootstrap',

		'datetimepicker' : '../vendor/bootstrap.datetimepicker/bootstrap-datetimepicker',
		'datetimepicker_lang_pt_BR' : '../vendor/bootstrap.datetimepicker/bootstrap-datetimepicker.pt-BR',

		'text' : '../vendor/require/text-2.0.3',
		'async' : '../vendor/require/async-0.1.1',
		'moment' : '../vendor/moment/moment-2.7',

		'jqueryForm' : '../vendor/jquery.form/jquery.form',
		'jqueryInputMask' : '../vendor/Inputmask-3.3.3/dist/jquery.inputmask.bundle',

		'nifty' : '../vendor/theme/demo/js/nifty',
		'metisMenu' : '../vendor/metisMenu/dist/metisMenu',

		'sweetAlert' : '../vendor/sweetalert-1.1.3/dist/sweetalert-dev',
		'tagsinput' : '../vendor/bootstrap-tagsinput-0.8.0/dist/bootstrap-tagsinput',
		'nestable' : '../vendor/Nestable-master/jquery.nestable',
	},
	shim : {

		'underscore' : {
			exports : '_'
		},
		'jquery' : {
			exports : '$'
		},
		'moment' : {
			exports : 'moment'
		},

		'bootstrap' : [ 'jquery' ],
		'jqueryMaskInput' : [ 'jquery' ],
		'jqueryScrollTo' : [ 'jquery' ],
		'nprogres' : {
			deps : [ 'jquery' ],
			exports : 'Nprogress'
		},

		'jqueryUI' : [ 'jquery' ],
		'datetimepicker' : [ 'jquery' ],

		'datetimepicker_lang_pt_BR' : {
			deps : [ 'jquery', 'moment' ],
			exports : 'datetimepicker_lang_pt_BR'
		},

		'multiselect' : [ 'jquery' ],

		'jqueryForm' : [ 'jquery' ],
		'jqueryInputMask' : [ 'jquery' ],

		'jqueryFormValidator' : [ 'jquery' ],

		'sweetAlert' : [ 'jquery' ],

		'metisMenu' : [ 'jquery' ],
		'nifty' : [ 'jquery' ],
	},
	wrapShim : true,
});

require([ 'App' ], function(App) {
	App.initialize();
});
