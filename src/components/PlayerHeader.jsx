import React from 'react';
import glamorous from 'glamorous';

const Wrapper = glamorous.div({
  padding: '15px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& h2': {
    margin: 0
  },
  '& .onnow': {
    color: '#feac31',
    fontWeight: 'bold',
    display: 'inline-block',
    marginRight: 8,
    fontSize: 12
  },
  '& .host': {
    fontSize: 12
  }
});

const PlayerHeader = ({currentShow}) => (
  <Wrapper>
    <h2>KEXP + Spotify</h2>
    {currentShow && (
      <div>
        <span className="onnow">ON NOW:</span> <span className="host">{currentShow.name} with {currentShow.host}</span>
      </div>  
    )}
  </Wrapper>
);

export default PlayerHeader;
