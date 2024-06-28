// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import classnames from "classnames";
import { Star } from "react-feather";
import SwiperCore, { Navigation } from "swiper";
// import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

// ** Reactstrap Imports
import { Card, CardBody, CardText } from "reactstrap";

// ** Related products images
import img1 from "@src/assets/images/elements/item1.png";
import img2 from "@src/assets/images/elements/item2.png";
import img3 from "@src/assets/images/elements/item3.png";
import img4 from "@src/assets/images/elements/item4.png";
import img5 from "@src/assets/images/elements/item1.png";

// ** Styles
import "@styles/react/libs/swiper/swiper.scss";

const GiftList = () => {
  SwiperCore.use([Navigation]);

  // ** Related products Slides
  const slides = [
    {
      name: "Apple Watch Series 6",
      brand: "Apple",
      ratings: 4,
      price: 399.98,
      img: img1,
    },
    {
      name: "Apple MacBook Pro - Silver",
      brand: "Apple",
      ratings: 2,
      price: 2449.49,
      img: img2,
    },
    {
      name: "Apple HomePod (Space Grey)",
      brand: "Apple",
      ratings: 3,
      price: 229.29,
      img: img3,
    },
    {
      name: "Magic Mouse 2 - Black",
      brand: "Apple",
      ratings: 3,
      price: 90.98,
      img: img4,
    },
    {
      name: "iPhone 12 Pro",
      brand: "Apple",
      ratings: 4,
      price: 1559.99,
      img: img5,
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
        slidesPerView: 5,
        spaceBetween: 30,
      },
      1300: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 55,
      },
    },
  };

  return (
    <Fragment>
      <div>
        <div className="mt-0 text-left">
          <h4>My Favorite Gifts</h4>
        </div>
        <Swiper {...params}>
          {slides.map((slide) => {
            return (
              <SwiperSlide key={slide.name}>
                <a href="/" onClick={(e) => e.preventDefault()}>
                  <Card>
                    <CardBody>
                      <div className="img-container w-50 mx-auto py-75">
                        <img
                          src={slide.img}
                          alt="swiper 1"
                          className="img-fluid"
                        />
                      </div>
                    </CardBody>
                  </Card>

                  <div className="item-heading">
                    <h5
                      className="text-truncate mb-0"
                      style={{ color: "#000" }}
                    >
                      {slide.name}
                    </h5>
                    {/* <small className="text-body">by {slide.brand}</small> */}
                  </div>
                  <div className="item-meta">
                    <CardText
                      className="text-primary mb-0"
                      style={{ color: "#000" }}
                    >
                      Price ${slide.price}
                    </CardText>
                  </div>
                  <div style={{ clear: "both" }}>
                    <button
                      className="btn btn-primary round"
                      style={{
                        padding: "5px",
                        fontSize: "12px",
                        marginTop: "10px",
                      }}
                    >
                      Add to contact
                    </button>
                    <select
                      style={{
                        border: "none",
                        backgroundColor: "#000",
                        color: "#fff",
                        width: "100px",
                        float: "right",
                        fontSize: "10px",
                        borderRadius: "100px",
                        marginTop: "10px",
                        padding: "4px 3px",
                      }}
                    >
                      <option value="movetofolder">Move to Folder</option>
                      <option value="saab">Saab</option>
                      <option value="fiat">Fiat</option>
                      <option value="audi">Audi</option>
                    </select>
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

export default GiftList;
