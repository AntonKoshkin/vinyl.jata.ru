/* global $ */

exports.upBtn = {
	init() {
		this.setVisibility();

		$(window).scroll(() => {
			this.setVisibility();
		});

		$('body').on('click', '.up-btn', () => {
			$('html, body')
				.stop()
				.animate(
					{scrollTop: 0},
					$(window).scrollTop() / 4);
		});
	},
	setVisibility() {
		if ($(window).scrollTop() >= 800) {
			$('.up-btn').addClass('up-btn--show');
		} else {
			$('.up-btn').removeClass('up-btn--show');
		}
	},
};
