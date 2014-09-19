define( ['App', 'jquery', 'backbone', 'marionette', 'hbs!templates/sidebar'],
    function(App, $, Backbone, Marionette, template) {
        return Backbone.Marionette.ItemView.extend( {
            template:template,
            
            events:{
                'click .closer':'onClose'
            },

            initialize: function (options) {
                this.model = App.Scrapers.get(options.currentMovie);
            },

            onClose: function(){
                $('#sidebar').addClass('hidden');
            },

            onRender: function(){
                $('#sidebar').removeClass('hidden');
            }
        });
    });