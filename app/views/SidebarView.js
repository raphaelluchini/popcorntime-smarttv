define( ['App', 'jquery', 'backbone', 'marionette', 'hbs!templates/sidebar'],
    function(App, $, Backbone, Marionette, template) {
        return Backbone.Marionette.ItemView.extend( {
            template:template,
            className:"sidebar",
            events: {
                'click .closer':           'hide',
                'click .play-button':      'play',
                'click #switch-on':        'enableHD',
                'click #switch-off':       'disableHD'
            },

            initialize: function (options) {
                this.model = App.Scrapers.get(options.currentMovie);
                if(!this.model){
                    this.$el.addClass('hidden');
                    Backbone.history.navigate("#/");
                }else{
                    this.show();
                }
            },

            serializeData:function(){
                return _.extend({}, this.model.attributes, App.currentJsonLocale);
            },

            show: function() {
                this.$el.removeClass('hidden');

                this.backdropCache = new Image();
                this.backdropCache.src = this.model.get('backdrop');
                this.backdropCache.onload = function () {
                    $(".backdrop-image").addClass("loaded");
                };
            },

            hide: function () {

                $('.movie.active').removeClass('active');
                this.$el.addClass('hidden');

                if( typeof this.backdropCache != 'undefined' ) {
                    this.backdropCache.src = null;
                }

                Backbone.history.navigate("#/");
            },

            enableHD: function (evt) {

                var torrents = this.model.get('torrents');
                console.log('HD Enabled');

                if(torrents['1080p'] !== undefined) {
                    this.model.set('torrent', torrents['1080p']);
                    this.model.set('quality', '1080p');
                }
            },

            disableHD: function (evt) {

                var torrents = this.model.get('torrents');
                console.log('HD Disabled');

                if(torrents['720p'] !== undefined) {
                    this.model.set('torrent', torrents['720p']);
                    this.model.set('quality', '720p');
                }
            },

            play: function (evt) {
                //evt.preventDefault();
                // if( videoStreamer !== null ){ return; }

                //Unfocus "Watch now" button
                this.$el.find('.play-button').blur();

                var file = this.model.get('torrent'),
                    subs = this.model.get('subtitles');

                $('.popcorn-load').addClass('withProgressBar').addClass('cancellable').find('.progress').css('width', 0.0+'%');
                $('.popcorn-load .progressinfo').text( i18n.__('connecting') );
                $('body').addClass('loading');
            }
        });
    });