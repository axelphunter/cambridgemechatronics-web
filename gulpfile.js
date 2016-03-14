var gulp = require('gulp'),
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	cssnano = require('gulp-cssnano'),
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

gulp.task('useref', function(){
	return gulp.src(config.appDir + '/views/**/*.hbs')
		.pipe(useref())
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulp.dest(config.distDir));
});

gulp.task('fonts', function() {
	return gulp.src(config.appDir + '/assets/fonts/**/*')
		.pipe(gulp.dest(config.distDir + '/assets/fonts'));
});

gulp.task('sass', function(){
	return gulp.src(config.appDir + '/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest(config.appDir + '/assets/css'));
});

gulp.task('watch', ['sass'], function(){
	return gulp.watch(config.appDir + '/scss/*.scss', ['sass']);
});

gulp.task('images', function() {
	return gulp.src(config.appDir + '/assets/img/*.+(png|jpg|jpeg|gif|svg)')
		.pipe(imagemin({
			interlaced: true
		}))
		.pipe(gulp.dest(config.distDir + '/assets/img'))
});

gulp.task('clean:dist', function(callback){
	return del([config.distDir + '/**/*', '!' + config.distDir + '/img', '!' + config.distDir + '/img/**/*'], callback);
});

gulp.task('clean', function() {
	return del(config.distDir);
});

gulp.task('bundle', function (callback) {
	runSequence(['sass', 'images', 'fonts'], 'useref',
		callback
	);
});

gulp.task('build', function (callback) {
	return runSequence('clean', ['bundle'],
		callback
	);
});

