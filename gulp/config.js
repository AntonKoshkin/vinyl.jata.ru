'use strict';

// const buildRoot = '../../OpenServer/domains/admin.jata.ru';
const buildRoot	= 'build';
const buildStatic	= 'build/static';

module.exports = {
	eslintrc: '.eslintrc.js',

	pathTo: {
		src: {
			allJs: [
				'src/blocks/**/*.js',
				'src/compile/custom.js'
			],
			assets: [
				'node_modules/jquery/dist/jquery.min.js',
				'src/blocks/loader/loader.js',
				'src/assets/**/*.*'
			],

			img: [
				'src/blocks/**/*.{jpg,png,svg}',
				'src/components/**/*.{jpg,png,svg}',
				'!src/blocks/**/svg-*.svg'
			],

			// js				: [
			// 	'src/compile/jsVendor.js',
			// 	'src/compile/jsCustom.js'
			// ],

			jade     : 'src/index.jade',
			js       : 'src/compile/custom.js',
			pngSprite: 'src/blocks/**/png-*.png',
			stylus   : 'src/compile/style.styl',
			svgSprite: 'src/blocks/**/svg-*.svg',
			video    : 'src/blocks/**/*.mp4',
		},
		build: {
			assets: {
				else: buildStatic,
				js  : buildStatic + '/js/',
			},

			img      : buildStatic + '/img/',
			jade     : buildRoot,
			js       : buildStatic + '/js/',
			pngSprite: buildStatic + '/img/',
			stylus   : buildStatic + '/css/',
			svgSprite: buildStatic + '/img/',
			video    : buildStatic + '/video/',
		},

		watch: {
			assets: [
				'node_modules/jquery/dist/jquery.min.js',
				'src/blocks/loader/loader.js',
				'src/assets/**/*.*'
			],
			all: 'src/**/*.*',

			img: [
				'src/blocks/**/*.(jpg|png|svg)',
				'!src/blocks/**/svg-*.svg'
			],

			jade     : 'src/**/*.jade',
			js       : 'src/**/*.js',
			pngSprite: 'src/blocks/**/png-*.png',
			stylus   : 'src/**/*.styl',
			svgSprite: 'src/blocks/**/svg-*.svg',
			video    : 'src/blocks/**/*.mp4',
		},

		clean: buildRoot + '/*',
	},
};
