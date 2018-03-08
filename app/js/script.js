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

clickMe.onclick = function() {
	recognition.start();
	console.log('Listening...');
	diagnostic.innerHTML = 'Listening...';
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
	// var speech = 'hello';

	diagnostic.textContent = 'Result received: ' + speech + '. Confidence Level: ' + event.results[0][0].confidence;
	transcript.textContent = speech;
	bg.style.backgroundColor = speech;
	console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
	recognition.stop();
}

recognition.onnomatch = function(event) {
	diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
	diagnostic.textContent = 'Error occurred: ' + event.error;
}

