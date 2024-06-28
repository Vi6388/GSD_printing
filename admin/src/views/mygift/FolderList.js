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
import AddFolder from "./AddFolder";
// import AddFolder from "./AddFolder";
const FolderList = () => {
  SwiperCore.use([Navigation]);

  // ** Related products Slides
  const slides = [
    {
      name: "General Client",
    },
    {
      name: "General Client",
    },
    {
      name: "Lorem1",
    },
    {
      name: "Lorem2",
    },
    {
      name: "Lorem3",
    },
    {
      name: "Lorem4",
    },
    {
      name: "Lorem5",
    },
    {
      name: "Lorem6",
    },
    {
      name: "Lorem7",
    },
    {
      name: "iPhone 12 ",
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
        slidesPerView: 8,
        spaceBetween: 10,
      },
      1300: {
        slidesPerView: 8,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
    },
  };

  return (
    <Fragment>
      <div>
        <div
          className="mt-0 mb-2 text-left"
          style={{ display: "inline-block", width: "100%" }}
        >
          <h4>
            Organize Your My Gifts
            <span style={{ float: "right" }}>
              <AddFolder />
            </span>
          </h4>
        </div>
        <Swiper {...params}>
          {slides.map((slide) => {
            return (
              <SwiperSlide key={slide.name}>
                <a href="/" onClick={(e) => e.preventDefault()}>
                  <div className="img-container w-50 mx-auto py-75 text-center">
                    {/* <img src={slide.img} alt="swiper 1" className="img-fluid" /> */}
                    <FaFolderOpen size="60" />
                  </div>
                  <div className="item-heading text-center">
                    <h5 className="text-truncate mb-0">{slide.name}</h5>
                    <BiEdit
                      size="18"
                      color="#000"
                      style={{ marginTop: "10px", marginRight: "10px" }}
                    />
                    <BsTrash
                      size="18"
                      color="#000"
                      style={{ marginTop: "10px" }}
                    />
                  </div>
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Fragment>
  );
};

export default FolderList;
