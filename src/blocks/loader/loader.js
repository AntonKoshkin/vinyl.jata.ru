/* global $ */

((function() {
	var promoLoaded = false;
	var redTenonLoaded = false;
	var blueTenonLoaded = false;
	var carLoaded = false;

	var tryIt = function() {
		var allLoaded = true;

		for (var i = arguments.length - 1; i >= 0; i--) { // eslint-disable-line
			if (!arguments[i]) {
				allLoaded = false;
			}
		}
		if (allLoaded) {
			$('#loader').fadeOut(500);
			$('body')
				.removeClass('no-vis')
				.removeClass('no-scroll');
		}
	};
	$(document).ready(function() {
		$('<img />')
			.attr('src', $('#promo-bg').css('background-image').split('"')[1])
			.load(function() {
				promoLoaded = true;
				tryIt(promoLoaded, redTenonLoaded, blueTenonLoaded, carLoaded);
				$(this).remove();
			});

		$('<img />')
			.attr('src', $('.tenon--callback #tenon-bg').css('background-image').split('"')[1])
			.load(function() {
				redTenonLoaded = true;
				tryIt(promoLoaded, redTenonLoaded, blueTenonLoaded, carLoaded);
				$(this).remove();
			});

		$('<img />')
			.attr('src', $('#car-bg').css('background-image').split('"')[1])
			.load(function() {
				carLoaded = true;
				tryIt(promoLoaded, redTenonLoaded, blueTenonLoaded, carLoaded);
				$(this).remove();
			});

		$('<img />')
			.attr('src', $('.tenon--address #tenon-bg').css('background-image').split('"')[1])
			.load(function() {
				blueTenonLoaded = true;
				tryIt(promoLoaded, redTenonLoaded, blueTenonLoaded, carLoaded);
				$(this).remove();
			});
	});
})());
