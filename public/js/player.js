const mixedTapeApp = {}
mixedTapeApp.appData = {},
mixedTapeApp.apikey = 'AIzaSyAJilIGstSZj3XljQMtpg5GhxoksVqPGkM';
var playlistId = $('#playlistId')[0].value;


mixedTapeApp.init = function(playlistId){
  var playlistId = $('#playlistId').val();
    mixedTapeApp.getPlaylist(playlistId);
    mixedTapeApp.getPlaylistItems(playlistId);  
  },

mixedTapeApp.getPlaylist = function(playlistId){
  //Get playlist ID from user input
  // var playlistId = $('#playlistId').val(); this is not necessary when I use "playlistId" as a parameter
  
  //define request HTTP from the user input of playlistId
  var playlistAPI = "https://www.googleapis.com/youtube/v3/playlists?part=snippet,player&id=" + playlistId + "&key=" + mixedTapeApp.apikey;
 
  $.ajax({
      url: playlistAPI,
      type:'GET',
      key:mixedTapeApp.apikey,
      dataType: 'jsonp', 
      data:{
        controls:'0'
      },
      success: mixedTapeApp.parseDataPlaylist

    });

};

//storing response
mixedTapeApp.parseDataPlaylist = function(response){
  console.log(response.items[0]);
  var playlistInfo = response.items[0].snippet;
  mixedTapeApp.appData.title = playlistInfo.title;
  mixedTapeApp.appData.date_time = playlistInfo.publishedAt;
  mixedTapeApp.appData.description = playlistInfo.description;
  mixedTapeApp.updateDom();
}

//print response to HTML
mixedTapeApp.updateDom = function(){
  //update data to HTML document
  $('#title').html(mixedTapeApp.appData.title);
  $('#date_time').html(mixedTapeApp.appData.date_time);
  $('#description').html(mixedTapeApp.appData.description);
};


mixedTapeApp.itemsDisplay={};
mixedTapeApp.itemsData = {};

//get videos's thumbnails and titles from playlistitems API
mixedTapeApp.getPlaylistItems = function(playlistId){
  var playlistItemsAPI = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId='+playlistId+'&key='+mixedTapeApp.apikey;
  console.log(playlistItemsAPI);

  $.ajax({
      url: playlistItemsAPI,
      type:'GET',
      key:mixedTapeApp.apikey,
      dataType: 'jsonp', 
      maxResults:10,
      success: function(result){
        mixedTapeApp.displayThumb(result.items);
        console.log(result.items);
        nextPageToken = result.nextPageToken;         
      }
    });

//Display thumbnails and titles on HTML
mixedTapeApp.displayThumb = function(result){
  $.each(result,function(i, thumb){
    var image = $('<img>').attr('src', thumb.snippet.thumbnails.default.url);
    var title = $('<h4>').text(thumb.snippet.title);
    var thumbList = $('<div>').addClass('thumbnail').append(image,title);
    $('#thumbnails').append(thumbList);
    })
  };
};

$(function(){
  //Initialize mixedTape app when user click the button to pass their playlist ID
  $('#submit').on('click',function(e){
    e.preventDefault();
    mixedTapeApp.init(playlistId);
    $('#thumbnails').empty();

  });
});

// Load the IFrame Player API code asynchronously.
  function loadAPI(){
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  console.log('Player API is loading');
  };

// Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.   
  var player;
  window.onYouTubePlayerAPIReady = function() {
    console.log("API Ready!");
  var playlistId = $('#playlistId')[0].value;
    player = new YT.Player('ytplayer', {
      height: '156',
      width: '250',
      playerVars:{
        controls:0,
        listType: 'playlist',
        list: playlistId
      },
    });  
    console.log(playlistId);
  };

  
//customized control buttons
  $('#bt_play').on('click', function(){
    player.playVideo();
  });
  $('#bt_pause').on('click', function(){
    player.pauseVideo();
  });
  $('#bt_stop').on('click', function(){
    player.stopVideo();
  });

  $('#toggle').on('click', function(e){
      e.preventDefault();
    $('#thumbnails').slideToggle('slow')
    if ($("#thumbnails").is(':visible')) {
     $("html, body").animate({scrollTop: $("#scrollHere").offset().top});
        }
    });

    

$(function(){
  $('#submit').on('click',function(e){
    e.preventDefault();
    loadAPI();

  });
    
});


  

