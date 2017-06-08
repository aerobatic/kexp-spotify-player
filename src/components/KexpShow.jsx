import React from 'react';

const KexpShow = ({show}) => {
  if (!show) return null;

  return (
    <div>
      <span>ON NOW:</span> <span>{show.name} with {show.host}</span>
    </div>
  );
};

export default KexpShow;