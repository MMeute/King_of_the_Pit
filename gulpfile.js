const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel');

//Styles all css files from css folder with route
gulp.task('styles', function() {
    console.log("-----Styles task has run.-----");

    return gulp.src([
        './app/src/css/styles.css'
    ])
        .pipe(plumber(function(err) {
            console.log('');
            console.log("---------------------");
            console.log('CSS Task Error:');
            console.log('---------------------');
            console.log('');
            console.log(err);
            this.emit('end')
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(concat('styles.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/dist/css'))
})

//Scripts
//Scripts
gulp.task('scripts', function () {
    console.log('--------');
    console.log('JS Tasks');
    console.log('--------');
    console.log('');
  
    // Modules -> Services -> Controllers -> Filters
    return gulp.src([
        'app/src/app.js',
        'app/src/js/ui-router.min.js',
        'app/src/js/angular-local-storage.min.js',
        'app/src/services/authInterceptorService.js',
        'app/src/services/authService.js',
        'app/src/services/userService.js',
        'app/src/controllers/loginController.js',
        'app/src/controllers/userController.js'
      ])
      .pipe(plumber(function(err) {
        console.log('');
        console.log('--------------');
        console.log('JS Task Error:');
        console.log('--------------');
        console.log('');
        console.log(err);
        this.emit('end')
      }))
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(uglify({mangle: false}))
      .pipe(concat('scripts.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('app/dist/js/'))
  });
  
  gulp.task('default', ['styles', 'scripts'], function() {
    console.log('------------');
    console.log('DEFAULT Task');
    console.log('------------');
    console.log('');
  })
  
  gulp.task('watch', ['default'], function() {
    console.log('----------');
    console.log('WATCH Task');
    console.log('----------');
    console.log('');
  
    gulp.watch('app/src/**/*.js', ['scripts'])
    gulp.watch('app/src/**/*.css', ['styles'])
  })