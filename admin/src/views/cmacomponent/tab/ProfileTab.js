import React from 'react';
import { Badge, Card, CardBody, Col, Row } from 'reactstrap';
import profilepic from '../../../assets/images/profile/user-uploads/user-13.jpg';
import '../../../assets/styles/user-detail.scss';
import { FaMale } from 'react-icons/fa';
import { AiFillCalendar } from 'react-icons/ai';
import { FaMapMarkerAlt } from 'react-icons/fa';

function ProfileTab() {
  return (
    <div>
      <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <div className="d-flex">
                <img
                  src={profilepic}
                  alt=""
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '100%',
                    marginRight: '20px'
                  }}
                />
                <h4
                  style={{ fontSize: '22px', color: '#000', fontWeight: '700', marginTop: '20px' }}
                >
                  Lorem Ipsum
                  <p style={{ fontSize: '14px', color: '#cccrgb(51 49 49)', fontWeight: '300' }}>
                    admin@demo.com
                  </p>
                  <button className="btn btn-primary">Edit Profile</button>
                </h4>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md="12">
          <Card>
            <CardBody>
              <div className="">
                <h4>Information</h4>
                <div className="info-1">
                  <h5
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      marginTop: '20px',
                      marginBottom: '15px'
                    }}
                  >
                    General Information
                  </h5>
                  <ul className="mt-10" style={{ listStyle: 'none', padding: '0px' }}>
                    <li style={{ lineHeight: '30px' }}>
                      <FaMale size="20px" style={{ marginRight: '10px' }} />
                      Male
                    </li>
                    <li style={{ lineHeight: '30px' }}>
                      <AiFillCalendar size="20px" style={{ marginRight: '10px' }} />
                      Jul 27th 1996
                    </li>
                    <li style={{ lineHeight: '30px' }}>
                      <FaMapMarkerAlt size="20px" style={{ marginRight: '10px' }} />
                      Lorem Lorem Lorem
                    </li>
                  </ul>
                </div>
                <hr></hr>
                <div className="info-1">
                  <h5
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      marginTop: '10px',
                      marginBottom: '15px'
                    }}
                  >
                    Additional Information
                  </h5>
                  <ul className="mt-10" style={{ listStyle: 'none', padding: '0px' }}>
                    <li style={{ lineHeight: '30px' }}>
                      Individual Membership{' '}
                      <span>
                        <Badge>Invalid</Badge>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProfileTab;
