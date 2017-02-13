/* global $ */

const burger = {
	init() {
		$('body').on('click', '#burger', () => {
			this.toggle();
		});

		$('a[href^="#"]').on('click', function(event) {
			event.preventDefault();
			$('html,body')
				.stop()
				.animate(
					{scrollTop: $($(this).attr('href')).offset().top},
					1000
			);
			$('#nav').removeClass('nav--hidden');
		});
	},

	toggle() {
		$('#nav').toggleClass('nav--hidden');
	},
};

exports.burger = burger;
