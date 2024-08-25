import { useState, useEffect } from 'react'

import circle from '../assets/circle.svg'

const Circle = ({x, y, updateCircle, id, setCurrentCircle, currentCircle, windowOffset, resizeOffset }) => {
  const [xOffset, setXOffset] = useState(0);
  
/*   console.log(resizeOffset.x, windowOffset.x, (resizeOffset.x - windowOffset.x) * - 1)
 */
  useEffect(() => {
      setXOffset(resizeOffset.x - windowOffset.x);
  }, [windowOffset, resizeOffset])

  const handleDrag = (e) => {
    setCurrentCircle(id)
    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;
    const newX = e.clientX - 10 + scrollLeft;
    const newY = e.clientY - 10 + scrollTop;
    
    updateCircle(currentCircle, newX, newY);
  };
 
  return (
      <img 
        draggable="true"
        onDragEnd={handleDrag}
        onDrag={handleDrag}
        title={"Circle " + (id + 1)}
        onClick={()=> setCurrentCircle(id)}
        src={circle}
        alt={"Circle " + (id + 1)}
        className={`circle ${currentCircle === id && 'circle-active m-2'}`}
        style={{top: y, left: x - xOffset, cursor: 'pointer'}}
      />
  )
}
/* <button onClick={() => setPosition({ x: 0, y: 0 })} > reset </button> */
export default Circle