module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            desktopJS: {
                options: {
                    baseUrl: "public/js/app",
                    //wrap: true,
                    // Cannot use almond since it does not currently appear to support requireJS's config-map
                    name: "../libs/almond",
                    //preserveLicenseComments: false,
                    optimize: "none",
                    mainConfigFile: "public/js/app/config/config.js",
                    include: ["init/DesktopInit"],
                    out: "public/js/app/init/DesktopInit.min.js"
                }
            },
            desktopCSS: {
                options: {
                    optimizeCss: "standard",
                    cssIn: "./public/css/desktop.css",
                    out: "./public/css/desktop.min.css"
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
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['requirejs:desktopJS', 'requirejs:desktopCSS']);
    grunt.registerTask('default', ['test', 'build']);
};
