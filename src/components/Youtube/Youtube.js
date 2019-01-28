import React, { Component } from 'react';
import './Youtube.scss';

class Youtube extends Component {
  componentDidMount() {
    const youtubeSearch = this.props.searchResult;
    console.log(youtubeSearch);
  }

  render(){
    return(
      <div>
        <p className="ytID">{this.props.searchResult}</p>
        <img alt="Youtube Thumbnail" className="thumbnail" src="" />
        <div id="player"></div>
      </div>
    );  
  }
}

export default Youtube;
