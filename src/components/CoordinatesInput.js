/* import { useState, useEffect } from 'react' */

const CoordinatesInput = ({ circles, addCircle, updateCircle, currentCircle }) => {
/*   const [position, setPosition] = useState(circles[currentCircle] || { x: 0, y: 0 }); */

/*   useEffect(() => {
    setPosition(circles[currentCircle]);
  }, [currentCircle, circles]);

  useEffect(() => {
    setPosition({ x: position.x, y: position.y });
  }, [position]); */

  /* const handleUpdateCircle = () => {
    updateCircle(currentCircle, position.x, position.y);
  }; */

  const handleAddCircle = () => {
    addCircle();
  };

  const handleInputX = (e) => {
    updateCircle(currentCircle, Number(e.target.value), circles[currentCircle].y);
  };

  const handleInputY = (e) => {
    updateCircle(currentCircle, circles[currentCircle].x, Number(e.target.value));
  };
  
  /* console.log(circles[currentCircle], currentCircle) */

  return (
    <div className='coordinate-section'>
      <span className='text-primary'>Circle name</span>

      <div className='coordinates'>
        <div className='coordinate-inputs'>
          <div className='coordinate-label'>
            <span className='text-primary'>X</span><span className='text-secondary'>coordinate</span>
          </div>            
          <input type="number" value={circles[currentCircle]?.x || 0} className='coordinate-input' onInput={handleInputX}  />
        </div>
        <div className='coordinate-inputs'>
          <div className='coordinate-label'>
            <span className='text-primary'>Y</span><span className='text-secondary'>coordinate</span>
          </div>
          <input type="number" value={circles[currentCircle]?.y || 0} className='coordinate-input' onInput={handleInputY}  />
        </div>
      </div>

      <button onClick={handleAddCircle}>Add circle</button>

    </div>
  )
}

export default CoordinatesInput




/* import React, { useState } from 'react';

function InputSection({ addCircle }) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleAddCircle = () => {
    addCircle(x, y);
  };

  return (
    <div className="input-section">
      <div>
        <label>X: </label>
        <input type="number" value={x} onChange={(e) => setX(Number(e.target.value))} />
      </div>
      <div>
        <label>Y: </label>
        <input type="number" value={y} onChange={(e) => setY(Number(e.target.value))} />
      </div>
      <button onClick={handleAddCircle}>Add</button>
    </div>
  );
}

export default InputSection;
 */