import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, Row, Col, TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import CounterInput from "react-counter-input";
import productfront from "../../../assets/images/yougift/itemdetail.jpg";
import productback from "../../../assets/images/yougift/itemdetailback.jpg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ResizableRect from "react-resizable-rotatable-draggable";
import { FaTshirt } from 'react-icons/fa';
import { Camera } from 'react-feather';
import { MdOutlineTextFields } from 'react-icons/md';
import TabItem from './TabItem';
import AddText from './AddText';
import TabAddImage from './TabAddImage';

const ProductBuilder = ({ isOpen, toggleModal }) => {
  const [textInfo, setTextInfo] = useState({
    text: "",
    fontSize: 20, // Default font size
    color: '#000000' // Default color
  });
  const [width, setWidth] = useState(100);
  const [fontSize, setFontSize] = useState('');
  const [color, setColor] = useState('');
  const [height, setHeight] = useState(100);
  const [top, setTop] = useState(100);
  const [left, setLeft] = useState(100);
  const [rotateAngle, setRotateAngle] = useState(0);
  const [frontView, setFrontView] = useState(true); // Track whether front view is selected
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  const handleResize = (style, isShiftKey, type) => {
    let { top, left, width, height, text, fontSize, color } = style;
    top = Math.round(top);
    left = Math.round(left);
    width = Math.round(width);
    height = Math.round(height);
    fontSize = Math.round(fontSize);
    setTop(top);
    setLeft(left);
    setWidth(width);
    setHeight(height);
    setFontSize(fontSize);
    setColor(color);
  };

  const handleRotate = (rotateAngle) => {
    setRotateAngle(rotateAngle);
  };

  const handleDrag = (deltaX, deltaY) => {
    setLeft(left + deltaX);
    setTop(top + deltaY);
  };

  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };



  const handleImageAdd = (imageUrl) => {
    setImage(imageUrl);
  };
  const handleTextAdd = (text, style) => {
    setTextInfo({
      text: text,
      fontSize: style.fontSize,
      color: style.color
    });
  };

  const handleViewChange = (view) => {
    setFrontView(view === 'front'); // Set frontView to true if 'front' is selected, false otherwise
  };

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
                        border: frontView ? "1px solid#e60c0a" : "1px solid#ccc",
                        padding: "4px",
                      }}
                    >
                      <Link onClick={() => handleViewChange('front')}>
                        <img src={productfront} alt="" width="100%" />
                      </Link>
                    </li>
                    <li
                      style={{
                        width: "60px",
                        height: "60px",
                        marginRight: "10px",
                        marginBottom: "10px",
                        border: !frontView ? "1px solid#e60c0a" : "1px solid#ccc",
                        padding: "4px",
                      }}
                    >
                      <Link onClick={() => handleViewChange('back')}>
                        <img src={productback} alt="" width="100%" />
                      </Link>
                    </li>
                  </ul>
                  <div className="imb-box">
                    <img src={frontView ? productfront : productback} alt="" width="100%" id="map" />
                    {/* {image && <img src={image} alt="Added Image" width="100%" />} */}
                    <ResizableRect
  left={left}
  top={top}
  width={width}
  height={height}
  text={text}
  fontSize={textInfo.fontSize} // Pass font size from textInfo state
  color={textInfo.color} // Pass color from textInfo state
  rotateAngle={rotateAngle}
  zoomable="n, w, s, e, nw, ne, se, sw"
  onRotate={handleRotate}
  onResize={handleResize}
  onDrag={handleDrag}
/>
                   {textInfo.text &&
                      <div
                        style={{
                          position: "absolute",
                          top: `${top}px`,
                          left: `${left}px`,
                          width: `${width}px`,
                          fontSize: `${textInfo.fontSize}px`,
                          color: `${textInfo.color}`,
                        }}
                      >
                        {textInfo.text}
                      </div>
}
                    {image && <div style={{ position: "absolute", top: `${top}px`, left: `${left}px`, width: `${width}px` }}><img src={image} alt="Added Image" width="100%" /></div>}
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <div style={{ border: "1px solid rgb(204 204 204 / 25%)" }}>
                  <div className="p-1">
                    <Nav tabs className="justify-content-center">
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
                        <TabItem />
                      </TabPane>
                      <TabPane tabId="2">
                        <TabAddImage onImageAdd={handleImageAdd} />
                      </TabPane>
                      <TabPane tabId="3">
                        <AddText onTextAdd={handleTextAdd} />
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
                  <button className="btn btn-primary">Add to Gift List</button>
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
