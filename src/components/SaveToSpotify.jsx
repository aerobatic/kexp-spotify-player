import React from 'react';

const SaveToSpotify = ({validSpotifyToken, onSave, nowPlaying}) => {
  if (!validSpotifyToken || !nowPlaying || !nowPlaying.spotifyTrackId) return null;

  if (nowPlaying.isSavedToSpotify) {
    return <span>Saved to Spotify</span>;
  }

  return <button onClick={() => onSave(nowPlaying.spotifyTrackId)}>Save to Spotify</button>;
};

export default SaveToSpotify;