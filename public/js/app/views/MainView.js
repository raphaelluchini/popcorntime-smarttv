define( ['App', 'backbone', 'marionette', 'jquery', 'hbs!templates/main', 'views/MovieView', 'others/Scrapers'],
    function(App, Backbone, Marionette, $, template, MovieView, Scrapers) {
        var scrapers = new Scrapers([], {
            keywords: null,
            genre: 'all',
            page: null
        });

        return Backbone.Marionette.CompositeView.extend( {
            template:template,
            childViewContainer:'#list',
            collection:scrapers,
            childView:MovieView,
            initialize : function () {
                this.collection.fetch();
            },
        });
    });