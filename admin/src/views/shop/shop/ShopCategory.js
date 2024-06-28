import { Fragment, useEffect, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "../../../assets/styles/Yougift.scss";
import img1 from "../../../assets/images/gsdprint/cate-deal.png";
import img2 from "../../../assets/images/gsdprint/cate-businesscard.png";
import img3 from "../../../assets/images/gsdprint/postcard.png";
import img4 from "../../../assets/images/gsdprint/cat-signbanner.png";
import img5 from "../../../assets/images/gsdprint/cate-sticker.png";
import img6 from "../../../assets/images/gsdprint/home-gift.png";
import img7 from "../../../assets/images/gsdprint/cat-celebration.png";
import img8 from "../../../assets/images/gsdprint/wedding.png";
import img9 from "../../../assets/images/gsdprint/cat-clothing.png";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import SwiperCore, { Navigation } from "swiper";
import "@styles/react/libs/swiper/swiper.scss";
import classnames from "classnames";
import { BASE_PATH, getCategories } from "../../../requests/admin/shopAPI"
import { left } from "@patternfly/react-core/dist/esm/helpers/Popper/thirdparty/popper-core";

function ShopCategory({ store }) {
  SwiperCore.use([Navigation]);

  // const categoryList = [
  //   { name: "Deals", img: img1 },
  //   { name: "Business Cards", img: img2 },
  //   { name: "Postcards & Print Advertising", img: img3 },
  //   { name: "Signs, Banners & Posters", img: img4 },
  //   { name: "Labels, Stickers & Packaging", img: img5 },
  //   { name: "Home & Gifts", img: img6 },
  //   { name: "Celebrations, Invitations & Stationery", img: img7 },
  //   { name: "Wedding", img: img8 },
  //   { name: "Clothing & Bags", img: img9 },
  // ];

  const [categoryList, setCategoryList] = useState([]);
  useEffect(async () => {
      const data = await getCategories();
      console.log('categories: ', data.categories)
      setCategoryList(data.categories)
  }, [])

  const params = {
    className: "swiper-responsive-breakpoints swiper-container",
    slidesPerView: 5,
    spaceBetween: 10,
    navigation: true,
    breakpoints: {
      1600: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
      1300: {
        slidesPerView: 5,
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
    <div className="custom-shop">
      <Card>
        <CardBody>
          <h4
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "15px",
            }}
          >
            Categories
          </h4>
          <div>
          <Swiper {...params}>
          {categoryList.map((category) => {
            return (
              <SwiperSlide key={category.categoryName}>
                <div className="">
                    <Link to="/">
                      <div className="text-center">
                        <img
                          src={BASE_PATH  + category.categoryImage}
                          alt=""
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "100px",
                          }}
                        />
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#000",
                            marginTop: "10px",
                            fontWeight: "600",
                            // whiteSpace: "pre",
                          }}
                        >
                          {category.categoryName}
                        </p>
                      </div>
                    </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
          </div>
          <ul>
           
            {/* {categorylists?.categorylist.map((data) => {
              return (
                <li>
                  <Link to={`/online/courses?category=${data.id}`}>
                    <div className="">
                      <img
                        src={data.img}
                        alt=""
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "100px",
                        }}
                      />
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#000",
                          marginTop: "10px",
                          fontWeight: "500",
                          whiteSpace: "pre",
                        }}
                      >
                        {data.name}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })} */}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}

export default ShopCategory;
