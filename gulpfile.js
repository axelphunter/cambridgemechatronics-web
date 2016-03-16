var gulp = require('gulp'),
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	gulpIf = require('gulp-if'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	del = require('del'),
	runSequence = require('run-sequence'),
	sass = require('gulp-sass');

var config = {
	appDir: 'app',
	sassPath: '/scss',
	bowerDir: 'app/bower_components',
	distDir: 'dist'
};

gulp.task('process-views', function(){

	var assets = useref.assets({
		searchPath: './app/',
		base: './dist/'
	});

	return gulp.src('app/**/*.hbs')
		.pipe(assets)
		.pipe(gulpIf('*.css', cleanCSS()))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulp.dest('dist'));
});

gulp.task('fonts', function() {
	return gulp.src(config.appDir + '/fonts/**/*')
		.pipe(gulp.dest(config.distDir + '/fonts'));
});

gulp.task('sass', function(){
	return gulp.src(config.appDir + '/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest(config.appDir + '/css'));
});

gulp.task('watch', ['sass'], function(){
	return gulp.watch(config.appDir + '/scss/*.scss', ['sass']);
});

gulp.task('images', function() {
	return gulp.src(config.appDir + '/img/*.+(png|jpg|jpeg|gif|svg)')
		.pipe(imagemin({
			interlaced: true
		}))
		.pipe(gulp.dest(config.distDir + '/img'))
});

gulp.task('clean:dist', function(callback){
	return del([config.distDir + '/**/*', '!' + config.distDir + '/img', '!' + config.distDir + '/img/**/*'], callback);
});

gulp.task('clean', function() {
	return del(config.distDir);
});

gulp.task('bundle', function (callback) {
	runSequence(['sass', 'images', 'fonts'], 'process-views',
		callback
	);
});

gulp.task('build', function (callback) {
	return runSequence('clean', ['bundle'],
		callback
	);
});

