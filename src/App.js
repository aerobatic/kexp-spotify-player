import React, { Component } from 'react';
import Player from './components/Player';
import SpotifyLoginSplash from './components/SpotifyLoginSplash';
import * as spotifyAuth from './lib/spotifyAuth';

class App extends Component {  
  render() {
    if (spotifyAuth.validAccessToken() !== true) {
      return <SpotifyLoginSplash />;
    }

    return <Player />;
  }
}

export default App;
