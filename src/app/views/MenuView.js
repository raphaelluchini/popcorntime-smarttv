define( ['App', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/menu'],
    function(App, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            id:'catalog-select',
            template: template,
            className:'categories',
            initialize:function(){
                this.model = new Model({
                    genres:App.currentJsonLocale.genres
                });

                $('.categories li').addClass("active");
            },

            // View Event Handlers
            events: {
                'click a':'click'
            },

            click:function(event){
                if($(event.currentTarget).parent().hasClass('active')) return;

                App.Scrapers.fetch({
                    keywords: null,
                    genre: $(event.currentTarget).attr('data-genre'),
                    page: 1
                });

                $('.categories li').each(function(){
                  $(this).removeClass("active");
                });

                $(event.currentTarget).parent().addClass("active");
            },

            serializeData:function(){
                console.log('serializa');
                return _.extend({}, this.model.attributes, App.currentJsonLocale);
            }
        });
    });