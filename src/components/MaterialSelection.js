import { useState } from 'react'

const MaterialSelection = ({ selectMaterial, materials, material }) => {
  const [selectedMaterial, setSelectedMaterial] = useState('Asiatische Radfahrerin');

  const handleSelect = (material) => {
    setSelectedMaterial(material);
    selectMaterial(material);
  };

  return (
    <div>
      MaterialSelection

      {materials.map((material, index) => (
        <div
          key={index}
          onClick={() => handleSelect(material.name)}
          style={{
            padding: '10px',
            margin: '5px',
            border: selectedMaterial === material.name ? '2px solid blue' : '1px solid gray',
            cursor: 'pointer',
          }}
        >
          {material.name}
        </div>
      ))}
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