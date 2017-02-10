const production = 'environment' === 'production';

exports.vars = {
	server: production ? 'http://vinyl.jata.ru' : 'http://vinyl.jata.ru',

	api: {
		feedback: '/api/v1/feedback/',
		gallery : '/api/v1/gallery/',
	},
};
