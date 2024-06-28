import React from 'react';

const SizeOptions = ({ handleSizeChange }) => {
  return (
    <div className="product-color-options mt-3">
      <h5 style={{ marginBottom: "10px" }}>
        Size:
        {/* <span style={{ marginLeft: "20px", fontSize: "12px" }}>Large</span> */}
      </h5>
      <ul className="d-flex" style={{ padding: "0px", listStyle: "none" }}>
        <li className="custom-size" style={{ cursor: 'pointer' }} onClick={() => handleSizeChange('S')}>
          S
        </li>
        <li className="custom-size" style={{ cursor: 'pointer' }} onClick={() => handleSizeChange('M')}>
          M
        </li>
        <li className="custom-size" style={{ cursor: 'pointer' }} onClick={() => handleSizeChange('L')}>
          L
        </li>
        <li className="custom-size" style={{ cursor: 'pointer' }} onClick={() => handleSizeChange('XL')}>
          XL
        </li>
        <li className="custom-size" style={{ cursor: 'pointer' }} onClick={() => handleSizeChange('2XL')}>
          2XL
        </li>
      </ul>
    </div>
  );
};

export default SizeOptions;
