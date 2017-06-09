import React, {Component} from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import vinylRecord from '../icons/vinyl-record.svg';

import SaveToSpotify from './SaveToSpotify';

const Wrapper = glamorous.div({
  display: 'flex',
  width: '100%',
  '& .image': {
    width: 300,
    '& img': {
      maxWidth: '100%'
    }
  },
  '& .details': {
    paddingLeft: 30,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 10,
    '& .label': {
      fontSize: 12,
      color: '#a0a0a0',
      marginBottom: 5
    },
    '& .value': {
      fontSize: 22,
      marginBottom: 15,
      fontWeight: 300
    },
    '& .airbreak': {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      fontSize: 28
    }
  }
});

class NowPlaying extends Component {
  renderAirbreak() {  
    return (
      <div className="details">
        <div className="airbreak">
          <h3>Air break</h3>
        </div>
      </div>
    );
  }

  renderSpotifyAction() {
    const {nowPlaying, validSpotifyToken, onSaveTrack} = this.props;

    if (!validSpotifyToken) return null;

    if (nowPlaying.spotifyTrackId) {
      return <SaveToSpotify nowPlaying={nowPlaying} onSave={onSaveTrack} />;
    } else {
      return <div>No Spotify data for track</div>
    }
  }

  renderTrackDetails() {
    const {nowPlaying} = this.props;

    return (
      <div className="details">
        <div>
          <div className="label">Artist</div>
          <div className="value">{nowPlaying.artist}</div>
          <div className="label">Track</div>
          <div className="value">{nowPlaying.track}</div>
          <div className="label">Album</div>
          <div className="value">
            {nowPlaying.release}
            {nowPlaying.releaseYear && ` - ${nowPlaying.releaseYear}`}
          </div>
        </div>
        <div>
          {this.renderSpotifyAction()}
        </div>
      </div>
    );
  }

  render() {
    const {nowPlaying} = this.props;
    if (!nowPlaying) return null;

    return (
      <Wrapper>
        <div className="image">
          {
            nowPlaying.albumImage ?
              <img src={nowPlaying.albumImage} alt={nowPlaying.release}/> :
              <img src={vinylRecord} alt="No album art available" />
          }
        </div>
        {nowPlaying.playType === 'Air break' ? this.renderAirbreak() : this.renderTrackDetails()}
      </Wrapper>
    );
  }  
};

NowPlaying.propTypes = {
  nowPlaying: PropTypes.shape({
    artist: PropTypes.string,
    track: PropTypes.string,
    release: PropTypes.string,
    releaseYear: PropTypes.number,
    albumImage: PropTypes.string,
    playType: PropTypes.string,
    comment: PropTypes.string,
    isSavedToSpotify: PropTypes.bool
  }),
  onSaveTrack: PropTypes.func,
  validSpotifyToken: PropTypes.bool
};

export default NowPlaying;