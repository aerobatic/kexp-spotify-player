import React from 'react';
import glamorous from 'glamorous';
import * as spotifyAuth from '../lib/spotifyAuth';
import spotifyIcon from '../icons/spotify.svg';

const Container = glamorous.section({
  display: 'flex',
  '& .kexp-logo': {
    width: 300,
    marginRight: 30
  },
  '& ul': {
    fontWeight: 300,
    '& li': {
      marginTop: 10,
      lineHeight: '1.2em'
    }
  },
  '& h3': {
    letterSpacing: '.1em'
  },
  '& button.authorize': {
    cursor: 'pointer',
    width: '100%',
    textAlign: 'center',
    display: 'block',
    fontSize: 25,
    padding: '5px 12px',
    backgroundColor: '#09943a',
    border: 'none',
    borderRadius: 10,
    color: '#000',
    '& img': {
      marginRight: 8
    },
    '& div': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  '& button.authorize:hover': {
    backgroundColor: '#1db954'
  }
});

const WelcomeSplash = () => (
  <Container>
    <div>
      <img className="kexp-logo" src="/kexp-logo.jpg" />
    </div>
    <div>
      <h3>KEXP + SPOTIFY LIVE STREAM</h3>
      <p>The two best places to experience music on the internet are even better together!</p>
      <ul>
        <li>Hear a song you like on KEXP and save it to your Spotify music with a single click.</li>
        <li>Enhance the KEXP live stream with additional track info from Spotify including album art, artist info, and related artists.</li>
      </ul>
      <p>Click below to authorize the player to connect to your Spotify account and start enjoying the music.</p>
      <button className="authorize" onClick={() => spotifyAuth.navigateToAuth()}>
        <div>
          <img src={spotifyIcon}/>
          <span>Connect with Spotify</span>
        </div>
      </button>
    </div>
  </Container>
);

export default WelcomeSplash;