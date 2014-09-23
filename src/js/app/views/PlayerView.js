define(['App', 'jquery', 'underscore', 'hbs!templates/player', 'backbone', 'controllers/PlayerManager'],
    function (App, $, _, template, Backbone, PlayerManager) {
        return Backbone.Marionette.ItemView.extend({
            template: template,
            className:"player",
            events:{
                'click #video_player_close': 'close'
            },
            initialize:function(options){
                this.$el.removeClass('hidden');
                this.model = App.Scrapers.get(options.currentMovie);
                var playerManager = new PlayerManager();

                playerManager.init(this.model.get('torrent'), this.model.get('subtitles'),
                    function(data){
                        //this.model.set({'url':data});
                        playerManager.play(data);
                    },
                    function(percent){

                        // Loading Progress Handler. Percent is 5% + Actual progress, to keep the progressbar moving even when it's at the min-width
                        var $progress = $('.popcorn-load').find('.progress');
                        var minWidth = parseFloat($progress.css('min-width'));
                        percent = minWidth + percent * ((100.0-minWidth)/100.0);
                        percent = percent > 100.0 ? 100.0 : percent;
                        $('.popcorn-load').find('.progress').css('width', percent+'%');

                        // // Update the loader status
                        var bufferStatus = 'connecting';
                        if( videoStreamer.peers.length > 0 ) {
                            bufferStatus = 'startingDownload';
                            if( videoStreamer.downloaded > 0 ) {
                                bufferStatus = 'downloading';
                            }
                        }

                        if( bufferStatus != previousStatus ) {
                            previousStatus = bufferStatus;
                        }

                        $('.popcorn-load .progressinfo').text( i18n.__(bufferStatus) );
                    }
                );
            },

            show:function(){},

            close:function(){
                window.location = "/#/details/" + this.model.get('imdb');
                App.playerRegion.empty();
            }
        });
    }
);