import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { ProgressData } from "@/data";

const ProgressOne = () => {
  const { sectionImage, sectionContent, posts } = ProgressData;
  return (
    <section className="service-style-two about-page">
      <div className="overlay"></div>
      <img
        src={sectionImage}
        className="background-right"
        alt="Awesome Image"
      />
      <div className="thm-container">
        <div className="row">
          <div className="col-lg-6">
            <div className="service-content">
              <span>{sectionContent.subText}</span>
              <h2>{sectionContent.title}</h2>
              <p>{sectionContent.content}</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="price-feature-box">
              <div className="row">
                {posts.map(({ title, price, percentCount }, index) => (
                  <div className="col-md-6 text-center" key={index}>
                    <div className="price-feature">
                      <div className="circle-box">
                        <CircularProgressbar
                          value={percentCount}
                          styles={buildStyles({
                            textColor: "#2984C4",
                            pathColor: "#2984C4",
                            trailColor: "rgba(244, 245, 249, 1)"
                          })}
                        />
                        <div className="text-box">
                          <div className="inner">
                            <div className="content">
                              <p>${price}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h3>{title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressOne;
