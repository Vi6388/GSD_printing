import React from "react";
import productfront from "../../../assets/images/yougift/itemdetail.jpg";
import productback from "../../../assets/images/yougift/itemdetailback.jpg";
import { Card } from "reactstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../../../assets/styles/Yougift.scss";
import Draggable from "react-draggable";
import img4 from "../../../assets/images/yougift/zone-1-mug.png";
// import Moveable from "react-moveable";
import ResizableRect from "react-resizable-rotatable-draggable";
import Rotate from "./Rotate";
import DemoApp from "./DemoApp";

function ProductImage() {
  return (
    <div>
      <ul
        className=""
        style={{
          padding: "0",
          listStyle: "none",
          marginTop: "20px",
          position: "absolute",
          left: "14px",
          zIndex: "1",
        }}
      >
        <li
          style={{
            width: "60px",
            height: "60px",
            marginRight: "10px",
            marginBottom: "10px",
            border: "1px solid#e60c0a",
            padding: "4px",
          }}
        >
          <Link className="active">
            <img src={productfront} alt="" width="100%" />
          </Link>
        </li>
        <li
          style={{
            width: "60px",
            height: "60px",
            marginRight: "10px",
            marginBottom: "10px",
            border: "1px solid#ccc",
            padding: "4px",
          }}
        >
          <Link>
            <img src={productback} alt="" width="100%" />
          </Link>
        </li>
      </ul>
      <div className="imb-box">
        <img src={productfront} alt="" width="100%" id="map" />
        {/* <Draggable>
            <div className='img-content'>
                <img src={img4} alt='' width="50%" />
            </div>
            </Draggable> */}

        <Rotate></Rotate>
      </div>
    </div>
  );
}

export default ProductImage;
