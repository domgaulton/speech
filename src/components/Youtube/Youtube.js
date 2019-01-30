import React, { Component } from 'react';
import API_KEYS from './../../config/apiKeys.js';
import './Youtube.scss';
import ReactYoutube from 'react-youtube';
import YoutubeSearch from 'youtube-search';

const playerOpts = {
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 1
  }
};

const searchOpts = {
  maxResults: 1,
  key: API_KEYS.youtube,
  type: 'video'
};

const previousYoutube = "";

class Youtube extends Component {

  constructor(props) {
    super(props);
    this.state = {
      youtubeId: '',
    };
  };

  componentDidUpdate = (previousYoutube) => {
    const youtubeQuery = this.props.youtube;
     if (previousYoutube.youtube !== youtubeQuery) {
      YoutubeSearch(youtubeQuery, searchOpts, (err, results) => {
        if(err) return console.log(err);
        const id = results[0].id;
        this.setState({ youtubeId: id });
      });
     }
   }
  
  render() {
    return(
      <div>
        <ReactYoutube
          videoId={this.state.youtubeId}
          opts={playerOpts}
        />
      </div>
    );  
  }
};

export default Youtube;
