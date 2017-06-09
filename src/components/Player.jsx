import React, { Component } from 'react';
import { Howl } from 'howler';
import {isEqual} from 'lodash/lang';
import NowPlaying from './NowPlaying';
import PlayerControls from './PlayerControls';
import PlayerHeader from './PlayerHeader';

import * as spotifyAuth from '../lib/spotifyAuth';
import * as spotifyApi from '../lib/spotifyApi';
import * as kexpApi from '../lib/kexpApi';

const STREAM_URL = 'http://live-mp3-128.kexp.org/kexp128.mp3';

class Player extends Component {  
  constructor() {
    super();

    this.liveStream = new Howl({
      src: [STREAM_URL + '?nocache=' + Date.now()],
      html5: true,
      onend: () => {
        console.log('KEXP live stream ended');
      }
    });

    this.state = {
      validSpotifyToken: spotifyAuth.validAccessToken(),
      isPlaying: false,
      muted: false
    };

    setInterval(this.checkForValidSpotifyToken, 1000);
  }

  handlePlayClick = () => {
    this.setState({isPlaying: true});
    this.liveStream.mute(false);
    this.liveStream.play();
  }

  handlePauseClick = () => {
    this.setState({isPlaying: false});
    this.liveStream.mute(true);
  }

  componentDidMount() {
    Promise.all([
      this.loadNowPlaying(),
      this.loadCurrentShow()
    ])
    .then(() => {
      setInterval(this.loadNowPlaying, 30000);
      setInterval(this.loadCurrentShow, 60000);
    });
  }

  checkForValidSpotifyToken = () => {
    const valid = spotifyAuth.validAccessToken();
    if (valid !== this.state.validSpotifyToken) {
      this.setState({validSpotifyToken: valid});
    }
  }

  loadNowPlaying = () => {
    kexpApi.nowPlaying()
      .then(nowPlaying => {
        const currentlyPlaying = this.state.nowPlaying;

        const isNewTrack = !currentlyPlaying ||
          currentlyPlaying.artist !== nowPlaying.artist ||
          currentlyPlaying.track !== nowPlaying.track;

        if (!isNewTrack) return null;

        // If the KEXP now playing result has both an artist and a release
        // then search for the matching track from Spotify
        const loadSpotifyTrack = nowPlaying.artist &&
          nowPlaying.track &&
          this.state.validSpotifyToken;

        if (!loadSpotifyTrack) return nowPlaying;

        return spotifyApi.searchForTrack({artist: nowPlaying.artist, track: nowPlaying.track})
          .then(spotifyTrack => {
            if (!spotifyTrack) return nowPlaying;

            // Augment the nowPlaying info with what we got from spotify
            Object.assign(nowPlaying, {
              albumImage: spotifyTrack.albumImage,
              spotifyTrackId: spotifyTrack.trackId,
              spotifyArtistId: spotifyTrack.artistId,
              spotifyUrl: spotifyTrack.spotifyUri
            });
            
            return spotifyApi.isTrackSaved(spotifyTrack.trackId)
              .then(saved => {
                Object.assign(nowPlaying, {isSavedToSpotify: saved});
                return nowPlaying;
              })
          });
        })
        .then(nowPlaying => {
          if (nowPlaying) {
            this.setState({nowPlaying});
          }
        });
  }

  loadCurrentShow = () => {
    kexpApi.currentShow()
      .then(currentShow => {
        if (!this.state.currentShow || !isEqual(currentShow, this.state.currentShow)) {
          this.setState({currentShow});
        }
      });
  }

  saveToSpotify = () => {
    spotifyApi.saveTrack(this.state.nowPlaying.spotifyTrackId)
      .then(() => {
        this.setState({nowPlaying: {...this.state.nowPlaying, isSavedToSpotify: true}});
      })
      .catch(error => {
        this.setState({error});
      });
  }

  render() {
    return (
      <div className="App">
        <PlayerHeader currentShow={this.state.currentShow} />
        <PlayerControls
          isPlaying={this.state.isPlaying}
          onPlay={this.handlePlayClick}
          onPause={this.handlePauseClick} />
        
        <NowPlaying
          nowPlaying={this.state.nowPlaying}
          validSpotifyToken={this.state.validSpotifyToken}
          onSaveTrack={this.saveToSpotify}
        />
      </div>
    );
  }
}

export default Player;
