import React from 'react';
import * as spotifyAuth from '../lib/spotifyAuth';

const SpotifyAuthError = ({error}) => (
  <section>
    <h3>Error</h3>
    <div>The following error occurred when authorizing the app with Spotify: {error.message}</div>
    <button onClick={() => spotifyAuth.navigateToAuth()}>Try Again</button>
  </section>
);

export default SpotifyAuthError;