/* global $ */

exports.Nav = () => {
	return {
		nav: null,

		init() {
			this.nav = $('#nav');
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
