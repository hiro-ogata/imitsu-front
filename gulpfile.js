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
const editDir = {
  scss: './_src/scss/*/',
  js: './_src/js/',
  img: './_src/img/',
  project: './_src/scss/object/project/'
}
const destDir = {
  css: './src/css',
  js: './src/js',
  img: './src/img'
}
const cssPlugin = [
  autoprefixer({cascade: false}),
  cssDeclarationSorter({order: 'smacss'}),
  mqpacker()
];

/*---------- scss圧縮 ----------*/
gulp.task("css", function () {
  return gulp.src(editDir.scss + 'join.scss')
  .pipe(bulkSass())
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(postcss(cssPlugin))
  .pipe(rename('style.css'))
  .pipe(gulp.dest(destDir.css));
});
gulp.task("mincss", function () {
  return gulp.src(editDir.scss + 'join.scss')
  .pipe(sassGlob())
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(postcss(cssPlugin))
  .pipe(cleancss())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest(destDir.css));
});
gulp.task("othercss", function () {
  return gulp.src(editDir.scss + '*.scss')
  .pipe(sassGlob())
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(postcss(cssPlugin))
  .pipe(gulp.dest(destDir.css));
});

/*---------- css結合 ----------*/
gulp.task("joincss", function() {
  return gulp.src([destDir.css + 'style.css', editDir.project + hoge])
  .pipe(concat(hoge + '.css'))
  .pipe(gulp.dest(destDir.css));
});

/*---------- js圧縮 ----------*/
gulp.task('js', function() {
  return gulp.src(editDir.js + '*.js')
  .pipe(gulp.dest(destDir.js));
});
gulp.task('minjs', function() {
  return gulp.src(editDir.js + '*.js')
  .pipe(plumber())
  .pipe(uglify({output: {comments: 'some'}}))
  .pipe(rename({extname: '.min.js'}))
  .pipe(gulp.dest(destDir.js));
});

/*---------- img圧縮 ----------*/
gulp.task('minimg', function() {
  return gulp.src([editDir.img + '*.png', editDir.img + '*.jpg'])
  .pipe(imagemin([pngquant({quality: '60-80'})]))
  .pipe(imagemin())
  .pipe(gulp.dest(destDir.img));
});

/*---------- task実行 ----------*/
gulp.task('default', gulp.series(function(done){
  gulp.watch(editDir.scss + '*.scss', gulp.series('css', 'mincss', 'othercss'));
  gulp.watch([editDir.js + '*.js', !editDir.js + '*.min.js'], gulp.series('js', 'minjs'));
  gulp.watch([editDir.img + '*.png', editDir.img + '*.jpg'], gulp.series('minimg'));
  // gulp.watch(editDir.project + hoge + '*.scss', gulp.series('joincss'));
  done();
}));


// コマンドラインから引数で渡してやってみるのいいかも
// const minimist = require('minimist');
// const options = minimist(process.argv.slice(2), {
// 	string: 'env',
// 	default: {
// 		env: 'develop'
// 	}
// });
// const hoge = options.env;


// const webpackStream = require("webpack-stream");
// const webpack = require("webpack");
// const webpackConfig = require("./webpack.config");
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
//             baseDir: editDir.html,
//             index: 'index.html'
//         }
//     });
//     done();
// });
