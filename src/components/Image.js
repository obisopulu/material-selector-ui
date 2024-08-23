import React from 'react';

function Image({ source }) {
  const handleDrop = (e) => {
    e.preventDefault();
  }
  return (
    source && <img src={source} alt="Example" className='image' onDragOver={handleDrop} />
  );
}

export default Image;
