import React, { Component } from 'react';
import Youtube from './components/Youtube/Youtube';
import SearchCommand from './components/SearchCommand/SearchCommand';

class App extends Component {
  constructor() {
    super()
    this.state = {
      searchCommand: ''
    }
  }

  render() {
    return (
      <div>
        <SearchCommand />
        <Youtube />
      </div>
    );
  }
}

export default App;
