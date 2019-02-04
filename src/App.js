import React, { Component } from 'react';
import commandKeys from './config/commandKeys.js';

import { microphoneLevels } from './ui/microphoneLevels';
import './ui/microphone-levels.scss';

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
    
    microphoneLevels('start');
    recognition.start();

    recognition.onresult = (event) => {
      microphoneLevels('stop');
      let { transcript } = event.results[0][0];
      transcript = transcript.toLowerCase();
      this.commandTrigger(transcript);
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
          <div className="microphoneUX">
          </div>
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
