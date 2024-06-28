import { useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import colorOne from "../../../assets/images/yougift/color-1.gif";
import colorTwo from "../../../assets/images/yougift/color-2.gif";
import colorThree from "../../../assets/images/yougift/color-3.gif";
import colorFour from "../../../assets/images/yougift/color-4.gif";
import colorFive from "../../../assets/images/yougift/color-5.gif";

import "../../../assets/styles/Yougift.scss";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Col, Label } from "reactstrap";
import FaqModal from "./FaqModal";

function TabItem() {
  return (
    <div className="mt-1">
      <h4>
        Custom Men's Deluxe T-Shirts
        <span style={{ float: "right" }}>
          {/* <BsQuestionCircle size={25} /> */}
          <FaqModal />
        </span>
      </h4>
      <div className="product-color-options mt-3">
        <h5 style={{ marginBottom: "10px" }}>
          Colors:
          <span style={{ marginLeft: "20px", fontSize: "12px" }}>black</span>
        </h5>
        <ul
          className="d-flex"
          style={{
            padding: "0px",
            listStyle: "none",
          }}
        >
          <li
            className=""
            style={{
              height: "23px",
              width: "23px",
              marginRight: "10px",
            }}
          >
            <img src={colorOne} width="100%" />
          </li>
          <li
            className=""
            style={{
              height: "23px",
              width: "23px",
              marginRight: "10px",
            }}
          >
            <img src={colorTwo} width="100%" />
          </li>
          <li
            className=""
            style={{
              height: "23px",
              width: "23px",
              marginRight: "10px",
            }}
          >
            <img src={colorThree} width="100%" />
          </li>
          <li
            className=""
            style={{
              height: "23px",
              width: "23px",
              marginRight: "10px",
            }}
          >
            <img src={colorFour} width="100%" />
          </li>
          <li
            className=""
            style={{
              height: "23px",
              width: "23px",
              marginRight: "10px",
            }}
          >
            <img src={colorFive} width="100%" />
          </li>
        </ul>
      </div>
      <div className="product-color-options mt-3">
        <h5 style={{ marginBottom: "10px" }}>
          Size:
          <span style={{ marginLeft: "20px", fontSize: "12px" }}>Large</span>
        </h5>
        <ul
          className="d-flex"
          style={{
            padding: "0px",
            listStyle: "none",
          }}
        >
          <li className="custom-size">
            <Link>S</Link>
          </li>
          <li className="custom-size">
            <Link>M</Link>
          </li>
          <li className="custom-size">
            <Link>L</Link>
          </li>
          <li className="custom-size">
            <Link>XL</Link>
          </li>
          <li className="custom-size">
            <Link>2XL</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TabItem;
