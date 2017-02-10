/* global $ */

exports.anime = {
	fadeInItems: null,

	init() {
		this.fadeInItems = $('.feature, .section__face, .price__column');
		this.fadeInItems.css('opacity', 0);

		$(window).scroll(() => {
			this.fadeInItems.each(function(index, el) {
				if ($(window).scrollTop() + ($(window).height() * 0.9) > $(el).offset().top) {
					$(el).animate({opacity: 1}, 700);
				}
			});
		});

		this.fadeInItems.each(function(index, el) {
			if ($(window).scrollTop() + ($(window).height() * 0.9) > $(el).offset().top) {
				$(el).animate({opacity: 1}, 700);
			}
		});
	},
};
