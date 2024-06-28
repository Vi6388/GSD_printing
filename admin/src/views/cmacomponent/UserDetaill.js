import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, PlusCircle } from 'react-feather';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import Select from 'react-select';
import { selectThemeColors } from '@utils';
import CustomSlide from './CustomSlide';
import AddDeleteTableRows from './table/AddDeleteTableRows';
import profilepic from '../../assets/images/profile/user-uploads/user-13.jpg';
import '../../assets/styles/user-detail.scss';
import '../../assets/styles/user-detail.scss';
import { AddNewMember } from './AddNewMember';
import { fetchMemberdata } from '../../requests/member/GetMembers';
import { Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { getEvents } from '../calendar/event/store';
import { getUserData } from '../../auth/utils';
import { fetchEventAction } from '../event/store/actions';
import moment from 'moment';

function UserDetaill() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [stepperModal, setStepperModal] = useState(false);
  const [existingaddModal, setExistingaddModal] = useState(false);
  const [toggleone, setToggleOne] = useState(true);
  const [toggletwo, setToggleTwo] = useState(true);
  const { userData } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(0);
  const { data } = fetchMemberdata();
  const itemsPerPage = 5;

  const displayedData = data?.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  useEffect(() => {
    dispatch(getEvents(getUserData()?.id));
  }, []);

  useEffect(() => {
    setStepperModal(location?.state?.someData);
  }, [location?.state?.someData]);
  const handleChange = () => {
    setToggleOne(false);
  };

  const addressMethods = [
    { value: 'individual ', label: 'individual ' },
    { value: 'group', label: 'Group' }
  ];
  useEffect(() => {
    dispatch(fetchEventAction('all'));
  }, []);

  const store = useSelector((state) => state?.eventMain.eventListingData);
  const futureEvents = store?.filter(
    (event) => new Date(parseInt(event.endDate)).toLocaleDateString() > new Date()
  );
  const lastFourEvents = futureEvents.slice(-4);

  const currentDate = new Date().getTime();
  const openEvents = store.filter(
    (event) => currentDate >= event.startDate && currentDate <= event.endDate
  );
  return (
    <div>
      <div className="detail-box mt-100">
        <div className="">
          <Row>
            <Col lg="6" md="6">
              <div className="user-profile">
                <Card style={{ borderRadius: '20px', padding: '20px' }}>
                  <CardBody>
                    <div className="d-flex">
                      <img
                        src={userData?.avatar ? userData?.avatar : profilepic}
                        alt=""
                        className="round-img"
                      />
                      <h4>
                        {userData?.fullName}
                        <p style={{ fontSize: '14px', color: '#000', fontWeight: 300 }}>
                          {userData?.email}
                        </p>
                      </h4>
                    </div>
                    <Link to={'/pages/account-settings'}>
                      <button className="btn btn-primary" style={{ width: '100%' }}>
                        View Profile
                      </button>
                    </Link>
                  </CardBody>
                </Card>
              </div>

              <div className="user-profile mt-10">
                <Card style={{ borderRadius: '20px', padding: '20px' }}>
                  <CardHeader style={{ fontSize: '20px', color: '#000', fontWeight: '600' }}>
                    My Events, Development
                  </CardHeader>
                  <CardBody>
                    {openEvents.slice(-2)?.length === 0 ? (
                      <p className="d-flex justify-content-center">No Events</p>
                    ) : (
                      openEvents.slice(-2)?.map((item) => (
                        <div style={{ borderBottom: '1px solid', marginBottom: '20px' }}>
                          <Row>
                            <Col md="7">
                              <div className="d-flex ">
                                <Calendar size="25" className="left-p" />
                                <h6 className="">
                                  {item?.eventName}
                                  <p style={{ fontSize: '14px', color: '#000', fontWeight: 300 }}>
                                    {moment.unix(item?.endDate / 1000).format('Do MMMM, YYYY')}
                                  </p>
                                </h6>
                              </div>
                            </Col>
                            <Col md="5">
                              <div className="btn-bx">
                                <button className="btn btn-primary sm">Upload</button>
                                <button className="btn btn-secondary sm">View</button>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      ))
                    )}
                  </CardBody>
                </Card>
              </div>

              <div className="user-profile mt-10">
                <Card style={{ borderRadius: '20px', padding: '20px' }}>
                  <CustomSlide />
                </Card>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="">
                <div className="d-flex justify-content-between">
                  <h4>My Members</h4>
                  <ReactPaginate
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    pageCount={Math.ceil(data?.length / itemsPerPage)}
                    onPageChange={handlePageClick}
                    forcePage={currentPage}
                    activeClassName={'active'}
                    pageClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    nextClassName={'page-item next'}
                    previousClassName={'page-item prev'}
                    previousLinkClassName={'page-link'}
                    pageLinkClassName={'page-link'}
                    containerClassName={'pagination react-paginate '}
                    initialPage={0}
                  />
                </div>
                <Row>
                  <Col md="4">
                    <div className="crate-box mt-1">
                      <a href="#" outline onClick={() => setStepperModal(!stepperModal)}>
                        <PlusCircle size={40} />
                        <p>ADD New</p>
                      </a>
                    </div>
                  </Col>

                  {displayedData?.map((member) => {
                    return (
                      <Col md="4">
                        <Link to={`/other/membership/view/${member._id}`}>
                          <Card style={{ borderRadius: '20px' }}>
                            <div className="crate-box box-shadow">
                              <img
                                src={member?.profilePhoto ? member?.profilePhoto : profilepic}
                                alt=""
                                className="round-img"
                              />
                              <h5>
                                {member?.firstName} {member?.middleName} {member?.lastName}
                              </h5>
                              <p style={{ fontSize: '14', fontWeight: '300' }}>{member?.gender}</p>
                              <hr style={{ marginBottom: '1px' }}></hr>
                              <p style={{ fontSize: '12px', marginBottom: '2px' }}>
                                {member?.contact?.primary}
                              </p>
                              {/* <p style={{ fontSize: '12px', marginBottom: '2px' }}>-</p> */}
                            </div>
                          </Card>
                        </Link>
                      </Col>
                    );
                  })}
                  {/* <Col md="4">
                    <Card style={{ borderRadius: '20px' }}>
                      <div className="crate-box box-shadow">
                        <img src={profilepic} alt="" className="round-img" />
                        <h5>Lorem</h5>
                        <p style={{ fontSize: '14', fontWeight: '300' }}>Male</p>
                        <hr></hr>
                      </div>
                    </Card>
                  </Col> */}
                </Row>
              </div>

              <div className="event-bx">
                <Card style={{ borderRadius: '20px', padding: '20px' }}>
                  <CardBody>
                    <h4>Upcoming Events, Development</h4>
                    {lastFourEvents.length === 0 ? (
                      <p className="d-flex justify-content-center pt-2">No Events</p>
                    ) : (
                      <>
                        <div className="list-main">
                          {lastFourEvents?.map((item) => (
                            <div class="week_day ">
                              <div className="right_side_time_table">
                                <div className="black_doat_circle"></div>
                                <div className="sub-list">
                                  <Row>
                                    <>
                                      <Col md="7">
                                        <p style={{ fontSize: '14px', fontWeight: '300' }}>
                                          {item?.eventName}
                                        </p>
                                      </Col>
                                      <Col md="3">
                                        <p style={{ fontSize: '14px', fontWeight: '300' }}>
                                          {moment
                                            .unix(item?.startDate / 1000)
                                            .format('Do MMMM, YYYY')}{' '}
                                          to{' '}
                                          {moment
                                            .unix(item?.endDate / 1000)
                                            .format('Do MMMM, YYYY')}
                                        </p>
                                      </Col>
                                      <Col md="2">
                                        <div className="btn-bx">
                                          <button className="btn btn-primary sm">View</button>
                                        </div>
                                      </Col>
                                    </>
                                  </Row>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          <Button className="btn btn-primary mx-1" style={{ width: '100%' }}>
                            View All
                          </Button>
                        </div>
                      </>
                    )}
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <AddNewMember setStepperModal={setStepperModal} stepperModal={stepperModal} />
      <Modal
        isOpen={existingaddModal}
        toggle={() => {
          setStepperModal(!existingaddModal);
        }}
        centered
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          toggle={() => {
            setToggleOne(true);

            setExistingaddModal(!existingaddModal);
          }}
          className="he"
        >
          Request Access To Members:
        </ModalHeader>
        <ModalBody className="p-5">
          {toggleone === true ? (
            <>
              {toggletwo === true ? (
                <>
                  <div>
                    <Row>
                      <h5 className="mb-2">
                        Please select whether you would like to add Members manually or via a CSV
                        upload.
                      </h5>
                      <Col md="6">
                        <div className="add-mem">
                          <a href="#" onClick={handleChange}>
                            Add Manually
                          </a>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="add-mem">
                          <a onClick={() => setToggleTwo(false)} href="#">
                            Upload CSV
                          </a>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </>
              ) : (
                <>
                  <Row>
                    <h5 className="mb-2">
                      Please select the type of membership held by the member whose account you wish
                      to access.
                    </h5>
                    <Col md="8">
                      <Row>
                        <Col md="4">Membership Type</Col>
                        <Col md="8">
                          <Select
                            theme={selectThemeColors}
                            className="react-select"
                            classNamePrefix="select"
                            defaultValue={addressMethods[1]}
                            options={addressMethods}
                            isClearable={false}
                            // onChange={(e) => setAddressMethod(e.value)}
                          />
                        </Col>
                        <div className="mb-5 mt-2">
                          <Row>
                            <Col md="4">Upload File</Col>
                            <Col md="8">
                              <div className="">
                                <Input type="file" />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Row>
                    </Col>

                    <Col md="6">
                      <button className="btn btn-primary">Submit</button>
                    </Col>
                    <Col md="6" style={{ textAlign: 'right' }}>
                      <button className="btn btn-primary" onClick={() => setToggleTwo(true)}>
                        Back
                      </button>
                    </Col>
                  </Row>
                </>
              )}
            </>
          ) : (
            <>
              <div>
                <Col md="12">
                  <h5 className="mb-2">
                    Please select the type of membership held by the member whose account you wish
                    to access.
                  </h5>
                </Col>
                <Row>
                  <Col md="8">
                    <Row>
                      <Col md="4">Membership Type</Col>
                      <Col md="8">
                        <Select
                          theme={selectThemeColors}
                          className="react-select"
                          classNamePrefix="select"
                          defaultValue={addressMethods[1]}
                          options={addressMethods}
                          isClearable={false}
                          // onChange={(e) => setAddressMethod(e.value)}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Col md="12">
                  <AddDeleteTableRows />
                </Col>
              </div>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={() => setUserAddModal(!useraddModal)}>
            Accept
          </Button> */}
        </ModalFooter>
      </Modal>
      {/* modal close Existing Member */}
    </div>
  );
}

export default UserDetaill;
