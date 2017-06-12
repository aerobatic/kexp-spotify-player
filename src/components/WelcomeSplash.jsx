import React from 'react';
import glamorous from 'glamorous';
import * as spotifyAuth from '../lib/spotifyAuth';
import spotifyIcon from '../icons/spotify.svg';
import {colors} from '../lib/common';
import AerobaticInfo from './AerobaticInfo';

const Container = glamorous.section({
  textAlign: 'center',
  '& .header': {
    padding: '5px 10px',
    color: '#000',
    fontWeight: 600,
    backgroundColor: colors.orange,
  },
  '& .hero': {
    padding: '30px 10px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(/wallpaper.jpg)',
    backgroundSize: 'cover',
    marginBottom: 15,
    '& img': {
      width: 742,
      maxWidth: '80%'
    },
    '& h3': {
      fontWeight: 300,
      fontSize: 32,
      marginBottom: 0
    }
  },
  '& .features': {
    display: 'flex',
    padding: 0,
    width: '100%',
    justifyContent: 'space-between',
    '& div': {
      textAlign: 'left',
      width: '31%',
      backgroundColor: colors.midGray,
      marginBottom: 10,
      '& span': {
        display: 'inline-block',
        padding: 15,
        lineHeight: '23px'
      }
    }
  },
  '& button.authorize': {
    cursor: 'pointer',
    width: '100%',
    maxWidth: 400,
    textAlign: 'center',
    display: 'inline-block',
    fontSize: 25,
    padding: '5px 12px',
    backgroundColor: colors.green,
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
    backgroundColor: colors.lightGreen
  },
  '@media(max-width: 600px)': {
    '& .features': {
      display: 'block',
      '& div': {
        width: '100%'
      }
    }
  }
});

const WelcomeSplash = () => (
  <Container>
    <div className="header">
      KEXP + Spotify Player
    </div>
    <div className="hero">
      <img src="/hero.png" alt="KEXP + Spotify" />
      <h3>The two best sources of music on the internet are even better together</h3>
    </div>
    <div className="main">
      <div className="features">
        <div>
          <span>Save current playing song to your Spotify music with a single click</span>
        </div>
        <div>
          <span>Enhance the KEXP live stream with additional track info from Spotify</span>
        </div>
        <div>
          <span>Mobile friendly for listening on the go</span>
        </div>
      </div>
      <p>Click below to authorize the player to connect to your Spotify account and start enjoying the music.</p>
      <button className="authorize" onClick={() => spotifyAuth.navigateToAuth()}>
        <div>
          <img src={spotifyIcon} alt="Spotify" />
          <span>Connect with Spotify</span>
        </div>
      </button>
    </div>
    <AerobaticInfo />
  </Container>
);

export default WelcomeSplash;