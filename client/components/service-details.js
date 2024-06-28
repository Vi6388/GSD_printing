import React from "react";
import { ServiceDetailsData } from "@/data";
import { Col, Row } from "react-bootstrap";

const ServiceDetails = () => {
  return (
    <section className="service-details-design-option sec-pad">
      <div className="thm-container">
        <Row>
          {ServiceDetailsData.map(({ image, title, lists }, index) => (
            <Col key={index} lg={4} md={12}>
              <div className="single-service-details-design-option">
                <div className="img-box">
                  <img src={image} alt="Awesome Image" />
                </div>
                <div className="text-box">
                  <h3>{title}</h3>
                  <ul className="list-box">
                    {lists.map((list, index) => (
                      <li key={index}>{list}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default ServiceDetails;
