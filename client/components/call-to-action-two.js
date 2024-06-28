import React from "react";
import { Col, Row } from "react-bootstrap";
import { CallToActionData } from "@/data";
import SectionTitle from "./section-title";
const CallToActionTwo = () => {
  const { sectionContent, lists, button } = CallToActionData;
  return (
    <section className="call-to-action-one">
      <div className="overlay"></div>
      <div className="inner-wrapper">
        <div className="thm-container">
          <Row>
            <Col lg={6}>
              <div className="call-to-action-content">
                <SectionTitle data={sectionContent} />
                <ul className="list-box">
                  {lists.map((list, index) => (
                    <li key={index}>
                      <i className="fas fa-check-circle"></i>
                      {list}
                    </li>
                  ))}
                </ul>
                <a href={button.url} className="thm-btn yellow-bg">
                  {button.label}
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default CallToActionTwo;
