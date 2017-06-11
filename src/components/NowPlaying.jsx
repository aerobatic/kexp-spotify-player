import React, {Component} from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import {colors} from '../lib/common';
import vinylRecord from '../icons/vinyl-record.svg';
import SpotifyActions from './SpotifyActions';

const Wrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  marginBottom: 15,
  width: '100%',
  '& .image': {
    width: '50%',
    '& img': {
      maxWidth: '100%'
    }
  },
  '& .details': {
    display: 'flex',
    width: '45%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 20,
    '& .label': {
      fontSize: 12,
      color: colors.lightGray,
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
  },
  '@media(max-width: 600px)': {
    display: 'block',
    '& .details': {
      width: '100%',
      margin: '0 15px',
      '& .label': {
        marginBottom: 3
      },
      '& .value': {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 300
      },
    },
    '& .image': {
      width: '100%',
      textAlign: 'center',
      '& > img': {
        maxWidth: '90%'
      }
    },
    '& .airbreak': {
      textAlign: 'center',
      fontSize: 22,
      '& h3': {
        margin: '5px 0'
      }
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
    const {nowPlaying, validSpotifyToken, onSaveTrack} = this.props;

    return (
      <div className="details">
        <div>
          <div className="label">Artist</div>
          <div className="value">{nowPlaying.artist}</div>
          <div className="label">Track</div>
          <div className="value">{nowPlaying.track}</div>
          {nowPlaying.release && (
            <div>
              <div className="label">Album</div>
              <div className="value">
                {nowPlaying.release}
                {nowPlaying.releaseYear && ` - ${nowPlaying.releaseYear}`}
              </div>
            </div>
          )}
        </div>
        <div>
          {validSpotifyToken && <SpotifyActions nowPlaying={nowPlaying} onSave={onSaveTrack}/>}
        </div>
      </div>
    );
  }

  render() {
    const {nowPlaying} = this.props;
    if (!nowPlaying) return null;

    return (
      <Wrapper>
        {nowPlaying.playType === 'Air break' ? this.renderAirbreak() : this.renderTrackDetails()}
        <div className="image">
          {
            nowPlaying.albumImage ?
              <img src={nowPlaying.albumImage} alt={nowPlaying.release}/> :
              <img src={vinylRecord} alt="No album art available" />
          }
        </div>
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