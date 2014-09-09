define(['App', 'backbone', 'marionette', 'views/MenuView', 'views/MainView'],
    function (App, Backbone, Marionette, MenuView, MainView) {
    return Backbone.Marionette.Controller.extend({
        initialize:function (options) {
            App.menuRegion.show(new MenuView());
        },
        //gets mapped to in AppRouter's appRoutes
        index:function () {
            App.mainRegion.show(new MainView());
        }
    });
});