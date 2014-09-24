define( ['App', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/menu'],
    function(App, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,
            model: new Model({
                defaultGenere:'All',
                generes:['All']
            }),

            // View Event Handlers
            events: {

            }
        });
    });