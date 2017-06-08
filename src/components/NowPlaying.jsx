import React from 'react';

const NowPlaying = ({playType, artist, release, releaseYear, comment, track, albumImage, spotifyTrackId, spotifyAlbumId, spotifyUrl}) => (
  <section>
    <h3>Now Playing</h3>
    {playType === 'Air break' ? 
      <div>Air break</div> : 
      (<div>
        <div>{track}</div>
        <div>{artist}</div>
        <div>{release}</div>
        <div>{releaseYear}</div>
        {albumImage && <div><img src={albumImage} alt={release} /></div>}
        {comment && <p>{comment}</p>}
      </div>)
    }
  </section>
);

export default NowPlaying;