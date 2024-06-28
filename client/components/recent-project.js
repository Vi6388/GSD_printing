import React from "react";
import { ProjectOneData } from "@/data";
import { Col, Row } from "react-bootstrap";
import ProjectCard from "./project-card";

const RecentProject = () => {
  return (
    <section className="recent-projects sec-pad">
      <div className="thm-container">
        <div className="sec-title text-center">
          <span>Work showcase</span>
          <h3>Recent Projects</h3>
          <p>
            There are many variations of passages of lorem Ipsum available, but{" "}
            <br /> the majority have suffered alteration in some form.
          </p>
        </div>
        <Row>
          {ProjectOneData.slice(0, 3).map((post, index) => (
            <Col key={index} md={6} lg={4}>
              <ProjectCard data={post} />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default RecentProject;
