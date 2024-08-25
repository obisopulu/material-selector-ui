const CoordinatesInput = ({ circles, updateCircle, currentCircle, currentValueX, currentValueY, setCurrentValueX, setCurrentValueY }) => {

/*   useEffect(() => {
    updateCircle(currentCircle, currentValueX, currentValueY);
  }, [currentCircle, currentValueX, currentValueY]); */

  const handleInputX = (e) => {
    updateCircle(currentCircle, currentValueX, circles[currentCircle].y)
  };

  const handleInputY = (e) => {
    updateCircle(currentCircle, circles[currentCircle].x, currentValueY);
  };

  const handleOnChangeX = (e) => {
    setCurrentValueX(Number(e.target.value))
  };

  const handleOnChangeY = (e) => {
    setCurrentValueY(Number(e.target.value))
  };

  return (
    <div className='coordinate-section'>
      <span className='text-primary'>Circle:</span>
      <span className='text-secondary'>{circles.length ? currentCircle + 1 : ' Add a Circle'}</span>

      <div className='coordinates'>
        <div className='coordinate-inputs'>
          <div className='coordinate-label'>
            <div>
              <span className='text-primary'>X</span><span className='text-secondary'> -coordinate</span>
            </div>
            <input type="number" disabled={currentCircle === null} value={currentValueX} className='coordinate-input' onBlur={handleInputX} onInput={handleOnChangeX} onKeyDown={(e) => e.key === 'Enter' && handleInputX(e)} />
          </div> 
          <div className='text-secondary-2'>
            Set values to set the selected horizontally
          </div>           
        </div>
        <div className='coordinate-inputs'>
          <div className='coordinate-label'>
            <div>
              <span className='text-primary'>Y</span><span className='text-secondary'> -coordinate</span>
            </div>
            <input type="number" disabled={currentCircle === null} value={currentValueY} className='coordinate-input' onBlur={handleInputY} onInput={handleOnChangeY} onKeyDown={(e) => e.key === 'Enter' && handleInputY(e)} />          </div> 
          <div className='text-secondary-2'>
            Set values to set the selected vertically
          </div>           
        </div>
      </div>

    </div>
  )
}

export default CoordinatesInput
