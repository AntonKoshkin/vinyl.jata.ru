/* global $ */

import {vars} from '../../compile/vars';

exports.modals = {
	init() {
		// callback
		$('body').on('click', '#callback-btn', function(event) {
			event.preventDefault();

			$('#callback-btn').removeClass('tenon--show');
			$('#callback-modal').addClass('callback--show');
		});

		$('body').on('click', '#callback-send', event => {
			event.preventDefault();
			this.harvestData();
		});

		$(document).mouseup(event => {
			if (!$('#callback-modal').is(event.target) && !$('#callback-modal').has(event.target).length) {
				$('#callback-btn').addClass('tenon--show');
				$('#callback-modal').removeClass('callback--show');
			}
		});

		// discount
		$('body').on('click', '.section__btn', () => {
			$('#background').addClass('modal__bg--show');
			$('#discount-modal').addClass('discount--show');
		});

		$('body').on('click', '#background, #discount-close', () => {
			$('#background').removeClass('modal__bg--show');
			$('#discount-modal').removeClass('discount--show');
		});
	},

	harvestData(formName) {
		let name = $(`#${formName}-name`).val();
		let tel = $(`#${formName}-tel`).val();

		if (name && tel) {
			this.sendForm({name, tel}, vars.api.callback)
				.then(
					() => {
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
