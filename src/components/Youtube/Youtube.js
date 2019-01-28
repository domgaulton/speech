import React, { Component } from 'react';
import './Youtube.scss';
import YoutubeSearch from 'youtube-search';
import YoutubePlayer from './YoutubePlayer';

const opts = {
  maxResults: 1,
  key: 'AIzaSyCb0WevBvVXfVec8vVLauCx6UPE0a0ns2E',
  type: 'video'
};

class Youtube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      youtubeId: ''
    };
  }

  componentDidUpdate = (props) => {
    const search = this.props.searchResult;
    console.log(search);
    YoutubeSearch(search, opts, (err, results) => {
    // YoutubeSearch(search, opts, function(err, results) {
      if(err) return console.log(err);
      // console.log(results);
      // console.log(results[0].id);
      const id = results[0].id;
      console.log(id);
      this.setState({ youtubeId: id });
    });
  }

  render(){
    return(
      <div>
        <p>Playing: {this.props.searchResult}</p>
        <YoutubePlayer
          videoId={this.state.youtubeId}
        />
      </div>
    );  
  }
};

export default Youtube;
