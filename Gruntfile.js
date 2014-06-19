module.exports = function(grunt) {
  var files = [
    "app/js/vendor/jquery-2.1.0.min.js",
    "app/js/vendor/underscore.js",
    "app/js/vendor/backbone-1.1.0.js",
    "app/js/vendor/marionette.1.6.4.js",
    "app/js/vendor/bootstrap-tooltip.min.js",
    "app/js/vendor/q.js",
    "app/js/vendor/async.js",
    "app/js/vendor/URI.js",
    
    "app/js/vendor/settings.js",
    
    "app/js/app.js",
    
    "app/js/language.js",
    
    "app/js/frontend/ui.js",
    "app/js/frontend/player.js",
    
    "app/js/frontend/models/movie.js",
    
    "app/js/frontend/providers/cache.js",
    "app/js/frontend/providers/ysubs.js",
    "app/js/frontend/providers/trakttv.js",
    "app/js/frontend/scrapers/yts.js",
    "app/js/frontend/scrapers/scrapers.js",

    "app/js/frontend/views/page.js",
    "app/js/frontend/views/listview.js",
    "app/js/frontend/views/movie.js",
    "app/js/frontend/views/sidebar.js",
    "app/js/frontend/controllers/home.js",
    "app/js/frontend/controllers/search.js",
    "app/js/frontend/controllers/filter.js",
    "app/js/frontend/router.js",

    "app/js/vendor/video-js/video.dev.js",
    "app/js/vendor/videojsplugins.js",
  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: [files, 'app/css/**/*.css'],
        tasks: ['concat']
      },
    },

    concat: {
      options: {
        separator: ';'
      },
      css: {
        src:['app/css/*.css'],
        dest:'styles.css'
      },
      js: {
          src: files,
          dest: '<%= pkg.name %>.js'
        }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['concat']);

};