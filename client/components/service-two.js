import React from "react";
import serviceTwo1 from "@/images/what-we-do-1-1.jpg";
const ServiceTwo = () => {
  return (
    <section className="what-we-do sec-pad">
      <div className="thm-container">
        <div className="sec-title text-center">
          <span>Our features</span>
          <h3>What We Do</h3>
          <p>
            There are many variations of passages of lorem Ipsum available, but{" "}
            <br /> the majority have suffered alteration in some form.
          </p>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="single-what-we-do">
              <div className="img-box">
                <img src={serviceTwo1} alt="" />
              </div>
              <div className="text-box hvr-bounce-to-bottom">
                <a href="/service-details">
                  <h3>3D Printing</h3>
                </a>
                <p>
                  There are many people variation of passages of lorem Ipsum
                  available in the majority have suffer alteration in some.
                </p>
                <a
                  href="/service-details"
                  className="read-more fas fa-angle-right"
                ></a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="row">
              <div className="col-sm-6">
                <div className="single-what-we-do-one hvr-bounce-to-bottom">
                  <i className="printify-icon-paper-drill"></i>
                  <a href="/service-details">
                    <h3>Digital Printing</h3>
                  </a>
                  <p>
                    There are many people variation of passages of lorem Ipsum
                    available in the majority have suffer alteration in some.
                  </p>
                  <a
                    href="/service-details"
                    className="read-more fas fa-angle-right"
                  ></a>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="single-what-we-do-one hvr-bounce-to-bottom">
                  <i className="printify-icon-printing-text"></i>
                  <a href="/service-details">
                    <h3>Offset Printing</h3>
                  </a>
                  <p>
                    There are many people variation of passages of lorem Ipsum
                    available in the majority have suffer alteration in some.
                  </p>
                  <a
                    href="/service-details"
                    className="read-more fas fa-angle-right"
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceTwo;
