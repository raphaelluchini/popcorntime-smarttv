define(['jquery', 'backbone', 'marionette', 'underscore', 'providers/Scrapers'],
    function ($, Backbone, Marionette, _, Scrapers) {

        var App = new Backbone.Marionette.Application();
        App.views = {};

        App.Scrapers = new Scrapers();

        App.Scrapers.fetch({
            keywords: null,
            genre: null,
            page: 1
        });

        App.Scrapers.on('loading', function(){
            $('.popcorn-load').removeClass('hidden');
        });

        App.Scrapers.on('loaded', function(){
            $('.popcorn-load').addClass('hidden');
        });

        App.Scrapers.on('error', function(){
            $('.popcorn-load').addClass('hidden');
        });

        App.addRegions({
            menuRegion:"#catalog-select-region",
            mainRegion:"#main-region",
            sidebarRegion:"#sidebar-region",
            playerRegion:"#player-region"
        });

        App.addInitializer(function () {
            Backbone.history.start();
            $('.categories li a[data-genre="Popular"]').parent().addClass("active");
        });

        return App;
    });