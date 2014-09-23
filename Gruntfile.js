module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            dist: {
                options: {
                    baseUrl: "src/js/app",
                    optimize: "uglify2",
                    preserveLicenseComments : false,
                    inlineText : true,
                    findNestedDependencies : true,
                    mainConfigFile: "src/js/config/config.js",
                    paths : {
                      requireLib : '../libs/require'
                   },
                    include: [
                        'requireLib',
                        "../AppInit"
                    ],
                    out: "public/optimized.min.js"
                }
            },
            dev: {
                options: {
                    baseUrl: "src/js/app",
                    optimize: "none",
                    preserveLicenseComments : false,
                    inlineText : true,
                    findNestedDependencies : true,
                    mainConfigFile: "src/js/config/config.js",
                    paths : {
                      requireLib : '../libs/require'
                   },
                    include: [
                        'requireLib',
                        "../AppInit"
                    ],
                    out: "public/optimized.min.js"
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/js/app/**/*.js', '!src/js/libs/**/*.js', '!./**/*min.js'],
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
            files: ['src/js/**/*.js'],
            tasks: ['dev'],
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
    grunt.registerTask('dev', ['jshint', 'requirejs:dev']);
    grunt.registerTask('default', ['build']);
};
