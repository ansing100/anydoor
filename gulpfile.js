const gulp = require('gulp');
const less = require('gulp-less');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const minifyCss = require('gulp-minify-css');

// var path = require('path');

// gulp.task('less', function () {
//   return gulp.src('./less/**/*.less')
//     .pipe(less())
//     .pipe(gulp.dest('./css'));
// });

gulp.task('cleanCss', function () {
  return gulp.src('./build/css')
    .pipe(clean());
});

gulp.task('less', ['cleanCss'], () => {
  gulp.src('./styles/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('minifyCss',['less'],()=>{
  gulp.src('./build/css/*.css')
    .pipe(gulp.dest('./build/minifyCss'))
    .pipe(minifyCss());
});

gulp.task('cleanJs', function () {
  return gulp.src('./build/script')
    .pipe(clean());
});


gulp.task('babel', ['cleanJs'], function () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('build/script'));
});

gulp.task('default', ['minifyCss', 'babel'], function () {
  console.info('done.');
});

//
// var watcher = gulp.watch('./styles/**/*.less', ['default']);
// watcher.on('change', function(event) {
//   console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
// });

// gulp.task('watch',()=>{
//   const watcher = gulp.watch('./styles/**/*.less', ['default']);
//   watcher.on('change',(event)=>{
//     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//   });
//
// });

gulp.task('watch', () => {
  gulp.watch('./styles/**/*.less', ['default'])
    .on('change', (event) => {
      console.info('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

});
