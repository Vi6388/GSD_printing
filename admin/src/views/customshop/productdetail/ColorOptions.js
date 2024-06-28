import React from 'react';

const ColorOptions = ({ handleColorButtonClick }) => {
  return (
    <div className="product-color-options mt-3">
      <h5 style={{ marginBottom: "10px" }}>Colors:</h5>
      <div className='d-flex'>
        <button
          className='me-2'
          style={{
            backgroundColor: '#000',
            width: '20px',
            height: '20px',
            cursor: 'pointer'
          }}
          onClick={() => handleColorButtonClick('#000000')} // Apply handleColorButtonClick on button click
        ></button>
        <button
          className='me-2'
          style={{
            backgroundColor: '#fff',
            width: '20px',
            height: '20px',
            cursor: 'pointer'
          }}
          onClick={() => handleColorButtonClick('#ffffff')} // Apply handleColorButtonClick on button click
        ></button>
        <button
          className='me-2'
          style={{
            backgroundColor: '#0000FF',
            width: '20px',
            height: '20px',
            cursor: 'pointer'
          }}
          onClick={() => handleColorButtonClick('#0000FF')}
        ></button>
        <button
          className='me-2'
          style={{
            backgroundColor: '#FF0000',
            width: '20px',
            height: '20px',
            cursor: 'pointer'
          }}
          onClick={() => handleColorButtonClick('#FF0000')}
        ></button>
        <button
          className='me-2'
          style={{
            backgroundColor: '#808080',
            width: '20px',
            height: '20px',
            cursor: 'pointer'
          }}
          onClick={() => handleColorButtonClick('#808080')}
        ></button>
      </div>
    </div>
  );
};

export default ColorOptions;
