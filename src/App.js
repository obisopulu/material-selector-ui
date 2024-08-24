import React, { useRef, useEffect, useState } from 'react';
import './App.css'

import CoordinatesInput from './components/CoordinatesInput';
import ImageSection from './components/ImageSection';
import MaterialSelection from './components/MaterialSelection';

import Circles from './components/Circles'

const App = () => {
  const elementRef = useRef(null);

  const [circles, setCircles] = useState([]);
  const [currentCircle, setCurrentCircle] = useState(0);
  const [material, setMaterial] = useState('');
  const [image, setImage] = useState(null);
  const [windowOffset, SetWindowOffset] = useState({ y: 0, x: 0 });

  const [fade, setFade] = useState(false);

  const [resizeOffset, setResizeOffset] = useState({ top: 0, left: 0 });

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);
  
  const materials = [{
    name: 'Asiatische Radfahrerin',
    image: 'https://rueckwand24.com/cdn/shop/files/Wandbild-Wandbild-Asiatische-Radfahrerin-WB-000122-Slide-1_x800.jpg?v=1695219891',
  }, {
    name: 'Brettspiele Schwarz-weiss',
    image: 'https://rueckwand24.com/cdn/shop/files/Wandbild-Wandbild-Brettspiele---Schwarz-weiss-WB-001359-Slide-1_x800.jpg?v=1695309927',
  }, {
    name: 'Bunte Antike Kunstobjekte',
    image: 'https://rueckwand24.com/cdn/shop/files/Wandbild-Wandbild-Bunte-Antike-Kunstobjekte-Illustrationen-WB-003657-Slide-8_x800.jpg?v=1711642569',
  }, {
    name: 'Vogelperspektive',
    image: 'https://rueckwand24.com/cdn/shop/files/Wandbild-Wandbild-Vogelperspektive-in-Kappadokien---Tuerkei--WB-000920-Slide-1_x800.jpg?v=1695295794',
  }, {
    name: 'Haus in den Wolken',
    image: 'https://rueckwand24.com/cdn/shop/files/Wandbild-Wandbild-Haus-in-den-Wolken-WB-000576-Slide-1_x800.jpg?v=1695247523',
  }];

  const addCircle = () => {
    if (circles.length < 1) {
      const newCircles = [{ x: windowOffset.x + 300 - 10, y: windowOffset.y + 200 - 10 }];
      setCircles(newCircles);
      setCurrentCircle(0)
      setResizeOffset(windowOffset)
    } else {
      const newCircles = [...circles, { x: windowOffset.x + 300 - 10, y: windowOffset.y + 200 - 10 }];
      setCircles(newCircles);
      setCurrentCircle(circles.length);
    }
  };
  
  const updateCircle = (index, x, y) => {
    let Collision = false;
    const newCircles = [...circles];
    y < windowOffset.y && (y = windowOffset.y);
    y > windowOffset.y + 400 && (y = windowOffset.y + 400 - 20);
    x < windowOffset.x && (x = windowOffset.x);
    x > windowOffset.x + 600 && (x = windowOffset.x + 600 - 20);

    circles.forEach((circle, index) => {
      if (index !== currentCircle) {
        if(y < circle.y + 20 && y > circle.y - 20 && x < circle.x + 20 && x > circle.x - 20) {
          Collision = true;
        }
      }
    })

    newCircles[index] = !Collision ? { x: x, y: y } : circles[currentCircle];
    setCircles(newCircles);
  };

  const handleMaterialSelect = ( newMaterial ) => {
    setFade(true);

    setMaterial(newMaterial);
    const material = materials.find(material => material.name === newMaterial) 
    setImage(material.image);

    setTimeout(() => {
      setFade(false);
    }, 500);
  };

  const handlesetCurrentCircle = ( index ) => {
    setCurrentCircle(index)
  };

  const updatePosition = () => {
    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      SetWindowOffset({
        y: rect.y + scrollTop,
        x: rect.x + scrollLeft
      });
    }
  };

  const hanndlePrintOut = () => {
    console.log('Selected Material:', material || 'No material selected');

    circles.length < 1 && console.log('Added Circle(s):', 'No Circles have been added yet');

    circles.forEach((circle, index) => {
      const percentageX = (circle.x / window.innerWidth) * 100;
      const percentageY = (circle.y / window.innerHeight) * 100;
      
      const scrollTop = window.scrollY;
      const scrollLeft = window.scrollX;

      const marginOffset = 10;

      const percentageInFrameX = ((circle.x - scrollLeft - windowOffset.x + marginOffset) / 600) * 100;
      const percentageInFrameY = ((circle.y - scrollTop - windowOffset.y + marginOffset) / 400) * 100;

      console.log(`Circle ${index + 1}:`);
      console.log(` - Coordinates In Image Frame:  X: ${ (circle.x - scrollLeft - windowOffset.x) + marginOffset }px (${ percentageInFrameX.toFixed(2)}% ), Y: ${ (circle.y - scrollTop - windowOffset.y) + marginOffset }px (${ percentageInFrameY.toFixed(2)}% )`);
      console.log(` - Coordinates In Browser Window:  X: ${ (circle.x - scrollLeft) + marginOffset }px (${ percentageX.toFixed(2)}% ), Y: ${ (circle.y - scrollTop) + marginOffset }px (${ percentageY.toFixed(2)}% )`);
    });
  }

  return (
    <div className="app">
      <ImageSection image={image} forUseRef={elementRef} fade={fade} />
      <div className="customization-section">
        <CoordinatesInput circles={circles} addCircle={addCircle} updateCircle={updateCircle} currentCircle={currentCircle} />
        <button onClick={addCircle}>Add circle</button>
        <MaterialSelection selectMaterial={handleMaterialSelect} materials={materials} material={material} />
        <button onClick={hanndlePrintOut}>Console log data</button>
      </div>
      <Circles circles={circles} updateCircle={updateCircle} setCurrentCircle={handlesetCurrentCircle} currentCircle={currentCircle} windowOffset={windowOffset} resizeOffset={resizeOffset} />
    </div>
  )
}

export default App
