/* global ymaps */

const mapCenterAndPin = [59.91567956, 30.37416850];
const addressName = 'Атаманская ул., 6В';

exports.map = {
	map  : null,
	marks: [],

	marksParams: [
		{
			// coords: [59.92010856, 30.37295600],
			// title : 'СПб, Кременчугская ул., д.8',
			coords: mapCenterAndPin,
			title : addressName,
			name  : 'Бокс для оклейки',
			il    : 'default#image',
			iih   : '/static/img/map__pin.svg',
			iis   : [36, 48],
			iio   : [-18, -48],
		}
	],

	init() {
		this.makeMap(() => {
			this.makeMarks();
			this.addMarks();
		});
	},

	makeMap(cb) {
		ymaps.ready(() => {
			this.map = new ymaps.Map(
				'map',
				{
					// center  : [59.92010856, 30.37295600],
					center  : mapCenterAndPin,
					controls: ['zoomControl'],
					zoom    : 15,
				},
				{suppressMapOpenBlock: true}
			);
			this.map.behaviors.disable('scrollZoom');

			cb();
		});
	},

	makeMark(markParams) {
		// 59.99234885, 30.27232866
		let mark = new ymaps.Placemark(
			markParams.coords,
			{
				hintContent   : markParams.name,
				balloonContent: markParams.title,
			}, {
				iconLayout     : markParams.il,
				iconImageHref  : markParams.iih,
				iconImageSize  : markParams.iis,
				iconImageOffset: markParams.iio,
			}
		);
		this.marks.push(mark);
	},

	makeMarks() {
		this.marksParams.forEach(item => {
			this.makeMark(item);
		});
	},

	addMarks() {
		this.marks.forEach(item => {
			this.map.geoObjects.add(item);
		});
	},
};
