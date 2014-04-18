// Opens a streaming torrent client

var videoStreamer = null;

var playTorrent = window.playTorrent = function (torrent, subs, movieModel, callback, progressCallback) {
  $.ajax({
	  //PC server ip
    url:"http://192.168.1.144:3000/?torrent="+torrent,
    dataType:'text',
    type:'GET',
    success:function( data ) {
      spawnVideoPlayer(data);
    }
  });
  
};

function videoError(e) {
  // video playback failed - show a message saying why
  // TODO: localize
  switch (e.code) {
    case e.MEDIA_ERR_ABORTED:
      return 'The video playback was aborted.';
    case e.MEDIA_ERR_NETWORK:
      return 'A network error caused the video download to fail part-way.';
    case e.MEDIA_ERR_DECODE:
      return 'The video playback was aborted due to a corruption problem or because the video used features your browser did not support.';
    case e.MEDIA_ERR_SRC_NOT_SUPPORTED:
      return 'The video format is not supported.';
    default:
      return 'An unknown error occurred.';
   }
}


// Handles the opening of the video player

window.spawnVideoPlayer = function (url, subs, movieModel) {

    // Sort sub according lang translation
    var subArray = [];
    for (var lang in subs) {
        if( !App.Localization.languages[lang].subtitle ){ continue; }
        subArray.push({
            'language': lang,
            'languageName': App.Localization.languages[lang].display,
            'sub': subs[lang]
        });
    }
    subArray.sort(function (sub1, sub2) {
        return sub1.language > sub2.language;
    });

    var subtracks = '';
    for(var index in subArray ) {
      subtracks += '<track kind="subtitles" src="' + subArray[index].sub + '" srclang="'+ subArray[index].language +'" label="' + subArray[index].languageName + '" charset="utf-8" />';
    }

    var player =
      '<video autoplay id="video_player" width="100%" height="100%" class="video-js vjs-default-skin" controls preload>' +
        '<source src="' + url + '" type="video/mp4" />' +
        subtracks +
      '</video>' +
      '<a href="javascript:;" id="video_player_close" class="btn-close"><img src="/images/close.svg" width="50" /></a>';

    if (!document.createElement('video').canPlayType('video/mp4')) {
      return alert('Weird, but it seems the application is broken and you can\'t play this video.');
    }

    // Move this to a separate view.
    $('#video-container').html(player).show();
    $('body').removeClass().addClass('watching');

    

    // Double Click to toggle Fullscreen
    $('#video-container video').dblclick(function(event){
      $('.vjs-fullscreen-control').trigger('click');
    });

    // Init video.
    var video = window.videoPlaying = videojs('video_player', { plugins: { biggerSubtitle : {}, smallerSubtitle : {}, customSubtitles: {} }});

    /*if(movieModel.has('resumetime')) {
      video.currentTime(movieModel.get('resumetime'));
    }*/

    // Enter full-screen
    $('.vjs-fullscreen-control').on('click', function () {
      if(win.isFullscreen) {
        win.leaveFullscreen();
        win.focus();
      } else {
        win.enterFullscreen();
        win.focus();
      }
    });

    // Exit full-screen
    $(document).on('keydown', function (e) {
      if (e.keyCode == 27) {
        if(win.isFullscreen) {
          win.leaveFullscreen();
          win.focus();
        }
      }
    });


    tracks = video.textTracks();
    for( var i in tracks ) {
      tracks[i].on('loaded', function(){
        // Trigger a resize to get the subtitles position right
        $(window).trigger('resize');
      });
    }


    var getTimeLabel = function() {
      // Give the time in 1 minute increments up to 5min, from then on report every 5m up to half an hour, and then in 15' increments
      var timeLabel = ''
      if( video.currentTime() <= 5*60 ) {
        timeLabel = Math.round(video.currentTime()/60)+'min';
      } else if( video.currentTime() <= 30*60 ) {
        timeLabel = Math.round(video.currentTime()/60/5)*5+'min';
      } else {
        timeLabel = Math.round(video.currentTime()/60/15)*15+'min';
      }

      return timeLabel;
    };


    // Close player
    $('#video_player_close').on('click', function () {
      win.leaveFullscreen();
      if(video.duration() - video.currentTime() > 300) // 5 mins
        movieModel.set('resumetime', video.currentTime());
      $('#video-container').hide();
      video.dispose();
      $('body').removeClass();
      $(document).trigger('videoExit');
    });


    // Had only tracking in, leave it here if we want to do something else when paused.
    video.player().on('pause', function () {

    });

    video.player().on('play', function () {
      // Trigger a resize so the subtitles are adjusted
      $(window).trigger('resize');
    });

    // There was an issue with the video
    video.player().on('error', function (error) {
      // TODO: what about some more elegant error tracking
      alert('Error: ' + videoError(document.getElementById('video_player').player.error()));
    });

    App.loader(false);
};


// Change the subtitle size on resize so it fits the screen proportionally
jQuery(function ($) {
  $(window).resize(function(){

    // Calculate a decent font size
    // Baseline: WindowHeight:600px -> FontSize:20px
    var font_size = Math.ceil($(window).height() * 0.0333333);
    var min_font_size = 18;
    font_size = font_size < min_font_size ? min_font_size : font_size

    $('#video-container').css('font-size', font_size+'px');

    // And adjust the subtitle position so they always match the bottom of the video
    var $video = $('#video-container video');
    var $subs = $('#video-container .vjs-text-track-display');

    if( $video.length && $subs.length ) {
      if( $video[0].videoWidth > 0 && $video[0].videoHeight > 0 ) {
        var ratio = $video[0].videoWidth / $video[0].videoHeight;
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        var realVideoHeight = windowWidth / ratio;
        realVideoHeight = realVideoHeight > windowHeight ? windowHeight : realVideoHeight;

        var bottomOffset = (windowHeight - realVideoHeight) / 2;

        $subs.css('bottom', bottomOffset+'px');
      }
    }

  }).trigger('resize');
});
