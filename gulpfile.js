var gulp = require( 'gulp' );
var rename = require( 'gulp-rename' );
var browserSync = require( 'browser-sync' ).create();
var scss = require( 'gulp-sass' );
var prefix = require( 'gulp-autoprefixer' );
var cssMin = require( 'gulp-minify-css' );

gulp.task( 'css', function() {
    return gulp.src( './css/scss/main.scss' )
        .pipe( scss() )
        .pipe( prefix( ['last 2 version', '> 1%', 'ie 8', 'ie 7', 'Firefox > 15'], { cascade: true }))
        .pipe( cssMin() )
        .pipe( rename('style.css') )
        .pipe( gulp.dest('./') )
        .pipe( browserSync.stream() );
});

gulp.task( 'default', ['css'] );

gulp.task( 'serve', ['css'], function() {
    browserSync.init({
        server: { baseDir: './' },
        open: false,
        notify: false
    });

    gulp.watch( './css/scss/**/*.scss', ['css'] );
});
