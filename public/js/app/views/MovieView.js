define(['jquery', 'hbs!templates/catalogMovieView', 'backbone', 'marionette'],
    function ($, template, Backbone, Marionette) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template: template
        });
    });