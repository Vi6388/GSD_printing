import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { fabric } from 'fabric';
import axios from 'axios';
import { uploadEditedImage,getProductTemplateByID, BASE_PATH } from '../request/api.js';
import { Col, Container, Row, Button, Card } from 'react-bootstrap';
import FrontImgPreview from "../../assets/img/products/preview3.jpeg"
import FrontImg from "../../assets/img/cards/business-card-front.jpg"
import BackImg from "../../assets/img/cards/business-card-back.jpg"
import FrontImgRed from "../../assets/img/cards/red-fornt.jpg"
import BackImgRed from "../../assets/img/cards/red-back.jpg"
import FrontImgRed1 from "../../assets/img/cards/red-2-front.jpg"
import BackImgRed1 from "../../assets/img/cards/red-2-back.jpg"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/img/logo.png'
import { FaCity, FaDownload, FaFacebook, FaIcons, FaImage, FaInstagram, FaLocationArrow, FaMailBulk, FaMap, FaPhone, FaPlus, FaTrash, FaUpload } from 'react-icons/fa';
import { FiPrinter } from "react-icons/fi";
import { GrRefresh, GrTextWrap } from "react-icons/gr";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, } from 'reactstrap';
import { TbTextResize } from "react-icons/tb";
import { BsCreditCard2Front, BsCreditCard2Back } from "react-icons/bs";
import StockImg1 from "../../assets/img/products/stcokimg1.png"
import StockImg2 from "../../assets/img/products/stcokimg2.png"
import StockImg3 from "../../assets/img/products/stcokimg3.jpg"
import StockImg4 from "../../assets/img/products/stcokimg4.jpg"
import StockImg5 from "../../assets/img/products/stcokimg5.jpg"
// Import SVG icons
import Icon1 from '../../assets/img/svg/facebook.svg';
import Icon2 from '../../assets/img/svg/call-black.svg';
import Icon3 from '../../assets/img/svg/call-red.svg';
import Icon4 from '../../assets/img/svg/facebook-blue.svg';
import Icon5 from '../../assets/img/svg/facebook-circle.svg';
import Icon6 from '../../assets/img/svg/gmail.svg';
import Icon7 from '../../assets/img/svg/gmail2.svg';
import Icon8 from '../../assets/img/svg/instagram_circle.svg';
import Icon9 from '../../assets/img/svg/linkedin-circle.svg';
import Icon10 from '../../assets/img/svg/linkedin-ogininal.svg';
import Icon11 from '../../assets/img/svg/playstore.svg';
import Icon12 from '../../assets/img/svg/twitter-circle.svg';
import Icon13 from '../../assets/img/svg/twitter-square.svg';
import Icon14 from '../../assets/img/svg/youtube.svg';
import Icon15 from '../../assets/img/svg/call-black.svg';
import Icon16 from '../../assets/img/svg/call-red.svg';


SwiperCore.use([Autoplay, Pagination, Navigation]);

const BusinessCardBuilder = () => {
    const router = useRouter();
    let productID  = router.query.id;
    const { query } = router;
    const { templateID} = router.query;
    const [objects, setObjects] = useState('');
    const [isFirst, setIsFirst] = useState(true);
    const [loading, setLoading] = useState(true);

    const canvasRef = useRef(null);
    const fabricCanvasRef = useRef(null);
    const [view, setView] = useState('front');
    const [text, setText] = useState('');
    const [fontFamily, setFontFamily] = useState('Arial');
    const [fontSize, setFontSize] = useState(16);
    const [textColor, setTextColor] = useState('#000000');
    const [fontStyle, setFontStyle] = useState('normal');
    const [fontWeight, setFontWeight] = useState('normal');
    const [canvasLoaded, setCanvasLoaded] = useState(true);
    const [template, setTemplate] = useState({ front: FrontImg, back: BackImg });
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [open, setOpen] = useState('1');
    const imageItems = [
        { frontImg: FrontImgPreview, backImg: FrontImgPreview },
        { frontImg: FrontImgRed, backImg: BackImgRed },
        { frontImg: FrontImgRed1, backImg: BackImgRed1 },
        { frontImg: FrontImg, backImg: BackImg }
    ];
    const StockItems = [
        { Img: StockImg1 },
        { Img: StockImg2 },
        { Img: StockImg3 },
        { Img: StockImg4 },
        { Img: StockImg5 },
    ];

    const icons = [
        { icon: Icon1, width: 50, },
        { icon: Icon2, width: 50, },
        { icon: Icon3, width: 50, },
        { icon: Icon4, width: 50, },
        { icon: Icon5, width: 50, },
        { icon: Icon6, width: 50, },
        { icon: Icon7, width: 50, },
        { icon: Icon8, width: 50, },
        { icon: Icon9, width: 50, },
        { icon: Icon10, width: 50, },
        { icon: Icon11, width: 50, },
        { icon: Icon12, width: 50, },
        { icon: Icon13, width: 50, },
        { icon: Icon14, width: 50, },
        { icon: Icon15, width: 50, },
        { icon: Icon16, width: 50, },
        // Add more icons as needed
    ];

    const colors = ['#fff', '#000', '#0000ff', '#939598', '#ff00ff', '#00ffff'];

    useEffect(() => {
        if (!fabricCanvasRef.current) {
            fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
                height: 270,
                width: 500,
                backgroundColor: '#fff',
            });

            // Add event listener to handle selection change
            fabricCanvasRef.current.on('selection:created', handleSelection);
            fabricCanvasRef.current.on('selection:updated', handleSelection);
            fabricCanvasRef.current.on('selection:cleared', handleSelection);
        }
        setCanvasLoaded(true);
        getData();
    }, [text, fontSize, fontWeight, router]);

    async function getData() {
        try {
            console.log(query);
            console.log(templateID);
            const fetchedData = await getProductTemplateByID(templateID);
            console.log(fetchedData);
            // {
            //   price: "$100 from $17.99",
            //   name: "Standard(3.5 x 2)",
            //   color: "Rectangular dimensions give you a recognizable look.",
            //   imageUrl: productimg1,
            // },
        let list = fetchedData.productTemplate;
        setObjects(list[0].objects);
        const jsonObject = JSON.parse(list[0].objects);
        console.log(jsonObject);
        if(isFirst){
            setAllObjects(jsonObject);
        }
        setLoading(true);

      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    // Define a function to get all text objects from the canvas
    function setAllObjects(jsonObject) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d'); 
        const renderObjects = () => {
            jsonObject.forEach(obj => {
              if (obj.type === 'text') {
                console.log(obj.text);
                // context.fillText(obj.text, obj.left, obj.top);

                const textObj = new fabric.Text(obj.text, {
                    fontFamily: fontFamily,
                    fontSize: fontSize,
                    fill: textColor,
                    fontStyle: fontStyle,
                    fontWeight: fontWeight,
                    left: obj.left,
                    top: obj.top,
                });

                fabricCanvasRef.current.add(textObj);

              } else if (obj.type === 'image') {
                const base64Image = obj.src;
                console.log(base64Image);

                fabric.Image.fromURL(base64Image, (img) => {
                    img.set({
                        left: obj.left,
                        top: obj.top,
                        scaleX: obj.scaleX,
                        scaleY: obj.scaleY
                    });
                    fabricCanvasRef.current.add(img);
                });

                /*const image = new Image();
                image.src = base64Image;
                image.onload = () => {
                    context.drawImage(image, obj.left, obj.top);
                };

                const reader = new FileReader();
                reader.onload = function (e) {
                    
                };
                reader.readAsDataURL(file);*/

              }
              // Add more conditions for other object types if needed
              
            });
          };
          renderObjects();
          setIsFirst(false);
    }

    const handleSaveImage = (event) => {
        // Get the canvas element
        const canvas = canvasRef.current;
        var objs = fabricCanvasRef.current.getObjects().map(function(o) {
            return o.set('active', true);
        });
        console.log(objs);

        const dataURL = canvas.toDataURL('image/png');
        // Convert canvas to blob
        canvas.toBlob(async (blob) => {
          // Create a FormData object
          const formData = new FormData();
          // Append the blob to the FormData object
          formData.append('image', blob, 'canvas_image.png');
          formData.append('canvas', canvas);

          let response = await uploadEditedImage(dataURL, JSON.stringify(objs), productID);
          if(response){
            console.log("yes");
            router.push('/product/productdetail/' + productID);
          }else{
            console.log("no");
          }
        }, 'image/png');
    };

    const handleSelection = (event) => {
        const selectedObject = event.target;
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
            activeObject.set('text', text);
            fabricCanvasRef.current.renderAll();
        }
    };

    const removeSelected = () => {
        const activeObject = fabricCanvasRef.current.getActiveObject();
        if (activeObject) {
            fabricCanvasRef.current.remove(activeObject);
        }
    };

    const switchView = (selectedView) => {
        setView(selectedView); // Update the view state

        if (selectedView === 'back' || selectedView === 'front') {
            // Reset canvas to white background
            fabricCanvasRef.current.clear();
            fabricCanvasRef.current.backgroundColor = '#fff';
            fabricCanvasRef.current.renderAll();
        }
    };

    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    const handleColorChange = (color) => {
        fabricCanvasRef.current.setBackgroundColor(color, () => {
            fabricCanvasRef.current.renderAll();
        });
    };

    const handleTemplateClick = (backImg) => {
        fabric.Image.fromURL(backImg, (img) => {
            fabricCanvasRef.current.setBackgroundImage(img, fabricCanvasRef.current.renderAll.bind(fabricCanvasRef.current), {
                scaleX: fabricCanvasRef.current.width / img.width,
                scaleY: fabricCanvasRef.current.height / img.height
            });
            setSelectedTemplate(img);
        });
    };

    const handleRemoveBackground = () => {
        fabricCanvasRef.current.setBackgroundImage(null, fabricCanvasRef.current.renderAll.bind(fabricCanvasRef.current));
        setSelectedTemplate(null);
    };

    const handleStockImageClick = (imageUrl) => {
        // Call the function to add the selected image to the canvas
        addStockImageToCanvas(imageUrl);
    };

    // Create a new function to handle the image loading and adding it to the canvas
    const addStockImageToCanvas = (imageUrl) => {
        fabric.Image.fromURL(imageUrl, (img) => {
            fabricCanvasRef.current.add(img);
        });
    };

    const handleIconClick = (icon) => {
        fabric.Image.fromURL(icon.icon, (img) => {
            img.set({
                scaleX: icon.width / img.width,
                scaleY: icon.width / img.height,
                fill: icon.color,
                left: 100,
                top: 100
            });
            fabricCanvasRef.current.add(img);
        });
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

    const handleConfirm = () => {
        if (canvasLoaded) {
            const canvas = canvasRef.current;
            const link = document.createElement('a');
            link.download = 'customized_image.png';
            link.href = canvas.toDataURL('image/png');
            link.onchange = handleImageUpload;
            link.click();
        }
    };

    const Print = () => {     
        const canvas = fabricCanvasRef.current;
        if (canvas) {
            const dataUrl = canvas.toDataURL('image/png');
            const printWin = window.open('', '', 'width=340,height=260');
            printWin.document.write('<!DOCTYPE html>');
            printWin.document.write('<html>');
            printWin.document.write('<head><title>Print Canvas</title></head>');
            printWin.document.write('<body>');
            printWin.document.write('<img src="' + dataUrl + '" onload="window.print();window.close()" />');
            printWin.document.write('</body>');
            printWin.document.write('</html>');
            printWin.document.close();
        } else {
            console.error('Canvas element not found');
        }
    };
    return (
        <div>
            <Navbar data-bs-theme="dark" style={{ backgroundColor: '#fff' }}>
                <Container fluid>
                    <Navbar.Brand href="/" className='p-0'>
                        <img src={Logo} alt='GSDprinting' width='150px' />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Button
                            className={`btn btn-primary mr-2 ${view === 'front' ? 'active' : ''}`}
                            onClick={() => switchView('front')}
                        >
                            <BsCreditCard2Front size={25} /> Front View
                        </Button>
                        <Button
                            className={`btn btn-primary mr-2 ${view === 'back' ? 'active' : ''}`}
                            onClick={() => switchView('back')}
                        >
                            <BsCreditCard2Back size={25} /> Back View
                        </Button>
                        <Button onClick={removeSelected} className='btn btn-danger mr-2'>
                            <FaTrash size={18} />  Remove Selected
                        </Button>

                        <Button className='btn btn-primary mr-2' onClick={() => Print()}>
                            <FiPrinter size={25} /> Print
                        </Button>
                        <Button className='btn btn-primary mr-2' onClick={handleDownload}>
                            <FaDownload size={25} /> Download
                        </Button>
                        <Button className='btn btn-primary mr-2' onClick={handleSaveImage}>
                            Confirm
                        </Button>
                        <Button href="/productdetail" color='primary mr-2'>
                            Back to Product
                        </Button>

                    </Nav>
                </Container>
            </Navbar>
            <Container fluid style={{ backgroundColor: '#f7f7f7' }}>
                <Row>
                    <Col md="3">
                        <div className='sidebar'>
                            <Accordion open={open} toggle={toggle}>
                                <AccordionItem>
                                    <AccordionHeader className='acc-1' targetId="1">
                                        <TbTextResize className='mr-2' size={22} fill='#00adef' stroke='#00adef' /> Add Text
                                    </AccordionHeader>
                                    <AccordionBody className='p-2' accordionId="1">
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

                                            <Col md='12' className='mt-4'>
                                                <Button size='sm' onClick={addText} className='btn btn-primary' style={{ marginRight: '5px' }}>
                                                    <FaPlus size={12} /> Add Text
                                                </Button>
                                                <Button size='sm' onClick={updateText} className='btn btn-secondary' style={{ marginRight: '5px' }}>
                                                    <GrRefresh size={12} /> Update Text
                                                </Button>
                                            </Col>
                                        </Row>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader className='acc-1' targetId="2">
                                        <FaUpload className='mr-2' size={22} fill='#00adef' stroke='#00adef' />    Your Uploads
                                    </AccordionHeader>
                                    <AccordionBody className='p-2' accordionId="2">
                                        <Row>
                                            <Col md='12' className='pt-2 pb-3'>
                                                <label className='mb-0' style={{ fontSize: '14px' }}>Upload Image/Logo</label>
                                                <Button onClick={addImage} className='btn btn-success w-100'>Upload Image</Button>
                                            </Col>
                                        </Row>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader className='acc-1' targetId="6">
                                        <FaImage className='mr-2' size={22} fill='#00adef' stroke='#00adef' />
                                        Customizations
                                    </AccordionHeader>
                                    <AccordionBody className='p-2' accordionId="6">
                                        <Row>
                                            <label className='mb-0 pl-3' style={{ fontSize: '14px' }}>Color themes</label>
                                            <Col md='12' className='pt-3 pb-3'>
                                                {colors.map((color, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleColorChange(color)}
                                                        style={{
                                                            backgroundColor: color,
                                                            width: '35px',
                                                            height: '35px',
                                                            margin: '3px',
                                                            display: 'inline-block',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            border: '1px solid#000'
                                                        }}
                                                    >
                                                    </div>
                                                ))}
                                            </Col>
                                        </Row>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader className='acc-1' targetId="5">
                                        <FaImage className='mr-2' size={22} fill='#00adef' stroke='#00adef' />
                                        Add Template
                                    </AccordionHeader>
                                    <AccordionBody className='p-2' accordionId="5">
                                        <div className='p-2'>
                                            <Row>
                                                {imageItems.map((item, index) => (
                                                    <Col md="4" key={index} className='mb-2'>
                                                        <div onClick={() => handleTemplateClick(item.backImg)}>
                                                            <img src={item.frontImg} alt="Template" width="100%" />
                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                            <Button size='sm' onClick={handleRemoveBackground} disabled={!selectedTemplate}>
                                                Remove Background
                                            </Button>
                                        </div>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader className='acc-1' targetId="3">
                                        <FaImage className='mr-2' size={22} fill='#00adef' stroke='#00adef' />  Stock Images
                                    </AccordionHeader>
                                    <AccordionBody className='p-2' accordionId="3">
                                        <div className='p-2'>
                                            <Row>
                                                {StockItems.map((item, index) => (
                                                    <Col md="4" key={index} className='mb-2'>
                                                        <a href="#" onClick={() => handleStockImageClick(item.Img)}>
                                                            <img src={item.Img} alt="GSD" width="100%" />
                                                        </a>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader className='acc-1' targetId="4">
                                        <FaIcons className='mr-2' size={22} fill='#00adef' stroke='#00adef' />
                                        Icons
                                    </AccordionHeader>
                                    <AccordionBody className='p-2' accordionId="4">
                                        <Row>
                                            <Col md='12'>
                                                <Row>
                                                    {icons.map((icon, index) => (
                                                        <Col xs='2' key={index} className='mb-2' style={{padding:'0px 10px'}}>
                                                            <div onClick={() => handleIconClick(icon)} style={{cursor:'pointer'}}>
                                                                <img src={icon.icon} alt="Icon" width="100%" />
                                                            </div>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </Col>
                                        </Row>
                                    </AccordionBody>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </Col>
                    <Col md="9">
                        <div className='content-inner'>
                            <div className='main-img-bx'>
                                <canvas ref={canvasRef} className="canvas-box canvas" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default BusinessCardBuilder;
