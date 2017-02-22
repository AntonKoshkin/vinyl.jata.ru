/* global $ */

import {vars} from '../../compile/vars';

exports.modals = carousel => {
	return {
		init() {
			// callback
			// open
			$('body').on('click', '#callback-btn', function(event) {
				event.preventDefault();

				$('#callback-btn').removeClass('tenon--show');
				$('#callback-modal').addClass('callback--show');
			});

			// close
			// click not on modal
			$(document).mouseup(event => {
				if (!$('#callback-modal').is(event.target) &&
					!$('#callback-modal').has(event.target).length
				) {
					this.closeForm('callback');
				}
			});

			// click on close btn
			$('body').on('click', '#background, #callback-close', () => {
				this.closeForm('callback');
			});

			// discount
			// open
			$('body').on('click', '.section__btn', () => {
				// $('body').addClass('no-scroll');
				$('#background').fadeIn(300);
				$('#discount-modal').fadeIn(300);
			});

			// close
			$('body').on('click', '#background, #discount-close', () => {
				this.closeForm('discount');
			});

			// click for sending data
			$('body').on('click', '#callback-send, #discount-send', event => {
				event.preventDefault();
				this.harvestData(event.target.id.split('-')[0]);
			});

			$('body').on('click', '#photo-btn--prev, #photo-btn--next', event => {
				let way = event.currentTarget.id.split('--')[1];
				carousel.changeOpenedImage(way);
			});

			$('body').on('click', '#photo-btn--close', () => $('#photo-modal, #background').fadeOut(100));
		},

		closeForm(formName) {
			switch (formName) {
				case 'callback':
					$('#callback-btn').addClass('tenon--show');
					$('#callback-modal').removeClass('callback--show');
					break;
				case 'discount':
					$('#background').fadeOut(100);
					$('#discount-modal').fadeOut(100);
					// $('body').removeClass('no-scroll');
					break;
				// skip default
			}
		},

		harvestData(formName) {
			let name = $(`#${formName}-name`).val();
			let phone = $(`#${formName}-tel`).val();
			let type_form = formName; // eslint-disable-line

			if (name && phone) {
				$.ajax({
					url : vars.server + vars.api.feedback,
					type: 'POST',
					data: {name, phone, type_form},
				})
				.done(() => {
					$(`#${formName}-name`).val('');
					$(`#${formName}-tel`).val('');
					this.closeForm(formName);
				})
				.fail(error => console.log('error', error));
			}
		},
	};
};
