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
    // console.log('YT Previous', previousYoutube.youtube);
    // console.log('YT Query', youtubeQuery);
    // debugger;
     if (previousYoutube.youtube !== youtubeQuery) {
      // previousYoutube.youtube = youtubeQuery;
      // debugger;
      YoutubeSearch(youtubeQuery, searchOpts, (err, results) => {
        if(err) return console.log(err);
        const id = results[0].id;
        // console.log('set state');
        this.setState({ youtubeId: id });
        // console.log('state set', this.state.youtubeId)
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
