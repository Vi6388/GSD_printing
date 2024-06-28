import React, { useState } from 'react';
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import "../..";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "../../assets/styles/Yougift.scss";
import img1 from "../../assets/images/yougift/zone-1-flip-flops.png";
import img2 from "../../assets/images/yougift/zone-1-weekender.png";
import img3 from "../../assets/images/yougift/zone-1-tshirt.png";
import img4 from "../../assets/images/yougift/zone-1-mug.png";
import img5 from "../../assets/images/yougift/zone-1-pjs-cyo.png";
import ProductBuilder from "./productdetail/ProductBuilder";
function MyShop() {

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const categorylists = [
    {
      name: "Create Your Own",
      img: img1,
    },
    {
      name: "lorem",
      img: img2,
    },
    {
      name: "lorem",
      img: img3,
    },
    {
      name: "lorem",
      img: img4,
    },
    {
      name: "lorem",
      img: img5,
    },
    {
      name: "lorem",
      img: img4,
    },
    {
      name: "lorem",
      img: img3,
    },
    {
      name: "lorem",
      img: img2,
    },
    {
      name: "lorem",
      img: img1,
    },
  ];
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
            All Custom Categories
          </h4>
          <Button color="primary" onClick={toggleModal}>Design Product</Button>
          <ul>
            {categorylists.map((data) => {
              return (
                <li>
                  <a href="/products">
                    <div className="">
                      <img src={data.img} alt="" width="100%" />
                      <p
                        style={{
                          fontSize: "16px",
                          color: "#000",
                          marginTop: "10px",
                        }}
                      >
                        {data.name}
                      </p>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </CardBody>
      </Card>
      <ProductBuilder isOpen={modalOpen} toggle={toggleModal}/>
    </div>
  );
}

export default MyShop;
