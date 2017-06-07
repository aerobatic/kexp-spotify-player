import React from 'react';

const CLIENT_ID = '3a8b02b4544548ed98e06c56af43ae41';
const SCOPES = ['user-library-read', 'user-library-modify'];

const SpotifyLogin = () => (
  <a href={`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${window.location.href}&response_type=token&scope=${encodeURIComponent(SCOPES.join(' '))}`}>Login to Spotify</a>
);

export default SpotifyLogin;