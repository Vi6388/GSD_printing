import React from "react";
import { Col, Row } from "react-bootstrap";
import BeliveCarousel from "./belive-carousel";
import FaqOne from "./faq-one";

const FaqFeature = () => {
  return (
    <section className="faq-section">
      <div className="thm-container">
        <Row>
          <Col lg={5}>
            <BeliveCarousel />
          </Col>
          <Col lg={7}>
            <FaqOne />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default FaqFeature;
