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
gulp.task('scripts', function() {
    console.log("-----Scripts task has run.-----")

    //Libs -> Modules -> Services -> Controllers -> Filters    //all services, controllers, app.js with routes
    return gulp.src([
        './app/src/app.js',
        './app/src/services/userService.js',
        './app/src/controllers/userController.js'
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
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify({mangle: false}))
    .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/dist/js/'))
})

//Default
gulp.task('default', ['styles', 'scripts'], function() {
    console.log("SCRIPTS TASK HAS RUN");
})

//Watch
gulp.task('watch', ['default'], function() {
    console.log("SCRIPTS TASK HAS RUN");

    gulp.watch('app/src/**/*.css', ['styles'])
    gulp.watch('app/src/**/*.css', ['scripts'])
})