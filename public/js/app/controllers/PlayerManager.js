define(['App', 'backbone'],
    function (App, Backbone) {
        function PlayerManager(){
            
        }
        
        PlayerManager.prototype.init = function(file, subtitles, callback, progressCallback){
            console.log(file, subtitles, callback, progressCallback);
        };

        PlayerManager.prototype.play = function(){
            console.log('play');
        };

    return PlayerManager;
});