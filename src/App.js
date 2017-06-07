import React, { Component } from 'react';
import { Howl } from 'howler';
import {isEqual} from 'lodash/lang';
// import logo from './logo.svg';
import './App.css';
// import SpotifyLogin from './components/SpotifyLogin';
// import SpotifyAuthFrame from './components/SpotifyAuthFrame';
import SpotifyLoginSplash from './components/SpotifyLoginSplash';
import NowPlaying from './components/NowPlaying';
import SpotifyTrack from './components/SpotifyTrack';
import * as spotifyAuth from './lib/spotifyAuth';
import * as spotifyApi from './lib/spotify';
import * as kexpApi from './lib/kexpApi';

const STREAM_URL = 'http://live-mp3-128.kexp.org:8000/kexp128.mp3';
// http://live-aacplus-64.kexp.org/kexp64.aac

// Returns details about the current show
// https://legacy-api.kexp.org/show/?limit=1&airdate_before=2017-06-06T19:24:00Z

class App extends Component {  
  constructor() {
    super();

    this.liveStream = new Howl({
      src: [STREAM_URL],
      html5: true,
      onend: () => {
        console.log('KEXP live stream ended');
      }
    });

    this.state = {muted: false};
  }

  play = () => {
    this.liveStream.play();
  }

  toggleMute = () => {
    this.liveStream.mute(!this.state.muted);
    this.setState({muted: !this.state.muted});
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.loadNowPlaying();
  }

  loadNowPlaying = () => {
    kexpApi.nowPlaying()
      .then(nowPlaying => {
        const currentlyPlaying = this.state.nowPlaying;
        if (!currentlyPlaying || !isEqual(currentlyPlaying, nowPlaying)) {
          const stateUpdates = {nowPlaying, spotifyTrack: null};
          // If the KEXP now playing result has both an artist and a release
          // then search for the matching track from Spotify
          const updateSpotifyResult = nowPlaying.artist && nowPlaying.track;

          if (updateSpotifyResult) {
            stateUpdates.searchingSpotify = true;
          }

          this.setState(stateUpdates);

          if (updateSpotifyResult) {
            spotifyApi.searchForTrack({artist: nowPlaying.artist, track: nowPlaying.track})
              .then(spotifyTrack => this.setState({spotifyTrack, searchingSpotify: false}));
          }
        }

        // Refresh every 30 seconds
        setTimeout(this.loadNowPlaying, 30000);
      });
  }

  searchForTrack = () => {  
    spotifyApi.searchForTrack({artist: 'Odesza', track: 'Late Night'})
      .then(result => {
        console.log(result);
      });
  }

  render() {
    if (spotifyAuth.validAccessToken() !== true) {
      return <SpotifyLoginSplash />;
    }

    return (
      <div className="App">
        <div className="App-header">
          <button onClick={this.play}>Play</button>
          <button onClick={this.toggleMute}>{this.state.muted ? 'Unmute' : 'Mute'}</button>
          <h2>KEXP + Spotify</h2>

          <NowPlaying {...this.state.nowPlaying} />
          <SpotifyTrack searching={this.state.searchingSpotify} track={this.state.spotifyTrack} />
        </div>
      </div>
    );
  }
}

export default App;
