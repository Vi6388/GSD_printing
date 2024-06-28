import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, Row, Col, TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import CounterInput from "react-counter-input";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ResizableRect from "react-resizable-rotatable-draggable";
import { FaTshirt } from 'react-icons/fa';
import { Camera } from 'react-feather';
import { MdOutlineTextFields } from 'react-icons/md';
import TabItem from './TabItem';
import TabAddImage from './TabAddImage';
import TextEditor from './TextEditor';
import ColorOptions from './ColorOptions';
import SizeOptions from './SizeOptions';


import productFrontBlack from "../../../assets/images/yougift/itemdetail.jpg";
import productBackBlack from "../../../assets/images/yougift/itemdetailback.jpg";
import productFrontWhite from "../../../assets/images/yougift/whitefront.png";
import productBackWhite from "../../../assets/images/yougift/whiteback.png";
import productFrontBlue from "../../../assets/images/yougift/bluefront.png";
import productBackBlue from "../../../assets/images/yougift/blueback.png";
import productFrontGray from "../../../assets/images/yougift/grayfront.png";
import productBackGray from "../../../assets/images/yougift/grayback.png";
import productFrontRed from "../../../assets/images/yougift/redfornt.png";
import productBackRed from "../../../assets/images/yougift/redback.png";
// new route today

const ProductBuilder = ({ isOpen, toggleModal }) => {
  const [width, setWidth] = useState(100);
  const [fontSize, setFontSize] = useState(20);
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontStyle, setFontStyle] = useState('normal');
  const [color, setColor] = useState('#000000');
  const [alignment, setAlignment] = useState('left');
  const [height, setHeight] = useState(100);
  const [top, setTop] = useState(100);
  const [left, setLeft] = useState(100);
  const [rotateAngle, setRotateAngle] = useState(0);
  const [frontView, setFrontView] = useState(true);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedView, setSelectedView] = useState('front'); // Default to front view
  const [isTextLocked, setIsTextLocked] = useState(false);
  const [isImageLocked, setIsImageLocked] = useState(false);

  const [productImages, setProductImages] = useState({
    'front': {
      '#000000': productFrontBlack,
      '#ffffff': productFrontWhite,
      '#0000FF': productFrontBlue,
      '#808080': productFrontGray,
      '#FF0000': productFrontRed,

      // Add more color variations for front view if necessary
    },
    'back': {
      '#000000': productBackBlack,
      '#ffffff': productBackWhite,
      '#0000FF': productBackBlue,
      '#808080': productBackGray,
      '#FF0000': productBackRed,



      // Add more color variations for back view if necessary
    }

  });
  const handleResize = (style, isShiftKey, type) => {
    if (!isTextLocked && !isImageLocked) {
      const { top, left, width, height } = style;
      setTop(Math.round(top));
      setLeft(Math.round(left));
      setWidth(Math.round(width));
      setHeight(Math.round(height));
    }
  };

  const handleDrag = (deltaX, deltaY) => {
    if (!isTextLocked && !isImageLocked) {
      setLeft(left + deltaX);
      setTop(top + deltaY);
    }
  };

  const handleRotate = (rotateAngle) => {
    setRotateAngle(rotateAngle);
  };

  const handleImageAdd = (imageUrl, shouldRemove = false) => {
    if (shouldRemove) {
      setImage(null); // Remove the image
    } else {
      setImage(imageUrl); // Add the image
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const handleFontWeightChange = (selectedOption) => {
    setFontWeight(selectedOption.value);
  };

  const handleAlignmentChange = (selectedOption) => {
    setAlignment(selectedOption.value); // update alignment state
  };

  const handleFontFamilyChange = (selectedOption) => {
    setFontFamily(selectedOption.value); // update alignment state
  };

  const handleFontStyleChange = (selectedOption) => {
    setFontStyle(selectedOption.value); // update alignment state
  };

  const handleColorButtonClick = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleViewChange = (view) => {
    setSelectedView(view);
  };

  const toggleTextLock = () => {
    setIsTextLocked(!isTextLocked);
  };

  // Toggle lock state for image
  const toggleImageLock = () => {
    setIsImageLocked(!isImageLocked);
  };

const renderText = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        fontSize: `${fontSize}px`,
        fontWeight: fontWeight,
        color: `${color}`,
        textAlign: alignment,
        fontFamily: fontFamily,
        fontStyle: fontStyle,
        pointerEvents: isTextLocked ? 'none' : 'auto', // Disable pointer events when locked
      }}
    >
      {text}
    </div>
  );
};

// Render image element (always render)
const renderImage = () => {
  return (
    <div style={{ position: "absolute", top: `${top}px`, left: `${left}px`, width: `${width}px` }}>
      <img src={image} alt="Added Image" width="100%" style={{ pointerEvents: isImageLocked ? 'none' : 'auto' }} /> {/* Disable pointer events when locked */}
    </div>
  );
};

// Apply lock logic to text and image elements
const lockedText = isTextLocked ? renderText() : null;
const lockedImage = isImageLocked ? renderImage() : null;
  return (
    <Modal isOpen={isOpen} toggle={toggleModal} fullscreen>
      <ModalHeader toggle={toggleModal}>Product Design</ModalHeader>
      <ModalBody>
        <Card>
          <CardBody>
            <Row>
              <Col lg="6">
                <div>
                  <ul
                    className=""
                    style={{
                      padding: "0",
                      listStyle: "none",
                      marginTop: "20px",
                      position: "absolute",
                      left: "14px",
                      zIndex: "1",
                    }}
                  >
                    <li
                      style={{
                        width: "60px",
                        height: "60px",
                        marginRight: "10px",
                        marginBottom: "10px",
                        overflow: 'hidden',
                        border: selectedView === 'front' ? "1px solid#e60c0a" : "1px solid#ccc",
                        padding: "4px",
                      }}
                    >
                      <Link onClick={() => handleViewChange('front')}>
                        <img src={productImages['front'][selectedColor]} alt="" width="100%" />
                      </Link>
                    </li>
                    <li
                      style={{
                        width: "60px",
                        height: "60px",
                        marginRight: "10px",
                        marginBottom: "10px",
                        overflow: 'hidden',
                        border: selectedView === 'back' ? "1px solid#e60c0a" : "1px solid#ccc",
                        padding: "4px",
                      }}
                    >
                      <Link onClick={() => handleViewChange('back')}>
                        <img src={productImages['back'][selectedColor]} alt="" width="100%" />
                      </Link>
                    </li>
                  </ul>
                  <div className="imb-box">
                    <div style={{float:'right'}}>
                    <Button color='primary' className='me-1' size='sm' onClick={toggleTextLock}>
  {isTextLocked ? 'Unlock Text' : 'Lock Text'}
</Button>
<Button color='primary' size='sm' onClick={toggleImageLock}>
  {isImageLocked ? 'Unlock Image' : 'Lock Image'}
</Button>
                    </div>

                    <img src={productImages[selectedView][selectedColor]} alt="" width="100%" id="map" />
                    <ResizableRect
                      left={left}
                      top={top}
                      width={width}
                      height={height}
                      rotateAngle={rotateAngle}
                      zoomable="n, w, s, e, nw, ne, se, sw"
                      onRotate={handleRotate}
                      onResize={handleResize}
                      onDrag={handleDrag}
                    />
                {!isTextLocked &&
        <div
          style={{
            position: "absolute",
            top: `${top}px`,
            left: `${left}px`,
            width: `${width}px`,
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight,
            color: `${color}`,
            textAlign: alignment,
            fontFamily: fontFamily,
            fontStyle: fontStyle,
            zIndex: 999, // Ensure text appears above ResizableRect
          }}
        >
          {text}
        </div>
      }
      {/* Render image element */}
      {!isImageLocked &&
        <div style={{ position: "absolute", top: `${top}px`, left: `${left}px`, width: `${width}px`, zIndex: 999 }}>
          <img src={image} alt="Added Image" width="100%" />
        </div>
      }
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div style={{ border: "1px solid rgb(204 204 204 / 25%)" }}>
                  <div className="p-1">
                    <Nav tabs className="justify-content-left">
                      <NavItem>
                        <NavLink
                          active={active === "1"}
                          onClick={() => {
                            toggle("1");
                          }}
                        >
                          <FaTshirt size={25} />
                          Products
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          active={active === "2"}
                          onClick={() => {
                            toggle("2");
                          }}
                        >
                          <Camera size={25} />
                          Add Image
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          active={active === "3"}
                          onClick={() => {
                            toggle("3");
                          }}
                        >
                          <MdOutlineTextFields size={25} />
                          Add Text
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent className="py-50" activeTab={active}>
                      <TabPane tabId="1">
                        <div className="mt-1">
                          <h4>
                            Custom Men's Deluxe T-Shirts
                            <span style={{ float: "right" }}>
                              {/* <BsQuestionCircle size={25} /> */}
                              {/* <FaqModal /> */}
                            </span>
                          </h4>
                          <div className="product-color-options mt-3">
                            <ColorOptions handleColorButtonClick={handleColorButtonClick} />
                            <SizeOptions handleSizeChange={handleSizeChange} />
                          </div>

                        </div>
                      </TabPane>
                      <TabPane tabId="2">
                        <TabAddImage onImageAdd={handleImageAdd} />
                      </TabPane>
                      <TabPane tabId="3">
                        <TextEditor
                          text={text}
                          fontSize={fontSize}
                          color={color}
                          fontWeight={fontWeight}
                          fontFamily={fontFamily}
                          fontStyle={fontStyle}
                          alignment={alignment} // pass alignment state
                          handleTextChange={handleTextChange}
                          handleFontSizeChange={handleFontSizeChange}
                          handleColorChange={handleColorChange}
                          handleFontWeightChange={handleFontWeightChange}
                          handleFontStyleChange={handleFontStyleChange} // pass alignment handler
                          handleFontFamilyChange={handleFontFamilyChange} // pass alignment handler
                          handleAlignmentChange={handleAlignmentChange} // pass alignment handler

                        />
                      </TabPane>
                    </TabContent>
                  </div>
                </div>
                <div
                  className=""
                  style={{
                    display: "inline-block",
                    width: "100%",
                    marginTop: "25px",
                  }}
                >
                  <div style={{ float: "left" }}>
                    <CounterInput
                      min={0}
                      max={10}
                      onCountChange={(count) => console.log(count)}
                    />
                  </div>
                  <div style={{ float: "right" }}>
                    <h2
                      style={{
                        fontWeight: "bold",
                        fontSize: "25px",
                        color: "#e60c0a",
                      }}
                    >
                      $21.59
                    </h2>
                  </div>
                </div>
                <hr />
                <div style={{ marginTop: "20px" }}>
                  <button className="btn btn-primary">Save</button>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter>
      </ModalFooter>
    </Modal>
  );
};

export default ProductBuilder;
