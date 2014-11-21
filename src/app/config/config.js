    require.config({
    baseUrl:"./src/app",
    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    // probably a good idea to keep version numbers in the file names for updates checking
    paths:{
        // Core Libraries
        "jquery":"../libs/jquery",
        "underscore":"../libs/lodash",
        "backbone":"../libs/backbone",
        "marionette":"../libs/backbone.marionette",
        "hbs":"../libs/require-handlebars-plugin/hbs",
        "Q":"../libs/q",
        'URI': '../libs/URI',
        'async': '../libs/async',
        // Plugins
        "text":"../libs/plugins/text",
    },
    // Sets the configuration for your third party scripts that are not AMD compatible
    shim:{

        "URI": ["jquery"],
        // Backbone
        "backbone":{
            // Depends on underscore/lodash and jQuery
            "deps":["underscore", "jquery"],
            // Exports the global window.Backbone object
            "exports":"Backbone"
        },
        //Marionette
        "marionette":{
            "deps":["underscore", "backbone", "jquery"],
            "exports":"Marionette"
        }
    },
    // hbs config - must duplicate in Gruntfile.js Require build
    hbs: {
        templateExtension: "html",
        helperDirectory: "templates/helpers/",
        i18n: false,
        compileOptions: {}        // options object which is passed to Handlebars compiler
    }
});