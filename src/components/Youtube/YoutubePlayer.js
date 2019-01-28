import React from 'react';
import './Youtube.scss';
import Youtube from './Youtube';
import ReactYoutube from 'react-youtube';

const opts = {
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 1
  }
};

const YoutubePlayer = ({ youtubeId }) => {
  console.log(youtubeId);
    return(
      <div>
        <ReactYoutube
          videoId={youtubeId}
          opts={opts}
        />
      </div>
    );  
};

export default YoutubePlayer;
