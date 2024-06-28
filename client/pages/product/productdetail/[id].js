import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import {getProductByID,getRelatedProduct,getImagesByProductID, BASE_PATH } from '../../request/api.js';

import Layout from "@/components/layout";
import Footer from "@/components/footer";
import HeaderOne from "@/components/header-one";
import MenuContextProvider from "@/context/menu-context";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import productimg1 from '../../../assets/img/products/product-1.jpg'
import productimg2 from '../../../assets/img/products/product-2.jpg'
import productimg3 from '../../../assets/img/products/product-3.jpg'
import productimg4 from '../../../assets/img/products/product-4.jpg'
import PageHeader from "@/components/page-header";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProductOverviewTab from "@/components/gsd/productoverviewtab";
import ProductFaqTab from "@/components/gsd/productfaqtab";
import ProductTemplateTab from "@/components/gsd/producttemplatetab";
import ProductOptionTab from "@/components/gsd/productoptiontab";
import ProductRatingTab from "@/components/gsd/productratingtab";
SwiperCore.use([Autoplay, Pagination, Navigation]);
// const productList = [
//     {
//         brand: "Best Seller",
//         discount: "Upto 10% off",
//         price: "$45",
//         name: "Standard",
//         description: "Rectangular dimensions give you a recognizable look.",
//         imageUrl: productimg1,
//     },
//     {
//         brand: "Best Seller",
//         discount: "Upto 10% off",
//         price: "$45",
//         name: "Rounded Corners",
//         description: "Rectangular dimensions give you a recognizable look.",
//         imageUrl: productimg2,
//     },
//     {
//         brand: "Best Seller",
//         discount: "Upto 10% off",
//         price: "$45",
//         name: "Embossed Gloss",
//         description: "Rectangular dimensions give you a recognizable look.",
//         imageUrl: productimg3,
//     },
//     {
//         brand: "Best Seller",
//         discount: "Upto 10% off",
//         price: "$45",
//         name: "Standard",
//         description: "Rectangular dimensions give you a recognizable look.",
//         imageUrl: productimg4,
//     },

// ];
const ProductDetailPage = () => {
    const router = useRouter();
    const [productInfo, setProducts] = useState([]);
    const [productList, setProductRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(productimg1); // Initially selecting the first image
    const [selectedQuantity, setSelectedQuantity] = useState(50); // Initially selecting the first quantity
    const [key, setKey] = useState('overview');
    let categoryID = 0;
    let productID  = router.query.id;
    // const productImages = [productimg1, productimg2, productimg3, productimg4];
    const [productImages, setProductImages] = useState([]);

    useEffect(() => {
        console.log(productID);   
        getData(productID);
    }, [router]); // Empty dependency array means this effect runs only once, like componentDidMount
  
    async function getData(productID) {
        try {
            const fetchedData = await getProductByID(productID);
            setProducts(fetchedData.product[0]);
            categoryID = fetchedData.product[0].categoryID;

            const fetchedProductImagesData = await getImagesByProductID(productID);
            console.log(fetchedProductImagesData);
            let imageList = fetchedProductImagesData.image;
            console.log(imageList);
            setProductImages(imageList);
            setSelectedImage(BASE_PATH + fetchedData.product[0].productImage);

            console.log("categoryID +++" + categoryID);
            const fetchedRelatedProduct = await getRelatedProduct(categoryID);
            console.log(fetchedRelatedProduct.product);
            setProductRelated(fetchedRelatedProduct.product);
            } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
            }
      }

    // Demo product images

    const carouselOptions = {
        spaceBetween: 30,
        loop: true,
        slidesPerView: 3,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        },
        breakpoints: {
            1600: {
              slidesPerView: 3,
              // spaceBetween: 10,
            },
            1300: {
              slidesPerView: 4,
              // spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              // spaceBetween: 10,
            },
            320: {
              slidesPerView: 2,
              // spaceBetween: 10,
            },
        }
    };

    const quantityList = [50, 100,]; // Your quantity options

    return (
        <MenuContextProvider>
            <Layout>
                <HeaderOne />
                <PageHeader title="Product Detail" name="Product Detail" />
                <section className="mt-5 mb-5">
                    <Container fluid>
                        <Row>
                            <Col md="7">
                                <div className="">
                                    <img src={selectedImage} alt="Product" style={{ width: '90%', minHeight: 'auto' }} />
                                </div>
                                <div className="mt-3">
                                    <Swiper className="testi-carousel"  {...carouselOptions}>
                                        
                                        <SwiperSlide key={0}>
                                            <div className="center">
                                                <img src={BASE_PATH + productInfo.productImage} alt={`Thumbnail ${0 + 1}`} style={{ width: '100%', cursor: 'pointer' }} onClick={() => setSelectedImage(BASE_PATH + productInfo.productImage)} />
                                            </div>
                                        </SwiperSlide>

                                        {productImages.map((image, index) => (
                                            <SwiperSlide key={index+1}>
                                                <div  className="center">
                                                    <img src={BASE_PATH + image.filename} alt={`Thumbnail ${index + 1}`} style={{ width: '100%', cursor: 'pointer' }} onClick={() => setSelectedImage(BASE_PATH + image.filename)} />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <div className="swiper-button-prev" id="main-slider-prev">
                                    </div>
                                    <div className="swiper-button-next" id="main-slider-next">
                                    </div>
                                </div>
                            </Col>
                            <Col md="5">    
                                <div className="p-3">
                                    <h4>{productInfo.productName}</h4>
                                    <div className="rating">
                                        <i style={{ color: '#ff9800', marginRight: '3px' }} className="fa fa-star" aria-hidden="true"></i>
                                        <i style={{ color: '#ff9800', marginRight: '3px' }} className="fa fa-star" aria-hidden="true"></i>
                                        <i style={{ color: '#ff9800', marginRight: '3px' }} className="fa fa-star" aria-hidden="true"></i>
                                        <i style={{ color: '#ff9800', marginRight: '3px' }} className="fa fa-star" aria-hidden="true"></i>
                                        <i style={{ color: '#ff9800', marginRight: '3px' }} className="fa fa-star" aria-hidden="true"></i>
                                        <span style={{ fontSize: '14px' }}>4.5(90295)</span>
                                    </div>
                                    <div>
                                        <span className="mr-2">
                                            <Badge variant="success">Best Seller</Badge>
                                        </span>
                                        <span ><Badge variant="danger">Upto 10% off</Badge>
                                        </span>
                                    </div>
                                    <p className="mt-3">
                                        Want the front of your card to jump out at people? Add raised, 3D
                                        shine to your text, design – or even both. See details

                                    </p>
                                    <div className="mt-3">
                                        <select className="form-control " >
                                            <option>
                                                --Select Paper Thickness--
                                            </option>
                                            <option>
                                                Standard
                                            </option>
                                            <option>
                                                Premium (Recommended)
                                            </option>
                                        </select>

                                        <select className="form-control mt-3" >
                                            <option>
                                                --Select Corner--
                                            </option>
                                            <option>
                                                Standard
                                            </option>
                                            <option>
                                                Rounded
                                            </option>
                                        </select>
                                    </div>
                                    <div className="w-100 mt-4">
                                        <h5>Quantity</h5>
                                        <ul className="quantity-list">
                                            {quantityList.map((quantity, index) => (
                                                <li key={index} className={selectedQuantity === quantity ? "active" : ""} onClick={() => setSelectedQuantity(quantity)}>
                                                    <div className="d-flex">
                                                        <div>
                                                            <h4>{quantity}</h4>
                                                        </div>
                                                        <div style={{ marginLeft: 'auto' }}>
                                                            <h5 className="mb-0">
                                                                ${productInfo.discountPrice} <span style={{ fontSize: '14px' }}>&nbsp;&nbsp;$0.18 / unit</span>
                                                            </h5>
                                                            <small style={{ color: '#07df23' }}>30% savings</small>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <p style={{ fontSize: '14px' }}>100 starting at $17.99</p>
                                    <div className="mt-2" style={{ backgroundColor: '#e7f3f0', padding: '5px', borderRadius: '4px' }}>
                                        <span>
                                            Just ${productInfo.price} 
                                        </span>
                                        &nbsp;| 
                                        <span style={{ fontSize: '14px' }}>
                                             &nbsp;Code: 4343434
                                        </span>
                                    </div>
                                    <Button  href={"/designtemplate/" + productID}   className="btn btn-primary mt-3" style={{ width: '100%' }}>
                                        <div className="d-flex">
                                            <div className="text-left mb-0">
                                                <h5>Upload design</h5>
                                                <small>Have a design? Upload and edit it</small>
                                            </div>
                                            <div style={{ marginLeft: 'auto' }}>
                                                <i style={{ fontSize: '25px', marginTop: '15px' }} className="fa fa-upload" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </Button>
                                </div>
                            </Col>

                            <Col md='12'>
                                <Tabs
                                    id="controlled-tab-example"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="mb-4 mt-3"
                                >
                                    <Tab eventKey="overview" title="Overview">
                                        <ProductOverviewTab/>
                                    </Tab>
                                    <Tab eventKey="faq" title="FAQ">
                                       <ProductFaqTab/>
                                    </Tab>
                                    <Tab eventKey="specstemplates" title="Specs & Templates">
                                       <ProductTemplateTab/>
                                    </Tab>
                                    <Tab eventKey="option" title="Options">
                                        <ProductOptionTab/>
                                    </Tab>
                                    <Tab eventKey="rating" title="Review & Rating">
                                        <ProductRatingTab/>
                                    </Tab>
                                </Tabs>
                            </Col>
                            <Col md='12' className="mt-5">
                                <h3 className="mb-4">Related Products</h3>
                                <Row>

                                {productList.map((product, index) => {
                                    if (product._id != productID) {
                                        return <Col md='3' key={index}>
                                        <div className="product-item">
                                            <a href={"/product/productdetail/" + product._id}>
                                                <div className="offer-bx">
                                                    <span>
                                                        <Badge variant="success">Best Seller</Badge>
                                                    </span>
                                                    <span style={{ float: 'right' }}><Badge variant="danger">Upto 10% off</Badge>
                                                    </span>
                                                </div>
                                                <img src={BASE_PATH + product.productImage} alt={product.productName} width='100%'  height="420px"/>
                                                <div className="p-3">
                                                    <h5>{product.productName}</h5>
                                                    <p>
                                                        Rectangular dimensions give you a recognizable look.
                                                    </p>
                                                    <div className="rating">
                                                        <i style={{ color: '#ff9800', marginRight: '3px' }} className="fa fa-star" aria-hidden="true"></i>
                                                        <i style={{ color: '#ff9800', marginRight: '3px' }} className="fa fa-star" aria-hidden="true"></i>
                                                        <i style={{ color: '#ff9800', marginRight: '3px' }} className="fa fa-star" aria-hidden="true"></i>
                                                        <i style={{ color: '#ff9800', marginRight: '3px' }} className="fa fa-star" aria-hidden="true"></i>
                                                        <i style={{ color: '#ff9800', marginRight: '3px' }} className="fa fa-star" aria-hidden="true"></i>
                                                        <span style={{ fontSize: '14px' }}>4.5(90295)</span>
                                                    </div>
                                                    <div className="mt-2" style={{ backgroundColor: '#e7f3f0', padding: '5px' }}>
                                                        <span>
                                                            ${product.price} &nbsp;
                                                        </span>
                                                        |
                                                        <span style={{ fontSize: '14px' }}>
                                                        &nbsp; Code: 4343434
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </Col>;
                                    } 
                                })}

                                  
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <Footer />
            </Layout>
        </MenuContextProvider>
    );
};

export default ProductDetailPage;
