import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getProductByCategoryData,getProductsByShapeCategory, BASE_PATH } from '../request/api.js';

import Layout from "@/components/layout";
import Footer from "@/components/footer";
import HeaderOne from "@/components/header-one";
import MenuContextProvider from "@/context/menu-context";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import productimg1 from '../../assets/img/products/product-1.jpg'
import productimg2 from '../../assets/img/products/product-2.jpg'
import productimg3 from '../../assets/img/products/product-3.jpg'
import productimg4 from '../../assets/img/products/product-4.jpg'


const ProductPage = () => {
    console.log('--- product page ---')
    // const listData = [
    //     {
    //         title: "Shapes",
    //         items: ["Standard", "Rounded Corner", "Square"]
    //     },
    //     {
    //         title: "Traditional Cards",
    //         items: ["Matte", "Glossy", "Uncoated", "Shop All Traditional Cards"]
    //     },
    //     {
    //         title: "Premium Cards",
    //         items: ["Foil Accent", "Embossed Gloss", "Raised Foil", "Linen", "Pearl", "Soft Touch", "Shop All Premium Cards"]
    //     },
    //     {
    //         title: "Eco Cards",
    //         items: ["Recycled Matte", "Natural Textured", "Kraft", "Bamboo", "Hemp-Blend", "Shop All Eco Cards",]
    //     },
    //     {
    //         title: "Deluxe Cards",
    //         items: ["Premium Plus", "Painted Edge", "Ultra Thick", "Durable", "Plastic", "Clear Plastic", "Shop All Deluxe Cards"]
    //     },
    //     {
    //         title: "Digital Business Cards",
    //         items: ["QR Code", "NFC",]
    //     },
    //     {
    //         title: "Looking for more?",
    //         items: ["Business Card Holders", "Magnetic Business Cards", "Business Card Stickers", "Loyalty Cards", "Free Business Card Sample Kit"]
    //     },

    // ];

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

    const router = useRouter();
    const [productList, setProducts] = useState([]);
    const [listData, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const category_id  = router.query.id;
        getData(category_id);
    }, [router]); // Empty dependency array means this effect runs only once, like componentDidMount
  
    async function getData(category_id) {
        try {
            console.log("+++++" + category_id);
            const fetchedData = await getProductByCategoryData();
           
    //     {
    //         title: "Premium Cards",
    //         items: ["Foil Accent", "Embossed Gloss", "Raised Foil", "Linen", "Pearl", "Soft Touch", "Shop All Premium Cards"]
    //     },
        let list = fetchedData.productsByCategory;
        let listDa = [];
        console.log(list);
        console.log(list.length);

        for(var i = 0;i < list.length;i++){
            let toAdd = { "title": list[i].categoryName, "categoryID": list[i].categoryID, "products": list[i].products};
            listDa.push(toAdd);
        }   
        setData(listDa);
        setLoading(false);
        const fetchedDataByShape = await getProductsByShapeCategory(category_id);
        fetchedDataByShape.length == 0 ? setProducts([]) : setProducts(fetchedDataByShape.productsByCategory[0].products) 
        console.log(fetchedDataByShape.productsByCategory[0].products);

        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      }

    return (
        <MenuContextProvider>
            <Layout>
                <HeaderOne />
                <section>
                    <div className="product-page">
                        <Container fluid>
                            <Row>
                                <Col md='3'>
                                </Col>
                                <Col md='9'>
                                    <div className="banner-text">
                                        <div className="content-text">
                                            <h2>
                                                Business Cards
                                            </h2>
                                            <p>
                                                The right card for your business? We print that. Easily <br></br>customize your design, paper and more.
                                            </p>
                                            <Button className="btn-danger">Get Started</Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="product-lists">
                        <Container fluid>
                            <Row>
                                <Col md="3" style={{ paddingLeft: '0px' }}>
                                    <div className="left-side-bar">
                                        <h3>Business Cards</h3>
                                        <hr></hr>
                                        {listData.map((section, index) => (
                                            <ul key={index}>
                                                <a className='bold' href={section.categoryID}>{section.title}</a>
                                                {section.products.map((item, itemIndex) => (
                                                    <li key={itemIndex}>
                                                        <a href="">{item.productName}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        ))}
                                    </div>
                                </Col>
                                <Col md="9">
                                    <div className="right-side mt-4">
                                        <h3>Shop by shape</h3>
                                        <p>Explore all your card options</p>
                                        <Row>
                                            {productList.map((product, index) => (
                                                <Col md='4' key={index}>
                                                    <div className="product-item">
                                                        <a href={"/product/productdetail/" + product._id}>
                                                            <div className="offer-bx">
                                                                <span>
                                                                    <Badge variant="success">Best Seller</Badge>
                                                                </span>
                                                                <span style={{ float: 'right' }}><Badge variant="danger">Upto {product.discountPrice}% off</Badge>
                                                                </span>
                                                            </div>
                                                            <img src={BASE_PATH + product.productImage} alt={product.productName} width='100%' height="420px"/>
                                                            <div className="p-3">
                                                                <h5>{product.productName}</h5>
                                                                <p>
                                                                    {product.description}
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
                                                                        {product.price}
                                                                    </span>
                                                                    |
                                                                    <span style={{ fontSize: '14px' }}>
                                                                        Code: {Math.floor(Math.random() * 100000)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                    <div className="right-side mt-4">
                                        <h3>Shop special finishes</h3>
                                        <p>More than a finishing touch, these special inks and overlays elevate your whole card.</p>
                                        <Row>
                                        {productList.map((product, index) => (
                                                <Col md='4' key={index}>
                                                    <div className="product-item">
                                                        <a href={"/product/productdetail/" + product._id}>
                                                            <div className="offer-bx">
                                                                <span>
                                                                    <Badge variant="success">Best Seller</Badge>
                                                                </span>
                                                                <span style={{ float: 'right' }}><Badge variant="danger">Upto {product.discountPrice}% off</Badge>
                                                                </span>
                                                            </div>
                                                            <img src={BASE_PATH + product.productImage} alt={product.productName} width='100%' height="420px"/>
                                                            <div className="p-3">
                                                                <h5>{product.productName}</h5>
                                                                <p>
                                                                    {product.description}
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
                                                                        {product.price}
                                                                    </span>
                                                                    |
                                                                    <span style={{ fontSize: '14px' }}>
                                                                        Code: {Math.floor(Math.random() * 100000)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                    <div className="right-side mt-4">
                                        <h3>Shop papers & textures</h3>
                                        <p>Get creative with this collection of attention-grabbing papers and materials.</p>
                                        <Row>
                                        {productList.map((product, index) => (
                                                <Col md='4' key={index}>
                                                    <div className="product-item">
                                                        <a href={"/product/productdetail/" + product._id}>
                                                            <div className="offer-bx">
                                                                <span>
                                                                    <Badge variant="success">Best Seller</Badge>
                                                                </span>
                                                                <span style={{ float: 'right' }}><Badge variant="danger">Upto {product.discountPrice}% off</Badge>
                                                                </span>
                                                            </div>
                                                            <img src={BASE_PATH + product.productImage} alt={product.productName} width='100%'  height="420px"/>
                                                            <div className="p-3">
                                                                <h5>{product.productName}</h5>
                                                                <p>
                                                                    {product.description}
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
                                                                        {product.price}
                                                                    </span>
                                                                    |
                                                                    <span style={{ fontSize: '14px' }}>
                                                                        Code: {Math.floor(Math.random() * 100000)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </section>
                <Footer />
            </Layout>
        </MenuContextProvider>
    );
};

export default ProductPage;
