var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var pkg = require('./package.json');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');


var onError = function (err) {
  console.log(err);
  console.log('*****MESSAGE*****');
  console.log(err.message);
};
var paths = {
  index: 'index.jade',
  jade: 'dev/partials/**/*',
  sass: 'dev/sass/main.scss',
  js: 'dev/js/**/*'
};


/**
 * Concat app scripts
 */
gulp.task('js', function () {
  gulp.src(paths.js)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('built.js'))
    .pipe(gulp.dest('assets/js/'))
    .pipe(rename('built.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/'))
    .pipe(connect.reload())
});




gulp.task('sass', function () {
  return sass(paths.sass, {
      quiet: true,
      lineNumbers: true
    })
    .pipe(gulp.dest('assets/css/'))
    .pipe(rename('main.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('assets/css/'))
    .pipe(connect.reload())
});


gulp.task('jade', function () {
  gulp.src(paths.jade)
    .pipe(connect.reload())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(jade({
      pretty: false
    }))
    .pipe(gulp.dest('assets/partials/'))
    .pipe(connect.reload());
});

gulp.task('jade:index', function () {
  gulp.src(paths.index)
    .pipe(connect.reload())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(jade({
      pretty: false
    }))
    .pipe(gulp.dest('./'))
    .pipe(connect.reload());
});



gulp.task('connect', function() {
  connect.server({
    livereload: true,
    port:'8081'
  });
});

gulp.task('watch', function () {
  gulp.watch('dev/sass/**/*', ['sass']);
  gulp.watch(paths.index, ['jade:index']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.js, ['js']);
//  watch(paths.index, ['html']).pipe(connect.reload());
});

// gulp.task('default', ['connect', 'sass', 'js', 'watch']);
gulp.task('default', [ 'sass', 'js', 'watch']);
