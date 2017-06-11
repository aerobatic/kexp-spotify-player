import React from 'react';
import glamorous from 'glamorous';
import {colors} from '../lib/common';

const Wrapper = glamorous.div({
  backgroundColor: colors.midGray,
  padding: 10,
  '& .header': {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 600,
    color: colors.white,
    '& svg': {
      fill: colors.green,
      marginRight: 8
    }
  },
  '& h4': {
    margin: 0,
    color: colors.white
  },
  '& .buttons': {
    display: 'flex',
    alignItems: 'center',
    '& .open': {
      marginRight: 10
    },
    '& > *': {
      textDecoration: 'none',
      display: 'inline-block',
      height: 34,
      width: 110,
      marginTop: 15,
      color: '#fff',
      cursor: 'pointer',
      fontSize: 12,
      fontWeight: 600,
      borderRadius: 17,
      backgroundColor: 'transparent',
      border: `solid 1px ${colors.lightGray}`,
      textTransform: 'uppercase',
      '& svg': {
        fill: colors.lightGray,
        marginRight: 6
      },
      '& > div': {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    '& button:hover, & a:hover': {
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
        fill: colors.green,
        marginRight: 8
      }
    }
  },
  '& .no-spotify-data': {
    color: colors.lightGray,
    fontWeight: 300,
    marginTop: 15
  }
});

const renderActionButtons = (nowPlaying, onSave) => {
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
      <button onClick={onSave}>
        <div>
          <AddIcon />
          <span>Save</span>
        </div>
      </button>
    );
  }

  return (
    <div className="buttons">
      <a className="open" href={nowPlaying.spotifyUrl}>
        <div>
          <OpenExternalIcon />
          <span>Open</span>
        </div>
      </a>
      {Child}
    </div>
  );
}

const renderNoData = () => {
  return <div className="no-spotify-data">No data for track</div>;
}

const SaveToSpotify = ({onSave, nowPlaying}) => {
  if (!nowPlaying) return null;

  return (
    <Wrapper>
      <div className="header">
        <SpotifyIcon />
        SPOTIFY
      </div>
      {nowPlaying.spotifyTrackId ? renderActionButtons(nowPlaying, onSave) : renderNoData()}
    </Wrapper>
  );
};

const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 512 512">
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

const OpenExternalIcon = () => (
  <svg height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
  </svg>
);

const SpotifyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={colors.green} width="22" height="22" viewBox="0 0 24 24">
    <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M16.3,17c-0.2,0-0.3-0.1-0.5-0.2c-1.5-0.9-3.4-1.4-5.4-1.4 c-1.1,0-2.3,0.2-3.3,0.4c-0.2,0-0.4,0.1-0.5,0.1c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.2-0.7,0.6-0.7c1.3-0.3,2.6-0.5,4-0.5 c2.3,0,4.4,0.6,6.2,1.6c0.2,0.2,0.4,0.3,0.4,0.7C16.9,16.8,16.6,17,16.3,17z M17.4,14.2c-0.2,0-0.4-0.1-0.6-0.2 c-1.7-1.1-4.1-1.7-6.7-1.7c-1.3,0-2.5,0.2-3.4,0.4c-0.2,0.1-0.3,0.1-0.5,0.1c-0.5,0-0.8-0.4-0.8-0.8c0-0.5,0.2-0.7,0.7-0.9 c1.2-0.3,2.4-0.6,4.1-0.6c2.8,0,5.4,0.7,7.6,2c0.3,0.2,0.5,0.5,0.5,0.8C18.2,13.8,17.9,14.2,17.4,14.2z M18.7,11 c-0.2,0-0.3-0.1-0.6-0.2c-2-1.1-4.9-1.8-7.7-1.8C9,9,7.5,9.2,6.2,9.5c-0.2,0-0.3,0.1-0.6,0.1c-0.6,0.1-1-0.4-1-1 c0-0.6,0.3-0.9,0.7-1C6.9,7.2,8.6,7,10.4,7c3.1,0,6.3,0.7,8.8,2c0.3,0.2,0.6,0.5,0.6,1C19.7,10.6,19.3,11,18.7,11z"/>
  </svg>
);

export default SaveToSpotify;