import React from "react";
import { FeatureOneData } from "@/data";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";

const FeatureOne = () => {
  const { sectionContent, posts } = FeatureOneData;
  return (
    <section className="what-we-do sec-pad service-page">
      <div className="thm-container">
        <div className="sec-title text-center">
          <span>{sectionContent.subText}</span>
          <h3>{sectionContent.title}</h3>
          <p>{sectionContent.content}</p>
        </div>
        <Row>
          <Col md={6}>
            <div className="single-what-we-do">
              <div className="img-box">
                <img src={posts[0].image} alt="" />
              </div>
              <div className="text-box hvr-bounce-to-bottom">
                <Link href={posts[0].url}>
                  <a>
                    <h3>{posts[0].title}</h3>
                  </a>
                </Link>
                <p>{posts[0].content}</p>
                <Link href={posts[0].url}>
                  <a className="read-more fas fa-angle-right"></a>
                </Link>
              </div>
            </div>
          </Col>
          <Col md={6}>
            {posts
              .slice(1, posts.length)
              .map(({ image, url, title, content }, index) => (
                <div className="single-what-we-do-two clearfix" key={index}>
                  <div className="img-box">
                    <img src={image} alt="Awesome Image" />
                  </div>
                  <div className="text-box">
                    <h3>
                      <Link href={url}>
                        <a>{title}</a>
                      </Link>
                    </h3>
                    <p>{content}</p>
                  </div>
                </div>
              ))}
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default FeatureOne;
