require(["App", "routers/AppRouter", "controllers/AppController"],
    function (App, AppRouter, AppController) {
        App.appRouter = new AppRouter({
            controller:new AppController()
        });
        App.start();
    });