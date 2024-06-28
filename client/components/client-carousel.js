import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ClientCarouselData } from "@/data";
import "swiper/swiper-bundle.min.css";

const ClientCarousel = () => {
  const carouselOptions = {
    spaceBetween: 0,
    loop: true,
    slidesPerView: 1,
    breakpoints: {
      0: {
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1
      },
      576: {
        spaceBetween: 30,
        slidesPerView: 2,
        slidesPerGroup: 2
      },
      992: {
        spaceBetween: 50,
        slidesPerView: 4,
        slidesPerGroup: 4
      },
      1200: {
        spaceBetween: 90,
        slidesPerView: 5,
        slidesPerGroup: 5
      }
    }
  };
  return (
    <div className="brand-carousel-wrapper">
      <div className="thm-container">
        <Swiper className="brand-carousel" {...carouselOptions}>
          {ClientCarouselData.map(({ image }, index) => (
            <SwiperSlide key={index}>
              <div className="item">
                <img src={image} alt="Awesome Image" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ClientCarousel;
