module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            dist: {
                options: {
                    baseUrl: "app",
                    optimize: "none",
                    preserveLicenseComments : false,
                    inlineText : true,
                    findNestedDependencies : true,
                    mainConfigFile: "app/config/config.js",
                    paths : {
                      requireLib : '../libs/require'
                    },
                    include: [
                        '../libs/URI.min.js',
                        'requireLib',
                        "AppInit"
                    ],
                    out: "assets/optimized.min.js"
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'app/**/*.js', '!libs/**/*.js', '!./**/*min.js'],
            options: {
                evil: false,
                regexdash: true,
                browser: true,
                wsh: true,
                trailing: true,
                sub: true,
                nonbsp:true,
                globals: {
                    jQuery: true,
                    console: false,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
          scripts: {
            files: ['app/**/*.js'],
            tasks: ['build'],
            options: {
              spawn: false
            }
          }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask('build', ['jshint', 'requirejs:dist']);
    grunt.registerTask('default', ['build']);
};
