define( ['App', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/menu'],
    function(App, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,
            
            initialize:function(){
                this.model = new Model({
                    genres:App.currentJsonLocale.genres
                });
            },

            // View Event Handlers
            events: {

            },
            serializeData:function(){
                return _.extend({}, this.model.attributes, App.currentJsonLocale);
            }
        });
    });