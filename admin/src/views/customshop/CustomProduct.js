// ** React Imports
import { Fragment, useState } from "react";
import SwiperCore, { Navigation } from "swiper";
// import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import classnames from "classnames";
// ** Styles
import "@styles/react/libs/swiper/swiper.scss";
import { FaFolderOpen } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  Col,
} from "reactstrap";
import img1 from "../../assets/images/yougift/item-1.jpg";
import img2 from "../../assets/images/yougift/item2.jpg";
import img3 from "../../assets/images/yougift/item3.jpg";
import img4 from "../../assets/images/yougift/item4.jpg";
import img5 from "../../assets/images/yougift/item5.jpg";
// import AddFolder from "./AddFolder";
const CustomProduct = () => {
  SwiperCore.use([Navigation]);

  // ** Related products Slides
  const slides = [
    {
      name: "Custom Standard T-shirts",
      imgs: img1,
      price: "Price $50.98",
    },
    {
      name: "General Client",
      imgs: img2,
      price: "Price $50.98",
    },
    {
      name: "Lorem1",
      imgs: img3,
      price: "Price $50.98",
    },
    {
      name: "Lorem1",
      imgs: img3,
      price: "Price $50.98",
    },
    {
      name: "Lorem1",
      imgs: img3,
      price: "Price $50.98",
    },
    {
      name: "Lorem1",
      imgs: img3,
      price: "Price $50.98",
    },
  ];

  // ** Slider params
  const params = {
    className: "swiper-responsive-breakpoints swiper-container",
    slidesPerView: 5,
    spaceBetween: 55,
    navigation: true,
    breakpoints: {
      1600: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1300: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  };

  return (
    <Fragment>
      <div>
        <Col lg="12">
          <Breadcrumb>
            <BreadcrumbItem>
              <h4 style={{ marginBottom: "10px" }}>
                Custom Shop / Create your own t-shirts
              </h4>
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
        <Col md="12">
          <h4 style={{ marginBottom: "5px", marginTop: "10" }}>
            Men's T-Shirts
          </h4>
          <Swiper {...params}>
            {slides.map((slide) => {
              return (
                <SwiperSlide key={slide.name}>
                  <Card>
                    <a href="/productdetail/index">
                      <div className="">
                        <img
                          src={slide.imgs}
                          alt="swiper 1"
                          className=""
                          width="100%"
                        />
                      </div>
                      <div className="item-heading text-left p-2">
                        <h5 className="text-truncate mb-0">{slide.name}</h5>
                        <p className="mb-1">{slide.price}</p>
                        <a
                          href="/productdetail/index"
                          className="btn btn-primary"
                          style={{ padding: "8px" }}
                        >
                          Customize Now
                        </a>
                      </div>
                    </a>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Col>

        <Col md="12">
          <h4 style={{ marginBottom: "10px" }}>Women's T-Shirts</h4>
          <Swiper {...params}>
            {slides.map((slide) => {
              return (
                <SwiperSlide key={slide.name}>
                  <Card>
                    <a href="/productdetail/index">
                      <div className="">
                        <img
                          src={slide.imgs}
                          alt="swiper 1"
                          className=""
                          width="100%"
                        />
                      </div>
                      <div className="item-heading text-left p-2">
                        <h5 className="text-truncate mb-0">{slide.name}</h5>
                        <p className="mb-1">{slide.price}</p>
                        <a
                          className="btn btn-primary"
                          style={{ padding: "8px" }}
                        >
                          Customize Now
                        </a>
                      </div>
                    </a>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Col>
      </div>
    </Fragment>
  );
};

export default CustomProduct;
