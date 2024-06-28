import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { TeamOneData } from "@/data";
import TeamCard from "./team-card";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";

SwiperCore.use([Autoplay, Navigation]);

const TeamOne = () => {
  const carouselOptions = {
    spaceBetween: 0,
    loop: true,
    slidesPerView: 1,
    navigation: {
      nextEl: "#team-slider-next",
      prevEl: "#team-slider-prev"
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
  const { sectionContent, posts } = TeamOneData;
  return (
    <section className="team-section sec-pad">
      <div className="thm-container">
        <div className="sec-title text-center">
          <span>{sectionContent.subText}</span>
          <h3>{sectionContent.title}</h3>
          <p>{sectionContent.content}</p>
        </div>
        <Swiper className="team-carousel" {...carouselOptions}>
          {posts.map((post, index) => (
            <SwiperSlide key={index}>
              <TeamCard data={post} />
            </SwiperSlide>
          ))}
          <div className="swiper-carousel-nav">
            <div className="swiper-button-prev" id="team-slider-prev">
              <i className="fa fa-angle-left"></i>
            </div>
            <div className="swiper-button-next" id="team-slider-next">
              <i className="fa fa-angle-right"></i>
            </div>
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default TeamOne;
