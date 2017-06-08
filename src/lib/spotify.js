import querystring from 'query-string';
import {getAccessToken} from './spotifyAuth';

export const searchForTrack = ({artist, track}) => {
  const accessToken = getAccessToken();
  const query = {
    type: 'track',
    q: 'track:"' + track + '" artist:"' + artist + '"'
  };

  return fetch(`https://api.spotify.com/v1/search?${querystring.stringify(query)}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(resp => resp.json())
  .then(json => {
    if (json.tracks.items && json.tracks.items.length > 0) {
      const track = json.tracks.items[0];
      return {
        trackId: track.id,
        trackName: track.name,
        artistName: track.artists[0].name,
        artistId: track.artists[0].id,
        spotifyUri: track.uri,
        albumName: track.album.name,
        albumImage: track.album.images[0].url
      };
    }
    return null;
  });
}

export const saveTrack = (trackId) => {
  const accessToken = getAccessToken();
  
  return fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

export const isTrackSaved = (trackId) => {
  const accessToken = getAccessToken();
  
  return fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(res => res.json())
  .then(json => json[0]);
};