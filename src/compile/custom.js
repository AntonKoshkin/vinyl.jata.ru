'use strict';

import {Nav, Burger}	from '../components/header/header';
import {map}			from '../components/map/map';
import {cat}			from '../components/gallery/gallery';
import {carousel}		from '../components/gallery/carousel';

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
		const nav = Nav();
		const burger = Burger(nav);

		nav.init();
		burger.init();
		cat.init();
		carousel.init();
		map.init();
	},
};

vynil.ready();
