define(['App', 'backbone', 'marionette', 'views/MenuView', 'views/MainView', 'views/SidebarView', 'views/PlayerView'],
    function (App, Backbone, Marionette, MenuView, MainView, SidebarView, PlayerView) {
    return Backbone.Marionette.Controller.extend({
        initialize:function (options) {
            App.views.menu = new MenuView();
            App.views.main = new MainView();
            App.menuRegion.show(App.views.menu);
            App.mainRegion.show(App.views.main);
        },
        //gets mapped to in AppRouter's appRoutes
        index:function () {},
        sidebar:function(id) {
            App.views.sidebar = new SidebarView({currentMovie:id});
            App.sidebarRegion.show(App.views.sidebar);
        },
        player:function(id) {
            App.views.player = new PlayerView({currentMovie:id});
            App.playerRegion.show(App.views.player);
        }
    });
});