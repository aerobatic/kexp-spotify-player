import React from 'react';
import glamorous from 'glamorous';
import * as spotifyAuth from '../lib/spotifyAuth';

const Container = glamorous.section({
  '& h3': {
    textAlign: 'center'
  },
  '& .authorize': {
    textAlign: 'center',
    '& a': {
      fontSize: 25
    }
  }
});

const WelcomeSplash = () => (
  <Container>
    <h3>Welcome to the KEXP Spotify Livestream Player</h3>
    <p>The two best music resources on the internet are even better together.</p>
    <ul>
      <li>Hear a song you like on the radio and save it to your Spotify tracks with a single click.</li>
      <li>Enhance the KEXP live stream with additional track info from Spotify including album art, artist info, and related artists.</li>
    </ul>
    <p>Click below to authorize the player to connect to your Spotify account to start enjoying the music.</p>
    <div className="authorize">
      <a href="javascript:;" onClick={() => spotifyAuth.navigateToAuth()}>Connect with Spotify</a>
    </div>
  </Container>
);

export default WelcomeSplash;