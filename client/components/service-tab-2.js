import React, { Fragment, useState } from "react";
import { ServiceTabOneData, VideoData } from "@/data";
import { Col, Row } from "react-bootstrap";
import DownloadGuide from "./download-guide";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";

const ServiceTabTwo = () => {
  const [active, setActive] = useState(1);
  const [isOpen, setOpen] = useState(false);
  const { image, ID, caption } = VideoData;
  return (
    <Fragment>
      <section className="video-box-design-guide sec-pad service-tab-box">
        <div className="thm-container">
          <div className="tab-title">
            <ul className="list-inline">
              {ServiceTabOneData.map(({ title, icon }, index) => (
                <li
                  key={index}
                  className={`${active === index ? "active" : " "}`}
                >
                  <a
                    className="hvr-bounce-to-bottom"
                    href={`service-tab-${index}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActive(index);
                    }}
                  >
                    <i className={icon}></i>
                    <h3>{title}</h3>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="tab-content">
            {ServiceTabOneData.map(({ content }, index) => {
              return index === active ? (
                <div
                  className="single-tab-content tab-pane show fade in active animated fadeIn"
                  key={index}
                >
                  <div className="sec-title text-center">
                    <span>{content.subText}</span>
                    <h3>{content.title}</h3>
                    <p>{content.content}</p>
                  </div>
                  <Row>
                    <Col lg={6}>
                      <div className="video-box">
                        <img src={image} alt="Awesome Image" />
                        <div className="content">
                          <h3>{caption}</h3>
                        </div>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen(true);
                          }}
                          href="#"
                          className="video-btn video-popup"
                        >
                          <i className="fas fa-play"></i>
                        </a>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <DownloadGuide />
                    </Col>
                  </Row>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </section>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={ID}
        onClose={() => setOpen(false)}
      />
    </Fragment>
  );
};

export default ServiceTabTwo;
