/* global $ */

exports.nav = {
	init() {
		$("a[href^='#']").on('click', function(event) {
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

exports.burger = {
	init() {
		$('body').on('click', '#burger', event => {
			event.preventDefault();

			this.toggle();
		});

		$('a[href^="#"]').on('click', function(event) {
			$('html,body')
				.stop()
				.animate(
					{scrollTop: $($(this).attr('href')).offset().top},
					1000
			);
			event.preventDefault();
		});
	},

	toggle() {
		$('#nav').toggleClass('nav--hidden');
	},
};
