import React from "react";
import PostPaginations from "@/components/post-paginations";
import { Col, Row } from "react-bootstrap";
import { ProjectOneData } from "@/data";
import ProjectCard from "./project-card";

const ProjectOne = () => {
  return (
    <section className="recent-projects project-page sec-pad">
      <div className="thm-container">
        <Row>
          {ProjectOneData.map((post, index) => (
            <Col key={index} md={6} lg={4}>
              <ProjectCard data={post} />
            </Col>
          ))}
        </Row>
        <PostPaginations />
      </div>
    </section>
  );
};

export default ProjectOne;
