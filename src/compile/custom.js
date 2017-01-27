'use strict';

import {Nav, Burger} from '../components/header/header';

const vynil = {
	/**
	 * запускаемая при загрузке функция
	 */
	ready() {
		if (document.readyState !== 'loading') {
			this.init();
		} else {
			document.addEventListener('DOMContentLoaded', this.init);
		}
	},
	/**
	 * инит функция
	 */
	init() {
		console.log('ya rodilsya!');

		const nav = Nav();
		const burger = Burger(nav);

		nav.init();
		burger.init();
	},
};

vynil.ready();
