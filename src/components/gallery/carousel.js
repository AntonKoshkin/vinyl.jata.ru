/* global $ */

import {vars} from '../../compile/vars';

const carousel = {
	data   : null,
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

		this.getImages(data => {
			this.makeCategories(data);
			this.changeCategory(data[0].id);
		});

		this.setEventHandlers();
	},

	getImages(cb) {
		$.ajax({
			url : vars.server + vars.api.gallery,
			type: 'GET',
		})
		.done(result => {
			this.data = result;
			cb(result, this);
		})
		.fail(error => {
			console.log('gallery', error);
		});
	},

	makeCategories(data) {
		data.forEach(item => {
			if (item.photos.length >= 5) {
				$('.cat').append(`
					<li class='cat__item' data-cat-id='${item.id}'>
						<span class='cat__text' title='${item.name}'>${item.name}</span>
					</li>
				`);
			}
		});
	},

	makeItems(category) {
		$('.carousel__stage').empty();
		category.photos.forEach(item => {
			$('.carousel__stage').append(`
				<div class='carousel__item carousel__item--back' data-img-id='${item.id}'>
					<div class='carousel__bg'>
						<div class='carousel__inner'></div>
					</div>
					<div class='carousel__img'>
						<div
							class='carousel__inner'
							data-bg='url("${vars.server + item.small_pic}"'></div>
					</div>
				</div>
			`);
		});
	},
	// style='background-image: url(${vars.server + item.small_pic})'

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

	makeBg(item) {
		const newElem = $(item).find('.carousel__img .carousel__inner');
		newElem
			.attr('style', `background-image: ${newElem.attr('data-bg')}`);
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

					this.makeBg(elem);
					break;
				case this.seconds[0]:
					$(elem)
						.removeClass('carousel__item--back')
						.removeClass('carousel__item--third')
						.removeClass('carousel__item--right')
						.removeClass('carousel__item--active')
						.addClass('carousel__item--left')
						.addClass('carousel__item--second');

					this.makeBg(elem);
					break;
				case this.seconds[1]:
					$(elem)
						.removeClass('carousel__item--back')
						.removeClass('carousel__item--third')
						.removeClass('carousel__item--left')
						.removeClass('carousel__item--active')
						.addClass('carousel__item--right')
						.addClass('carousel__item--second');

					this.makeBg(elem);
					break;
				case this.thirds[0]:
					$(elem)
						.removeClass('carousel__item--back')
						.removeClass('carousel__item--second')
						.removeClass('carousel__item--right')
						.removeClass('carousel__item--active')
						.addClass('carousel__item--left')
						.addClass('carousel__item--third');

					this.makeBg(elem);
					break;
				case this.thirds[1]:
					$(elem)
						.removeClass('carousel__item--back')
						.removeClass('carousel__item--second')
						.removeClass('carousel__item--left')
						.removeClass('carousel__item--active')
						.addClass('carousel__item--right')
						.addClass('carousel__item--third');

					this.makeBg(elem);
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

	changeImage(way) {
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

	changeCategory(catId) {
		let activeCategory = this.data.filter(cat => cat.id === catId)[0];

		$('.carousel__stage').animate({opacity: 0}, 100);
		setTimeout(() => {
			this.setActiveCategory(catId);
			// this.makeItems(this.data[id].photos);
			this.makeItems(activeCategory);
			this.items = $('.carousel__item');
			this.changeImage();
			$('.carousel__stage').animate({opacity: 1}, 100);
		}, 100);
	},

	setActiveCategory(n) {
		$(`[data-cat-id='${n}']`)
			.addClass('cat__item--active')
			.siblings()
			.removeClass('cat__item--active');
	},

	setEventHandlers() {
		const thisObj = this;
		$('body').on('click', '.carousel__btn--next', () => {
			this.changeImage('next');
		});
		$('body').on('click', '.carousel__btn--prev', () => {
			this.changeImage('prev');
		});
		$('body').on('click', '.cat__item', function(event) {
			event.preventDefault();

			let categoryIdtoActivate = Number($(this).attr('data-cat-id'));

			thisObj.changeCategory(categoryIdtoActivate);
		});

		this.stage.addEventListener('touchstart', this.onTouchStart, false);

		$('body').on('click', '.carousel__item--active', () => {
			this.openImage();
			$('#photo-modal, #background').fadeIn(300);
		});

		$('body').on('click', '#photo-modal', () => $('#photo-modal, #background').fadeOut(100));
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

	openImage() {
		let catId = Number($('.cat__item--active').attr('data-cat-id'));
		let imgId = Number($('.carousel__item--active').attr('data-img-id'));

		let url;

		this.data.forEach(cat => {
			if (cat.id === catId) {
				cat.photos.forEach(img => {
					if (img.id === imgId) {
						url = vars.server + img.pic;
					}
				});
			}
		});

		$('#photo-img').attr('style', `background-image: url(${url})`);
	},
};

exports.carousel = carousel;
