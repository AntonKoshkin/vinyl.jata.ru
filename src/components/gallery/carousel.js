/* global $ */

const carousel = {
	stage  : null,
	images : null,
	items  : null,
	first  : 0,
	seconds: [],
	thirds : [],

	touch: {
		start: null,
		end  : null,
	},


	init() {
		this.stage = document.getElementById('stage');

		this.getImages();
		this.makeItems();
		this.items = $('.carousel__item');
		this.findSecondsAndThirds();
		this.addClassesToItems();

		$('body').on('click', '.carousel__btn--next', () => {
			this.change('next');
		});
		$('body').on('click', '.carousel__btn--prev', () => {
			this.change('prev');
		});

		this.stage.addEventListener('touchstart', this.onTouchStart, false);
	},

	onTouchStart(event) {
		carousel.touch.start = event.changedTouches[0].clientX;
		carousel.stage.addEventListener('touchmove', carousel.onTouchMove, false);
	},

	onTouchMove(event) {
		carousel.touch.end = event.changedTouches[0].clientX;

		if (carousel.touch.start < carousel.touch.end) {
			carousel.change('prev');
		} else {
			carousel.change('next');
		}

		carousel.stage.removeEventListener('touchmove', carousel.onTouchMove, false);
	},

	onTouchEnd(event) {
		console.log(event.changedTouches[0]);
	},

	getImages() {
		let images = [];
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach(item => {
			images.push({
				thumb: 'http://placehold.it/300x300&text=' + item,
				large: 'http://placehold.it/800x800&text=' + item,
			});
		});
		this.images = images;
	},

	makeItems() {
		$('.carousel__stage').empty();
		this.images.forEach(item => {
			$('.carousel__stage').append(`
				<div class='carousel__item carousel__item--back'>
					<div class='carousel__bg'>
						<div class='carousel__inner'></div>
					</div>
					<div class='carousel__img'>
						<div class='carousel__inner' style='background-image: url(${item.thumb})'></div>
					</div>
				</div>
			`);
		});
	},

	findSecondsAndThirds() {
		const lastItemIndex = this.items.length - 1;

		switch (this.first) {
			case 1:
				this.seconds = [
					0,
					2
				];
				this.thirds = [
					lastItemIndex,
					3
				];
				break;
			case 0:
				this.seconds = [
					lastItemIndex,
					1
				];
				this.thirds = [
					lastItemIndex - 1,
					2
				];
				break;
			case lastItemIndex:
				this.seconds = [
					lastItemIndex - 1,
					0
				];
				this.thirds = [
					lastItemIndex - 2,
					1
				];
				break;
			case lastItemIndex - 1:
				this.seconds = [
					lastItemIndex - 2,
					lastItemIndex
				];
				this.thirds = [
					lastItemIndex - 3,
					0
				];
				break;

			default:
				this.seconds = [
					this.first - 1,
					this.first + 1
				];
				this.thirds = [
					this.first - 2,
					this.first + 2
				];
				break;
		}
	},

	addClassesToItems() {
		this.items.each((index, elem) => {
			switch (index) {
				case this.first:
					$(elem)
						.removeClass('carousel__item--back')
						.removeClass('carousel__item--second')
						.removeClass('carousel__item--third')
						.removeClass('carousel__item--left')
						.removeClass('carousel__item--right')
						.addClass('carousel__item--active');
					break;
				case this.seconds[0]:
					$(elem)
						.removeClass('carousel__item--back')
						.removeClass('carousel__item--third')
						.removeClass('carousel__item--right')
						.removeClass('carousel__item--active')
						.addClass('carousel__item--left')
						.addClass('carousel__item--second');
					break;
				case this.seconds[1]:
					$(elem)
						.removeClass('carousel__item--back')
						.removeClass('carousel__item--third')
						.removeClass('carousel__item--left')
						.removeClass('carousel__item--active')
						.addClass('carousel__item--right')
						.addClass('carousel__item--second');
					break;
				case this.thirds[0]:
					$(elem)
						.removeClass('carousel__item--back')
						.removeClass('carousel__item--second')
						.removeClass('carousel__item--right')
						.removeClass('carousel__item--active')
						.addClass('carousel__item--left')
						.addClass('carousel__item--third');
					break;
				case this.thirds[1]:
					$(elem)
						.removeClass('carousel__item--back')
						.removeClass('carousel__item--second')
						.removeClass('carousel__item--left')
						.removeClass('carousel__item--active')
						.addClass('carousel__item--right')
						.addClass('carousel__item--third');
					break;
				default:
					$(elem)
						.removeClass('carousel__item--second')
						.removeClass('carousel__item--third')
						.removeClass('carousel__item--left')
						.removeClass('carousel__item--right')
						.removeClass('carousel__item--active')
						.addClass('carousel__item--back');
					break;
			}
		});
	},

	change(way) {
		switch (way) {
			case 'next':
				if (this.first === this.items.length - 1) {
					this.first = 0;
				} else {
					this.first++;
				}
				break;
			case 'prev':
				if (this.first === 0) {
					this.first = this.items.length - 1;
				} else {
					this.first--;
				}
				break;
			// skip default
		}
		this.findSecondsAndThirds();
		this.addClassesToItems();
	},
};

exports.carousel = carousel;
