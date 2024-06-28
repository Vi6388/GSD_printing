import React from "react";
import { ServiceOneData } from "@/data";
import ServiceCardTwo from "@/components/service-card-two";
import { Col, Row } from "react-bootstrap";

const RelatedServices = () => {
  return (
    <section className="service-style-three sec-pad service-details-page">
      <div className="thm-container">
        <div className="sec-title text-center">
          <span>Other services</span>
          <h3>Even More Good Stuff</h3>
          <p>
            There are many variations of passages of lorem Ipsum available, but{" "}
            <br /> the majority have suffered alteration in some form.
          </p>
        </div>
        <Row>
          {ServiceOneData.slice(0, 3).map((post, index) => (
            <Col md={6} lg={4} key={index}>
              <ServiceCardTwo data={post} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default RelatedServices;
