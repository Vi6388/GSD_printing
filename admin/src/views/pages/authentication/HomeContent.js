import React from 'react';
import backgroundImage from '../../../assets/images/banner/banner.jpg';
import avatar from '../../../assets/images/avatars/1.png';
import { ArrowRight, Smile, Youtube, Calendar, Clock, MapPin } from 'react-feather';
import AvatarGroup from '@components/avatar-group';
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  Button,
  CardGroup,
  Table,
  CardBody,
  CardSubtitle
} from 'reactstrap';
import bg from '../../../assets/images/backgrounds/bg.png';
import about from '../../../assets/images/banner/about.jpg';
import boxer1 from '../../../assets/images/banner/team1.jpg';
import boxer2 from '../../../assets/images/banner/team2.jpg';
import boxer3 from '../../../assets/images/banner/team3.jpg';
import bg1 from '../../../assets/images/backgrounds/bg1.jpg';
import img1 from '../../../assets/images/portfolio/portfolio-img-1.jpg';
import img2 from '../../../assets/images/portfolio/portfolio-img-2.jpg';
import img3 from '../../../assets/images/portfolio/portfolio-img-3.jpg';
import img4 from '../../../assets/images/portfolio/portfolio-img-4.jpg';
import img5 from '../../../assets/images/portfolio/portfolio-img-5.jpg';
import img6 from '../../../assets/images/portfolio/portfolio-img-6.jpg';
import blog1 from '../../../assets/images/banner/blog-1.jpg';
import blog2 from '../../../assets/images/banner/blog-2.jpg';
import blog3 from '../../../assets/images/banner/blog-3.jpg';
import course1 from '../../../assets/images/banner/course-1.jpg';
import course2 from '../../../assets/images/banner/course-2.jpg';
import course3 from '../../../assets/images/banner/course-3.jpg';
import course4 from '../../../assets/images/banner/course-4.jpg';

function HomeContent() {
  const avatarGroupArr = [
    {
      imgWidth: 50,
      imgHeight: 50,
      title: 'Billy Hopkins',
      placement: 'bottom',
      img: avatar
    },
    {
      imgWidth: 50,
      imgHeight: 50,
      title: 'Billy Hopkins',
      placement: 'bottom',
      img: avatar
    },
    {
      imgWidth: 50,
      imgHeight: 50,
      title: 'Billy Hopkins',
      placement: 'bottom',
      img: avatar
    },
    {
      imgWidth: 50,
      imgHeight: 50,
      title: 'Billy Hopkins',
      placement: 'bottom',
      img: avatar
    }
  ];
  return (
    <>
      <div className="banner-area ">
        <div className="">
          <div
            className="bg-img "
            style={{
              marginTop: '100px',
              height: '88vh',
              display: 'flex',
              alignItems: 'center',
              display: 'flex',
              backgroundRepeat: 'no-repeat',
              // backgroundAttachment:'fixed',
              // backgroundSize: 'cover',
              // backgroundPosition: 'center center',
              backgroundImage: `url("${backgroundImage}")`
            }}
          >
            <div className="px-4 mt-4">
              <div className="ms-lg-5 mt-4">
                <p className="text-danger">Welcome To The Martial Arts, Boxing & Karate School</p>
                <h6 className=" text-white" style={{ fontSize: '6vmin', fontWeight: '900' }}>
                  There Is A Hard Way To
                  <br /> Strengthen Yourself
                </h6>
                <p className="text-muted mt-2 fw-bolder mt-2">
                  Many desktop publishing package and web page editor now use Lorem Ipsum their
                  default <br />
                  search for 'lorem ipsum' will uncover many web sites still in their infancy.
                </p>
                <div className="col-lg-12 rounded rounded card mt-4  ">
                  <div className="card-body">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-lg-4 col-md-4">
                        <div className="apply-img">
                          <AvatarGroup data={avatarGroupArr} size="sm" />
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div>
                          <p className="text-black">Join Our 500+ Students For Boxing Class</p>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="btn btn-danger rounded-pill d-flex justify-content-center  align-item-center p-2 ">
                          <a className=" text-white " href="apply.html">
                            <b>Apply Now </b>
                            <ArrowRight size={18} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center justify-content-center align-items-center">
        <div>
          <p
            className="justify-content-center align-item-center d-flex text-danger mt-3"
            style={{ fontSize: '20px' }}
          >
            <b>Services</b>
          </p>
          <h1
            className=" justify-content-center align-item-center d-flex mb-3 text-black fw-bold"
            style={{ fontSize: '5.5vmin', color: 'Black', fontWeight: '800' }}
          >
            <b>Some Of Our Services</b>
          </h1>
        </div>
        <Row className="justify-content-center">
          <Col xl="5">
            <Card body className="">
              <Row className="d-flex justify-content-center">
                <Col lg="3" xs="5">
                  <div className=" rounded-circle bg-light p-3">
                    <span className="text-center">
                      <Smile size={40} />
                    </span>
                  </div>
                </Col>
                <Col lg="9 mt-4">
                  <div className="">
                    <div className="text-start">
                      <h3 className="mb-2">
                        <b>Fully Equipped Facility</b>
                      </h3>
                      <p>
                        Many desktop publishing packages and web page editors now use will uncover
                        many web sites still in their infancy.
                      </p>
                      <div className="mt-3 mb-2">
                        <a
                          className="rounded-pill bg-light p-2 text-black fw-bold justify-content-center"
                          href="/"
                        >
                          Read More <ArrowRight size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl="5">
            <Card body className="">
              <Row className="d-flex justify-content-center">
                <Col lg="3" xs="5">
                  <div className=" rounded-circle bg-light p-3">
                    <span className="text-center">
                      {' '}
                      <Smile size={40} />
                    </span>
                  </div>
                </Col>
                <Col lg="9 mt-4">
                  <div className="">
                    <div className="text-start">
                      <h3 className="mb-2">
                        <b>Fully Equipped Facility</b>
                      </h3>
                      <p>
                        Many desktop publishing packages and web page editors now use will uncover
                        many web sites still in their infancy.
                      </p>
                      <div className="mt-3 mb-2">
                        <a
                          className="rounded-pill bg-light p-2 text-black fw-bold justify-content-center"
                          href="/"
                        >
                          Read More <ArrowRight size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl="5">
            <Card body className="">
              <Row className="d-flex justify-content-center">
                <Col lg="3" xs="5">
                  <div className=" rounded-circle bg-light p-3">
                    <span className="text-center">
                      {' '}
                      <Smile size={40} />
                    </span>
                  </div>
                </Col>
                <Col lg="9 mt-4">
                  <div className="">
                    <div className="text-start">
                      <h3 className="mb-2">
                        <b>Fully Equipped Facility</b>
                      </h3>
                      <p>
                        Many desktop publishing packages and web page editors now use will uncover
                        many web sites still in their infancy.
                      </p>
                      <div className="mt-3 mb-2">
                        <a
                          className="rounded-pill bg-light p-2 text-black fw-bold justify-content-center"
                          href="/"
                        >
                          Read More <ArrowRight size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl="5">
            <Card body className="">
              <Row className="d-flex justify-content-center">
                <Col lg="3" xs="5">
                  <div className=" rounded-circle bg-light p-3">
                    <span className="text-center">
                      {' '}
                      <Smile size={40} />
                    </span>
                  </div>
                </Col>
                <Col lg="9 mt-4">
                  <div className="">
                    <div className="text-start">
                      <h3 className="mb-2">
                        <b>Fully Equipped Facility</b>
                      </h3>
                      <p>
                        Many desktop publishing packages and web page editors now use will uncover
                        many web sites still in their infancy.
                      </p>
                      <div className="mt-3 mb-2">
                        <a
                          className="rounded-pill bg-light p-2 text-black fw-bold justify-content-center"
                          href="/"
                        >
                          Read More <ArrowRight size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
      {/* About us */}
      <div className="container-fluid mt-3 mx-lg-4 mx-sm-0">
        <div className=" row d-flex justify-content-center ">
          <div className="col-lg-4 col-md-3 card">
            <img src={about} alt="Bootstrap" />
          </div>
          <div className="col-lg-7 col-md-3">
            <div className="mx-3">
              <p className=" text-danger" style={{ fontSize: '20px' }}>
                <b>About Us</b>
              </p>
              <h1
                className="fw-800"
                style={{
                  fontSize: '5.5vmin',
                  color: 'Black',
                  fontWeight: '900',
                  text: 'bold'
                }}
              >
                Most Fitness Routines Fail Due To Lack Of Results
              </h1>
              <p className="fw-normal mt-2" style={{ fontSize: '16px', lineHeight: '1.5' }}>
                It is a long established fact that a reader will be distracted by the readable
                content page <br />
                it when looking at its layout. The point of using Lorem Ipsum is that it normal
                <br />
                distribution of a letters, as opposed to using making it look like readable English.
              </p>
              <div className="row mt-1">
                <div className="col-lg-6 col-md-6 ">
                  <ul>
                    <li className="mt-2">The International Boxing Federation</li>
                    <li className="mt-1">World Boxing Association</li>
                    <li className="mt-1">World Boxing Council</li>
                    <li className="mt-1">World Boxing Organization</li>
                  </ul>
                </div>
                <div className="col-lg-6 col-md-6">
                  <ul>
                    <li className="mt-2">Expanding Range Of Female Boxers</li>
                    <li className="mt-1">Including Two World Champions</li>
                    <li className="mt-1">Delivers Al Haymon’s Series</li>
                    <li className="mt-1">Its Fights Are Available Through</li>
                  </ul>
                </div>
              </div>
              <div className=" col-lg-3 col-md-2 btn btn-danger rounded-pill d-flex justify-content-center  align-item-center  mt-2 p-1 ">
                <a className=" text-white " href="apply.html">
                  <b>Read More</b>
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Training courses */}
      <div className="m-1">
        <p
          className=" justify-content-center align-item-center d-flex text-danger mt-3"
          style={{ fontSize: '20px' }}
        >
          <b>Training Course</b>
        </p>
        <h1
          className=" justify-content-center align-item-center d-flex m-3 text-black fw-bold"
          style={{ fontSize: ' 5vmin  ', color: 'Black', fontWeight: '800' }}
        >
          <b>Our Top Boxing Course</b>
        </h1>
        <div className="mx-lg-4 mx-sm-0">
          <Row className="d-flex justify-content-center mx-lg-4 mx-sm-0">
            <Col xl="12">
              <Row className="">
                <Col lg="3" md="2">
                  <Card>
                    <img src={course1} alt="Bootstrap" />
                    <CardBody className="">
                      <CardTitle className="mb-2 text-black mt-1 fw-bolder" tag="h1">
                        Boxing Practice
                      </CardTitle>
                      <CardSubtitle className="mb-1">
                        <MapPin size={18} />
                        <span> 231 King Street, Melbourne</span>
                      </CardSubtitle>
                      <Clock size={18} />
                      <span> 01:00pm - 03:00 pm</span>
                      <div className="mt-3 mb-2">
                        <a
                          className="rounded-pill bg-light p-2 text-black fw-bold justify-content-center"
                          href="/"
                        >
                          Read More <ArrowRight size={18} />
                        </a>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col xl="3">
                  <Card>
                    <img src={course2} alt="Bootstrap" />
                    <CardBody className="">
                      <CardTitle className="mb-2 text-black mt-1 fw-bolder" tag="h1">
                        Cardio Training
                      </CardTitle>
                      <CardSubtitle className="mb-1">
                        <MapPin size={18} />
                        <span> 231 King Street, Melbourne</span>
                      </CardSubtitle>
                      <Clock size={18} />
                      <span> 01:00pm - 03:00 pm</span>
                      <div className="mt-3 mb-2">
                        <a
                          className="rounded-pill bg-light p-2 text-black fw-bold justify-content-center"
                          href="/"
                        >
                          Read More <ArrowRight size={18} />
                        </a>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col xl="3">
                  <Card>
                    <img src={course3} alt="Bootstrap" />
                    <CardBody className="mx-1">
                      <CardTitle className="mb-2 text-black mt-1 fw-bolder" tag="h1">
                        Zumba Dance
                      </CardTitle>
                      <CardSubtitle className="mb-1">
                        <MapPin size={18} />
                        <span> 231 King Street, Melbourne</span>
                      </CardSubtitle>
                      <Clock size={18} />
                      <span> 01:00pm - 03:00 pm</span>
                      <div className="mt-3 mb-2">
                        <a
                          className="rounded-pill bg-light p-2 text-black fw-bold justify-content-center"
                          href="/"
                        >
                          Read More <ArrowRight size={18} />
                        </a>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col xl="3">
                  <Card>
                    <img src={course4} alt="Bootstrap" />
                    <CardBody className="mx-1">
                      <CardTitle className="mb-2 text-black mt-1 fw-bolder" tag="h1">
                        Boxing Class
                      </CardTitle>
                      <CardSubtitle className="mb-1">
                        <MapPin size={18} />
                        <span> 231 King Street, Melbourne</span>
                      </CardSubtitle>
                      <Clock size={18} />
                      <span> 01:00pm - 03:00 pm</span>
                      <div className="mt-3 mb-2">
                        <a
                          className="rounded-pill bg-light p-2 text-black fw-bold justify-content-center"
                          href="/"
                        >
                          Read More <ArrowRight size={18} />
                        </a>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>

      {/* our members */}
      <div className="mx-lg-4 mx-xs-2 ">
        <p
          className=" justify-content-center align-item-center d-flex text-danger"
          style={{ fontSize: '20px' }}
        >
          <b>Our Members</b>
        </p>
        <h1
          className=" justify-content-center align-item-center d-flex mb-3 text-black fw-bold"
          style={{ fontSize: ' 5.5vmin', color: 'Black', fontWeight: '800' }}
        >
          <b>Training With Our Experts</b>
        </h1>
        <Row className="mx-lg-4 mx-sm-0 ">
          <Col xl="4" md="6" className="d-flex justify-content-center">
            <Card className="w-100 border">
              <img src={boxer1} alt="Bootstrap" height="350" />
              <CardBody>
                <CardTitle className="mb-2 text-black  text-center" tag="h5">
                  <b> Norwood Turcotte</b>
                </CardTitle>
                <CardSubtitle className="mb-2 text-body-secondary text-center" tag="h6">
                  Boxing Trainer
                </CardSubtitle>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4" md="6" className="d-flex justify-content-center">
            <Card className="w-100 border">
              <img src={boxer2} alt="Bootstrap" height="350" />
              <CardBody>
                <CardTitle className="mb-2 text-black  text-center" tag="h5">
                  <b> Norwood Turcotte</b>
                </CardTitle>
                <CardSubtitle className="mb-2 text-body-secondary text-center" tag="h6">
                  Boxing Trainer
                </CardSubtitle>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4" md="6" className="d-flex justify-content-center">
            <Card className="w-100 border">
              <img src={boxer3} alt="Bootstrap" height="350" />
              <CardBody>
                <CardTitle className="mb-2 text-black  text-center" tag="h5">
                  <b> Norwood Turcotte</b>
                </CardTitle>
                <CardSubtitle className="mb-2 text-body-secondary text-center" tag="h6">
                  Boxing Trainer
                </CardSubtitle>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Intro Video */}
      <div className="container-fluid mt-2" style={{ height: '' }}>
        <div
          className="row p-1"
          style={{
            height: '70vh',
            // width: '100%',
            // height: '100%',
            display: 'flex',
            // alignItems: 'center',
            backgroundRepeat: 'no-repeat',
            // backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundImage: `url("${bg1}")`
          }}
        >
          <div className="col-lg-6 col-md-3 "></div>
          <div className="col-lg-6 col-md-3 ">
            <p
              className=" justify-content-start align-item-right d-flex text-danger "
              style={{ fontSize: '16px ' }}
            >
              <b>Intro Video</b>
            </p>
            <h1
              className=" justify-content-start align-item-left d-flex mb-3 text-black fw-bold"
              style={{ fontSize: ' 5.5vmin', fontWeight: '800' }}
            >
              <b style={{ color: 'white' }}>
                Excellence Pro-Style Boxing <br />
                Gloves You Are An Instructor
              </b>
            </h1>
            <p className="text-light">
              It is a long established fact that a reader will be distracted by the readable content
              page it when looking at its layout. The point of using Lorem Ipsum is that it normal
              distribution of a letters, as opposed to using making it look like readable English.
            </p>
            <ul className="text-light">
              <li>
                <i className="ri-check-double-line"></i>Expanding Range Of Female Boxers
              </li>
              <li>
                <i className="ri-check-double-line"></i>Including Two World Champions
              </li>
              <li>
                <i className="ri-check-double-line"></i>Delivers Al Haymon’s Series
              </li>
              <li>
                <i className="ri-check-double-line"></i>Its Fights Are Available Through
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Portfolio */}
      <div className="mt-3">
        <p
          className=" justify-content-center align-item-center d-flex text-danger"
          style={{ fontSize: '20px' }}
        >
          <b>Portfolio</b>
        </p>
        <h1
          className=" justify-content-center align-item-center d-flex mb-3 text-black fw-bold"
          style={{ fontSize: ' 5.5vmin', color: 'Black', fontWeight: '800' }}
        >
          <b>Will Help You Completely</b>
        </h1>
        <Row className="d-flex justify-content-center">
          <Col xl="10">
            <Row>
              <Col xl="3" sm="12" className="justify-content-center align-items-center d-flex">
                {' '}
                <img className="p-1" src={img1} alt="Bootstrap" height="400" />
              </Col>
              <Col xl="6" sm="12" className="justify-content-center align-items-center d-flex">
                {' '}
                <img className="p-1" src={img2} alt="Bootstrap" height="400" />
              </Col>
              <Col xl="3" sm="12" className="justify-content-center align-items-center d-flex">
                {' '}
                <img className="p-1" src={img3} alt="Bootstrap" height="400" />
              </Col>
            </Row>
            <Row>
              <Col xl="4" sm="12 " className="justify-content-center align-items-center d-flex">
                <img className="p-1" src={img4} alt="Bootstrap" height="400" />
              </Col>
              <Col xl="4" sm="12" className="justify-content-center align-items-center d-flex">
                {' '}
                <img className="p-1" src={img5} alt="Bootstrap" height="400" />
              </Col>
              <Col xl="4" sm="12" className="justify-content-center align-items-center d-flex">
                {' '}
                <img className="p-1" src={img6} alt="Bootstrap" height="400" />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      {/* Testimonials */}
      <div>
        <Row className="d-flex justify-content-center mt-3">
          <Col xl="10">
            <div className="mx-lg-0 mx-sm-4">
              <p className="d-flex text-danger" style={{ fontSize: '20px' }}>
                <b>Testimonials</b>
              </p>
              <h1
                className=" justify-content-left align-item-left d-flex mb-3 text-black fw-bold"
                style={{ fontSize: '5.5vmin', color: 'Black', fontWeight: '800' }}
              >
                <b>See Reviews From Our Clients</b>
              </h1>
            </div>
            <Row>
              <Col xl="3" md="6" sm="12" className="">
                <Card body className="">
                  <Row className="">
                    <Col xs="1" className="d-lg-none"></Col>
                    <Col lg="3" md="3" xs="3">
                      <div className="d-flex justify-content-center rounded-circle bg-light mt-2 p-1 ">
                        <Youtube size={20} />
                      </div>
                    </Col>
                    <Col lg="9" xs="8">
                      <div className="rounded-circle  p-1 d-flex justify-content-end text-align-right">
                        <span style={{ fontSize: '50px', fontWeight: '800', color: 'lightgrey' }}>
                          01
                        </span>
                      </div>
                    </Col>
                  </Row>
                  <CardText className="mx-2 ">
                    It is a long established fact that reader will be distracted page its when
                    looking at its layout.
                  </CardText>
                  <CardBody>
                    <CardTitle className="mb-2 text-black  " tag="h5">
                      <b> Martina Grady</b>
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-body-secondary " tag="h6">
                      Cardio Trainer
                    </CardSubtitle>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="3" md="6" sm="12" className="">
                <Card body className="">
                  <Row className="">
                    <Col xs="1" className="d-lg-none"></Col>
                    <Col lg="3" md="3" xs="3">
                      <div className="d-flex justify-content-center rounded-circle bg-light mt-2 p-1 ">
                        <Youtube size={20} />
                      </div>
                    </Col>
                    <Col lg="9" xs="8">
                      <div className="rounded-circle  p-1 d-flex justify-content-end text-align-right">
                        <span style={{ fontSize: '50px', fontWeight: '800', color: 'lightgrey' }}>
                          02
                        </span>
                      </div>
                    </Col>
                  </Row>
                  <CardText className="mx-2 ">
                    It is a long established fact that reader will be distracted page its when
                    looking at its layout.
                  </CardText>
                  <CardBody>
                    <CardTitle className="mb-2 text-black  " tag="h5">
                      <b> Weldon Hegmann</b>
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-body-secondary " tag="h6">
                      Boxing Trainer
                    </CardSubtitle>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="3" md="6" sm="12" className="">
                <Card body className="">
                  <Row className="">
                    <Col xs="1" className="d-lg-none"></Col>
                    <Col lg="3" md="3" xs="3">
                      <div className="d-flex justify-content-center rounded-circle bg-light mt-2 p-1 ">
                        <Youtube size={20} />
                      </div>
                    </Col>
                    <Col lg="9" xs="8">
                      <div className="rounded-circle  p-1 d-flex justify-content-end text-align-right">
                        <span style={{ fontSize: '50px', fontWeight: '800', color: 'lightgrey' }}>
                          03
                        </span>
                      </div>
                    </Col>
                  </Row>
                  <CardText className="mx-2 ">
                    It is a long established fact that reader will be distracted page its when
                    looking at its layout.
                  </CardText>
                  <CardBody>
                    <CardTitle className="mb-2 text-black  " tag="h5">
                      <b>Frederick Kling</b>
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-body-secondary " tag="h6">
                      Crossfit Trainer
                    </CardSubtitle>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="3" md="6" sm="12" className="">
                <Card body className="">
                  <Row className="">
                    <Col xs="1" className="d-lg-none"></Col>
                    <Col lg="3" md="3" xs="3">
                      <div className="d-flex justify-content-center rounded-circle bg-light mt-2 p-1 ">
                        <Youtube size={20} />
                      </div>
                    </Col>
                    <Col lg="9" xs="8">
                      <div className="rounded-circle  p-1 d-flex justify-content-end text-align-right">
                        <span style={{ fontSize: '50px', fontWeight: '800', color: 'lightgrey' }}>
                          04
                        </span>
                      </div>
                    </Col>
                  </Row>
                  <CardText className="mx-2 ">
                    It is a long established fact that reader will be distracted page its when
                    looking at its layout.
                  </CardText>
                  <CardBody>
                    <CardTitle className="mb-2 text-black  " tag="h5">
                      <b> Vivian Durgan</b>
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-body-secondary " tag="h6">
                      Zumba Trainer
                    </CardSubtitle>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div className="mx-lg-4 mx-xs-2 ">
        <p
          className=" justify-content-center align-item-center d-flex text-danger"
          style={{ fontSize: '20px' }}
        >
          <b>Daily News</b>
        </p>
        <h1
          className=" justify-content-center align-item-center d-flex mb-3 text-black fw-bold"
          style={{ fontSize: ' 5.5vmin', color: 'Black', fontWeight: '800' }}
        >
          <b>Latest News And Articles</b>
        </h1>
        <Row className="mx-lg-4 mx-sm-0 ">
          <Col xl="4" md="6" className="d-flex justify-content-center">
            <Card className="w-100 border">
              <img src={blog1} alt="Bootstrap" height="350" />
              <CardBody className="">
                <Calendar size={18} />
                <span> 06 - Jun - 2022</span>
                <CardTitle className="mb-2 text-black mt-1 fw-bolder" tag="h1">
                  The Best Effective Strategies And Tips From Everyone
                </CardTitle>
                <div className="mt-3 mb-2">
                  <a
                    className="rounded-pill bg-light p-2 text-black fw-bold justify-content-center"
                    href="/"
                  >
                    Read More <ArrowRight size={18} />
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4" md="6" className="d-flex justify-content-center">
            <Card className="w-100 border">
              <img src={blog2} alt="Bootstrap" height="350" />
              <CardBody className="">
                <Calendar size={18} />
                <span> 06 - Jun - 2022</span>
                <CardTitle className="mb-2 text-black mt-1 fw-bolder" tag="h1">
                  Keeps You Motivated And Committed To Continuing The Program
                </CardTitle>
                <div className="mt-3 mb-2">
                  <a
                    className="rounded-pill bg-light p-2 text-black fw-bold justify-content-center"
                    href="/"
                  >
                    Read More <ArrowRight size={18} />
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4" md="6" className="d-flex justify-content-center">
            <Card className="w-100 border">
              <img src={blog3} alt="Bootstrap" height="350" />
              <CardBody className="">
                <Calendar size={18} />
                <span> 06 - Jun - 2022</span>
                <CardTitle className="mb-2 text-black mt-1 fw-bolder" tag="h1">
                  Finding A Physical Activity Presents Many Additional Challenges
                </CardTitle>
                <div className="mt-3 mb-2">
                  <a
                    className="rounded-pill bg-light p-2 text-black fw-bold justify-content-center"
                    href="/"
                  >
                    Read More <ArrowRight size={18} />
                  </a>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default HomeContent;
