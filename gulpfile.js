var gulp         = require('gulp');
var $            = require('gulp-load-plugins')();
var browserSync  = require('browser-sync');
var runSequence  = require('run-sequence');
var replace      = require('gulp-replace');


//
//   Config
//
//////////////////////////////////////////////////////////////////////

var paths = {
  styleSrc: 'resources/styles/',
  styleDist: 'public/dist/styles/',

  scriptSrc: 'resources/scripts/',
  scriptDist: 'public/dist/scripts',

  templateSrc: 'craft/templates/',
  templateDist: 'public/dist/templates/',

  imageSrc: 'resources/images/',
  imageDist: 'public/dist/images/',

  vendorSrc: 'resources/vendor/'
};


//
//   Styles
//
//////////////////////////////////////////////////////////////////////

/*
Preprocesses stylesheets using the following plugins:

cssGlobbing: Allows globbing imports in .scss: @import 'styles/modules/*.scss';
sass: Sass compilation using super-fast libsass
autoprefixer: Automatically adds vendor prefixes to experimental properties
*/

gulp.task('styles', function() {
  return gulp.src([
      paths.styleSrc + 'main.scss',
    ])
    .pipe($.cssGlobbing({
      extensions: ['.scss']
    }))
    .pipe($.sass({
      outputStyle: 'compressed',
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.pixrem())
    .pipe($.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest(paths.styleDist))
    .pipe(browserSync.reload({stream:true}));
});


//
//   Scripts
//
//////////////////////////////////////////////////////////////////////

/*
Concatenates and uglifies/minifies scripts
*/

gulp.task('scripts', function() {
  return gulp.src([
      paths.vendorSrc + 'jquery/dist/jquery.min.js',
      paths.scriptSrc + 'vendor/smart-resize.js',
      paths.vendorSrc + 'imagesloaded/imagesloaded.pkgd.js',
      paths.vendorSrc + 'isotope/dist/isotope.pkgd.js',
      paths.vendorSrc + 'flickity/dist/flickity.pkgd.js',
      paths.vendorSrc + 'gsap/src/uncompressed/TweenMax.js',
      paths.vendorSrc + 'waypoints/lib/jquery.waypoints.js',
      paths.vendorSrc + 'd3/d3.min.js',
      paths.scriptSrc + 'modules/**/*.js',
      paths.scriptSrc + 'main.js'
    ])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.concat('main.js'))
    .pipe($.uglify())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scriptDist))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('scripts:modernizr', function() {
  return gulp.src([
      paths.vendorSrc + 'modernizr/modernizr.js'
    ])
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify())
    .pipe(gulp.dest(paths.scriptDist))
    .pipe(browserSync.reload({ stream: true, once: true }));
});


//
//   Templates
//
//////////////////////////////////////////////////////////////////////

/*
Reloads the browser on changes to templates
*/

gulp.task('templates', function() {
  return gulp.src([
      paths.templateSrc + '**/*.html',
      paths.templateSrc + '**/*.php'
    ])
    .pipe(browserSync.reload({stream:true, once: true}));
});


//
//   Images
//
//////////////////////////////////////////////////////////////////////

/*
Lossless optimization of image files
*/

gulp.task('images', function() {
  return gulp.src([
      paths.imageSrc + '**/*.{jpg,png,gif}'
    ])
    // .pipe($.imagemin({
    //   progressive: true,
    // }))
    .pipe(gulp.dest(paths.imageDist));
});

gulp.task('images:svg', function() {
  return gulp.src([
      paths.imageSrc + '**/*.svg'
    ])
    .pipe($.svgSprite({
      mode: {
        inline: false,
        symbol: true
      }
    }))
    .pipe(gulp.dest('./craft/templates/_partials'));
});

//
//   BrowserSync
//
//////////////////////////////////////////////////////////////////////

/*
Refreses browser on file changes and syncs scroll/clicks between devices.
Your site will be available at http://localhost:3000
*/

gulp.task('browserSync', function() {
  browserSync.init(null,
    {
      port: 3000,
      open: false,
      notify: false,

      // If you have your own virtual host, uncomment this line and remove the 'server' property
      proxy: 'http://drw.dev'
  });
});

//
//   Bower Install
//   Make sure all Bower dependencies are installed
//
//////////////////////////////////////////////////////////////////////


gulp.task('bowerInstall', $.shell.task([
  'bower install'
]));


//
//   Clean
//   Remove dist folder for a fresh complie
//
//////////////////////////////////////////////////////////////////////


gulp.task('clean', $.shell.task([
  'rm -rf public/dist/',
  'rm -rf craft/templates/_partials/symbol'
]));


//
//   SVG Classes
//   Change IDs to classes in svg file
//
//////////////////////////////////////////////////////////////////////


gulp.task('svgEvolve', function(){
    gulp.src(['./craft/templates/_partials/illustrations/_evolve.html'])
        .pipe(replace('id=','class='))
        .pipe(replace('coin-','coin '))
        .pipe(replace('flip-','flip '))
        .pipe(replace('fade-one-','fade-one '))
        .pipe(replace('fade-two-','fade-two '))
        .pipe(gulp.dest('./craft/templates/_partials/illustrations/'));
});

gulp.task('svgMap', function(){
    gulp.src(['./craft/templates/_partials/illustrations/_campus-map.html'])
        .pipe(replace('id=','class='))
        .pipe(replace('campus-','campus '))
        .pipe(gulp.dest('./craft/templates/_partials/illustrations/'));
});


//
//   Watch
//
//////////////////////////////////////////////////////////////////////

/*
Runs tasks when files change
*/

// Watch
gulp.task('watch', function() {
  gulp.watch([paths.styleSrc + '**/*.scss'], ['styles']);
  gulp.watch([paths.scriptSrc + '**/*.js'], ['scripts']);
  gulp.watch([paths.templateSrc + '**/*.html', paths.templateSrc + '**/*.php'], ['templates']);
  gulp.watch([paths.imageSrc + '**/*.{png, jpg, gif}'], ['images']);
  gulp.watch([paths.imageSrc + '**/*.svg'], ['images:svg']);
});


//
//   Default
//
//////////////////////////////////////////////////////////////////////

gulp.task('default', ['styles', 'scripts', 'scripts:modernizr', 'templates', 'browserSync', 'watch', 'images', 'images:svg']);
gulp.task('build', function(callback) {
  runSequence(
    'bowerInstall',
    [
      'clean',
      'styles',
      'scripts',
      'scripts:modernizr',
      'images',
      'images:svg'
    ],
    callback
  );
});
