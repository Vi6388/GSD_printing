import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { FeatureCarouselData } from "@/data";
import BeliveCard from "./belive-card";
import SwiperCore, { Autoplay, Pagination } from "swiper";
SwiperCore.use([Autoplay, Pagination]);

const BeliveCarousel = () => {
  const carouselOptions = {
    spaceBetween: 0,
    loop: true,
    slidesPerView: 1,
    pagination: {
      el: "#belive-carousel-pagination",
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
  return (
    <div className="we-believe-carousel">
      <Swiper {...carouselOptions}>
        {FeatureCarouselData.map((post, index) => (
          <SwiperSlide className="item" key={index}>
            <BeliveCard data={post} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination" id="belive-carousel-pagination"></div>
    </div>
  );
};

export default BeliveCarousel;
