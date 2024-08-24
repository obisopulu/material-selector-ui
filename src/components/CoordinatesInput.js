const CoordinatesInput = ({ circles, addCircle, updateCircle, currentCircle }) => {

  const handleAddCircle = () => {
    addCircle();
  };

  const handleInputX = (e) => {
    updateCircle(currentCircle, Number(e.target.value), circles[currentCircle].y);
  };

  const handleInputY = (e) => {
    updateCircle(currentCircle, circles[currentCircle].x, Number(e.target.value));
  };

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
