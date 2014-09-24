define(['App','jquery', 'underscore', 'hbs!templates/catalogMovieView', 'backbone', 'marionette'],
    function (App, $, _, template, Backbone, Marionette) {
        return Backbone.Marionette.ItemView.extend({
            tagName: 'li',
            template: template,
            events:{
                'click a': 'select'
            },
            serializeData:function(){
                return _.extend({}, this.model.attributes, {
                    title: this.model.getShortTitle()
                });
            },
            select: function (event) {
                event.preventDefault();
                Backbone.history.navigate("#/details/" + this.model.get('imdb'));
            }
        });
    }
);