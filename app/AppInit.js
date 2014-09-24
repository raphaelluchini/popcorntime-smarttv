require(["App", 'jquery', "routers/AppRouter", "controllers/AppController"],
    function (App, $, AppRouter, AppController) {
        var locale;
        try{
            locale = caph.config.i18n.getThisLanguage();
        }catch(error){
            locale = 'en';
        }
        $.getJSON('assets/language/'+ locale + '.json').then(function (json) {
            App.currentJsonLocale = json;
            
            App.appRouter = new AppRouter({
                controller:new AppController()
            });
            App.start();
        });
    });