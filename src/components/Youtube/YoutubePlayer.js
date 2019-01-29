import React from 'react';
import './Youtube.scss';
import ReactYoutube from 'react-youtube';

const opts = {
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 1
  }
};

const YoutubePlayer = ({ youtubeId }) => {
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
