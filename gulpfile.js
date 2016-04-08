var gulp = require('gulp');
var streamqueue = require('streamqueue');

var browserSync = require('browser-sync');

var babel = require('gulp-babel');

var plugins = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

var dest = './wwwroot/';
var dests = {
	js: `${dest}js`,
	css: `${dest}css`,
	fonts: `${dest}fonts`
};

gulp.task('jsApp', () => {
	streamqueue({objectMode: true},
		gulp.src('frontend/commons/*.js'),
		gulp.src('frontend/components/module-init.js'),
		gulp.src('frontend/components/!(module-init).js'),
		gulp.src('frontend/controller/module-init.js'),
		gulp.src('frontend/controller/!(module-init).js'),
		gulp.src('frontend/services/module-init.js'),
		gulp.src('frontend/services/!(module-init).js'),
		gulp.src('frontend/filter/module-init.js'),
		gulp.src('frontend/filter/!(module-init).js'),
		gulp.src('frontend/*.js'))
		.pipe(babel())
		.pipe(plugins.concat('app.js'))
		.pipe(gulp.dest(dests.js));

});

gulp.task('jsLibs', () => {
	gulp.src(plugins.mainBowerFiles())
		.pipe(plugins.filter('**/*.js'))
		.pipe(plugins.order([
			'lodash.js',
			'jquery.js',
			'angular.js',
			'*']))
		.pipe(plugins.concat('vendor.js'))
		.pipe(gulp.dest(dests.js));
});

gulp.task('copyApp', () => {
	gulp.src(['frontend/**/*.html', 'frontend/**/*.ico', '!frontend/lib/**/*.html'])
		.pipe(gulp.dest(dest));
});

gulp.task('fontLibs', () => {
	gulp.src(plugins.mainBowerFiles())
		.pipe(plugins.filter(['**/*.ttf', '**/*.woff*', '**/*.svg', '**/*.eot']))
		.pipe(gulp.dest(dests.fonts));
});


gulp.task('cssLibs', () => {
	var files = gulp.src(plugins.mainBowerFiles());
	var cssFiles = files.pipe(plugins.filter('**/*.css'));
	var lessFiles = files.pipe(plugins.filter('**/*.less')).pipe(plugins.less());
	return streamqueue({objectMode: true}, cssFiles, lessFiles)
		.pipe(plugins.concat('vendor.css'))
		.pipe(plugins.minifyCss())
		.pipe(gulp.dest(dests.css));
});

gulp.task('cssApp', () => {
	var files = gulp.src('frontend/css/base.less');
	return files.pipe(plugins.less())
		.pipe(plugins.concat('app.css'))
		.pipe(plugins.minifyCss())
		.pipe(gulp.dest(dests.css));
});


gulp.task('watch', () => {
	gulp.watch('frontend/**/*.*', ['build']);
});

gulp.task('build', ['jsLibs', 'jsApp', 'cssLibs', 'cssApp', 'copyApp', 'fontLibs'], () => {
	browserSync.reload();
});

gulp.task('default', ['build', 'watch'], () => {
	browserSync.init({
		server: {baseDir: dest}
	});
});