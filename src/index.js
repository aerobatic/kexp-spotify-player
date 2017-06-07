import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import querystring from 'query-string';
import SpotifyAuthError from './components/SpotifyAuthError';
import * as spotifyAuth from './lib/spotifyAuth';

const root = document.getElementById('root');

if (window.location.pathname === '/spotify_callback') {
  const params = querystring.parse(window.location.hash);

  let authError;
  try {
    spotifyAuth.authCallback(params);
  } catch (err) {
    authError = err;
  }

  if (authError) {
    ReactDOM.render(<SpotifyAuthError error={authError} />, root);
  } else {
    renderApp();
  }
} else {
  renderApp();
}

function renderApp() {
  window.history.replaceState({}, null, '/');
  ReactDOM.render(<App />, root);
  registerServiceWorker();
}
