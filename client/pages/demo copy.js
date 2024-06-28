import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Col, Container, Row, Button } from 'react-bootstrap';
import FrontImg from "../assets/img/cards/business-card-front.jpg"
import BackImg from "../assets/img/cards/business-card-back.jpg"
import FrontImgRed from "../assets/img/cards/red-fornt.jpg"
import BackImgRed from "../assets/img/cards/red-back.jpg"
import FrontImgRed1 from "../assets/img/cards/red-2-front.jpg"
import BackImgRed1 from "../assets/img/cards/red-2-back.jpg"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/img/logo.png'
import { FaDownload, FaPlus, FaTrash } from 'react-icons/fa';
import { FiPrinter } from "react-icons/fi";
import { GrRefresh } from "react-icons/gr";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const FabricTest = () => {
    const canvasRef = useRef(null);
    const fabricCanvasRef = useRef(null);
    const [text, setText] = useState('');
    const [fontFamily, setFontFamily] = useState('Arial');
    const [fontSize, setFontSize] = useState(16);
    const [textColor, setTextColor] = useState('#000000');
    const [fontStyle, setFontStyle] = useState('normal');
    const [fontWeight, setFontWeight] = useState('normal');

    const [template, setTemplate] = useState({ front: FrontImg, back: BackImg });
    const [view, setView] = useState('front');

    const imageItems = [
        { frontImg: FrontImgRed, backImg: BackImgRed },
        { frontImg: FrontImgRed1, backImg: BackImgRed1 },
        { frontImg: FrontImg, backImg: BackImg }
    ];
    useEffect(() => {
        if (!fabricCanvasRef.current) {
            fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
                // height: ,
                // width: ,
                backgroundColor: 'transparent',
            });

            // Add event listener to handle selection change
            fabricCanvasRef.current.on('selection:created', handleSelection);
            fabricCanvasRef.current.on('selection:updated', handleSelection);
            fabricCanvasRef.current.on('selection:cleared', handleSelection);
        }
    }, []);

    // Function to handle selection change
    const handleSelection = (event) => {
        const selectedObject = event.target;
        // Update the state or perform other operations based on the selected object
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                fabric.Image.fromURL(e.target.result, (img) => {
                    fabricCanvasRef.current.add(img);
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const addImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = handleImageUpload;
        input.click();
    };

    const addText = () => {
        const textObj = new fabric.Text(text, {
            fontFamily: fontFamily,
            fontSize: fontSize,
            fill: textColor,
            fontStyle: fontStyle,
            fontWeight: fontWeight,
            left: 100,
            top: 100,
        });
        fabricCanvasRef.current.add(textObj);
    };

    const updateText = () => {
        const activeObject = fabricCanvasRef.current.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.set({
                fontFamily: fontFamily,
                fontSize: fontSize,
                fill: textColor,
                fontStyle: fontStyle,
                fontWeight: fontWeight,
            });
            fabricCanvasRef.current.renderAll();
        }
    };

    const removeSelected = () => {
        const activeObject = fabricCanvasRef.current.getActiveObject();
        if (activeObject) {
            fabricCanvasRef.current.remove(activeObject);
        }
    };


    const handleViewChange = (selectedView) => {
        setView(selectedView);
    };


    const handleTemplateClick = (frontImg, backImg) => {
        setTemplate({ front: frontImg, back: backImg });
    };

    const carouselOptions = {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 4,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            size: "20px"
        },
        autoplay: {
            delay: 5000
        },
        breakpoints: {
            0: {
                slidesPerView: 2
            },
            576: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 2
            },
            992: {
                slidesPerView: 2
            },
            1200: {
                slidesPerView: 4
            },
        }
    };

    // const handleTemplateClick = (frontImg, backImg) => {
    //     // Your handleTemplateClick logic here
    //     console.log("Front Image:", frontImg);
    //     console.log("Back Image:", backImg);
    //   };
    return (
        <div>
            <Navbar bg="light" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="/" className='p-0'>
                        <img src={Logo} alt='GSDprinting' width='150px' />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Button className='btn btn-primary mr-2'>
                            <FiPrinter size={25} /> Print
                        </Button>
                        <Button className='btn btn-primary mr-2'>
                            <FaDownload size={25} /> Download
                        </Button>
                        <Button href="/productdetail" color='primary'>
                            Back to Product
                        </Button>

                    </Nav>
                </Container>
            </Navbar>
            <Container fluid className='mt-3 mb-3'>
                <Row>
                    <Col md="12">
                        {/* <div>
                            <button onClick={addImage}>Add Image</button>
                            <button onClick={addText}>Add Text</button>
                            <button onClick={removeSelected}>Remove Selected</button>
                            <button onClick={updateText}>Update Text</button>
                            <input
                                type="text"
                                placeholder="Enter text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <select
                                value={fontFamily}
                                onChange={(e) => setFontFamily(e.target.value)}
                            >
                                <option value="Arial">Arial</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Courier New">Courier New</option>
                                <option value="Georgia">Georgia</option>
                            </select>
                            <select
                                value={fontStyle}
                                onChange={(e) => setFontStyle(e.target.value)}
                            >
                                <option value="normal">Normal</option>
                                <option value="italic">Italic</option>
                                <option value="oblique">Oblique</option>
                            </select>
                            <select
                                value={fontWeight}
                                onChange={(e) => setFontWeight(e.target.value)}
                            >
                                <option value="normal">Normal</option>
                                <option value="bold">Bold</option>
                                <option value="lighter">Lighter</option>
                                <option value="bolder">Bolder</option>
                            </select>
                            <input
                                type="number"
                                value={fontSize}
                                onChange={(e) => setFontSize(parseInt(e.target.value))}
                            />
                            <input
                                type="color"
                                value={textColor}
                                onChange={(e) => setTextColor(e.target.value)}
                            />
                        </div> */}
                    </Col>

                    <Col md="6">
                        <div className='main-img-bx'>
                            <img src={template[view]} alt="" width="100%" />
                            <canvas ref={canvasRef} className="canvas-box" />
                        </div>
                        <ul
                            className=""
                            style={{
                                padding: "0",
                                listStyle: "none",
                                marginTop: "20px",
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
                                    display: 'inline-block'
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
                                    display: 'inline-block'
                                }}
                            >
                                <a href="#" onClick={() => handleViewChange('back')}>
                                    <img src={template.back} alt="" width="100%" />
                                </a>
                                <small style={{ fontSize: '10px' }}>Back View</small>
                            </li>
                        </ul>
                    </Col>
                    <Col md="6">
                        <Row>
                            <Col md='12'>
                                <h4 className='mb-2'>Card Templates</h4>
                                <Swiper className="testi-carousel" {...carouselOptions}>
                                    {imageItems.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <a href="#" onClick={() => handleTemplateClick(item.frontImg, item.backImg)}>
                                                <img src={item.frontImg} alt="GSD" width="100%" />
                                            </a>
                                        </SwiperSlide>
                                    ))}

                                </Swiper>
                                <div className="swiper-button-prev" id="main-slider-prev" style={{ fontSize: '20px' }}>
                                </div>
                                <div className="swiper-button-next" id="main-slider-next" style={{ fontSize: '20px' }}>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" className='mt-1'>
                                <label className='mb-0' style={{ fontSize: '14px' }}>Text</label>
                                <textarea value={text}
                                    onChange={(e) => setText(e.target.value)} type="text" rows={3} placeholder="Enter text" className='form-control'></textarea>
                            </Col>

                            <Col md="6" className='mt-1'>
                                <label className='mb-0' style={{ fontSize: '14px' }}>Font Family</label>
                                <select
                                    className='form-control'
                                    value={fontFamily}
                                    onChange={(e) => setFontFamily(e.target.value)}
                                >
                                    <option value="Arial">Arial</option>
                                    <option value="Verdana">Verdana</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Courier New">Courier New</option>
                                    <option value="Georgia">Georgia</option>
                                </select>
                            </Col>
                            <Col md='6' className='mt-1'>
                                <label className='mb-0' style={{ fontSize: '14px' }}>Font Size</label>
                                <input
                                    className='form-control'
                                    type="number"
                                    value={fontSize}
                                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                                />
                            </Col>
                            <Col md='6' className='mt-1'>
                                <label className='mb-0' style={{ fontSize: '14px' }}>Color</label>
                                <input
                                    className='form-control'
                                    type="color"
                                    value={textColor}
                                    onChange={(e) => setTextColor(e.target.value)}
                                />
                            </Col>
                            <Col md='6' className='mt-1'>
                                <label className='mb-0' style={{ fontSize: '14px' }}>Font Weight</label>
                                <select
                                    className='form-control'
                                    value={fontWeight}
                                    onChange={(e) => setFontWeight(e.target.value)}
                                >
                                    <option value="normal">Normal</option>
                                    <option value="bold">Bold</option>
                                    <option value="lighter">Lighter</option>
                                    <option value="bolder">Bolder</option>
                                </select>
                            </Col>
                            <Col md='6' className='mt-1'>
                                <label className='mb-0' style={{ fontSize: '14px' }}>Font Style</label>
                                <select
                                    className='form-control'
                                    value={fontStyle}
                                    onChange={(e) => setFontStyle(e.target.value)}
                                >
                                    <option value="normal">Normal</option>
                                    <option value="italic">Italic</option>
                                    <option value="oblique">Oblique</option>
                                </select>
                            </Col>
                            <Col md='6' className='mt-1'>
                                <label className='mb-0' style={{ fontSize: '14px' }}>Upload Image/Logo</label>

                                <Button onClick={addImage} className='btn btn-success w-100'>Upload Image</Button>
                            </Col>
                            <Col md='12' className='mt-4'>
                                <Button onClick={addText} className='btn btn-primary' style={{ marginRight: '10px' }}>
                                    <FaPlus size={16} /> Add Text
                                </Button>
                                <Button onClick={updateText} className='btn btn-secondary' style={{ marginRight: '10px' }}>
                                    <GrRefresh size={16} /> Update Text
                                </Button>
                                <Button onClick={removeSelected} className='btn btn-danger' style={{ marginRight: '10px' }}>
                                    <FaTrash size={16} /> Remove
                                </Button>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default FabricTest;
