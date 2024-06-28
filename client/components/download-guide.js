import React, { Fragment } from "react";
import designGuideline1 from "@/images/download-guide-line-1-1.jpg";

const DownloadGuide = () => {
  return (
    <Fragment>
      <div className="design-guideline">
        <div className="row">
          <div className="col-md-7">
            <div className="guide-content">
              <h3>
                Download a Design <br /> Guideline
              </h3>
              <ul className="list-box">
                <li>
                  <span>Bleed:</span> 2.91” x 1.26”
                </li>
                <li>
                  <span>Trim:</span> 2.75” x 1.10”
                </li>
                <li>
                  <span>Safe:</span> 2.6” x 0.94”
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-5">
            <div className="row version-row">
              <div className="col-6">
                <div className="single-version">
                  <div className="version">
                    <span>psd</span>
                    <i className="fas fa-angle-double-down"></i>
                  </div>
                  <h4>Photoshop</h4>
                </div>
              </div>
              <div className="col-6">
                <div className="single-version">
                  <div className="version ai">
                    <span>ai</span>
                    <i className="fas fa-angle-double-down"></i>
                  </div>
                  <h4>Illustrator</h4>
                </div>
              </div>
              <div className="col-6">
                <div className="single-version">
                  <div className="version indesign">
                    <span>indd</span>
                    <i className="fas fa-angle-double-down"></i>
                  </div>
                  <h4>InDesign</h4>
                </div>
              </div>
              <div className="col-6">
                <div className="single-version">
                  <div className="version jpg">
                    <span>jpg</span>
                    <i className="fas fa-angle-double-down"></i>
                  </div>
                  <h4>Jpeg</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="guide-line-img-box">
        <img src={designGuideline1} alt="Awesome Image" />
      </div>
    </Fragment>
  );
};

export default DownloadGuide;
