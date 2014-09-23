define(['jquery', 'underscore', 'hbs!templates/catalogMovieView', 'backbone', 'marionette'],
    function ($, _, template, Backbone, Marionette) {
        return Backbone.Marionette.ItemView.extend({
            tagName: 'li',
            template: template,
            events:{
                'click this':this.select
            },
            serializeData:function(){
                return _.extend({}, this.model.attributes, {
                    title: this.model.getShortTitle()
                });
            },
            select: function (event) {
                event.preventDefault();
                App.views.sidebar.show();
            }
        });
    }
);