const production = 'environment' === 'production';

exports.vars = {
	server: production ? 'https://vinyl.jata.ru' : 'http://vinyl.jata.ru',

	api: {
		callback: '/api/v1/accounts/becomedriver',
	},
};
