// ** React Imports
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {getProduct,getProductByID, getRelatedProductData,getImagesByProductID, BASE_PATH } from '../../../requests/admin/productAPI.js';

// ** Third Party Components
import classnames from "classnames";
import {
  Star,
  ShoppingCart,
  DollarSign,
  Heart,
  Share2,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Upload,
} from "react-feather";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  CardText,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
  Badge,
  Label
} from "reactstrap";
import TabProduct from "./tab/TabProduct";
import Img1 from "../../../assets/images/gsdprint/sp-1.jpg"
import Img2 from "../../../assets/images/gsdprint/sp-rond.jpg"
import Img3 from "../../../assets/images/gsdprint/sp-dark.jpg"
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import SwiperCore, { Navigation } from "swiper";
import "@styles/react/libs/swiper/swiper.scss";
import { FaStar } from "react-icons/fa";
import Select from 'react-select';
import { selectThemeColors } from '@utils';
import axios from "axios";

const paperOptions = [
  { value: '--Select Paper Thickness--', label: '--Select Paper Thickness--' },
  { value: 'standard', label: 'Standard' },
  { value: 'premium (recommended)', label: 'Premium (Recommended)' },

];
const cornerOptions = [
  { value: '--Select Corner--', label: '--Select Corner--' },
  { value: 'Standard', label: 'Standard' },
  { value: 'Rounded', label: 'Rounded' },
];
const quantityOptions = [
  { value: '--Select Quantity--', label: '--Select Quantity--' },
  { value: '100. $12.99 ($0.18 / unit)', label: '100. $12.99 ($0.18 / unit)' },
  { value: '100. $12.99 ($0.18 / unit)', label: '100. $12.99 ($0.18 / unit)' },];
const Product = (props) => {
  SwiperCore.use([Navigation]);
  const [productInfo, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productImages, setProductImages] = useState([]);
  const relatedimg = [
    Img1,
    Img2,
    Img3,
    Img3,
    Img3,
    Img3,
    Img3,
  ];
  // ** Props
  const {
    data,
    deleteWishlistItem,
    dispatch,
    addToWishlist,
    getProduct,
    productId,
    addToCart,
  } = props;

  // ** State
  // const [selectedColor, setSelectedColor] = useState("primary");
  const [selectedImage, setSelectedImage] = useState(Img2);
  var url = window.location.href;
  var parts = url.split('/');
  var id = parts[parts.length - 1];
  let productID  = id;

  useEffect(() => {
    getData(productID);
  }, []); // Empty dependency array means this effect runs only once, like componentDidMount

  async function getData(productID) {
    try {
          const fetchedData = await getProductByID(productID);
          setProducts(fetchedData.product[0]);
          setSelectedImage(BASE_PATH + fetchedData.product[0].productImage);
          const fetchedProductImagesData = await getImagesByProductID(productID);
          console.log(fetchedProductImagesData);
          let imageList = fetchedProductImagesData.image;
          console.log("imageList");
          console.log(imageList);
          setProductImages(imageList);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
  }

  // ** Renders color options
  // const renderColorOptions = () => {
  //   return data.colorOptions.map((color, index) => {
  //     const isLastColor = data.colorOptions.length - 1 === index;

  //     return (
  //       <li
  //         key={color}
  //         className={classnames("d-inline-block", {
  //           "me-25": !isLastColor,
  //           selected: selectedColor === color,
  //         })}
  //         onClick={() => setSelectedColor(color)}
  //       >
  //         <div className={`color-option b-${color}`}>
  //           <div className={`filloption bg-${color}`}></div>
  //         </div>
  //       </li>
  //     );
  //   });
  // };

  // // ** Handle Wishlist item toggle
  // const handleWishlist = (val) => {
  //   if (val) {
  //     dispatch(deleteWishlistItem(productId));
  //   } else {
  //     dispatch(addToWishlist(productId));
  //   }
  //   dispatch(getProduct(productId)); 
  // };

  // // ** Handle Move/Add to cart
  // const handleCartBtn = (id, val) => {
  //   if (val === false) {
  //     dispatch(addToCart(id));
  //   }
  //   console.log(getProduct(productId));
  //   dispatch(getProduct(productId));
  // };

  // ** Condition btn tag
  // const CartBtnTag = data.isInCart ? Link : "button";
  const carouselOptions = {
    className: "",
    slidesPerView: 3,
    spaceBetween: 10,
    navigation: true,
    breakpoints: {
      1600: {
        slidesPerView: 3,
        // spaceBetween: 10,
      },
      1300: {
        slidesPerView: 4,
        // spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        // spaceBetween: 10,
      },
      320: {
        slidesPerView: 2,
        // spaceBetween: 10,
      },
    },
  };

  return (
    <Row className="">
      <Col md='6'>
        <div className="">
          <img src={selectedImage} alt="Product" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="mt-1">
          <Swiper {...carouselOptions}>
            {productImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div>
                  <img src={BASE_PATH + image.filename} alt={`Thumbnail ${index + 1}`} style={{ width: '100%', cursor: 'pointer' }} onClick={() => setSelectedImage(BASE_PATH + image.filename)} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Col>
      <Col md='6'>
        <div className="">
          <h3>{productInfo.productName}</h3>
          <div className="rating">
            <FaStar size={18} store='#ff9800' fill="#ff9800" />
            <FaStar size={18} store='#ff9800' fill="#ff9800" />
            <FaStar size={18} store='#ff9800' fill="#ff9800" />
            <FaStar size={18} store='#ff9800' fill="#ff9800" />
            <FaStar size={18} store='#ff9800' fill="#ff9800" />
            <span className="ms-1" style={{ fontSize: '14px' }}>4.5(90295)</span>
          </div>
          <div className="mt-2">
            <span className="me-1">
              <Badge color="success">Best Seller</Badge>
            </span>
            <span ><Badge color="danger">Upto 10% off</Badge>
            </span>
          </div>
          <p className="mt-2">
            Want the front of your card to jump out at people?
            Add raised, 3D shine to your text, design – or
            even both. See details
          </p>
          <div className="">
            <div className="mb-1" >
              <Label className="form-label">Paper Thickness</Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                defaultValue={paperOptions[0]}
                options={paperOptions}
                isClearable={false}
              />
            </div>
            <div className="mb-1" >
              <Label className="form-label">Corner</Label>
              <Select
                theme={selectThemeColors}
                className="react-select "
                classNamePrefix="select"
                defaultValue={cornerOptions[0]}
                options={cornerOptions}
                isClearable={false}
              />
            </div>
            <div className="mb-1" >
              <Label className="form-label">Quantity</Label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                defaultValue={quantityOptions[0]}
                options={quantityOptions}
                isClearable={false}
              />
            </div>
          </div>
          <div className="mt-2" style={{ backgroundColor: '#e7f3f0', padding: '5px', borderRadius: '4px' }}>
            <span>
              Just ${productInfo.discountPrice}
            </span>
            |
            <span style={{ fontSize: '14px' }}>
              Code: {productInfo.price}
            </span>
          </div>
          <Button color="primary" href={"/builder?productID=" + productInfo._id} className="btn btn-primary mt-1" style={{ width: '100%' }}>
            <div className="d-flex">
              <div className="text-start mb-0">
                <h5 style={{color:'#fff'}}>Upload design</h5>
                <small>Have a design? Upload and edit it</small>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                 <Upload  size={25}/>
              </div>
            </div>
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default Product;
