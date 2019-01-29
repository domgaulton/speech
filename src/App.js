import React, { Component } from 'react';
import API_KEYS from './components/config/api-keys.js';
import YoutubeSearch from 'youtube-search';
import YoutubePlayer from './components/Youtube/YoutubePlayer';

const opts = {
  maxResults: 1,
  key: API_KEYS.youtube,
  type: 'video'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command: '',
      youtubeSearch: ''
    };
  }

  commandTrigger = (userInput) => {
    console.log(userInput);
    
    // INPUT KEYS
    const youtubeSearchKey = "search youtube for";
    // const questionKey = "what is the";
    
    // FUNCTIONS
    if ( userInput.match(youtubeSearchKey) ) {
      const strippedInput = userInput.replace(youtubeSearchKey,"");
      document.querySelector('.output').textContent = `SEARCHING YOUTUBE FOR... ${strippedInput}`;

      YoutubeSearch(strippedInput, opts, (err, results) => {
        if(err) return console.log(err);
        const id = results[0].id;
        this.setState({ youtubeSearch: id });
      });
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
        <p>Instructions</p>
        <p>"Search Youtube For"...</p>
        <p>"Please Tell Me"...</p>
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
        <YoutubePlayer youtubeId={this.state.youtubeSearch} />
      </div>
    );
  }
}

export default App;
