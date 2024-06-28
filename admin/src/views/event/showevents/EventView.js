import React, { useContext, useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaPhoneAlt } from 'react-icons/fa';
import { Badge, Button, Card, Col, Collapse, Label, Row } from 'reactstrap';
import Select from 'react-select';
import Avatar from '@components/avatar';

import { Link } from 'react-router-dom';
import { GrLocation, GrMail } from 'react-icons/gr';
import { IoLocationSharp } from 'react-icons/io5';

import { eventPointTypeDefaultData, medalCountTypeDefaultData } from '../../../utility/Utils';
import { useSelector } from 'react-redux';

function EventView({ toggle, eventData, isOpen }) {
  const eventComment = ['1st', '2nd', '3rd', '4th', '5th'];
  const [eventPoints, setEventPoints] = useState([]);
  const eventPointTypeStore = useSelector((state) => state.eventMain.eventPointType);
  useEffect(() => {
    if (eventPointTypeStore)
      setEventPoints(eventPointTypeStore.data.filter((dataItem) => dataItem.points.length > 0));
    else setEventPoints(eventPointTypeDefaultData);
  }, [eventPointTypeStore]);
  return (
    <div style={{ marginLeft: '10px', marginRight: '10px' }}>
      {eventData?.map((items, index) => (
        <Row key={index}>
          <Card className="p-1 border mb-0">
            <Row>
              <Col md={8} className="event-wrapper1" onClick={() => toggle(index)}>
                <div className="d-flex flex-row">
                  <div
                    style={{ width: '130px' }}
                    className="d-flex flex-row justify-content-center"
                  >
                    <img
                      alt={items?.eventImage}
                      src={items?.eventImage}
                      style={{ height: '49px', width: 'auto', borderRadius: '10%' }}
                      className="event-img"
                    />
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <h5 style={{ fontWeight: 'bolder', color: '#000' }}>{items?.eventName}</h5>
                    <span>
                      {new Date(items?.startTime).toLocaleDateString()} -{' '}
                      {new Date(items?.endTime).toLocaleDateString()} - {items?.city},{' '}
                      {items?.state}
                    </span>
                  </div>
                </div>
              </Col>
              <Col md={4} className="event-wrapper">
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  className="event-list-button"
                >
                  <Link to={{ pathname: '/event-table-view' }}>
                    <button className="btn">Entry List</button>
                  </Link>
                  <Link to={{ pathname: `/event-view-list/${items._id}` }}>
                    <button className="btn" style={{ backgroundColor: '#FF8C00	', color: '#fff' }}>
                      Manage
                    </button>
                  </Link>
                  {new Date(items?.endRegistrationDate) < new Date() ? (
                    <Button color="primary" disabled={true}>
                      Enter Now
                    </Button>
                  ) : (
                    <Link to={`/eventsmanagement/evententer/${items._id}`} className="text-white">
                      <Button color="primary">Enter Now</Button>
                    </Link>
                  )}
                  <div onClick={() => toggle(index)} style={{ cursor: 'pointer' }}>
                    {isOpen[index] ? (
                      <FaChevronUp size={18} style={{ color: 'lightgray' }} />
                    ) : (
                      <FaChevronDown size={18} color="primary" />
                    )}
                  </div>
                </div>
              </Col>
            </Row>
            <Collapse isOpen={isOpen[index]}>
              <Card className="m-4">
                <Row>
                  <Col md={7}>
                    <Row className="mt-1">
                      <Col md={6}>
                        <h5>Location</h5>
                        <Row className="mt-1">
                          <Col md={4}>
                            <p style={{ fontWeight: 'bold', color: '#000' }}>Venue</p>
                          </Col>
                          <Col md={8}>
                            <h5 style={{ marginLeft: '20px' }}>{items?.eventLocation}</h5>
                          </Col>
                        </Row>

                        <Row className="mt-1">
                          <Col md={4}>
                            <p style={{ fontWeight: 'bold', color: '#000' }}>Address</p>
                          </Col>
                          <Col md={8}>
                            <h5 style={{ marginLeft: '20px' }}>{items?.street}</h5>
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col md={4}>
                            <p style={{ fontWeight: 'bold', color: '#000' }}>City</p>
                          </Col>
                          <Col md={8}>
                            <h5 style={{ marginLeft: '20px' }}>{items?.city}</h5>
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col md={4}>
                            <p style={{ fontWeight: 'bold', color: '#000' }}>State</p>
                          </Col>
                          <Col md={8}>
                            <h5 style={{ marginLeft: '20px' }}>{items?.state}</h5>
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col md={4}>
                            <p style={{ fontWeight: 'bold', color: '#000' }}>Zip</p>
                          </Col>
                          <Col md={8}>
                            <h5 style={{ marginLeft: '20px' }}>{items?.zip}</h5>
                          </Col>
                        </Row>
                      </Col>
                      <Col md={6}>
                        <h5>Director Details</h5>
                        <Row className="mt-1">
                          <Col md={2}>
                            <p style={{ fontWeight: 'bold', color: '#000' }}>
                              <IoLocationSharp size={18} />
                            </p>
                          </Col>
                          <Col md={10}>
                            <h5 style={{ marginLeft: '20px' }}>{items?.hostName}</h5>
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col md={2}>
                            <p style={{ fontWeight: 'bold', color: '#000' }}>
                              <GrMail size={18} />
                            </p>
                          </Col>
                          <Col md={10}>
                            <h5 style={{ marginLeft: '20px' }}>{items?.hostEmail}</h5>
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col md={2}>
                            <p style={{ fontWeight: 'bold', color: '#000' }}>
                              <FaPhoneAlt size={18} />
                            </p>
                          </Col>
                          <Col md={10}>
                            <h5 style={{ marginLeft: '20px' }}>{items?.hostMobileNumber}</h5>
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col md={2}>
                            <p style={{ fontWeight: 'bold', color: '#000' }}>
                              <FaPhoneAlt size={18} />
                            </p>
                          </Col>
                          <Col md={10}>
                            <h5 style={{ marginLeft: '20px' }}>{items?.hostAlternateNumber}</h5>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row className="mt-1">
                      <Col md={7}>
                        <h5 className="mt-3">Event Registration Fee</h5>
                        {items?.isFree && (
                          <p style={{ fontWeight: 'bold', color: '#000' }}>
                            The Event's Registration is Free
                          </p>
                        )}
                        {items?.isFree === false && (
                          <>
                            <Row className="mt-1">
                              <Col md={6}>
                                <p style={{ fontWeight: 'bold', color: '#000' }}>Event</p>
                              </Col>
                              <Col md={items?.lateEventFee?.length > 0 ? 3 : 6}>
                                <p style={{ fontWeight: 'bold', color: '#000' }}>Normal Reg</p>
                              </Col>
                              {items?.lateEventFee?.length > 0 && (
                                <Col md={3}>
                                  <p style={{ fontWeight: 'bold', color: '#000' }}>Late Reg</p>
                                </Col>
                              )}
                            </Row>
                            <div className="bg-dark" style={{ width: '100%', height: '2px' }}></div>
                          </>
                        )}
                        {items?.isFree === false &&
                          items?.eventFee.length > 0 &&
                          items.eventFee.map((eventFeeItem, index) => {
                            if (index < items.eventFee.length)
                              return (
                                <Row className="mt-1">
                                  <Col md={6}>
                                    <p style={{ fontWeight: 'bold', color: '#000' }}>
                                      {items.eventFee.length === 1 ? '' : eventComment[index]} Event
                                      Fee
                                    </p>
                                  </Col>
                                  <Col md={items?.lateEventFee?.length > 0 ? 3 : 6}>
                                    <p style={{ marginLeft: '20px' }}>{'$' + eventFeeItem}</p>
                                  </Col>
                                  {items?.lateEventFee?.length > 0 && (
                                    <Col md={3}>
                                      <p style={{ marginLeft: '20px' }}>
                                        {'$' + items?.lateEventFee[index]}
                                      </p>
                                    </Col>
                                  )}
                                </Row>
                              );
                          })}
                      </Col>
                      <Col md={5}>
                        <h5 className="mt-3">Event Date</h5>
                        <Row className="mt-2">
                          <Col md={4}>
                            <p style={{ fontWeight: 'bold', color: '#000' }}>Start Date</p>
                          </Col>
                          <Col md={8}>
                            <p style={{ marginLeft: '20px' }}>
                              {new Date(items?.startTime).toLocaleString()}
                            </p>
                          </Col>
                        </Row>
                        <Row className="mt-1">
                          <Col md={4}>
                            <p style={{ fontWeight: 'bold', color: '#000' }}>End Date</p>
                          </Col>
                          <Col md={8}>
                            <p style={{ marginLeft: '20px' }}>
                              {new Date(items?.endTime).toLocaleString()}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <h5 className="mt-3">ADDITIONAL INFORMATION</h5>
                    <Row className="mt-1">
                      <Col md={4}>
                        <p style={{ fontWeight: 'bold', color: '#000' }}>Status</p>
                      </Col>
                      <Col md={6}>
                        {new Date(items?.endTime) > new Date() ? (
                          <Badge color="success" style={{ marginLeft: '20px' }}>
                            Active
                          </Badge>
                        ) : (
                          <Badge color="danger" style={{ marginLeft: '20px' }}>
                            Past Event
                          </Badge>
                        )}
                      </Col>
                    </Row>
                    <Row className="mt-1">
                      <Col md={4}>
                        <p style={{ fontWeight: 'bold', color: '#000' }}>Registration Online</p>
                      </Col>
                      <Col md={6}>
                        <Badge color="success" style={{ marginLeft: '20px' }}>
                          Yes
                        </Badge>
                      </Col>
                    </Row>
                    {/* <Row className="mt-1">
                      <Col md={4}>
                        <p style={{ fontWeight: 'bold', color: '#000' }}>Medal Count Type</p>
                      </Col>
                      <Col md={6}>
                        <Badge
                          color={
                            items?.medalCountType === 'standard'
                              ? 'success'
                              : items?.medalCountType === 'friendly'
                              ? 'warning'
                              : 'primary'
                          }
                          style={{ marginLeft: '20px' }}
                        >
                          {
                            medalCountTypeDefaultData.filter(
                              (medalItem) => medalItem.type === items?.medalCountType
                            )[0].name
                          }
                        </Badge>
                      </Col>
                    </Row> */}
                    <Row className="mt-1">
                      <Col md={4}>
                        <p style={{ fontWeight: 'bold', color: '#000' }}>Point Type</p>
                      </Col>
                      <Col md={6}>
                        <Badge
                          color={
                            items?.pointType === 'Local'
                              ? 'success'
                              : items?.pointType === 'Regionals'
                              ? 'info'
                              : items?.pointType === 'Nationals'
                              ? 'danger'
                              : items?.pointType === 'Worlds'
                              ? 'warning'
                              : 'primary'
                          }
                          style={{ marginLeft: '20px' }}
                        >
                          {
                            eventPoints?.filter(
                              (pointItem) => pointItem.name === items?.pointType
                            )[0]?.name
                          }
                        </Badge>
                      </Col>
                    </Row>
                    <Row className="mt-1">
                      <Col md={4}>
                        <p style={{ fontWeight: 'bold', color: '#000' }}>Registration Starts</p>
                      </Col>
                      <Col md={6}>
                        <p style={{ marginLeft: '20px' }}>
                          {new Date(items?.earlyRegistrationEndDate).toLocaleString()}
                        </p>
                      </Col>
                    </Row>
                    <Row className="mt-1">
                      <Col md={4}>
                        <p style={{ fontWeight: 'bold', color: '#000' }}>Late Registration Ends</p>
                      </Col>
                      <Col md={6}>
                        <p style={{ marginLeft: '20px' }}>
                          {new Date(items?.endRegistrationDate).toLocaleString()}
                        </p>
                      </Col>
                    </Row>
                    <Row className="mt-1">
                      <Col md={4}>
                        <p style={{ fontWeight: 'bold', color: '#000' }}>Registration Ends</p>
                      </Col>
                      <Col md={6}>
                        <p style={{ marginLeft: '20px' }}>
                          {new Date(items?.endRegistrationDate).toLocaleString()}
                        </p>
                      </Col>
                    </Row>
                    <Row className="mt-1">
                      <Col md={4}>
                        <p style={{ fontWeight: 'bold', color: '#000' }}>Information</p>
                      </Col>
                      <Col md={8}>
                        <p style={{ marginLeft: '20px' }}>{items?.eventWaive}</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={1} />
                  <Col md={4} className="d-flex flex-column">
                    <div
                      className="d-flex flex-column align-items-center"
                      style={{ width: '100%', flexGrow: '0' }}
                    >
                      <img src={items?.eventImage} style={{ width: '100%', height: 'auto' }} />
                    </div>
                    <h5 className="mt-3">LOCATION</h5>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29195.74079167713!2d78.73111716149656!3d23.837523965710304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3978d14a2cf591af%3A0xf446eaa2b5281370!2sSagar%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1681053566934!5m2!1sen!2sin"
                      // src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
                      //   items?.address
                      // )}`}
                      style={{ width: '100%', height: 'auto', flexGrow: '2' }}
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </Col>
                </Row>
              </Card>
            </Collapse>
          </Card>
        </Row>
      ))}
    </div>
  );
}

export default EventView;
