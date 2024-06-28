import React from "react";
import featureHand from "@/images/unique-feature-hand.png";
import { FeatureTwoData } from "@/data";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";

const FeaturedTwo = () => {
  const { sectionContent, posts } = FeatureTwoData;
  const { title, subText, content } = sectionContent;
  return (
    <section className="service-style-two">
      <div className="overlay"></div>
      <div className="thm-container">
        <Row>
          <Col lg={6}>
            <div className="service-content">
              <span>{subText}</span>
              <h2>{title}</h2>
              <p>{content}</p>
            </div>
          </Col>
          <Col lg={6}>
            <Row>
              {posts.map(({ name, url, icon }, index) => (
                <Col md={4} className="text-center" key={index}>
                  <div className="unique-feature">
                    <img src={featureHand} alt={name} />
                    <div className="content">
                      <i className={icon}></i>
                      <Link href={url}>
                        <a>
                          <h3>{name}</h3>
                        </a>
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default FeaturedTwo;
