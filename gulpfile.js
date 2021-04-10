const gulp = require('gulp'),
 pug = require('gulp-pug'),
 sass = require('gulp-sass'),
 rename = require('gulp-rename'),
 sourcemaps =require('gulp-sourcemaps'),
 browserSync = require('browser-sync').create();

const paths = {
	root: './build',
	templates: {
		pages: 'src/templates/pages/*.pug',
		src: 'src/templates/**/*.pug',
		dest: 'build/assets/'
	},
	styles: {
		src: 'src/styles/*.scss',
		dest: 'build/assets/styles/'
	},
}

function templates(){
	return gulp.src(paths.templates.pages)
		.pipe(pug({pretty: true}))
		.pipe(gulp.dest(paths.root));
}

function styles(){
	return gulp.src(paths.styles.src)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(sourcemaps.write())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(browserSync.stream())
}

function watch(){
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.templates.src, templates);
}

function server(){
	browserSync.init({
		server: paths.root
	});
	browserSync.watch(paths.root + '**//**.*', browserSync.reload);
}

exports.templates = templates;
exports.styles = styles;

gulp.task('default', gulp.series(
	gulp.parallel(styles, templates),
	gulp.parallel(watch, server)
));