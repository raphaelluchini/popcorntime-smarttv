define(['jquery', 'backbone', 'marionette', 'underscore', 'handlebars', 'others/Scrapers'],
    function ($, Backbone, Marionette, _, Handlebars, Scrapers) {
        var App = new Backbone.Marionette.Application();
        App.views = {};
        App.Scrapers = new Scrapers([], {
            keywords: null,
            genre: 'all',
            page: null
        });

        App.Scrapers.fetch();

        App.addRegions({
            menuRegion:"#catalog-select",
            mainRegion:"#main",
            sidebarRegion:"#sidebar",
            playerRegion:"#player"
        });

        App.addInitializer(function () {
            Backbone.history.start();
        });

        return App;
    });