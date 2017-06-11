import React from 'react';
import glamorous from 'glamorous';
import EqualizerBars from './EqualizerBars';

const Wrapper = glamorous.div({
  marginBottom: 20,
  padding: '0 15px',
  backgroundColor: '#282828',
  display: 'flex',
  alignItems: 'center',
  '& > *': {
    width: '100%',
    flexGrow: '1'
  },
  '& > :nth-child(2)': {
    textAlign: 'center'
  },
  '& > :nth-child(3)': {
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  '& button': {
    display: 'inline-block',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    outline: 'none',
    '& svg': {
      fill: '#a0a0a0'
    }
  },
  '& button:hover': {
    '& svg': {
      fill: '#fff'
    }
  }
});

const PlayerControls = ({isPlaying, onPlay, onPause}) => (
  <Wrapper>
    <div />
    <div>
      <button onClick={isPlaying ? onPause : onPlay}>{isPlaying ? <PauseIcon /> : <PlayIcon />}</button>
    </div>
    <div className="right">
      {isPlaying && <EqualizerBars />}
    </div>
  </Wrapper>
);

const PlayIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  </svg>
);

const PauseIcon = () => (
  <svg fill="#000000" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z"/>
  </svg>
)

export default PlayerControls;

