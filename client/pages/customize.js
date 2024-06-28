import React, { useState, useRef, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BuilderNav from "@/components/builder/nav";
import TextEditor from "@/components/builder/textditor";
// card img
import FrontImg from "../assets/img/cards/business-card-front.jpg"
import BackImg from "../assets/img/cards/business-card-back.jpg"
import FrontImgRed from "../assets/img/cards/red-fornt.jpg"
import BackImgRed from "../assets/img/cards/red-back.jpg"
import FrontImgRed1 from "../assets/img/cards/red-2-front.jpg"
import BackImgRed1 from "../assets/img/cards/red-2-back.jpg"

const CustomizePage = () => {
  const [template, setTemplate] = useState({ front: FrontImg, back: BackImg });
  const [view, setView] = useState('front');
  const canvasRef = useRef();
  const [canvasLoaded, setCanvasLoaded] = useState(true);
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(20);
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontStyle, setFontStyle] = useState('normal');
  const [color, setColor] = useState('#000000');
  const [alignment, setAlignment] = useState('left');

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      // Add any initial drawings or settings here
      setCanvasLoaded(true);
    }
  }, [view, template]);

  const handleTextAdd = () => {
    if (canvasLoaded) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // 1. Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // 2. Draw image on canvas
      const img = new Image();
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        // 3. Add text to the canvas
        context.font = `${fontWeight} ${fontStyle} ${fontSize}px ${fontFamily}`;
        context.fillStyle = color;
        context.textAlign = alignment;
        context.fillText(text, 50, 50); // Adjust position as needed
      };
      img.src = view === 'back' ? template.back : template.front;
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

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleViewChange = (selectedView) => {
    setView(selectedView);
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];

    // Check if a file was selected
    if (file) {
      // Create a FileReader instance
      const reader = new FileReader();

      // Set up a callback function to run when the file is loaded
      reader.onload = function (e) {
        // Get the data URL representing the uploaded image
        const imageDataUrl = e.target.result;

        // Here you can do different things with the image data URL:
        // 1. Store it in state if you want to display the uploaded image somewhere
        // 2. Draw the image onto the canvas

        // For example, if you want to display the uploaded image on the canvas:
        // 1. Get the canvas element
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // 2. Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // 3. Create a new Image element
        const image = new Image();

        // 4. Set the src attribute to the data URL of the uploaded image
        image.src = imageDataUrl;

        // 5. When the image is loaded, draw it onto the canvas
        image.onload = function () {
          // Adjust as needed to fit the image onto the canvas
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (canvasLoaded) {
      const canvas = canvasRef.current;
      const link = document.createElement('a');
      link.download = 'customized_image.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleTemplateClick = (frontImg, backImg) => {
    setTemplate({ front: frontImg, back: backImg });
  };

  return (
    <div>
      <BuilderNav />
      <Container fluid>
        <Row className="mt-3 mb-3">
          <Col md='1'>
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
                  padding: "4px",
                }}
              >
                <a href="#" onClick={() => handleViewChange('front')}>
                  <img src={template.front} alt="" width="100%" />
                </a>
                <small style={{ fontSize: '10px' }}>Front View</small>
              </li>
              <li
                style={{
                  width: "60px",
                  height: "60px",
                  marginRight: "10px",
                  marginBottom: "10px",
                  overflow: 'hidden',
                  padding: "4px",
                }}
              >
                <a href="#" onClick={() => handleViewChange('back')}>
                  <img src={template.back} alt="" width="100%" />
                </a>
                <small style={{ fontSize: '10px' }}>Back View</small>
              </li>
            </ul>
          </Col>

          <Col md='5' style={{ position: 'relative' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img src={template[view]} alt="" width="100%" />
              <canvas
                ref={canvasRef}
                className="canvas-box"
                style={{
                  position: "absolute",
                  top: `0px`,
                  left: `px`,
                  fontSize: `${fontSize}px`,
                  fontWeight: fontWeight,
                  color: `${color}`,
                  textAlign: alignment,
                  fontFamily: fontFamily,
                  fontStyle: fontStyle,
                  zIndex: 999,
                }}
              >
                {text}
              </canvas>
            </div>
          </Col>
          <Col md='6'>
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="home" title="Add Text">
                <TextEditor
                  text={text}
                  fontSize={fontSize}
                  color={color}
                  fontWeight={fontWeight}
                  fontFamily={fontFamily}
                  fontStyle={fontStyle}
                  alignment={alignment}
                  handleTextChange={handleTextChange}
                  handleFontSizeChange={handleFontSizeChange}
                  handleColorChange={handleColorChange}
                  handleFontWeightChange={handleFontWeightChange}
                  handleFontStyleChange={handleFontStyleChange}
                  handleFontFamilyChange={handleFontFamilyChange}
                  handleAlignmentChange={handleAlignmentChange}
                  handleTextAdd={handleTextAdd} // Pass handleTextAdd function
                  handleLogoUpload={handleLogoUpload}
                />
              </Tab>
              {/* <Tab eventKey="logo" title="Add Logo">
               
              </Tab> */}
              <Tab eventKey="template" title="Card Template">
                <Row>
                  <Col md='3'>
                    <a href="#" onClick={() => handleTemplateClick(FrontImgRed, BackImgRed)}>
                      <img src={FrontImgRed} alt="GSD" width="100%" />
                    </a>
                  </Col>
                  <Col md='3'>
                    <a href="#" onClick={() => handleTemplateClick(FrontImgRed1, BackImgRed1)}>
                      <img src={FrontImgRed1} alt="GSD" width="100%" />
                    </a>
                  </Col>
                  <Col md='3'>
                    <a href="#" onClick={() => handleTemplateClick(FrontImg, BackImg)}>
                      <img src={FrontImg} alt="GSD" width="100%" />
                    </a>
                  </Col>
                </Row>
              </Tab>
            </Tabs>
            <hr></hr>
            <div className="mt-3 text-right">
              <Button onClick={handleDownload}>Download With  Text</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomizePage;
