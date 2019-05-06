var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// // Copy third party libraries from /node_modules into /vendor
// gulp.task('vendor', function() {
//
//   // Bootstrap
//   gulp.src([
//       './node_modules/bootstrap/dist/**/*',
//       '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
//       '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
//     ])
//     .pipe(gulp.dest('./web/dist/vendor/bootstrap'))
//
//   // Font Awesome
//   gulp.src([
//       './node_modules/font-awesome/**/*',
//       '!./node_modules/font-awesome/{less,less/*}',
//       '!./node_modules/font-awesome/{scss,scss/*}',
//       '!./node_modules/font-awesome/.*',
//       '!./node_modules/font-awesome/*.{txt,json,md}'
//     ])
//     .pipe(gulp.dest('./web/dist/vendor/font-awesome'))
//
//   // jQuery
//   gulp.src([
//       './node_modules/jquery/dist/*',
//       '!./node_modules/jquery/dist/core.js'
//     ])
//     .pipe(gulp.dest('./web/dist/vendor/jquery'))
//
//   // jQuery Easing
//   gulp.src([
//       './node_modules/jquery.easing/*.js'
//     ])
//     .pipe(gulp.dest('./web/dist/vendor/jquery-easing'))
//
// });

// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      './src/css/*.css',
      '!./src/css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./web/dist/css'));
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
      './src/js/*.js',
      '!./src/js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./web/dist/js'));
});

// JS
gulp.task('js', ['js:minify']);

// Default task
gulp.task('default', ['css', 'js']);

// Dev task
gulp.task('dev', ['css', 'js'], function() {
  gulp.watch('./src/scss/*.scss', ['css']);
  gulp.watch('./src/js/*.js', ['js']);
});
