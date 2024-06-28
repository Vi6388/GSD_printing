// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ViewMembersMain from '../../../views/event/ViewMembers';
import EventSetting from '../../../views/event/EventSetting';
import EventStats from '../../../views/event/EventStats/index';
import ManagePayments from '../../../views/event/ManagePayments';
import BracketingMain from '../../../views/event/Bracketing';
import OptionsMain from '../../../views/event/Options';
import Cost from '../../../views/event/Cost';

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

// ** Icons Imports
import { CheckCircle, CheckSquare } from 'react-feather';

// ** Components
import CardEvent from './CardEvent';
import GuestTracker from './guests/GuestTracker';
import CardInvite from './CardInvite';
import AttendeesTabs from './AttendeesTabs';

// ** Reactstrap Imports
import { Row, Col, Card, Input, Button, Label } from 'reactstrap';

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors';
// ** Third Party Components
import Flatpickr from 'react-flatpickr';
import '@styles/react/libs/flatpickr/flatpickr.scss';

// ** Redux Action Import
import { getEventInfo } from './store';
//images
import eventInfoImage from '../../../../src/assets/images/events/mycma-event.jpeg';
// src/assets/images/events/mycma-event.jpeg
// ** Styles
import '@styles/react/libs/charts/apex-charts.scss';
import '@styles/base/pages/dashboard-ecommerce.scss';
// import {
//   fetchEventAction,
//   deleteEventAction
//  } from '../../../../client/src/views/event/store/actions';
import {
  fetchEventAction,
  deleteEventAction,
  fetchParticularEventAction
} from '../../../../src/views/event/store/actions';
import DataTable from 'react-data-table-component';
import { ChevronDown, ChevronsDown } from 'react-feather';
import { BiChevronsDown } from 'react-icons/bi';
import { GrLocation } from 'react-icons/gr';

const EventDetails = () => {
  // ** Context
  const { colors } = useContext(ThemeColors);
  const { eventId } = useParams();
  // ** Store vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.eventMain?.eventListingDataById);
  const [startPicker, setStartPicker] = useState(new Date(Number(store?.startDate)));
  const [endPicker, setEndPicker] = useState(new Date(Number(store?.endDate)));
  const location = useLocation();
  const data = new URLSearchParams(location.search).get('data');
  console.log('data', data);

  console.log('store', store);
  const eventData = [
    {
      event: store?.eventName,
      eventName: 'f',
      startDate: '1678300200000',
      endDate: '1678300200000',
      startTime: '334',
      endTime: '334',
      eventLocation: 'd',
      eventDirectorName: 'f',
      directorEmail: 'f@gmail.com',
      directorContactNo: '4',
      eventType: 'tournament',
      endRigestrationDate: '12345',
      eventImage:
        'https://storage.googleapis.com/mymember-storage/my-manager/377d031f-d0d1-4603-b556-cd435983f6be-WhatsApp Image 2023-02-15 at 11.02.28 AM (1).jpeg',
      userId: '63ef13bf8c8161f81d364856',
      createdAt: '2023-03-09T12:21:18.232Z',
      updatedAt: '2023-03-09T12:21:18.232Z',
      __v: 0
    }
  ];
  const columns = [
    // {
    //   sortable: true,
    //   // minWidth: '30px',
    //   name: 'Stripe Image',
    //   selector: (row) => row.title,
    //   cell: (row) => {
    //     return (
    //       <div className="d-flex justify-content-left align-items-center">
    //         <div className="avatar-wrapper">
    //           <Avatar
    //             className="mx-1"
    //             img={row.img}
    //             alt={row.title}
    //             imgWidth="32"
    //           />
    //         </div>
    //       </div>
    //     )
    //   }
    // },
    {
      name: 'Event ',
      // minWidth: '150px',
      sortable: (row) => console.log(row),
      cell: (row) => (
        // console.log(row)
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column">
            <span className="">{row.event}</span>
          </div>
        </div>
      )
    },

    {
      name: 'Registration Fee',
      // minWidth: '200px',
      sortable: (row) => row.eventName,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column">
            <span className="">30$</span>
          </div>
        </div>
      )
    }
  ];
  const options = {
    dateFormat: 'h:i K', //change format also
    enableTime: true,
    weekNumbers: true,
    // noCalendar: true,
    altInput: true,
    // altFormat: 'F j, Y - h:i ',
    time_24hr: false
  };
  useEffect(() => {
    // dispatch(getEventInfo(eventId));
    dispatch(fetchParticularEventAction(data));
  }, []);

  const [active, setActive] = useState('1');

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    // <>
    //   <Row className="match-height">
    //     <Row className="mb-1">
    //       <Col sm="12">
    //         <div className="bg-info   p-1  text-center">My manager Event</div>
    //       </Col>
    //     </Row>
    //     <Row className="match-height">
    //       <Col sm="4">
    //         <div className="d-flex justify-content-center">
    //           <img src={store?.eventImage} height="300" width={300}></img>
    //         </div>
    //         <div></div>
    //         {/* <CardCongratulations /> */}
    //       </Col>
    //       <Col sm="8">
    //         {/* <Card> */}
    //         <div className="bg-primary  p-1 text-center">Event Name</div>
    //         <Row>
    //           <Col sm="6">
    //             <div className="mt-1">
    //               <h3> Location</h3>
    //               <ul>
    //                 <li>Coffee</li>
    //                 <li>Tea</li>
    //                 <li>Milk</li>
    //               </ul>
    //             </div>
    //           </Col>
    //           <Col sm="6">
    //             <div className="mt-1">
    //               <h3> Director Detail</h3>
    //               <ul>
    //                 <li>Coffee</li>
    //                 <li>Tea</li>
    //                 <li>Milk</li>
    //               </ul>
    //             </div>
    //           </Col>
    //         </Row>

    //         {/* <h2>suryasen</h2> */}
    //         {/* <SubscribersGained kFormatter={kFormatter} /> */}
    //       </Col>
    //       {/* <Col lg='3' sm='6'>
    //       <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} />
    //     </Col> */}
    //     </Row>
    //     {/* <Col lg="4" md="6" xs="12">
    //       <CardEvent
    //         eventInfo={{
    //           title: store?.eventName,
    //           start: store?.startDate,
    //           end: store?.end,
    //           eventLocation: store?.eventLocation,
    //           // eventStreet: store?.eventStreet,
    //           eventCity: store?.eventCity,
    //           // eventState: store?.eventState,
    //           url: store?.eventImage ? store?.eventImage : ''
    //         }}
    //       />
    //     </Col>
    //     <Col lg="4" md="6" xs="12">
    //       <GuestTracker
    //         primary={colors.primary.main}
    //         danger={colors.danger.main}
    //         data={eventInfo}
    //       />
    //     </Col>
    //     <Col lg="4" md="6" xs="12">
    //       <CardInvite
    //         eventInfo={{
    //           url: eventInfo.eventBanner ? eventInfo.eventBanner : '',
    //           title: eventInfo.title
    //         }}
    //       />
    //     </Col>
    //   </Row> */}
    //     {/* <Row className="match-height">
    //     <Col lg="12" xs="12">
    //       <AttendeesTabs data={eventInfo.guests} />
    //     </Col>*/}
    //   </Row>
    // </>
    <Fragment>
      {/* <BreadCrumbs
              breadCrumbTitle="Social Connect"
              breadCrumbParent="Marketing"
              breadCrumbActive="Social Connect"
          /> */}

      <Row>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
          <Fragment>
            <Nav pills className="mb-2">
              <NavItem>
                <NavLink active={active === '1'} onClick={() => toggle('1')}>
                  <CheckSquare className="font-medium-1 me-50" />
                  <span className="fs-6">View Event</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '2'} onClick={() => toggle('2')}>
                  <CheckSquare className="font-medium-1 me-50" />
                  <span className="fs-6">view Members</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '3'} onClick={() => toggle('3')}>
                  <CheckSquare className="font-medium-1 me-50" />
                  <span className="fs-6">Event Setting</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '4'} onClick={() => toggle('4')}>
                  <CheckSquare className="font-medium-1 me-50" />
                  <span className="fs-6">Event Stats</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '5'} onClick={() => toggle('5')}>
                  <CheckSquare className="font-medium-1 me-50" />
                  <span className="fs-6">Manage Payments</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '6'} onClick={() => toggle('6')}>
                  <CheckSquare className="font-medium-1 me-50" />
                  <span className="fs-6">Bracketing</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '7'} onClick={() => toggle('7')}>
                  <CheckSquare className="font-medium-1 me-50" />
                  <span className="fs-6">options</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '8'} onClick={() => toggle('8')}>
                  <CheckSquare className="font-medium-1 me-50" />
                  <span className="fs-6">Cost</span>
                </NavLink>
              </NavItem>
            </Nav>
          </Fragment>
        </Col>
      </Row>

      <TabContent className="py-50" activeTab={active}>
        {/* <TabPane tabId="1">
          <div>
            <Row className="match-height">
              <Col lg="4" md="6" xs="12">
                <CardEvent
                  eventInfo={
                    {
                      title: "title",
                      start: "title",
                      end: "title",
                      eventLocation: "title",
                      eventStreet: "title",
                      eventCity: "title",
                      eventState: "title",
                    }
                  } />
              </Col>
              <Col lg="4" md="6" xs="12">
                <GuestTracker
                  primary={colors.primary.main}
                  danger={colors.danger.main}
                />
              </Col>
              <Col lg="4" md="6" xs="12">
                <CardInvite />
              </Col>
              <Col lg="12" xs="12">
                <AttendeesTabs data={""} />
              </Col>
            </Row>
          </div>
        </TabPane> */}

        <TabPane tabId="1">
          <Row>
            <Col sm={12} lg={12} md={12}>
              <div
                style={{
                  backgroundColor: '#756df0',
                  borderRadius: '6px',
                  color: '#fff'
                }}
                className="d-flex justify-content-center align-items-center mb-2"
              >
                <h4 className="mt-1 mb-1" style={{ color: '#fff' }}>
                  MYCMA EVENT
                </h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={4} lg={4} md={4}>
              <Card className="p-1" style={{ height: '700px' }}>
                <div className="d-flex justify-content-center mt-1">
                  <img
                    src={store?.eventImage}
                    height="408"
                    width={338}
                    className="rounded img-fluid"
                  ></img>
                </div>
              </Card>
            </Col>
            <Col sm={8} lg={8} md={8}>
              <div>
                <Card className="d-flex justify-content-end   mb-1 " style={{ padding: '5px' }}>
                  <div className="container">
                    <h3 className="mt-1 mb-1 ">{store.eventName}</h3>
                  </div>
                </Card>
                <Row>
                  <Col sm="12">
                    <div className="mt-1 ms-1">
                      <h3> Important Dates</h3>
                      <Row>
                        <Col md="6" className="mb-1">
                          <Label className="form-label" for="date-time-picker">
                            Start Date & Time
                          </Label>
                          <Flatpickr
                            value={startPicker}
                            data-enable-time
                            id="date-time-picker"
                            className="form-control"
                            options={options}
                            disabled
                            // onChange={(date) => setStartPicker(date)}
                          />
                        </Col>
                        <Col md="6" className="mb-1">
                          <Label className="form-label" for="date-time-picker">
                            End Date & Time
                          </Label>
                          <Flatpickr
                            value={endPicker}
                            data-enable-time
                            id="date-time-picker"
                            className="form-control"
                            options={options}
                            disabled
                            // onChange={(date) => setEndPicker(date)}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <div className="mt-1  ms-1">
                      <h3> Location</h3>

                      <div className="ms-1">
                        <span style={{ marginRight: '4px' }}>
                          {' '}
                          <GrLocation size={16} style={{ color: 'red' }} />
                        </span>
                        {store?.eventLocation}
                      </div>
                      <div className="ms-1">
                        <span style={{ marginRight: '4px' }} className="h6">
                          Street :{/* <GrLocation size={16} style={{ color: 'red' }} /> */}
                        </span>
                        {store.steet}
                      </div>
                      <div className="ms-1">
                        <span style={{ marginRight: '4px' }} className="h6">
                          {'City'} :{/* <GrLocation size={16} style={{ color: 'red' }} /> */}
                        </span>
                        {store.city}
                      </div>
                      <div className="ms-1">
                        <span style={{ marginRight: '4px' }} className="h6">
                          State :{/* <GrLocation size={16} style={{ color: 'red' }} /> */}
                        </span>
                        {store.state}, {store.zip}
                      </div>
                    </div>
                  </Col>
                  <Col sm="6">
                    <div className="mt-1">
                      <h3> Host Detail</h3>
                      <ul>
                        <li>
                          {' '}
                          <span className="h6">Name:</span> {store?.eventDirectorName}
                        </li>
                        <li>
                          {' '}
                          <span className="h6">Email:</span> {store?.directorEmail}
                        </li>
                        {/* <li>  <span className='h6'>Name:</span>  {store?.eventDirectorName}</li> */}
                        <li>
                          {' '}
                          <span className="h6">Contact No.:</span> {store?.directorContactNo}
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
                <div className=" ms-1">
                  <div>
                    <h3> Event Registration Fee</h3>
                  </div>
                  <div className="react-dataTable user-view-account-projects">
                    <DataTable
                      noHeader
                      responsive
                      columns={columns}
                      data={eventData}
                      className="react-dataTable"
                      // pagination
                      // paginationServer
                      // paginationComponent={CustomPagination}
                      sortIcon={<BiChevronsDown size={10} />}
                    />
                  </div>
                </div>
                {/* <Row>
              <Col sm="12">
                <div className="mt-1">
                  <h3> Other Report</h3>
                  <ul>
                    <li>Coffee</li>
                    <li>Tea</li>
                    <li>Milk</li>
                  </ul>
                </div>
              </Col>
            </Row> */}
                <Row className="mt-3">
                  <Col sm="12  ms-1">
                    {/* <div className="mt-1">
                  <h3> Other Report</h3>
                  <ul>
                    <li>Coffee</li>
                    <li>Tea</li>
                    <li>Milk</li>
                  </ul>
                </div> */}
                    <div className="d-flex  gap-4">
                      <div>
                        {' '}
                        <Button color="primary" className="mr-2">
                          Register Now
                        </Button>
                      </div>
                      <div>
                        {' '}
                        <Button outline className="mr-2  ">
                          Register Now
                        </Button>
                      </div>
                    </div>

                    {/* <Button outline className="">
                  Coach Register
                </Button> */}
                  </Col>
                </Row>

                {/* <div>
            <Row>
              <Col sm={6} lg={6} md={6}>
                <div className="d-flex align-items-center mb-1">
                  <span>Show</span>
                  <Input type="select" style={{ width: '70px' }}>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </Input>
                  <span>entries</span>
                </div>
              </Col>
              <Col sm={6} lg={6} md={6}>
                <div className="d-flex justify-content-end align-items-center mb-1">
                  <span>Search</span>
                  <Input type="text" style={{ width: '300px' }} />
                </div>
              </Col>
            </Row>
          </div> */}
                {/* <RankTable /> */}
              </div>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <ViewMembersMain />
        </TabPane>
        <TabPane tabId="3">
          <EventSetting />
        </TabPane>
        <TabPane tabId="4">
          <EventStats />
        </TabPane>
        <TabPane tabId="5">
          <ManagePayments />
        </TabPane>
        <TabPane tabId="6">
          <BracketingMain />
        </TabPane>
        <TabPane tabId="7">
          <OptionsMain />
        </TabPane>
        <TabPane tabId="8">
          <Cost />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};

export default EventDetails;
