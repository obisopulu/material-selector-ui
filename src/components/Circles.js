import Circle from './Circle';

const Circles = ({ circles, updateCircle, setCurrentCircle, currentCircle, windowOffset, resizeOffset }) => {
  return (
    (
      circles?.map((circle, index) => ( 
        <Circle key={index} id={index} x={circle.x} y={circle.y} updateCircle={updateCircle} setCurrentCircle={setCurrentCircle} currentCircle={currentCircle} windowOffset={windowOffset} resizeOffset={resizeOffset} />
      ))
    )
  )
}

export default Circles