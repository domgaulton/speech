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

class Youtube extends Component {

  constructor(props) {
    super(props);
    this.state = {
      youtubeId: '',
    };
  };

  componentDidUpdate = (prevProps) => {
     if (this.props.youtube !== prevProps.youtube) {
      YoutubeSearch(this.props.youtube, searchOpts, (err, results) => {
        if(err) return console.log(err);
        const id = results[0].id;
        this.setState({ youtubeId: id });
      });
     }
   }
  
  render(){
    const youtubeId = this.state.youtubeId;
    let video;
    if (youtubeId !== '') {
      video = <ReactYoutube videoId={youtubeId} opts={playerOpts}/>;
    } else {
      video = "";
    }

    return(
      <div>
        {video}
      </div>
    );  
  }
};

export default Youtube;
