define(function(require) {
	var $ = require('adapters/jquery-adapter');

	var initialize = function() {

		setTimeout(function() {
			var blockerPanel = $('#loadInitialPanel');
			blockerPanel.on('transitionend', function() {
			});
			blockerPanel.remove()
			blockerPanel.addClass("fadedOut");
		}, 200);

		$(window).scroll(function() {
			if ($(this).scrollTop()) {
				$('#toTop').fadeIn(1000);
			} else {
				$('#toTop').fadeOut(1000);
			}
		});
		$("#toTop").click(function() {

			$("html, body").animate({
				scrollTop : 0
			}, 500);
		});

	};

	return {
		initialize : initialize,
	};
});
