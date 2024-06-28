import React, { useState } from 'react';
import { Calendar, User } from 'react-feather';
import { BiCalendarCheck } from 'react-icons/bi';
import { BsCalendarX, BsFillCalendarXFill } from 'react-icons/bs';
import { FaPhoneAlt, FaUser } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { MdError } from 'react-icons/md';
import { RiErrorWarningLine } from 'react-icons/ri';
import { Card, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import EntryFormModal from '../EventEnter/members/EntryFormModal';
import RegisterEvent from '../registrants/RegisterEvent.js';
import { GrMail } from 'react-icons/gr';

function EventViewList(props) {
  const { event, registrantData, refetchRegistrantData } = props;
  // ** State
  const [entryModal, setEntryModal] = useState(false);
  const [registrantType, setRegistrantType] = useState('');
  // ** handlers
  const toggle = () => {
    setEntryModal(!entryModal);
  };

  return (
    <Row>
      <Col md={5}>
        <Card className="p-1">
          <div
            style={{ width: '100%', height: '80px' }}
            className="d-flex flex-row align-items-center"
          >
            <img
              src={event?.eventImage}
              style={{ height: '100%', width: 'auto', flexGrow: '0', borderRadius: '10%' }}
            />

            <h1 style={{ color: 'rgba(0,0,0,.87)', flexGrow: '2' }} className="text-center">
              {event.eventName}
            </h1>
          </div>
          <Row className="mt-2">
            <Col md={3}>
              <p style={{ fontWeight: 'bold', color: '#000' }}>Venue</p>
            </Col>
            <Col md={9}>
              <h5 style={{ marginLeft: '20px' }}>{event?.eventLocation}</h5>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col md={3}>
              <p style={{ fontWeight: 'bold', color: '#000' }}>Address</p>
            </Col>
            <Col md={9}>
              <h5 style={{ marginLeft: '20px' }}>{event?.street}</h5>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={3}>
              <p style={{ fontWeight: 'bold', color: '#000' }}>City</p>
            </Col>
            <Col md={9}>
              <h5 style={{ marginLeft: '20px' }}>{event?.city}</h5>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={3}>
              <p style={{ fontWeight: 'bold', color: '#000' }}>State</p>
            </Col>
            <Col md={9}>
              <h5 style={{ marginLeft: '20px' }}>{event?.state}</h5>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={3}>
              <p style={{ fontWeight: 'bold', color: '#000' }}>Zip</p>
            </Col>
            <Col md={9}>
              <h5 style={{ marginLeft: '20px' }}>{event?.zip}</h5>
            </Col>
          </Row>
          {/* <Row className="mt-2">
            
            <Col md={1}>
              <Calendar size={24} />
            </Col>
            <Col md={11}>
              <h5 style={{ marginLeft: '20px' }}>April 29th, 2023 to April 30th, 2023</h5>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={1}>
              <IoLocationSharp size={24} style={{ color: '#000' }} />
            </Col>
            <Col md={11}>
              <h5 style={{ marginLeft: '20px' }}>5300 Pacific Ave SE, Lacey, Washington, 98503</h5>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={1}>
              <BiCalendarCheck size={24} style={{ color: '#000' }} />
            </Col>
            <Col md={11}>
              <h5 style={{ marginLeft: '20px' }}>5300 Pacific Ave SE, Lacey, Washington, 98503</h5>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={1}>
              <BsCalendarX size={20} style={{ color: '#000' }} />
            </Col>
            <Col md={11}>
              <h5 style={{ marginLeft: '20px' }}>5300 Pacific Ave SE, Lacey, Washington, 98503</h5>
            </Col>
          </Row> */}
        </Card>

        <Card className="p-1">
          <Row className="">
            <Col md={1}>
              <MdError size={36} />
            </Col>
            <Col md={11}>
              <h4 style={{ marginTop: '10px', color: 'rgba(0,0,0,.87)', fontWeight: 'bold' }}>
                GET READY OHIO!
              </h4>
              <p className="mt-2">
                Join us on April 15th at Canfield High School! This is the 1st year with your new
                OSTA Board of Directors since the late passing of Supreme Grand Master Joon P Choi.
              </p>
              <p className="mt-3">
                We are all committed to running the Best State Championship possible.
              </p>
            </Col>
          </Row>
        </Card>

        <Card className="p-4 ">
          <h3 style={{ color: 'rgba(0,0,0,.87)', fontWeight: 'bold' }}>Additional Information</h3>
          <Row className="mt-2">
            <Col md={2}>
              <p style={{ fontWeight: 'bold', color: '#000' }}>
                <IoLocationSharp size={18} />
              </p>
            </Col>
            <Col md={10}>
              <h5 style={{ marginLeft: '20px' }}>{event?.hostName}</h5>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={2}>
              <p style={{ fontWeight: 'bold', color: '#000' }}>
                <GrMail size={18} />
              </p>
            </Col>
            <Col md={10}>
              <h5 style={{ marginLeft: '20px' }}>{event?.hostEmail}</h5>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={2}>
              <p style={{ fontWeight: 'bold', color: '#000' }}>
                <FaPhoneAlt size={18} />
              </p>
            </Col>
            <Col md={10}>
              <h5 style={{ marginLeft: '20px' }}>{event?.hostMobileNumber}</h5>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={2}>
              <p style={{ fontWeight: 'bold', color: '#000' }}>
                <FaPhoneAlt size={18} />
              </p>
            </Col>
            <Col md={10}>
              <h5 style={{ marginLeft: '20px' }}>{event?.hostAlternateNumber}</h5>
            </Col>
          </Row>
          {/* <Row className="mt-1">
            <Col md={4}>
              <h5 style={{ marginTop: '10px' }}>Organizer</h5>
            </Col>
            <Col md={8}>
              <h5 style={{ marginTop: '10px' }}>Justin Taylor</h5>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col md={4}>
              <h5 style={{ marginTop: '10px' }}>Organizer Email</h5>
            </Col>
            <Col md={8}>
              <h5 style={{ marginTop: '10px' }}>jrtkdschool@yahoo.com</h5>
            </Col>
          </Row> */}
        </Card>
      </Col>
      <Col md={7}>
        <Card className="p-2">
          <RegisterEvent
            registrantData={registrantData}
            refetchRegistrantData={refetchRegistrantData}
            event={event}
            setRegistrantType={setRegistrantType}
            toggle={toggle}
          />
        </Card>
      </Col>
      <EntryFormModal
        entryModal={entryModal}
        registrantType={registrantType}
        setEntryModal={setEntryModal}
        toggleEntryModal={toggle}
        event={event}
        refetchRegistrantData={refetchRegistrantData}
      />
    </Row>
  );
}

export default EventViewList;
