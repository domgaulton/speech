var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
// var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
// var speechRecognitionList = new SpeechGrammarList();
// speechRecognitionList.addFromString(grammar, 1);
// recognition.grammars = speechRecognitionList;
//recognition.continuous = false;

recognition.lang = 'en-GB';
recognition.interimResults = false;
recognition.maxAlternatives = 3;

var clickMe = document.querySelector('.click-me');
var diagnostic = document.querySelector('.output');
var transcript = document.querySelector('.transcript');
var bg = document.querySelector('html');
var speech;

clickMe.onclick = function() {
	
	console.log('Listening...');
	diagnostic.innerHTML = 'Listening...';
	recognition.start();
}

recognition.onresult = function(event) {
	// The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
	// The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
	// It has a getter so it can be accessed like an array
	// The [last] returns the SpeechRecognitionResult at the last position.
	// Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
	// These also have getters so they can be accessed like arrays.
	// The [0] returns the SpeechRecognitionAlternative at position 0.
	// We then return the transcript property of the SpeechRecognitionAlternative object

	console.log(event);

	// var last = event.results.length - 1;
	// var speech = event.results[last][0].transcript;
	
	var speech = event.results[0][0].transcript;

	diagnostic.textContent = 'Result received: ' + speech + '. Confidence Level: ' + event.results[0][0].confidence;
	transcript.textContent = speech;
	// bg.style.backgroundColor = speech;
	// console.log('Confidence: ' + event.results[0][0].confidence);

	search(speech);
}

recognition.onspeechend = function() {
	recognition.stop();
}

recognition.onnomatch = function(event) {
	diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
	// console.log(event.error);
	diagnostic.textContent = 'Error occurred: ' + event.error;

}

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

function search(result) {
	console.log('search'+result);
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
    var id = response.items[0].id.videoId;
    console.log(id);
}
