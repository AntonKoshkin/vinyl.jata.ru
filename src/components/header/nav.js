/* global $ */

exports.nav = {
	init() {
		$("a[href^='#']").on('click', event => {
			const point = $(this).attr('href');
			$('html,body')
				.stop()
				.animate(
					{scrollTop: $(point).offset().top},
					1000
				);

			event.preventDefault();
		});
	},
};
