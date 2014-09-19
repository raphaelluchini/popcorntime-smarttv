define(['jquery', 'underscore', 'hbs!templates/catalogMovieView', 'backbone', 'marionette'],
    function ($, _, template, Backbone, Marionette) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            tagName: 'li',
            template: template,
            serializeData:function(){
                return _.extend({}, this.model.attributes, {
                    title: this.model.getShortTitle()
                });
            },
            select: function (evt) {
                // evt.stopPropagation();
                // evt.preventDefault();

                // if (this.$el.hasClass('active')) {
                //     this.$el.removeClass('active');
                //     App.sidebar.hide();
                // } else {
                //     this.$el.parent().find('.active').removeClass('active');
                //     this.$el.addClass('active');
                //     console.logger.info('Loading model %O', this.model);
                //     App.sidebar.load(this.model);
                // }
            }
        });
    }
);