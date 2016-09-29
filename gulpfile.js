var gulp = require('gulp'),
  useref = require('gulp-useref'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  gulpIf = require('gulp-if'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache'),
  minifyHTML = require('gulp-minify-html'),
  del = require('del'),
  runSequence = require('run-sequence'),
  minHtmlOpts = {
    conditionals: true, // do not remove conditional comments
    quotes: true         // do not remove attribute quotes
  },
  config = {
    appDir: 'app',
    bowerDir: 'app/bower_components',
    distDir: 'dist'
  };

gulp.task('process-views', function() {

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

gulp.task('minify-html', function() {
  return gulp.src(['dist/**/*.hbs', '!dist/**/md.hbs'])
    .pipe(gulpIf('*.hbs', minifyHTML(minHtmlOpts)))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  return gulp.src(config.appDir + '/images/**/*.+(png|jpg|jpeg|gif|svg|ico)')
    .pipe(imagemin({
      interlaced: true
    }))
    .pipe(gulp.dest(config.distDir + '/images'))
});

gulp.task('clean:dist', function(callback) {
  return del([config.distDir + '/**/*', '!' + config.distDir + '/images', '!' + config.distDir + '/images/**/*'], callback);
});

gulp.task('clean', function() {
  return del(config.distDir);
});

gulp.task('bundle', function(callback) {
  runSequence(
    'images',
    'fonts',
    'process-views',
    'minify-html',
    callback
  );
});

gulp.task('build', function(callback) {
  return runSequence('clean', ['bundle'],
    callback
  );
});
