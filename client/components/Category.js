import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCategoryData, BASE_PATH } from 'pages/request/api.js';

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Col, Container, Row } from "react-bootstrap";
// import categoryImage2 from "./images/category2.jpg";
import categoryImage1 from "../assets/img/category/cate-deal.png";
import categoryImage2 from "../assets/img/category/cate-businesscard.png";
import categoryImage3 from "../assets/img/category/postcard.png";
import categoryImage4 from "../assets/img/category/cat-signbanner.png";
import categoryImage5 from "../assets/img/category/cate-sticker.png";
import categoryImage6 from "../assets/img/category/home-gift.png";
import categoryImage7 from "../assets/img/category/cat-celebration.png";
import categoryImage8 from "../assets/img/category/wedding.png";
import categoryImage9 from "../assets/img/category/cat-clothing.png";

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

SwiperCore.use([Autoplay, Pagination, Navigation]);

const Category = () => {

    // const categories = [
    //     { name: "Deals", image: categoryImage1 },
    //     { name: "Business Cards", image: categoryImage2 },
    //     { name: "Postcards & Print Advertising", image: categoryImage3 },
    //     { name: "Signs, Banners & Posters", image: categoryImage4 },
    //     { name: "Labels, Stickers & Packaging", image: categoryImage5 },
    //     { name: "Home & Gifts", image: categoryImage6 },
    //     { name: "Celebrations, Invitations & Stationery", image: categoryImage7 },
    //     { name: "Wedding", image: categoryImage8 },
    //     { name: "Clothing & Bags", image: categoryImage9 },

    //     // Add more categories here as needed

    // ];

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        getData();
    }, []); // Empty dependency array means this effect runs only once, like componentDidMount
  
    async function getData() {
        try {
          const fetchedData = await getCategoryData();
          console.log(fetchedData.categories);
          setCategories(fetchedData.categories);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      }

    //   async function fetchData() {
    //     try {
    //         const response = await fetch('http://localhost:8080/api/categories');
    //         const responseData = await response.json();
    //       console.log('call');
    //       setCategories(responseData.categories);
    //       console.log(categories);
    //       setLoading(false);
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //       setLoading(false);
    //     }
    //   }

    const carouselOptions = {
        spaceBetween: 10,
        loop: true,
        slidesPerView: 3,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        autoplay: {
            delay: 5000
        },
        breakpoints: {
            0: {
                slidesPerView: 2
            },
            576: {
                slidesPerView: 3
            },
            768: {
                slidesPerView: 4
            },
            992: {
                slidesPerView: 6
            },
            1200: {
                slidesPerView: 8
            },
        }
    };

    return (
        <div className="category-main mt-5 mb-5">
            <Container fluid>
                <h4 className="mb-4"><b>All categories</b></h4>
                <Row>
                    <Col md='12'>
                        <Swiper className="testi-carousel" {...carouselOptions}>
                            {categories.map((category, index) => (
                                <SwiperSlide key={index}>
                                    <div className="category-list text-center">
                                        <a href={"/product/" + category._id}>
                                            <img src={BASE_PATH + category.categoryImage} alt={category.categoryName} width={100} />
                                            <h6 className="mt-1" style={{ color: '#000' }}>{category.categoryName}</h6>
                                        </a>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="swiper-button-prev" id="main-slider-prev">
                        </div>
                        <div className="swiper-button-next" id="main-slider-next">
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Category;
