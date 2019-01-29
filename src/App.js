import React, { Component } from 'react';
import API_KEYS from './components/config/apiKeys.js';
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
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-GB';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    const output = document.querySelector('.output');
    output.innerHTML = 'Listening...';

    recognition.start();

    recognition.onresult = (event) => {
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
        <p>Questions to ask</p>
        <p>"{triggerKeys.youtube}"...</p>
        <p>"{triggerKeys.question}"...</p>
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
