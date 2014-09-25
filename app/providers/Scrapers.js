 define(['jquery', 'underscore', 'backbone', 'models/Movie', 'providers/Ysubs', 'others/Cache', 'providers/trakttv', 'async'],
    function($, _, Backbone, Movie, Ysubs, Cache, trakt, async) {

    function request (uri, options, callback) {
        if (typeof uri === 'undefined') throw new Error('undefined is not a valid uri or options object.');
        if ((typeof options === 'function') && !callback) callback = options;
        if (options && typeof options === 'object') {
            options.uri = uri;
        } else if (typeof uri === 'string') {
            options = {uri:uri};
        } else {
            options = uri;
        }

        var jqueryOptions = {
            url: options.uri || options.url
        };

        if(options.json)
            jqueryOptions.dataType = 'json';
        if(options.headers)
            jqueryOptions.headers = options.headers;
        if(options.method)
            jqueryOptions.type = options.method;
        if(options.body)
            jqueryOptions.data = options.body.toString();
        if(options.timeout)
            jqueryOptions.timeout = options.timeout;

        $.ajax(jqueryOptions)
            .done(function(data, status, xhr) {
                console.debug("%O", data);
                callback(undefined, xhr, data);
            })
            .fail(function(xhr, status, err) {
                console.error("%O", data);
                callback(err, xhr, undefined);
            });
    }
    function getStars(p_rating){
        var stars = {
            full:0,
            half:false,
            empty:0
        };
        p_rating = Math.round(p_rating) / 2; // Roundoff number to nearest 0.5 %>

        for (var i = 1; i <= Math.floor(p_rating); i++) {
          stars.full ++;
        }

        stars.empty = 5 - stars.full;

        if (p_rating % 1 > 0) {
          stars.half = true;
          stars.empty --;
        }

        return stars;
    }

    // Hack to keep to cancel the request in case of new request
    var currentRequest = null;
    var Yts = Backbone.Collection.extend({
        apiUrl:"https://yts.re/api/list.json?sort=seeds&limit=30",
        model: Movie,
        movies: [],

        initialize: function(options) {
            this.createUrl(options);
        },

        createUrl:function(options){
            if(!options) return;
            if (options.keywords) {
                this.apiUrl += '&keywords=' + options.keywords;
            }

            if (options.genre) {
                if (options.genre == 'date') {
                  this.apiUrl += '&genre=all&sort=date';
                } else {
                  this.apiUrl += '&genre=' + options.genre;
                }
            }

            if (options.page) {
                this.apiUrl += '&set=' + options.page;
            }

            this.options = options;
            Yts.__super__.initialize.apply(this, arguments);
        },

        addMovie: function(model) {
            var stored = _.find(this.movies, function(movie) { return (movie.imdb == model.imdb); });

            // Create it on memory map if it doesn't exist.
            if (typeof stored === 'undefined') {
                stored = model;
            }

            if (stored.quality !== model.quality && model.quality === '720p') {
                stored.torrent = model.torrent;
                stored.quality = '720p';
            }

            // Set it's correspondent quality torrent URL.
            stored.torrents[model.quality] = model.torrent;

            // Push it if not currently on array.
            if (this.movies.indexOf(stored) === -1) {
                this.movies.push(stored);
            }
        },

        fetch: function(options) {
            this.createUrl(options);

            var collection = this;
            collection.trigger('loading');

            this.movies = [];

            if(currentRequest) {
                currentRequest.abort();
            }

            console.debug('Requesting from YTS: %s', this.apiUrl);
            console.time('YTS Request Took');
            var thisRequest = request(this.apiUrl, {json: true}, function(err, res, ytsData) {
                console.timeEnd('YTS Request Took');
                var i = 0;

                if(err) {
                    collection.trigger('error');
                    return;
                }

                if (ytsData.error || typeof ytsData.MovieList === 'undefined') {
                    collection.set(collection.movies);
                    collection.trigger('loaded');
                    return;
                }

                var imdbIds = _.unique(_.pluck(ytsData.MovieList, 'ImdbCode'));

                Ysubs.fetch(_.map(imdbIds, function(id){return id.replace('tt','');}))
                .then(function(subtitles) {
                    async.filterSeries(
                      imdbIds,
                      function(cd, cb) { Cache.getItem('trakttv', cd, function(d) { cb(d === undefined); }); },
                      function(imdbCodes) {

                        var traktMovieCollection = new trakt.MovieCollection(imdbCodes);

                        traktMovieCollection.getSummaries(function(trakData) {
                            // Check if new request was started
                            if(thisRequest !== currentRequest) return;

                            i = ytsData.MovieList.length;
                            ytsData.MovieList.forEach(function (movie) {
                                // No imdb, no movie.
                                if( typeof movie.ImdbCode != 'string' || movie.ImdbCode.replace('tt', '') === '' ){ return; }

                                var traktInfo = _.find(trakData, function(trakMovie) { return trakMovie.imdb_id == movie.ImdbCode; });

                                var torrents = {};
                                torrents[movie.Quality] = movie.TorrentUrl;

                                var imdbId = movie.ImdbCode.replace('tt', '');
                                var voteAverage = movie.MovieRating ? parseFloat(movie.MovieRating).toFixed(1) : 0.0;
                                // Temporary object
                                var movieModel = {
                                    imdb:       imdbId,
                                    title:      movie.MovieTitleClean.replace(/\([^)]*\)|1080p|DIRECTORS CUT|EXTENDED|UNRATED|3D|[()]/g, ''),
                                    year:       movie.MovieYear,
                                    runtime:    0,
                                    synopsis:   '',
                                    voteAverage:voteAverage,
                                    stars:      getStars(voteAverage),
                                    is720p:     (movie.Quality === '720p'),
                                    is1080p:    (movie.Quality === '1080p'),
                                    hasSDAndHD: (movie.Quality === '720p' && movie.Quality === '1080p'),

                                    image:      movie.CoverImage.replace(/_med\./, '_large.'),
                                    bigImage:   movie.CoverImage.replace(/_med\./, '_large.'),
                                    backdrop:   '',

                                    quality:    movie.Quality,
                                    torrent:    movie.TorrentUrl,
                                    torrents:   torrents,
                                    videos:     {},
                                    subtitles:  subtitles[imdbId],
                                    seeders:    movie.TorrentSeeds,
                                    leechers:   movie.TorrentPeers,

                                    // YTS do not provide metadata and subtitle
                                    hasSubtitle:true
                                };

                                if(traktInfo) {
                                    movieModel.image = trakt.resizeImage(traktInfo.images.poster, '138');
                                    movieModel.bigImage = trakt.resizeImage(traktInfo.images.poster, '300');
                                    movieModel.backdrop = trakt.resizeImage(traktInfo.images.fanart, '940');
                                    movieModel.synopsis = traktInfo.overview;
                                    movieModel.runtime = +traktInfo.runtime;
                                    Cache.setItem('trakttv', traktInfo.imdb_id, traktInfo);
                                    console.warn('Trakt.tv Cache Miss %O', traktInfo);
                                    collection.addMovie(movieModel);
                                    if(--i === 0) {
                                        collection.set(collection.movies);
                                        collection.trigger('loaded');
                                    }
                                } else {
                                    Cache.getItem('trakttv', movie.ImdbCode, function(traktInfo) {
                                        if(traktInfo) {
                                            movieModel.image = trakt.resizeImage(traktInfo.images.poster, '138');
                                            movieModel.bigImage = trakt.resizeImage(traktInfo.images.poster, '300');
                                            movieModel.backdrop = trakt.resizeImage(traktInfo.images.fanart, '940');
                                            movieModel.synopsis = traktInfo.overview;
                                            movieModel.runtime = +traktInfo.runtime;
                                        }
                                        console.debug('Trakt.tv Cache Hit %O', traktInfo);
                                        collection.addMovie(movieModel);
                                        if(--i === 0) {
                                            console.log(collection.movies);
                                            collection.set(collection.movies);
                                            collection.trigger('loaded');
                                        }
                                    });
                                }
                            });
                        });
                    });
                });
            });
            currentRequest = thisRequest;
        }
    });

    return Yts;
});