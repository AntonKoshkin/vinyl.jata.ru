'use strict';

const config	= require('./config');
const gulp		= require('gulp');
const gulpIf	= require('gulp-if');

module.exports = function() {
	return function() {
		var isJs = function(file) {
			if (file.path.split('.').reverse()[0] === 'js') {
				return true;
			}

			return false;
		};

		return gulp
			.src(config.pathTo.src.assets)
			.pipe(gulpIf(
				isJs,
				gulp.dest(config.pathTo.build.assets.js),
				gulp.dest(config.pathTo.build.assets.else)
			));
	};
};
