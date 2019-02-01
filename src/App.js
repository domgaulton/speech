import React, { Component } from 'react';
import commandKeys from './config/commandKeys.js';
// import levels from './microphoneLevel.js';

import './index.css';
import './App.scss';

import Youtube from './components/Youtube/Youtube';
import Question from './components/Question/Question';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      youtube: '',
      question: ''
    };
  };

  commandTrigger = (userInput) => {    
    if ( userInput.match(commandKeys.youtube.searchTerm) ) {
      const strippedInput = userInput.replace(commandKeys.youtube.searchTerm,"");
      document.querySelector('.output').textContent = `${commandKeys.youtube.onResult} ${strippedInput}`;
      this.setState({ youtube: strippedInput });

    } else if ( userInput.match(commandKeys.question.searchTerm) ) {
      const strippedInput = userInput.replace(commandKeys.question.searchTerm,"");
      document.querySelector('.output').textContent = `${commandKeys.question.onResult} ${strippedInput}?`;
      this.setState({ question: strippedInput });
    }
    
  }

  startListening = () => {
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-GB';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const output = document.querySelector('.output');
    output.innerHTML = 'Listening...';

    // START MICROPHONE Courtesy www.0AV.com, LGPL license or as set by forked host, Travis Holliday, https://codepen.io/travisholliday/pen/gyaJk (modified by fixing for browser security change)
    // Variables Needed
    const audioContext = new AudioContext();
    const microphoneFeedback = document.querySelector(".microphoneFeedback");
    const microphoneUX = document.querySelector(".microphoneUX");

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({
        audio: true
      }, (stream) => {
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;
        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);
        javascriptNode.onaudioprocess = () => {
          const array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          let values = 0;
          const { length } = array;
          for (var i = 0; i < length; i++) {
            values += (array[i]);
          }
          const average = ((values / length) / 100) + 0.3;
          // console.log(average);
          microphoneFeedback.classList.add('listening');
          microphoneFeedback.style.transform = `scale(${average})`;
          microphoneFeedback.style.opacity = `${average*2}`;

          microphoneUX.classList.add('listening');
          microphoneUX.style.transform = `scale(${average * 1.4})`;
          microphoneUX.style.opacity = `${average*2}`;
          microphoneUX.style.borderRadius = `${average * 150}% / ${average * 50}%`;
          microphoneUX.style.animation = `rotating ${average}s linear infinite`;
        };
      },
      (err) => {
        console.log(`The following error occured: ${err.name}`);
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
      microphoneFeedback.classList.remove('listening');
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
        <p>"{commandKeys.youtube.searchTerm}"...</p>
        <p>"{commandKeys.question.searchTerm}"...</p>
        <div className="microphoneFeedback">
          <div className="microphoneUX"></div>
        </div>
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
        <Youtube youtube={this.state.youtube} />
        <Question question={this.state.question} />
      </div>
    );
  }
}

export default App;
