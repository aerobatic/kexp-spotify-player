import React from 'react';
import PropTypes from 'prop-types';

const SpotifyTrack = ({searching, track}) => (
  <section>
    <h3>Spotify Track</h3>
    {searching && <span>Searching...</span>}
    {track && (
      <div>
        <ul>
          <li>{track.trackId}</li>
          <li>{track.trackName}</li>
          <li>{track.artistName}</li>
          <li>{track.albumName}</li>
          <li><a href={track.spotifyUri}>Open in Spotify</a></li>
        </ul>
        {track.albumImage && <img src={track.albumImage} />}
      </div>
    )}
  </section>
);

SpotifyTrack.propTypes = {
  searching: PropTypes.bool,
  track: PropTypes.shape({
    trackId: PropTypes.string,
    trackName: PropTypes.string,
    artistName: PropTypes.string,
    spotifyUri: PropTypes.string,
    albumImage: PropTypes.string
  })
}

export default SpotifyTrack;
