define(['App', 'backbone', 'marionette', 'views/MenuView', 'views/MainView', 'views/SidebarView'],
    function (App, Backbone, Marionette, MenuView, MainView, SidebarView) {
    return Backbone.Marionette.Controller.extend({
        initialize:function (options) {
            App.menuRegion.show(new MenuView());
            App.mainRegion.show(new MainView());
        },
        //gets mapped to in AppRouter's appRoutes
        index:function () {
            
        },
        sidebar:function(id) {
            App.sidebarRegion.show(new SidebarView({currentMovie:id}));
        }
    });
});