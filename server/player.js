// Opens a streaming torrent client
// // os object


var videoStreamer = null;

exports.playTorrent = function (torrent, callback) {
  var os = require('os'),
  ip = "http://192.168.1.144"
  path = require('path'),
  MIN_PERCENTAGE_LOADED = 0.5,
  MIN_SIZE_LOADED = 10 * 1024 * 1024;

  //videoStreamer ? $(document).trigger('videoExit') : null;

  // Create a unique file to cache the video (with a microtimestamp) to prevent read conflicts
  var tmpFolder = path.join(os.tmpDir(), 'Popcorn-Time')
  var tmpFilename = ( torrent.toLowerCase().split('/').pop().split('.torrent').shift() ).slice(0,100);
  tmpFilename = tmpFilename.replace(/([^a-zA-Z0-9-_])/g, '_') + '.mp4';
  var tmpFile = path.join(tmpFolder, tmpFilename);
  
  var numCores = (os.cpus().length > 0) ? os.cpus().length : 1;
  var numConnections = 100;

  // Start Peerflix
  var peerflix = require('peerflix');

  
  videoStreamer = peerflix(torrent, {
    // Set the custom temp file
    path: tmpFile,
    //port: 554,
    buffer: (1.5 * 1024 * 1024).toString(),
    connections: numConnections
  }, function (err, flix) {
    console.log('Peerlix Server')
    if (err) throw err;

    var started = Date.now(),
      loadedTimeout;

    flix.server.on('listening', function () {
      var href = ip + ':' + flix.server.address().port + '/';
      
      if (typeof callback === 'function') {
        callback(href);
      }
      loadedTimeout ? clearTimeout(loadedTimeout) : null;

      console.log('Checking:')
      var checkLoadingProgress = function () {

        var now = flix.downloaded,
          total = flix.selected.length,
        // There's a minimum size before we start playing the video.
        // Some movies need quite a few frames to play properly, or else the user gets another (shittier) loading screen on the video player.
          targetLoadedSize = MIN_SIZE_LOADED > total ? total : MIN_SIZE_LOADED,
          targetLoadedPercent = MIN_PERCENTAGE_LOADED * total / 100.0,

          targetLoaded = Math.max(targetLoadedPercent, targetLoadedSize),

          percent = now / targetLoaded * 100.0;

        if (now > targetLoaded) {
          // if (typeof window.spawnVideoPlayer === 'function') {
          //   window.spawnVideoPlayer(href, subs, movieModel);
          // }
          console.log('loaded')
          if (typeof callback === 'function') {
            //callback(href, subs, movieModel);
          }
        } else {
          console.log('loading', percent, now, total)
          typeof progressCallback == 'function' ? progressCallback( percent, now, total) : null;
          loadedTimeout = setTimeout(checkLoadingProgress, 500);
        }
      };
      checkLoadingProgress();

    });
  });
};
//playTorrent('https://yts.re/download/start/D61ABDBD6A17D5FA2F116078A2FA20F02B07AF8F.torrent')