'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const postcss = require("gulp-postcss");
const mqpacker = require('css-mqpacker');
const autoprefixer = require('autoprefixer');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const cleancss = require('gulp-clean-css');
const cssDeclarationSorter = require('css-declaration-sorter');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const plumber = require('gulp-plumber');
const bulkSass = require('gulp-sass-bulk-import');

/*---------- directory ----------*/
const editDirectory = {
  scss: './_src/scss/*/',
  js: './_src/js/',
  es: './_src/es/',
  img: './_src/img/',
  page: './_src/scss/object/page/'
}
const destDirectory = {
  css: './src/css',
  js: './src/js',
  es: './src/es',
  img: './src/img'
}
const cssPlugin = [
  autoprefixer({cascade: false}),
  cssDeclarationSorter({order: 'smacss'}),
  mqpacker()
];

/*---------- scss圧縮 ----------*/
gulp.task("css", function () {
  return gulp.src(editDirectory.scss + 'join.scss')
  .pipe(bulkSass())
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(postcss(cssPlugin))
  .pipe(rename('style.css'))
  .pipe(gulp.dest(destDirectory.css));
});
gulp.task("mincss", function () {
  return gulp.src(editDirectory.scss + 'join.scss')
  .pipe(sassGlob())
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(postcss(cssPlugin))
  .pipe(cleancss())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest(destDirectory.css));
});
gulp.task("othercss", function () {
  return gulp.src(editDirectory.scss + '*.scss')
  .pipe(sassGlob())
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(postcss(cssPlugin))
  .pipe(gulp.dest(destDirectory.css));
});

/*---------- js圧縮 ----------*/
gulp.task('js', function() {
  return gulp.src(editDirectory.js + '*.js')
  .pipe(gulp.dest(destDirectory.js));
});
gulp.task('minjs', function() {
  return gulp.src(editDirectory.js + '*.js')
  .pipe(plumber())
  .pipe(uglify({output: {comments: 'some'}}))
  .pipe(rename({extname: '.min.js'}))
  .pipe(gulp.dest(destDirectory.js));
});

/*---------- img圧縮 ----------*/
gulp.task('minimg', function() {
  return gulp.src([editDirectory.img + '*.png', editDirectory.img + '*.jpg'])
  .pipe(imagemin([pngquant({quality: '60-80'})]))
  .pipe(imagemin())
  .pipe(gulp.dest(destDirectory.img));
});

/*---------- ECMAScript ----------*/
// const babel = require('gulp-babel');
// gulp.task('es', function() {
//   return gulp.src(editDirectory.es + '*.js')
//   .pipe(babel({presets: ['@babel/preset-env']}))
//   .pipe(gulp.dest(destDirectory.es));
// });
// gulp.task('mines', function() {
//   return gulp.src(editDirectory.es + '*.js')
//   .pipe(babel({presets: ['@babel/preset-env']}))
//   .pipe(uglify({output: {comments: 'some'}}))
//   .pipe(rename({extname: '.min.js'}))
//   .pipe(gulp.dest(destDirectory.es));
// });

// var browsersync = require("browser-sync").create();
// /*---------- 自動リロード ----------*/
// gulp.task('reload', function (done){
//     browsersync.reload();
//     done();
// });
// /*---------- サーバー起動 ----------*/
// gulp.task('build', function (done) {
//     browsersync.init({
//         server: {
//             baseDir: editDirectory.html,
//             index: 'index.html'
//         }
//     });
//     done();
// });

/*---------- task実行 ----------*/
gulp.task('default', gulp.series(function(done){
  gulp.watch([editDirectory.scss + '*.scss', './_src/scss/*/*/*.scss'], gulp.series('css', 'mincss', 'othercss'));
  gulp.watch([editDirectory.js + '*.js'], gulp.series('js', 'minjs'));
  gulp.watch([editDirectory.img + '*.png', editDirectory.img + '*.jpg'], gulp.series('minimg'));
  done();
}));

