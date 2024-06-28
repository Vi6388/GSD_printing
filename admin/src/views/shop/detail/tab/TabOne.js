import React from "react";
import { Card, Col, Container, Row } from "reactstrap";
import img1 from "@src/assets/images/elements/t-shirt.jpg";
import img2 from "@src/assets/images/elements/item2.png";
import img3 from "@src/assets/images/elements/item3.png";
import img4 from "@src/assets/images/elements/item4.png";
import img5 from "@src/assets/images/elements/item1.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../../../../assets/styles/Yougift.scss";
function TabOne() {
  const products = [
    {
      img: img1,
      name: "lorem ipsum",
      price: "$78 & Up",
    },
    {
      img: img1,
      name: "lorem ipsum",
      price: "$78 & Up",
    },
    {
      img: img1,
      name: "lorem ipsum",
      price: "$78 & Up",
    },
    {
      img: img1,
      name: "lorem ipsum",
      price: "$78 & Up",
    },
    {
      img: img1,
      name: "lorem ipsum",
      price: "$78 & Up",
    },
    {
      img: img1,
      name: "lorem ipsum",
      price: "$78 & Up",
    },
  ];
  return (
    <div>
      <>
        <Row>
          {products.map((products) => {
            return (
              <Col lg="2" md="2" sm="3">
                <Card style={{ marginBottom: "1" }}>
                  <div className="text-center">
                    <Link className="txt-1">
                      <img src={products.img} alt="" className="img-fluid" />
                      <h5 style={{ fontSize: "12px", marginBottom: "0px" }}>
                        {products.name}
                      </h5>
                      <p style={{ fontSize: "10px", marginBottom: "0px" }}>
                        {products.price}
                      </p>
                    </Link>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </>
    </div>
  );
}

export default TabOne;
