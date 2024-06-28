import React from "react";
import { SliderTwoData } from "@/data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Autoplay, Pagination } from "swiper";

SwiperCore.use([Autoplay, Pagination]);

import { Col, Row } from "react-bootstrap";
import Link from "next/link";

const SliderTwo = () => {
  const carouselOptions = {
    spaceBetween: 0,
    loop: true,
    slidesPerView: 1,
    pagination: {
      el: "#slider-two-carousel-pagination",
      type: "bullets",
      clickable: true
    },
    autoplay: {
      delay: 5000
    },
    breakpoints: {
      0: {
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1
      }
    }
  };
  const { image, posts } = SliderTwoData;
  return (
    <section className="banner-style-two">
      <div className="thm-container-fluid clearfix">
        <Row>
          <Col lg={6}>
            <Swiper className="banner-carousel-two" {...carouselOptions}>
              {posts.map(({ title, subTitle, button }, index) => (
                <SwiperSlide key={index}>
                  <div className="item">
                    <div className="single-banner-carousel text-center">
                      <span>{subTitle}</span>
                      <h2>{title}</h2>
                      <Link href={button.url}>
                        <a className="thm-btn yellow-bg">{button.label}</a>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div
                className="swiper-pagination"
                id="slider-two-carousel-pagination"
              ></div>
            </Swiper>
          </Col>
          <Col lg={6}>
            <img src={image} className="float-left" alt="Awesome Image" />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default SliderTwo;
