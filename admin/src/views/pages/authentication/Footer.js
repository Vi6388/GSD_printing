import React, { useState, useEffect } from 'react';
import bg from '../../../assets/images/backgrounds/bg.png';
import { Facebook } from 'react-feather';
import { ArrowRight, ArrowUp, Twitter, Instagram, Linkedin } from 'react-feather';

function Footer() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    console.log('joioo');
    if (window.pageYOffset > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="w-100">
        <div
          className="d-flex "
          style={{
            // width: '100%',

            // height: '700px',
            backgroundColor: ' #212226',
            display: 'flex',
            backgroundRepeat: 'no-repeat',
            // backgroundAttachment:'fixed',
            // backgroundSize: 'cover',
            // backgroundPosition: 'center center',
            backgroundImage: `url("${bg}")`
          }}
        >
          {/* <div className="p-lg-3 p-sm-0"> */}
          <div className="col-lg-12 p-lg-3 p-sm-0">
            <div className="footer-content pb-50 mt-4 mb-4">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-sm-6">
                  <div className="single-footer-widget contact-info mx-2">
                    <h3 className="text-white mb-3 fw-bolder">Contact With Us</h3>
                    <ul>
                      <li>
                        <p className="text-white fw-bolder">Address</p>
                        <p className="text-muted">
                          20 Mercantile Plaza, Suite 546, Fort Worth,
                          <br />
                          TX, 16734, USA
                        </p>
                      </li>
                      <li>
                        <p className="text-white fw-bolder">Call Us</p>
                        <a className="text-muted" href="tel:+1823456789">
                          +1 (823-456-789)
                        </a>
                      </li>
                      <li>
                        <p className="text-white mt-1 fw-bolder">Mail Us</p>
                        <a className="text-muted" href="mailto:contact@yourting.com">
                          contact@yourting.com
                        </a>
                      </li>
                    </ul>
                    <div className="d-flex justify-content-between ">
                      <ul className="">
                        <li
                          className="rounded-circle justify-content-center align-items-center d-flex"
                          style={{ paddingInlineEnd: '10px' }}
                        >
                          <span className="p-1 me-1 bg-light rounded-circle">
                            {' '}
                            <a href="https://www.facebook.com" target="_blank">
                              <Facebook size={20} style={{ color: 'gray' }} />
                            </a>
                          </span>
                          <span className="p-1 me-1 bg-light rounded-circle">
                            {' '}
                            <a href="https://www.facebook.com" target="_blank">
                              <Twitter size={20} style={{ color: 'gray' }} />
                            </a>
                          </span>
                          <span className="p-1 me-1 bg-light rounded-circle">
                            {' '}
                            <a href="https://www.facebook.com" target="_blank">
                              <Instagram size={20} style={{ color: 'gray' }} />
                            </a>
                          </span>
                          <span className="p-1 me-1 bg-light rounded-circle">
                            {' '}
                            <a href="https://www.facebook.com" target="_blank">
                              <Linkedin size={20} style={{ color: 'gray' }} />
                            </a>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="single-footer-widget quick-links mx-2">
                    <h3 className="text-white mb-3 fw-bolder">Quick Links</h3>
                    <div className="row">
                      <div className="col-6 ">
                        <ul>
                          <li className="mb-1 fw-bolder">
                            <a className="text-muted " href="/">
                              Home
                            </a>
                          </li>
                          <li className="mb-1 fw-bolder">
                            <a className="text-muted" href="/">
                              About Us
                            </a>
                          </li>
                          <li className="mb-1 fw-bolder">
                            <a className="text-muted" href="/">
                              FAQ's
                            </a>
                          </li>
                          <li className="mb-1 fw-bolder">
                            <a className="text-muted" href="/">
                              Terms Of Service
                            </a>
                          </li>
                          <li className="mb-1 fw-bolder">
                            <a className="text-muted" href="/">
                              Privacy Policy
                            </a>
                          </li>
                          <li className="mb-1 fw-bolder">
                            <a className="text-muted" href="/">
                              Our Services
                            </a>
                          </li>
                          <li className="mb-1 fw-bolder">
                            <a className="text-muted" href="/">
                              Meet Our Team
                            </a>
                          </li>
                          <li className="mb-1 fw-bolder">
                            <a className="text-muted" href="/">
                              Latest News
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-6 ">
                        <ul>
                          <li className="mb-1 fw-bolder">
                            <a className="text-muted " href="/">
                              Intro Video
                            </a>
                          </li>
                          <li className="mb-1 fw-bolder">
                            <a className="text-muted" href="/">
                              Our Pricing Plan
                            </a>
                          </li>
                          <li className="mb-1 fw-bolder">
                            <a className="text-muted" href="/">
                              Schedule Time
                            </a>
                          </li>
                          <li className="mb-1 fw-bolder">
                            <a className="text-muted" href="/">
                              Our Portfolio
                            </a>
                          </li>
                          <li className="mb-1 fw-bolder">
                            <a className="text-muted" href="/">
                              Contact Us
                            </a>
                          </li>
                          <li className="mb-1 fw-bolder">
                            <a className="text-muted" href="/">
                              Testimonials
                            </a>
                          </li>
                          <li className="mb-1 fw-bolder">
                            <a className="text-muted" href="/">
                              Subscribe Now
                            </a>
                          </li>
                          <li className="mb-1 fw-bolder">
                            <a className="text-muted" href="/">
                              Training Course
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="single-footer-widget subscribe mx-3">
                    <h3 className="text-white mb-3 fw-bolder">Subscribe Now</h3>
                    <span className="text-white fw-bolder">
                      Get Us In The Inbox And Get The Best<br></br> Implementation!
                    </span>
                    <p className="text-muted mt-2 fw-bolder">
                      When looking at its layout. The point of using Lorem it <br />
                      is a long fact that will be distracted.
                    </p>

                    <div className="subscribe-form pe-lg-3 p-sm-0 ">
                      <form className="newsletter-form" data-toggle="validator">
                        <input
                          type="email"
                          className="form-control p-2 rounded-pill w-80 d-flex justify-content-center text-align-center "
                          placeholder="Enter your email or password"
                          name="EMAIL"
                          required
                          // autocomplete="off"
                        />
                        <div className="btn btn-danger mt-2 mb-2  p-2 rounded-pill d-flex justify-content-center w-80 ">
                          <a className=" text-white " href="apply.html">
                            <b>Subscribe Now</b>
                            <ArrowRight size={18} />
                          </a>
                        </div>
                        <div id="validator-newsletter" className="form-result"></div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col-lg-12 ">
                <hr />
              </div>
              <div className="col-lg-12 ">
                {showScroll && (
                  <div
                    className=" fixed-bottom mx-1 mb-5 scroll-arrow d-flex justify-content-end"
                    onClick={scrollToTop}
                  >
                    <button type="button" className="btn btn-danger p-1 mx-1 ">
                      {' '}
                      <ArrowUp size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className=" d-flex justify-content-center fw-bolder">
              <p>
                © <span className="text-danger">Mycma</span> is Proudly Owned by{' '}
                <a className="text-danger" href="/" target="_blank">
                  Mymanager.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
