var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var ts          = require('gulp-typescript');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'compile'], function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch("public/app/*.ts", ['compile'])
    gulp.watch("public/scss/*.scss", ['sass']);
    gulp.watch(["public/**/*.html", "public/**/*.js", "public/css/*.css"]).on('change', browserSync.reload);
});

// gulp.task('serve', ['compile'], function() {
//     gulp.watch('lib/*.ts', ['compile']);
// });
gulp.task('compile', function() {
    return gulp.src("public/app/**/*.ts")
    .pipe(ts({
        module: "system.js",
        noImplicitAny: true,
        removeComments: true,
        out: 'output.js'
    }))
    .pipe(gulp.dest('built/local'));
})


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("public/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
