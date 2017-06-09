import React from 'react';
import glamorous from 'glamorous';

const Wrapper = glamorous.div({
  '& button': {
    padding: '0 12px',
    height: 34,
    color: '#fff',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 600,
    borderRadius: 17,
    backgroundColor: 'transparent',
    border: 'solid 1px #a0a0a0',
    textTransform: 'uppercase',
    '& svg': {
      fill: '#a0a0a0',
      marginRight: 6
    },
    '& > div': {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  '& button:hover': {
    borderColor: '#fff',
    '& svg': {
      fill: '#fff'
    }
  },
  '& .saved': {
    display: 'flex',
    fontSize: 14,
    fontWeight: 300,
    alignItems: 'center',
    '& svg': {
      fill: '#09943a',
      marginRight: 8
    }
  }
});

const SaveToSpotify = ({onSave, nowPlaying}) => {
  if (!nowPlaying || !nowPlaying.spotifyTrackId) return null;

  let Child;

  if (nowPlaying.isSavedToSpotify) {
    Child = (
      <div className="saved">
        <CheckIcon />
        <span>Saved to Spotify</span>
      </div>
    );
  } else {
    Child = (
      <button onClick={() => onSave(nowPlaying.spotifyTrackId)}>
        <div>
          <AddIcon />
          <span>Save to Spotify</span>
        </div>
      </button>
    );
  }

  return <Wrapper>{Child}</Wrapper>;
};

const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 512 512">
    <g>
      <path d="M384,265H264v119h-17V265H128v-17h119V128h17v120h120V265z"/>
    </g>
  </svg>
);

const CheckIcon = () => (
  <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

export default SaveToSpotify;