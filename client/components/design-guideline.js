import React from "react";
import DownloadGuide from "./download-guide";

const DesignGuideLines = () => {
  return (
    <section className="video-box-design-guide sec-pad pb0">
      <div className="thm-container">
        <div className="sec-title text-center">
          <span>Safe area, bleed, and trim?</span>
          <h3>Design Guidelines</h3>
          <p>
            There are many variations of passages of lorem Ipsum available, but{" "}
            <br /> the majority have suffered alteration in some form.
          </p>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="design-sizes">
              <div className="title text-center">
                <h3>Postcards Sizes</h3>
              </div>
              <div className="design-sizes-name-box">
                <div className="single-design-sizes-name-box clearfix">
                  <span className="name"> Small Postcards </span>
                  <span className="size">4.13" x 5.83"</span>
                </div>
                <div className="single-design-sizes-name-box clearfix">
                  <span className="name">NEW Standard Postcards</span>
                  <span className="size">4" x 6"</span>
                </div>
                <div className="single-design-sizes-name-box clearfix">
                  <span className="name">Standard Postcards</span>
                  <span className="size">4" x 7"</span>
                </div>
                <div className="single-design-sizes-name-box clearfix">
                  <span className="name">Rounded Postcards</span>
                  <span className="size">4" x 8"</span>
                </div>
                <div className="single-design-sizes-name-box clearfix">
                  <span className="name">NEW Square Postcards</span>
                  <span className="size">4.7" x 4.7"</span>
                </div>
                <div className="single-design-sizes-name-box clearfix">
                  <span className="name">NEW Rack Cards</span>
                  <span className="size">3.67" x 8.5"</span>
                </div>
                <div className="single-design-sizes-name-box clearfix">
                  <span className="name">Medium Postcards</span>
                  <span className="size">5" x 7"</span>
                </div>
                <div className="single-design-sizes-name-box clearfix">
                  <span className="name">NEW Half Page Postcards</span>
                  <span className="size">5.5" x 8.5"</span>
                </div>
                <div className="single-design-sizes-name-box clearfix">
                  <span className="name">NEW Large Postcards</span>
                  <span className="size">6” x 9”</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <DownloadGuide />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignGuideLines;
