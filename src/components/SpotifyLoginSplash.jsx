import React from 'react';
import * as spotifyAuth from '../lib/spotifyAuth';

const SpotifyLoginSplash = () => (
  <section>
    <h3>Welcome to the KEXP Spotify Player</h3>
    <p>In order to enhance the KEXP live stream with Spotify you need to authorize this app to connect with your Spotify account.</p>
    <button onClick={() => spotifyAuth.navigateToAuth()}>Authorize</button>
  </section>
);

export default SpotifyLoginSplash;