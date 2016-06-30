const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
const cleanCSS = require('gulp-clean-css');
const join = require('path').join;


const paths = {
  src: join(__dirname, 'src'),
  example: join(__dirname, 'example'),
  dist: join(__dirname, 'dist')
};

const libName = 'flexxed';

gulp.task('exampleMarkups', () => {
  return gulp.src(join(paths.example, 'index.pug'))
    .pipe(pug({
      pretty: true,
      locals: {
        renderHTML: function (fn) {
          console.log(fn);
          console.log(fn());
        }
      }
    }))
    .pipe(gulp.dest('.'));
})

gulp.task('exampleSass', () => {
  return gulp.src(join(paths.example, `example.scss`))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest(paths.example));
})

gulp.task('example', ['exampleMarkups', 'exampleSass']);

gulp.task('sass', () => {
  return gulp.src(join(paths.src, `${libName}.scss`))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('dist', ['sass'], () => {
  return gulp.src(join(paths.dist,  `${libName}.css`))
    // .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    // .pipe(sourcemaps.write())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dist))
});

gulp.task('default', ['dist']);
gulp.task('serve', ['sass', 'example'], () => {
  gulp.watch(join(paths.src, '**/*.scss'), ['sass']);
  gulp.watch(join(paths.example, '**/*.scss'), ['exampleSass']);
  gulp.watch(join(paths.example, 'index.pug'), ['exampleMarkups']);
});