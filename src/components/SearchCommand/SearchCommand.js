import React, { Component } from 'react';
import './SearchCommand.scss';

class SearchCommand extends Component {
  constructor() {
    super()
    this.state = {
      youtubeId: ''
    }
  }

  loadVideo(e){
    console.log(e)
  }

  render() {
    return (
      <div>
        <p>Instructions</p>
        <button className="click-me" type="button">
          Click Me
        </button>
        <div>
          <p className="output"></p>
          <p className="transcript">Title:</p>
          <p className="title">Titile:</p>
        </div>
      </div>
    );
  };
}

export default SearchCommand;
