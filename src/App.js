import React, { useRef, useEffect, useState } from 'react';
import './App.css'

import CoordinatesInput from './components/CoordinatesInput';
import ImageSection from './components/ImageSection';
import MaterialSelection from './components/MaterialSelection';

import Circles from './components/Circles'

const App = () => {
  const elementRef = useRef(null);

  const [circles, setCircles] = useState([]);
  const [currentCircle, setCurrentCircle] = useState(null);
  const [material, setMaterial] = useState('');
  const [image, setImage] = useState(null);
  const [windowOffset, SetWindowOffset] = useState({ y: 0, x: 0 });

  const [fade, setFade] = useState(false);

  const [resizeOffset, setResizeOffset] = useState({ top: 0, left: 0 });

  const [currentValueX, setCurrentValueX] = useState(0);
  const [currentValueY, setCurrentValueY] = useState(0);

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
    name: 'Aldeyarfoss',
    image: 'https://rueckwand24.com/cdn/shop/files/Wandbild-Wandbild-Aldeyarfoss-WB-000580-HB.jpg?v=1695247714&width=660',
    info: 'Himmel',
  }, {
    name: 'Momoyogusa Berge',
    image: 'https://rueckwand24.com/cdn/shop/files/Wandbild-Wandbild-Momoyogusa-Berge---Abstrak-WB-001036-HB.jpg?v=1695299587&width=660',
    info: 'Banksy',
  }, {
    name: 'Stadtbild - Paris, Frankreich',
    image: 'https://rueckwand24.com/cdn/shop/files/Wandbild-Wandbild-Stadtbild---Paris_-Frankreich-WB-000970-HB.jpg?v=1695297521&width=660',
    info: 'Architektur',
  }, {
    name: 'Mountainbiker auf Waldweg',
    image: 'https://rueckwand24.com/cdn/shop/files/Wandbild-Wandbild-Mountainbiker-auf-Waldweg-WB-002917-HB.jpg?v=1695411211&width=660',
    info: 'Sport',
  }, {
    name: 'kraftvolle Steine im Teich',
    image: 'https://rueckwand24.com/cdn/shop/files/Wandbild-Wandbild-kraftvolle-Steine-im-Teich-WB-003050-HB.jpg?v=1695415931&width=660',
    info: 'Zen & Steine',
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
    setCurrentValueY(windowOffset.y + 200 - 10);
    setCurrentValueX(windowOffset.x + 300 - 10);
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
    setCurrentValueY(y);
    setCurrentValueX(x);
    if(Collision){
      newCircles[index] = circles[currentCircle]
    } else {
      newCircles[index] = { x: x, y: y }
    }
    ;
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
    setCurrentValueY(windowOffset.y + 200 - 10);
    setCurrentValueX(windowOffset.x + 300 - 10);
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
        <CoordinatesInput circles={circles} addCircle={addCircle} updateCircle={updateCircle} currentCircle={currentCircle} currentValueX={currentValueX} currentValueY={currentValueY} setCurrentValueX={setCurrentValueX} setCurrentValueY={setCurrentValueY} />
        {/* <div className="hint"></div> */}
        <button onClick={addCircle}>Add circle</button>
        <MaterialSelection selectMaterial={handleMaterialSelect} materials={materials} material={material} />
        <button onClick={hanndlePrintOut}>Console log data</button>
      </div>
      <Circles circles={circles} updateCircle={updateCircle} setCurrentCircle={handlesetCurrentCircle} currentCircle={currentCircle} windowOffset={windowOffset} resizeOffset={resizeOffset} />
    </div>
  )
}

export default App
