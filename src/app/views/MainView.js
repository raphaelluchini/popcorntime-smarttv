define( ['App', 'backbone', 'marionette', 'jquery', 'hbs!templates/main', 'views/MovieView'],
    function(App, Backbone, Marionette, $, template, MovieView) {
        return Backbone.Marionette.CompositeView.extend( {
            template:template,
            childViewContainer:'#list',
            collection:App.Scrapers,
            childView:MovieView,
            modelEvents: {
                "sync": "render"
            }
        });
    });