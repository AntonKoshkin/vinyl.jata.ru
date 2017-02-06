/* global $ */

exports.cat = {
	init() {
		if ($('.cat__item').length) {
			$('.cat').removeClass('cat--hidden');
		} else {
			return;
		}
		$('body').on('click', '.cat__item', function() {
			$(this)
				.addClass('cat__item--active')
				.siblings()
				.removeClass('cat__item--active');
		});
	},
};