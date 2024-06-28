import React from "react";
import { PricingData } from "@/data";
import { Col, Row } from "react-bootstrap";
import PriceCard from "@/components/price-card";

const PricingOne = () => {
  const { sectionContent, posts } = PricingData;
  return (
    <section className="pricing-section sec-pad">
      <div className="thm-container">
        <div className="sec-title text-center">
          <span>{sectionContent.subText}</span>
          <h3>{sectionContent.title}</h3>
          <p>{sectionContent.content}</p>
        </div>
        <Row>
          {posts.map((post, index) => {
            return (
              <Col md={12} lg={4} key={index}>
                <PriceCard data={post} />
              </Col>
            );
          })}
        </Row>
      </div>
    </section>
  );
};

export default PricingOne;
