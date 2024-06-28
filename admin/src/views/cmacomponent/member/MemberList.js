import React, { Fragment } from 'react';
import { PlusCircle } from 'react-feather';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import profilepic from '../../../assets/images/profile/user-uploads/user-13.jpg';
// import '../../../assets/styles/user-detail.scss';
import '../../../assets/styles/user-detail.scss';
import BreadCrumbsPage from '@components/breadcrumbs';
export default function MemberList() {
  return (
    <Fragment>
      <BreadCrumbsPage
        breadCrumbTitle="Members"
        breadCrumbParent="Manage Members"
        breadCrumbActive="Members"
      />
      <div>
        <Row>
          <Col lg="12" md="12">
            <div className="">
              <Row>
                <Col md="3">
                  <div className="crate-box mt-1" style={{ height: '250px', marginBottom: '15px' }}>
                    <a href="#" outline>
                      <PlusCircle size={40} className="mt-3" />
                      <p>ADD New</p>
                    </a>
                  </div>
                </Col>
                <Col md="3">
                  <Card style={{ borderRadius: '20px' }}>
                    <a href="/member/profile">
                      <div
                        className="crate-box box-shadow "
                        style={{ height: '250px', marginBottom: '15px' }}
                      >
                        <img src={profilepic} alt="" className="round-img" />
                        <h5>Lorem</h5>
                        <p style={{ fontSize: '14', fontWeight: '300' }}>Female</p>
                        <hr style={{ marginBottom: '1px' }}></hr>
                        <p style={{ fontSize: '12px', marginBottom: '2px' }}>Membership Number</p>
                        <p style={{ fontSize: '12px', marginBottom: '2px' }}>-</p>
                      </div>
                    </a>
                  </Card>
                </Col>
                <Col md="3">
                  <Card style={{ borderRadius: '20px' }}>
                    <a href="/member/profile">
                      <div
                        className="crate-box box-shadow "
                        style={{ height: '250px', marginBottom: '15px' }}
                      >
                        <img src={profilepic} alt="" className="round-img" />
                        <h5>Lorem</h5>
                        <p style={{ fontSize: '14', fontWeight: '300' }}>Female</p>
                        <hr style={{ marginBottom: '1px' }}></hr>
                        <p style={{ fontSize: '12px', marginBottom: '2px' }}>Membership Number</p>
                        <p style={{ fontSize: '12px', marginBottom: '2px' }}>-</p>
                      </div>
                    </a>
                  </Card>
                </Col>
                <Col md="3">
                  <Card style={{ borderRadius: '20px' }}>
                    <a href="/member/profile">
                      <div
                        className="crate-box box-shadow "
                        style={{ height: '250px', marginBottom: '15px' }}
                      >
                        <img src={profilepic} alt="" className="round-img" />
                        <h5>Lorem</h5>
                        <p style={{ fontSize: '14', fontWeight: '300' }}>Female</p>
                        <hr style={{ marginBottom: '1px' }}></hr>
                        <p style={{ fontSize: '12px', marginBottom: '2px' }}>Membership Number</p>
                        <p style={{ fontSize: '12px', marginBottom: '2px' }}>-</p>
                      </div>
                    </a>
                  </Card>
                </Col>
                <Col md="3">
                  <Card style={{ borderRadius: '20px' }}>
                    <a href="/member/profile">
                      <div
                        className="crate-box box-shadow "
                        style={{ height: '250px', marginBottom: '15px' }}
                      >
                        <img src={profilepic} alt="" className="round-img" />
                        <h5>Lorem</h5>
                        <p style={{ fontSize: '14', fontWeight: '300' }}>Female</p>
                        <hr style={{ marginBottom: '1px' }}></hr>
                        <p style={{ fontSize: '12px', marginBottom: '2px' }}>Membership Number</p>
                        <p style={{ fontSize: '12px', marginBottom: '2px' }}>-</p>
                      </div>
                    </a>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}
