
var baseUrl = "https://api.twitch.tv/kraken/";
var key = '6wylb6zv5mwedveu29d73wrtosoxy2'
//var testStreamerArr = ["comster404","freecodecamp","lovelymomo", "northernlion", "Bacon_Donut"]
var streamerArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404" , "brunofin" ]
// fake streamer obj to enter if streamer doesn't exist
var fakeStreamer = {
  "logo": "https://i.ytimg.com/vi/C_zEaYghRoY/hqdefault.jpg"

}

// Creating the layout for list
function channelInfo(channel, name, status){
  if(status === "online"){
    $(".streamers").append(`
      <div class="test-box `+ status +`">
        <div class="pic box">
          <img  src="` + channel.logo + `">
        </div> <div class="info box">
          <h3><a href="`+ channel.url + `" target="_blank">`+ name +`</a></h3>
          <p>`+ channel.game +`</p>
        </div>
        <div class="status box">
          <p> ` + status + ` </p>
        </div>
      </div>`)
  }else if(status === "offline"){
    $(".streamers").append(`
      <div class="test-box `+ status +`">
        <div class="pic box">
          <img  src="` + channel.logo + `">
        </div> <div class="info box">
          <h3><a href="`+ channel.url + `" target="_blank">`+ name +`</a></h3>
        </div>
        <div class="status box">
          <p> ` + status + ` </p>
        </div>
      </div>`)
  }else{
    console.log("here")
    $(".streamers").append(`
      <div class="test-box `+ status +`">
        <div class="pic box">
          <img  src="` + channel.logo + `">
        </div> <div class="info box">
          <h3>`+ name +`</h3>
        </div>
        <div class="status box">
          <p> ` + status + ` </p>
        </div>
      </div>`)
  }

}

//checking to see if the streamer is online
function fillingIn(obj){
  $.ajax({
   type: 'GET',
   url: baseUrl + "streams/" + obj.name,
   headers: {
     'Client-ID': key
   },
   success: function(Data) {
     if(Data.stream === null){
       channelInfo(obj, obj.display_name, "offline")
     }else{
       channelInfo(obj, obj.display_name, "online")
     }


   },
   error: function(e){
     console.log(e)
   }

  });
}

//checking to see if the Streamer exists
function checkStatus(arr){
  for(let i = 0; i < arr.length; i++){
    $.ajax({
     type: 'GET',
     url: baseUrl + "channels/" + arr[i],
     headers: {
       'Client-ID': key
     },
     success: function(data) {
      fillingIn(data)

     },
     error: function(e){
       channelInfo(fakeStreamer, arr[i], "closed")
     }

    });
  }
}

// setting everything in motion
$(document).ready(function() {
    checkStatus(streamerArr)

    $("#buttonAll").click(function() {
      $(".online").css("display", "");
      $(".offline").css("display", "");
      $(".closed").css("display", "");
    })
    $("#buttonOff").click(function() {
      $(".online").css("display", "none");
      $(".closed").css("display", "none");
      $(".offline").css("display", "");
    })
    $("#buttonOnline").click(function() {
      $(".offline").css("display", "none");
      $(".closed").css("display", "none");
      $(".online").css("display", "");
    })

});
