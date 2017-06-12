import React from 'react';
import glamorous from 'glamorous';
import * as spotifyAuth from '../lib/spotifyAuth';

const Wrapper = glamorous.div({
  display: 'flex',
  color: '#a0a0a0',
  padding: 15,
  alignItems: 'top',
  backgroundColor: '#282828',
  marginBottom: 15,
  '& svg': {
    fill: '#b71c1c',
    marginRight: 8,
    width: 40,
    height: 40
  },
  '& p': {
    margin: 0
  },
  '& button': {
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'inherit',
    color: '#fff',
    fontSize: 'inherit',
    margin: 0,
    padding: 0
  },
  '& button:hover': {
    textDecoration: 'underline'
  }
});

const SpotifySessionExpired = () => {
  return (
    <Wrapper>
      <ErrorIcon />
      <p>
        Your Spotify session has expired. <button onClick={() => spotifyAuth.navigateToAuth({})}>Click here</button> to start a new session.
        You'll be right back to the music in a jiffy.
      </p>
    </Wrapper>
  );
};

export default SpotifySessionExpired;

const ErrorIcon = () => (
  <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>
);