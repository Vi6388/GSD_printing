// ** React Imports
import { Fragment, useState, useContext, useEffect } from 'react';
// ** Reactstrap Imports
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
// ** Icons Imports
import { GiRank2 } from 'react-icons/gi';
import { FiSettings } from 'react-icons/fi';
import { BsUiChecks } from 'react-icons/bs';
import { BsListCheck } from 'react-icons/bs';

// ** Context
import { AbilityContext } from '@src/utility/context/Can';

// ** User Components

//Store
import {
  fetchEventAction,
  deleteEventAction,
  eventByNameAction,
  eventPointTypeFetchAction
} from './store/actions';
import { useSelector, useDispatch } from 'react-redux';

import { Col, Row } from 'reactstrap';
import EventView from './showevents';
import { Link } from 'react-router-dom';
import EventPointType from './EventPointType/index.js';

const eventTypeNames = ['tournament', 'testing', 'instructor', 'seminar', 'guest'];

const UserTabs = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state?.eventMain.eventListingData);
  const eventData = store ? store : null;
  const [isOpen, setIsOpen] = useState(new Array(eventData.length).fill(false));
  const [searchTermEvent, setSearchTermEvent] = useState('');
  const [filter, setFilter] = useState({
    eventType: '',
    search: '',
    year: '',
    month: '',
    status: ''
  });
  const serchEventName = async (e) => {
    if (e.key === 'Enter') {
      setFilter({ ...filter, search: searchTermEvent });
    }
  };

  const filterEventType = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  useEffect(() => dispatch(fetchEventAction(new URLSearchParams(filter))), [filter]);

  useEffect(() => {
    dispatch(eventPointTypeFetchAction());
  }, []);

  const toggle = (index) => {
    setIsOpen((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };

  const [active, setActive] = useState('1');

  const ability = useContext(AbilityContext);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
      if (tab !== '6') setFilter({ ...filter, eventType: eventTypeNames[parseInt(tab) - 1] });
    }
  };

  // Filter the events data by event type for each tab
  const eventTypes = eventData
    ? {
        Tournament: eventData.filter((event) => event.eventType === 'tournament'),
        Testing: eventData.filter((event) => event.eventType === 'testing'),
        Instructor: eventData.filter((event) => event.eventType === 'instructor'),
        Seminars: eventData.filter((event) => event.eventType === 'seminar'),
        Guest: eventData.filter((event) => event.eventType === 'guest')
      }
    : {};

  return (
    <>
      <Row>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
          <Fragment>
            <div className="d-flex flex-row justify-content-between">
              <Nav pills className="mb-2" style={{ width: '100%' }}>
                {ability.can('read', 'tournament') ? (
                  <NavItem>
                    <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                      <FiSettings className="font-medium-1 me-50" />
                      <span className="fs-6">Tournament</span>
                    </NavLink>
                  </NavItem>
                ) : (
                  <></>
                )}
                {ability.can('read', 'testing') ? (
                  <NavItem>
                    <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                      <GiRank2 className="font-medium-1 me-50" />
                      <span className="fs-6">Testing</span>
                    </NavLink>
                  </NavItem>
                ) : (
                  <></>
                )}
                {ability.can('read', 'instructor') ? (
                  <NavItem>
                    <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                      <BsUiChecks className="font-medium-1 me-50" />
                      <span className="fs-6">Instructor</span>
                    </NavLink>
                  </NavItem>
                ) : (
                  <></>
                )}
                {ability.can('read', 'seminars') ? (
                  <NavItem>
                    <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                      <BsListCheck className="font-medium-1 me-50" />
                      <span className="fs-6">Seminars</span>
                    </NavLink>
                  </NavItem>
                ) : (
                  <></>
                )}
                {ability.can('read', 'others') ? (
                  <NavItem>
                    <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
                      <BsListCheck className="font-medium-1 me-50" />
                      <span className="fs-6">Other Events</span>
                    </NavLink>
                  </NavItem>
                ) : (
                  <></>
                )}
                <NavItem className="ms-auto">
                  <NavLink active={active === '6'} onClick={() => toggleTab('6')}>
                    <FiSettings className="font-medium-1 me-50" />
                    <span className="fs-6">Edit Point Type</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <TabContent activeTab={active}>
              <TabPane tabId="1">
                <EventView
                  toggle={toggle}
                  eventDatas={eventData}
                  eventData={eventTypes['Tournament']}
                  isOpen={isOpen}
                  searchTermEvent={searchTermEvent}
                  setSearchTermEvent={setSearchTermEvent}
                  serchEventName={serchEventName}
                  filterEventType={filterEventType}
                />
              </TabPane>
              <TabPane tabId="2">
                <EventView
                  toggle={toggle}
                  eventData={eventTypes['Testing']}
                  isOpen={isOpen}
                  searchTermEvent={searchTermEvent}
                  setSearchTermEvent={setSearchTermEvent}
                  serchEventName={serchEventName}
                  filterEventType={filterEventType}
                />
              </TabPane>
              <TabPane tabId="3">
                <EventView
                  toggle={toggle}
                  eventData={eventTypes['Instructor']}
                  isOpen={isOpen}
                  searchTermEvent={searchTermEvent}
                  setSearchTermEvent={setSearchTermEvent}
                  serchEventName={serchEventName}
                  filterEventType={filterEventType}
                />
              </TabPane>
              <TabPane tabId="4">
                <EventView
                  toggle={toggle}
                  eventData={eventTypes['Seminars']}
                  isOpen={isOpen}
                  searchTermEvent={searchTermEvent}
                  setSearchTermEvent={setSearchTermEvent}
                  serchEventName={serchEventName}
                  filterEventType={filterEventType}
                />
              </TabPane>
              <TabPane tabId="5">
                <EventView
                  toggle={toggle}
                  eventData={eventTypes['Guest']}
                  isOpen={isOpen}
                  searchTermEvent={searchTermEvent}
                  setSearchTermEvent={setSearchTermEvent}
                  serchEventName={serchEventName}
                  filterEventType={filterEventType}
                />
              </TabPane>
              <TabPane tabId="6">
                <EventPointType />
              </TabPane>
            </TabContent>
          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default UserTabs;
