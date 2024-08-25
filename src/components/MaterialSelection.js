import { useState } from 'react'

const MaterialSelection = ({ selectMaterial, materials, material }) => {
  const [selectedMaterial, setSelectedMaterial] = useState('');

  const handleSelect = (material) => {
    setSelectedMaterial(material);
    selectMaterial(material);
  };

  return (
    <div className='coordinate-section'>
      <span className='text-primary'>Material.</span> <span className='text-secondary'>Choose a material</span>
      <div className='materials'>
        {materials.map((material, index) => (
          <div
            key={index}
            className={`material-selector ${selectedMaterial === material.name && 'selected'}`}
            onClick={() => handleSelect(material.name)}
          >
            {material.name}
            <div className='text-primary-2' style={{textAlign: 'left', padding: '5px 0'}}>
              {material.info}
            </div>
            <div className='material-selector-image' style={{backgroundImage: `url(${material.image})`}}></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MaterialSelection


/* import React, { useState } from 'react';

function MaterialSelection({ selectMaterial }) {
  const materials = ['Wood', 'Metal', 'Plastic', 'Glass', 'Fiber'];
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const handleSelect = (material) => {
    setSelectedMaterial(material);
    selectMaterial(material);
  };

  return (
    <div className="material-selection">
      {materials.map((material, index) => (
        <div
          key={index}
          onClick={() => handleSelect(material)}
          style={{
            padding: '10px',
            margin: '5px',
            border: selectedMaterial === material ? '2px solid blue' : '1px solid gray',
            cursor: 'pointer',
          }}
        >
          {material}
        </div>
      ))}
    </div>
  );
}

export default MaterialSelection;
 */