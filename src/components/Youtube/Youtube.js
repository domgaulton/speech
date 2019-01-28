import React, { Component } from 'react';
import './Youtube.scss';

class Youtube extends Component {
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
        <p onClick={this.loadVideo}>Youtube</p>
        <p className="ytID"></p>
        <img alt="Youtube Thumbnail" className="thumbnail" src="" />
        <div id="player"></div>
      </div>
    );
  };
}

export default Youtube;
