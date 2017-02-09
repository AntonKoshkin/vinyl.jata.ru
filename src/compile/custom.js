'use strict';

import {anime}		from '../components/index/anime';
import {backEnd}	from './arkadiy';
import {burger}	from '../components/header';
import {carousel}	from '../components/gallery/carousel';
// import {cat}		from '../components/gallery/cat';
import {map}		from '../components/map';
import {modals}	from '../components/modals';
import {nav}		from '../components/header';
import {upBtn}		from '../components/index/up-btn';

backEnd();

const vynil = {
	ready() {
		if (document.readyState !== 'loading') {
			this.init();
		} else {
			document.addEventListener('DOMContentLoaded', this.init);
		}
	},
	init() {
		anime.init();
		upBtn.init();
		burger.init();
		nav.init();
		// cat.init();
		carousel.init();
		map.init();
		modals.init();
	},
};

vynil.ready();
