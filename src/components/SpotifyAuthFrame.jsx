import React, {Component} from 'react';
import querystring from 'query-string';

const SCOPES = ['user-library-read', 'user-library-modify'];

const AUTH_QUERY = {
  client_id: '3a8b02b4544548ed98e06c56af43ae41',
  response_type: 'token',
  scope: SCOPES.join(' '),
  redirect_uri: window.location.origin + '/spotify_callback'
};

const AUTH_URL = `https://accounts.spotify.com/authorize?${querystring.stringify(AUTH_QUERY)}`;

class SpotifyAuthFrame extends Component {
  componentDidMount() {
    window.addEventListener('message', this.receiveMessage, false);
  }

  receiveMessage(event) {
    if (event.origin !== window.location.origin) return;

    if (event.data.error) {
      this.setState({authError: event.data.error});
      return;
    }

    // Store the access token and expire date in localStorage
    window.localStorage.setItem('spotifyToken', event.data);
    this.props.onAuthenticated();

    console.log('Received data from iframe: %j', event.data);
  }

  render() {
    if (this.state.authError) {
      return <div className="error">Spotify Error: {this.state.authError}</div>;
    }
    return <iframe style={{width: '500px', height: '500px'}} src={AUTH_URL} ref={(elem) => this.iframe = elem} />;
  }
}

export default SpotifyAuthFrame;