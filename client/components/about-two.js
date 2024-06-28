import React from "react";
import { Col, Row } from "react-bootstrap";
import SectionTitle from "./section-title";
import { AboutTwoData } from "@/data";
import Link from "next/link";

const AboutTwo = () => {
  const { sectionContent, content, url, image } = AboutTwoData;
  return (
    <section className="welcome-section sec-pad">
      <div className="thm-container">
        <Row>
          <Col lg={6}>
            <div className="welcome-img-box">
              <img src={image} alt="Awesome Image" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="welcome-content">
              <div className="title">
                <p>{sectionContent.subText}</p>
                <h3>{sectionContent.title}</h3>
              </div>
              <p>{content}</p>
              <Link href={url}>
                <a className="thm-btn yellow-bg">Learn More</a>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default AboutTwo;
