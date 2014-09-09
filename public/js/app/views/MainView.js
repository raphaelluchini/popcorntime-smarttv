define( ['App', 'backbone', 'marionette', 'jquery', 'hbs!templates/main', 'models/Model'],
    function(App, Backbone, Marionette, $, template, Model) {
        //App.Scrapers.addMovie({});

        return Backbone.Marionette.ItemView.extend( {
            template: template,
            model: new Model({
                movies:['Bla', 'bla']
            })
        });
    });