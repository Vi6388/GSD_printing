import React from "react";
import PostPaginations from "@/components/post-paginations";
import { Col, Row } from "react-bootstrap";
import { ServiceOneData } from "@/data";
import ServiceCardTwo from "@/components/service-card-two";

const ServiceOne = () => {
  return (
    <section className="service-style-three sec-pad">
      <div className="thm-container">
        <Row>
          {ServiceOneData.map((post, index) => (
            <Col md={6} lg={4} key={index}>
              <ServiceCardTwo data={post} />
            </Col>
          ))}
        </Row>
        <PostPaginations />
      </div>
    </section>
  );
};

export default ServiceOne;
