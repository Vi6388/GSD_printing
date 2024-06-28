import React from 'react';
import { Col, Input, Label, Row } from 'reactstrap';
import ReactSelect from 'react-select';

const TextEditor = ({ text, fontSize, color, fontWeight, alignment,fontFamily, fontStyle, handleTextChange, handleFontSizeChange, handleColorChange, handleFontWeightChange, handleAlignmentChange, handleFontStyleChange,handleFontFamilyChange }) => {
  return (
    <div className="p-1">
      <Row className='mt-1'>
        <Col xs='4'>
          <Label className='fs-5 fw-700' htmlFor="text">Text:</Label>
        </Col>
        <Col xs='8'>
          <Input type='text' id="text"  placeholder="Type your text here"  value={text} onChange={handleTextChange} />
        </Col>
      </Row>
      <Row className='mt-1'>
        <Col xs='4'>
          <Label className='fs-5 fw-700' htmlFor="fontSize">Font Size:</Label>
        </Col>
        <Col xs='8'>
          <Input type="number" id="fontSize" placeholder="Enter font size" value={fontSize} onChange={handleFontSizeChange} />
        </Col>
      </Row>
      <Row className='mt-1'>
        <Col xs='4'>
          <Label className='fs-5 fw-700' placeholder="Select color" htmlFor="color">Color:</Label>
        </Col>
        <Col xs='8'>
          <Input type='color' id="color" value={color} onChange={handleColorChange} />
        </Col>
      </Row>
      <Row className='mt-1'>
        <Col xs='4'>
          <Label className='fs-5 fw-700' htmlFor="fontWeight">Font Weight:</Label>
        </Col>
        <Col xs='8'>
          <ReactSelect
            id="fontWeight"
            value={{ label: fontWeight, value: fontWeight }}
            onChange={handleFontWeightChange}
            options={[
              { label: 'Select font weight', value: 'Select font weight'},
              { label: 'Normal', value: 'normal' },
              { label: 'Bold', value: 'bold' },
              { label: 'Lighter', value: 'lighter' }
            ]}
          />
        </Col>
      </Row>
      <Row className='mt-1'>
        <Col xs='4'>
          <Label className='fs-5 fw-700' htmlFor="fontStyle">Font Style:</Label>
        </Col>
        <Col xs='8'>
          <ReactSelect
            id="fontStyle"
            value={{ label: fontStyle, value: fontStyle }}
            onChange={handleFontStyleChange}
            options={[
              { label: 'Select font style', value: 'Select font style' },
              { label: 'Normal', value: 'normal' },
              { label: 'Italic', value: 'italic' }
            ]}
          />
        </Col>
      </Row>
      <Row className='mt-1'>
        <Col xs='4'>
          <Label className='fs-5 fw-700' htmlFor="fontFamily">Font Family:</Label>
        </Col>
        <Col xs='8'>
          <ReactSelect
            id="fontFamily"
            value={{ label: fontFamily, value: fontFamily }}
            onChange={handleFontFamilyChange}
            options={[
              { label: 'Select font family', value: 'Select font family' },
              { label: 'Arial', value: 'Arial, sans-serif' },
              { label: 'Times New Roman', value: 'Times New Roman, serif' },
              { label: 'Verdana', value: 'Verdana, sans-serif' },
              // Add more font family options as needed
            ]}
          />
        </Col>
      </Row>
      <Row className='mt-1'>
      <Col xs='4'>
        <Label className='fs-5 fw-700' htmlFor="alignment">Alignment:</Label>
      </Col>
      <Col xs='8'>
        <ReactSelect
          id="alignment"
          value={{ label: alignment, value: alignment }}
          onChange={handleAlignmentChange}
          options={[
            { label: 'Select alignment', value: 'Select alignment' },
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
            { label: 'Center', value: 'center' }
          ]}
        />
      </Col>
    </Row>
    </div>
  );
};

export default TextEditor;
