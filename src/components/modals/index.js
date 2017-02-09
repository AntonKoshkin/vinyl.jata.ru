/* global $ */

import {vars} from '../../compile/vars';

exports.modals = {
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
			if (!$('#callback-modal').is(event.target) && !$('#callback-modal').has(event.target).length) {
				$('#callback-btn').addClass('tenon--show');
				$('#callback-modal').removeClass('callback--show');
			}
		});

		// click on close btn
		$('body').on('click', '#background, #callback-close', () => {
			$('#callback-btn').addClass('tenon--show');
			$('#callback-modal').removeClass('callback--show');
		});

		// discount
		// open
		$('body').on('click', '.section__btn', () => {
			$('#background').fadeIn(300);
			$('#discount-modal').fadeIn(300);
		});

		// close
		$('body').on('click', '#background, #discount-close, #discount-send', () => {
			$('#background').fadeOut(100);
			$('#discount-modal').fadeOut(100);
		});

		// click for sending data
		$('body').on('click', '#callback-send, #discount-send', event => {
			event.preventDefault();
			this.harvestData(event.target.id.split('-')[0]);
		});
	},

	harvestData(formName) {
		let name = $(`#${formName}-name`).val();
		let phone = $(`#${formName}-tel`).val();
		let type_form = formName; // eslint-disable-line

		if (name && phone) {
			this.sendForm({name, phone, type_form}, vars.api.feedback)
				.then(
					result => {
						console.log(formName, result)
						$(`#${formName}-name`).val('');
						$(`#${formName}-tel`).val('');

						switch (formName) {
							case 'callback':
								$('#callback-btn').addClass('tenon--show');
								$('#callback-modal').removeClass('callback--show');
								break;
							case 'discount':
								$('#discount-modal').removeClass('discount--show');
								$('#background').removeClass('modal__bg--show');
								break;
							// skip default
						}
					},
					error => console.log('error', error)
				);
		}
	},

	sendForm(data, apiUrl) {
		return new Promise((result, error) => {
			let request = new XMLHttpRequest();
			request.open('POST', vars.server + apiUrl);
			request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
			request.onload = () => {
				if (request.status === 200) {
					result(JSON.parse(request.response));
				} else {
					error(Error('server is stupid as: ' + request.statusText));
				}
			};
			request.onerror = () => {
				error(Error('server is drunk'));
			};

			request.send(JSON.stringify(data));
		});
	},
};
