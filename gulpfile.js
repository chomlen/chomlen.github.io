'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass')(require('sass'));
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
require('dotenv').config();
const replace = require('gulp-replace');

// Compile SCSS to CSS
function sassTask() {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ basename: 'styles.min' }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

// apikey
gulp.task('inject-api-key', function() {
    const apiKey = process.env.API_KEY;
    
    return gulp.src('./js/**/*.{js,css}') // Source all JavaScript and CSS files recursively
        .pipe(replace('GSHEETS_API_KEY', apiKey)) // Replace placeholder with actual API key
        .pipe(gulp.dest('dist')); // Output directory, preserving structure
});

// Minify JS
function minifyJs() {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({ basename: 'scripts.min' }))
        .pipe(gulp.dest('./js'));
}

// Serve and watch files
function serve() {
    browserSync.init({
        server: "./"
    });

    gulp.watch("sass/*.scss", sassTask);
    gulp.watch("*.html").on('change', browserSync.reload);
}

// Watch SCSS files
function watchFiles() {
    gulp.watch('./sass/**/*.scss', sassTask);
}

// Default task
exports.default = gulp.series(
    gulp.parallel(sassTask, minifyJs),
    serve
);

exports.watch = watchFiles;