import React, { Component } from 'react';
import Youtube from './components/Youtube/Youtube';
import Command from './core/Command/Command';
import YoutubeSearch from 'youtube-search';
import YoutubePlayer from './components/Youtube/YoutubePlayer';

const opts = {
  maxResults: 1,
  key: 'AIzaSyCb0WevBvVXfVec8vVLauCx6UPE0a0ns2E',
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

  startListening = () => {
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

      this.setState({ command: transcript });
      diagnostic.textContent = `You said: ${transcript}`;
      let updatedCommand = this.state.command;

      // RUN COMMANDS HERE
      if (updatedCommand.match(/search youtube for/i)) {
        console.log('RUNNING YOUTUBE SCRIPT!');
        updatedCommand = updatedCommand.substring(18);
        // this.setState({ youtubeSearch: updatedCommand });

        YoutubeSearch(updatedCommand, opts, (err, results) => {
          if(err) return console.log(err);
          const id = results[0].id;
          console.log(id);
          this.setState({ youtubeSearch: id });
        });
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
        <Command onListen={this.startListening} />
        <YoutubePlayer youtubeId={this.state.youtubeSearch} />
      </div>
    );
  }
}

export default App;
