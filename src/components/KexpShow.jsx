import React from 'react';
import glamorous from 'glamorous';

const Wrapper = glamorous.div({
  fontSize: 12,
  '& .onnow': {
    color: '#feac31',
    fontWeight: 'bold',
    display: 'inline-block',
    marginRight: 8
  }
});

const KexpShow = ({show}) => {
  if (!show) return null;

  return (
    <Wrapper>
      <span className="onnow">ON NOW:</span> <span className="host">{show.name} with {show.host}</span>
    </Wrapper>
  );
};

export default KexpShow;