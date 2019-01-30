import React, { Component } from 'react';
import API_KEYS from './components/config/apiKeys.js';
import './index.css';
import './App.scss';
import triggerKeys from './components/config/triggerKeys.js';
import YoutubeSearch from 'youtube-search';
import YoutubePlayer from './components/Youtube/YoutubePlayer';
import Question from './components/Question/Question';

const opts = {
  maxResults: 1,
  key: API_KEYS.youtube,
  type: 'video'
};

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      youtube: '',
      question: ''
    };
  };

  commandTrigger = (userInput) => {    
    if ( userInput.match(triggerKeys.youtube) ) {
      const strippedInput = userInput.replace(triggerKeys.youtube,"");
      document.querySelector('.output').textContent = `SEARCHING YOUTUBE FOR... ${strippedInput}`;

      YoutubeSearch(strippedInput, opts, (err, results) => {
        if(err) return console.log(err);
        const id = results[0].id;
        this.setState({ youtube: id });
      });
    } else if ( userInput.match(triggerKeys.question) ) {
      this.setState({ question: userInput });
    }
  }

  startListening = () => {
    const audioContext = new AudioContext();
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-GB';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const output = document.querySelector('.output');
    output.innerHTML = 'Listening...';

    // START MICROPHONE Courtesy www.0AV.com, LGPL license or as set by forked host, Travis Holliday, https://codepen.io/travisholliday/pen/gyaJk (modified by fixing for browser security change)
    console.log ("starting microphone...");
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({
        audio: true
      }, function(stream) {
        // const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;
        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);
        const microphoneFeedback = document.querySelector(".microphoneFeedback");
        javascriptNode.onaudioprocess = function() {
          var array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          var values = 0;
          var length = array.length;
          for (var i = 0; i < length; i++) {
            values += (array[i]);
          }
          var average = (values / length)/100;
          console.log(average);
          microphoneFeedback.style.transform = `scale(${average})`;
          //console.log(Math.round(average - 40));
          // canvasContext.clearRect(0, 0, 150, 300);
          // canvasContext.fillStyle = '#FF0A55'; //was BadA55 (very cute)
          // canvasContext.fillRect(0, 300 - average, 150, 300);
          // canvasContext.fillStyle = '#F62626';
          // canvasContext.font = "24px impact";
          // canvasContext.fillText(Math.round(average - 40), 2, 30);
          // console.log (average);
        } // end fn stream
      },
      function(err) {
        console.log("The following error occured: " + err.name)
      });
    } else {
      console.log("getUserMedia not supported");
    }
    // END MICROPHONE

    recognition.start();

    recognition.onresult = (event) => {
      let { transcript } = event.results[0][0];
      transcript = transcript.toLowerCase();
      this.commandTrigger(transcript);
      audioContext.close();
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };

    recognition.onerror = (event) => {
      const { error } = event;
      output.textContent = `Error occurred: ${error}`;
    };
  }

  render() {
    return (
      <div>
        <h1>Questions you can ask</h1>
        <p>"{triggerKeys.youtube}"...</p>
        <p>"{triggerKeys.question}"...</p>
        <div className="microphoneFeedback"></div>
        <button 
          className="click-me" 
          type="button" 
          onClick={this.startListening}
        >
          Click Me
        </button>
        <div>
          <p className="output"></p>
        </div>
        <YoutubePlayer youtubeId={this.state.youtube} />
        <Question question={this.state.question} />
      </div>
    );
  }
}

export default App;
