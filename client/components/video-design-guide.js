import React from "react";
import { Col, Row } from "react-bootstrap";
import DownloadGuide from "./download-guide";
import VideoCard from "./video-card";

const VideoDesignGuide = () => {
  return (
    <section className="video-box-design-guide sec-pad">
      <div className="thm-container">
        <Row>
          <Col lg={6}>
            <VideoCard />
          </Col>
          <Col lg={6}>
            <DownloadGuide />
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default VideoDesignGuide;
