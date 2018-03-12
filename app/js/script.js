var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
// var SpeechSynthesisUtterance = SpeechSynthesisUtterance || webkitSpeechSynthesisUtterance

// var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
// var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
// var utterance = new SpeechSynthesisUtterance();

// var speechRecognitionList = new SpeechGrammarList();
// speechRecognitionList.addFromString(grammar, 1);
// recognition.grammars = speechRecognitionList;
//recognition.continuous = false;

recognition.lang = 'en-GB';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var clickMe = document.querySelector('.click-me');
var diagnostic = document.querySelector('.output');
var transcript = document.querySelector('.transcript');
var titleField = document.querySelector('.title');
var ytIDField = document.querySelector('.ytID');
var thumbnailField = document.querySelector('.thumbnail');
var ytPlayer = document.querySelector('#player');

// var bg = document.querySelector('html');
var speech;

clickMe.onclick = function() {
	
	// console.log('Listening...');
	diagnostic.innerHTML = 'Listening...';
	
  recognition.start();
  //answerMe('what is the share price of twitter');

}

// recognition.onsoundstart = function(event) {
//   console.log(event);
//   // utterance.volume();
// }


recognition.onresult = function(event) {
	// The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
	// The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
	// It has a getter so it can be accessed like an array
	// The [last] returns the SpeechRecognitionResult at the last position.
	// Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
	// These also have getters so they can be accessed like arrays.
	// The [0] returns the SpeechRecognitionAlternative at position 0.
	// We then return the transcript property of the SpeechRecognitionAlternative object

	// console.log(event);

	// var last = event.results.length - 1;
	// var speech = event.results[last][0].transcript;
	
	var speech = event.results[0][0].transcript;

	// diagnostic.textContent = 'Result received: ' + speech + '. Confidence Level: ' + event.results[0][0].confidence;
	
	diagnostic.textContent = "You said: " + speech;
	//transcript.textContent = speech;
	// bg.style.backgroundColor = speech;
	// console.log('Confidence: ' + event.results[0][0].confidence);

  if ( speech.startsWith("play") ) {
    searchYouTube(speech);
  } else {
    answerMe(speech);
  }
}

recognition.onspeechend = function() {
	recognition.stop();
}

// recognition.onnomatch = function(event) {
// 	diagnostic.textContent = "I didn't recognise that color.";
// }

recognition.onerror = function(event) {
	// console.log(event.error);
	diagnostic.textContent = 'Error occurred: ' + event.error;
}

function answerMe(question) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.wolframalpha.com/v1/result?i=' + question + '&appid=27LAYV-JVWUHLR5JQ');
  xhr.send(null);

  xhr.onreadystatechange = function () {
  var DONE = 4; // readyState 4 means the request is done.
  var OK = 200; // status 200 is a successful return.
  if (xhr.readyState === DONE) {
    if (xhr.status === OK) 
      titleField.textContent = xhr.responseText; // 'This is the returned text.'
      console.log(xhr.responseText);
    } else {
      titleField.textContent = 'Error: ' + xhr.status; // An error occurred during the request.
      console.log(xhr.status);
    }
  }
};



// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

// Helper function to display JavaScript value on HTML page.
// function showResponse(response) {
//     var responseString = JSON.stringify(response, '', 2);
//     document.getElementById('response').innerHTML += responseString;
// }

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyACNt99PoY7u7F7qWZY5eRIRO2ag6HRB-o');

    // search();
}

function searchYouTube(result) {
	// console.log('search'+result);
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: result
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    // showResponse(response);
    // console.log(response);
    // console.log(response);
    
    var title = response.items[0].snippet.title;
    var ytID = response.items[0].id.videoId;
    // var thumbnail = response.items[0].snippet.thumbnails.medium.url;

    // ytPlayer.getAttribute('title') ? player.loadVideoById(ytID) : youtubePlayer(ytID);

    titleField.textContent = title;
    // ytIDField.textContent = ytID;
    // thumbnailField.src = thumbnail;

    if ( document.querySelector('#player').getAttribute('title') ) {
      // console.log('title exists');
      player.loadVideoById(ytID)
    } else {
      // console.log('title doesnt exist');
      youtubePlayer(ytID);
    }


    // console.log(id);
}


// // 2. This code loads the IFrame Player API code asynchronously.
// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

var player;

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('player', {
//     height: '390',
//     width: '640',
//     videoId: 'IutULT1kVMA',
//     events: {
//       'onReady': onPlayerReady
//       // 'onStateChange': onPlayerStateChange
//     }
//   });
// }

function youtubePlayer(ytID) {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: ytID,
    events: {
      'onReady': onPlayerReady
      // 'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	event.target.playVideo();
}

// // 5. The API calls this function when the player's state changes.
// //    The function indicates that when playing a video (state=1),
// //    the player should play for six seconds and then stop.
// var done = false;
// function onPlayerStateChange(event) {
// if (event.data == YT.PlayerState.PLAYING && !done) {
//   setTimeout(stopVideo, 6000);
//   done = true;
// }
// }
// function stopVideo() {
// player.stopVideo();
// }

