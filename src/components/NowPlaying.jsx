import React, {Component} from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import vinylRecord from '../vinyl-record.svg';

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
    paddingLeft: 20,
    flexGrow: 1,
    
    '& .label': {
      fontSize: 12
    },
    '& .value': {
      fontSize: 22,
      marginBottom: 15
    },
    '& .airbreak': {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      // alignItems: 'center',
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

  renderTrackDetails() {
    const {nowPlaying} = this.props;

    return (
      <div className="details">
        <div className="label">Artist</div>
        <div className="value">{nowPlaying.artist}</div>
        <div className="label">Track</div>
        <div className="value">{nowPlaying.track}</div>
        <div className="label">Album</div>
        <div className="value">{nowPlaying.release} - {nowPlaying.releaseYear}</div>

        <SaveToSpotify
          nowPlaying={nowPlaying}
          validSpotifyToken={this.props.validSpotifyToken}
          onSave={this.props.onSaveTrack} />
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
    comment: PropTypes.string
  }),
  onSaveTrack: PropTypes.func,
  validSpotifyToken: PropTypes.bool
};

export default NowPlaying;