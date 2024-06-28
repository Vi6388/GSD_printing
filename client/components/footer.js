import React, { Fragment } from "react";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import {
  FooterAboutData,
  FooterLinksData,
  FooterPostsData,
  FooterLinksDataTwo,
  FooterContactData,
  FooterBottomData,
  Logo
} from "@/data";

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer">
        <div className="thm-container">
          <Row>
            <Col lg={4}>
              <div className="footer-widget about-widget">
                <Link href="/">
                  <a className="navbar-brand">
                    <img src={Logo.dark} alt="Awesome Image" width="180px" />
                  </a>
                </Link>
                {/* <div className="title">
                  <h3>{FooterAbou
                    tData.title}</h3>
                </div> */}
                <p className="mt-2">{FooterAboutData.text}</p>

                <form action="#" className="footer-subscribe">
                  <input type="text" name="email" placeholder="Email address" />
                  <button type="submit">
                    <i className="fa fa-angle-right"></i>
                  </button>
                </form>
              </div>
            </Col>
            <Col lg={2}>
              <div className="footer-widget links-widget explore">
                <div className="title">
                  <h3>{FooterLinksData.title}</h3>
                </div>
                <ul className="link-list">
                  {FooterLinksData.links.map(({ url, label }, index) => {
                    return (
                      <li key={index}>
                        <Link href={url}>
                          <a>{label}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Col>
            <Col lg={3}>
              <div className="footer-widget links-widget explore">
                <div className="title">
                  <h3>{FooterPostsData.title}</h3>
                </div>
                <ul className="link-list">
                  {FooterLinksDataTwo.links.map(({ url, label }, index) => {
                    return (
                      <li key={index}>
                        <Link href={url}>
                          <a>{label}</a>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Col>
            <Col lg={3}>
              <div className="footer-widget contact-widget">
                <div className="title">
                  <h3>{FooterContactData.title}</h3>
                </div>
                {FooterContactData.infos.map(({ text, url }, index) => {
                  return (
                    <p key={index}>
                      <a href={url}>{text}</a>
                    </p>
                  );
                })}
              </div>
            </Col>
          </Row>
        </div>
      </footer>
      <div className="footer-bottom">
        <div className="thm-container clearfix">
          <div className="float-left copy-text">
            <p>
              &copy; Copyright {new Date().getFullYear()} Created by{" "}
              <a href="#"></a>
            </p>
          </div>
          <div className="social-box float-right pt-3">
            {FooterBottomData.social.map(({ icon, url }, index) => {
              return (
                <a key={index} href={url} className={`${icon} hvr-pulse`}></a>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
