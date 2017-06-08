import React, { Component } from 'react';
import Player from './components/Player';
import WelcomeSplash from './components/WelcomeSplash';
import * as spotifyAuth from './lib/spotifyAuth';
import glamorous from 'glamorous'

import './App.css';

const AppShell = glamorous.section({
  width: 700,
  maxWidth: '100%',
  margin: '0 auto'
});

class App extends Component {  
  render() {
    let Child;

    if (spotifyAuth.validAccessToken() !== true) {
      Child = <WelcomeSplash />;
    } else {
      Child = <Player />;
    }

    return (
      <AppShell>{Child}</AppShell>
    );
  }
}

export default App;
