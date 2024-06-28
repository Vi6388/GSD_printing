import React from "react";
import { AboutOneData } from "@/data";
import { Col, Row } from "react-bootstrap";
import AboutCard from "@/components/about-card";

const AboutOne = () => {
  return (
    <section className="about-section sec-pad">
      <div className="thm-container">
        <Row>
          {AboutOneData.map((post, index) => (
            <Col md={12} lg={4} key={index}>
              <AboutCard data={post} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default AboutOne;
