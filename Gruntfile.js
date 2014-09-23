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
            files: ['Gruntfile.js', 'public/js/app/**/*.js', '!public/js/app/**/*min.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: false,
                    module: true,
                    document: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.registerTask('build', ['requirejs:dist']);
    grunt.registerTask('dev', ['requirejs:dev']);
    grunt.registerTask('default', ['build']);
};
