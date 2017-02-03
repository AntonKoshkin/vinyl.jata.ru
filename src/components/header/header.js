/* global $ */

exports.Nav = () => {
	return {
		nav: null,

		init() {
			this.nav = $('#nav');

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
			this.nav.toggleClass('nav--hidden');
		},
	};
};

exports.Burger = nav => {
	return {
		init() {
			$('body').on('click', '#burger', event => {
				event.preventDefault();

				nav.toggle();
			});
		},
	};
};
