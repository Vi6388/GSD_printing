import React from "react";
import { Row, Col } from "react-bootstrap";

import projectDetails1 from "@/images/project-details-1-1.jpg";
import projectDetails2 from "@/images/project-details-1-2.jpg";
import projectDetails3 from "@/images/project-details-1-3.jpg";
import projectDetails4 from "@/images/project-details-1-4.jpg";
import projectDetails5 from "@/images/project-details-1-5.jpg";

const ProjectDetails = () => {
  return (
    <section className="project-details-page sec-pad">
      <div className="thm-container">
        <Row>
          <Col lg={6}>
            <div className="project-details-content">
              <div className="project-details-table">
                <div className="single-project-details-table clearfix">
                  <span className="title">Project Name:</span>
                  <span className="name">Ninety Nine You</span>
                </div>
                <div className="single-project-details-table clearfix">
                  <span className="title">Date:</span>
                  <span className="name">05, 05 2018</span>
                </div>
                <div className="single-project-details-table clearfix">
                  <span className="title">Value:</span>
                  <span className="name">$300</span>
                </div>
                <div className="single-project-details-table clearfix">
                  <span className="title">Owner:</span>
                  <span className="name">Private</span>
                </div>
                <div className="single-project-details-table clearfix">
                  <span className="title">Category:</span>
                  <span className="name">Printing, Designing</span>
                </div>
                <div className="single-project-details-table clearfix">
                  <span className="title">Website:</span>
                  <span className="name">www.ninety.com</span>
                </div>
              </div>
              <br />
              <br />
              <p>
                Lorem ipsum dolor sit amet sectetur adipiscin elit cras feuiat
                antesed ces condimentum viverra duis autue nim convallis id diam
                vitae duise eget dictum eros in dictum sem. Vivamus sed molestie
                sapien aliquam et facilisis arcu ut molestie augue. Suspendisse
                sodales tortor nunc dai quis auctor ligula posuere cursus.
              </p>
              <br />
              <h3>Printify Challenge</h3>
              <br />
              <p>
                Duis eget dictum eros in dictum sem vivamus sed molestie
                sapienam eted facilisis arcuet molestie augue suspendisse
                sodales tortor nuncd quis auctor ligula posuere cursus. Morbi
                sem neque tristique in porta ullamcorper lacinia eget lorem.
                Proin feugiat risus quis magna sagittis eget semper nisl
                tristique. Tristique in porta ullamcorper lacinia egety lorem.
                Proin feugiat risus quis magna sagittis eget semper nislri
                stique aenean maximus enim nec.
              </p>
              <br />
              <h3>Final Result</h3>
              <br />
              <p>
                Vivamus sed molestie sapien aliquam et facilisis arcu dut
                molestie augue suspendisse sodales tortor nunc quis auctor
                ligula posuere les cursus. Morbi sem neque tristique in porta
                ullamcorper, lacinia eget de lorem. Proin feugiat risus quis
                magna sagittis eget semper nitristique aenean maximus enim nec.
                Morbi sem neque, tristique in porta ullamcorper.
              </p>
            </div>
          </Col>
          <Col lg={6}>
            <div className="img-box-wrapper">
              <Row>
                <Col md={6}>
                  <img src={projectDetails1} alt="Awesome Image" />
                </Col>
                <Col md={6}>
                  <img src={projectDetails2} alt="Awesome Image" />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <img src={projectDetails3} alt="Awesome Image" />
                </Col>
                <Col md={6}>
                  <img src={projectDetails4} alt="Awesome Image" />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <img src={projectDetails5} alt="Awesome Image" />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default ProjectDetails;
