var gulp        = require('gulp'),
  sass          = require('gulp-sass'),
  browserSync   = require('browser-sync'),
  concat        = require('gulp-concat'),
  uglify        = require('gulp-uglifyjs'),
  cssnano       = require('gulp-cssnano'),
  rename        = require('gulp-rename'),
  del           = require('del'),
  imagemin      = require('gulp-imagemin'),
  pngquant      = require('imagemin-pngquant'),
  cache         = require('gulp-cache'),
  autoprefixer  = require('gulp-autoprefixer');


gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(gulp.dest('app/css'));
});

gulp.task('scripts', function () {
  return gulp.src([
      'app/libs/modernizr/modernizr.js',
      'app/libs/jquery/dist/jquery.min.js',
      'app/libs/bootstrap/dist/js/bootstrap.min.js',
      'app/libs/waypoints/lib/jquery.waypoints.min.js',
      'app/libs/animate.css/animate-css.js',
      'app/libs/owl.carousel/dist/owl.carousel.min.js',
      'app/libs/plugins-scroll/plugins-scroll.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('scriptsIE', function () {
  return gulp.src([
      'app/libs/html5shiv/dist/html5shiv.min.js',
      'app/libs/html5shiv/dist/html5shiv-printshiv.min.js',
      'app/libs/respond/dest/respond.min.js',
    ])
    .pipe(concat('html5ie.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('css-libs-min', ['sass'], function () {
  return gulp.src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
});

gulp.task('css-main-min', ['sass'], function () {
  return gulp.src('app/css/main.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false,
    port: 3000
  });
});

/* delete dist folder */
gulp.task('clean', function () {
  return del.sync('dist');
});

/* clear img cache*/
gulp.task('clear', function () {
  return cache.clearAll();
});

gulp.task('img', function () {
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'css-libs-min', 'css-main-min', 'scripts', 'scriptsIE'], function () {
  gulp.watch('app/sass/**/*.sass', ['css-main-min']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'clear', 'img', 'css-libs-min', 'css-main-min', 'scripts', 'scriptsIE'], function () {
  var buildCss = gulp.src([
    'app/css/main.min.css',
    'app/css/libs.min.css'
  ]).pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});