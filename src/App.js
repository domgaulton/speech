import React, { Component } from 'react';
import Youtube from './components/Youtube/Youtube';
import SpeechCommand from './core/SpeechCommand/SpeechCommand';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command: '',
      youtubeSearch: 'Adele someone like you'
    };
  }

  listen = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-GB';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const diagnostic = document.querySelector('.output');
    diagnostic.innerHTML = 'Listening...';

    recognition.start();

    recognition.onresult = (event) => {
      const { transcript } = event.results[0][0];
      console.log(transcript);

      this.setState({command: transcript});
      diagnostic.textContent = `You said: ${transcript}`;
      let updatedCommand = this.state.command;

      if (updatedCommand.match(/search youtube for/i)) {
        console.log('RUNNING YOUTUBE SCRIPT!');
        updatedCommand = updatedCommand.substring(18);
        this.setState({youtubeSearch: updatedCommand});
      }
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };

    recognition.onerror = (event) => {
      const { error } = event;
      diagnostic.textContent = `Error occurred: ${error}`;
    };
  }

  render() {
    return (
      <div>
        <p>"Search Youtube For"...</p>
        <p>"Please Tell Me"...</p>
        <SpeechCommand onListen={this.listen} />
        <Youtube searchResult={this.state.youtubeSearch} />
      </div>
    );
  }
}

export default App;
