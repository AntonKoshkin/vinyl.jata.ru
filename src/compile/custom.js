'use strict';

import {Nav, Burger}	from '../components/header/header';
import {map}			from '../components/map/map';
import {cat}			from '../components/gallery/gallery';
import {carousel}		from '../components/gallery/carousel';
import {upBtn}			from '../components/index/up-btn';

const vynil = {
	ready() {
		if (document.readyState !== 'loading') {
			this.init();
		} else {
			document.addEventListener('DOMContentLoaded', this.init);
		}
	},
	init() {
		const nav = Nav();
		const burger = Burger(nav);

		upBtn.init();
		nav.init();
		burger.init();
		cat.init();
		carousel.init();
		map.init();
	},
};

vynil.ready();
