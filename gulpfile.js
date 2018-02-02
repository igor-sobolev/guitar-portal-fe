const gulp = require('gulp');
const stylus = require('gulp-stylus');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const del = require('del');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');

gulp.task('clean', function () {
  return del(['build']);
});

gulp.task('js', ['clean'], function () {
  return browserify('./src/index.js', { debug: true, extensions: ['es6'] })
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('css', ['clean'], function () {
  return gulp.src('./src/**/*.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(concat('bundle.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*', ['build']);
});

gulp.task('build', ['js', 'css']);
gulp.task('default', ['build']);