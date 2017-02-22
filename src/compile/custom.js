/* global $ */

'use strict';

import {anime}		from '../components/index/anime';
import {backEnd}	from './arkadiy';
import {burger}	from '../components/header';
import {carousel}	from '../components/gallery/carousel';
import {map}		from '../components/map';
import {modals}	from '../components/modals';
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
		carousel.init();
		map.init();
		modals(carousel).init();

		if (navigator.userAgent.toLowerCase().includes('safari')) {
			$('#loader').fadeOut(500);
			$('body')
				.removeClass('no-vis')
				.removeClass('no-scroll');
		}
	},
};

vynil.ready();
