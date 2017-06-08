import React from 'react';

const PlayerControls = ({isPlaying, onPlay}) => (
  <div>
    <button onClick={onPlay} disabled={isPlaying}>Play</button>
  </div>
);

export default PlayerControls;