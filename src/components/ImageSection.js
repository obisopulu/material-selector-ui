import React from 'react';
import Image from './Image';

function ImageSection({ image, forUseRef, fade }) {
  const handleDrag = (e) => {
    e.preventDefault();
  }
  return (
      <div ref={forUseRef} className={`image-section ${fade ? 'fade-out' : 'fade-in'}`} onDragOver={handleDrag} >
        <Image source={image} /> 
      </div>
  );
}

export default ImageSection;
