const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const join = require('path').join;

const paths = {
  src: join(__dirname, 'src'),
  dist: join(__dirname, 'dist')
};

const libName = 'flexed';

gulp.task('sass', () => {
  return gulp.src(join(paths.src, `${libName}.scss`))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('dist', ['sass'], () => {
  return gulp.src(join(paths.dist,  `${libName}.css`))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dist))
});

gulp.task('default', ['dist']);
gulp.task('serve', ['sass'], () => {
  gulp.watch(join(paths.src, '**/*.scss'), ['sass']);
})