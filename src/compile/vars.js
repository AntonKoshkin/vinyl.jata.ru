const production = 'environment' === 'production';

exports.vars = {
	server: production ? 'https://vinyl.jata.ru' : 'http://vinyl.jata.ru',

	api: {
		feedback: '/api/v1/feedback/',
		gallery : '/api/v1/gallery/',
	},
};
