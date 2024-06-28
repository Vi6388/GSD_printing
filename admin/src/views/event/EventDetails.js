// ** React Imports
import { useContext, useEffect, useState, Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';

// ** Components
import CardEvent from './CardEvent';
import GuestTracker from './guests/GuestTracker';
import CardInvite from './CardInvite';
import StatsTabs from './EventStatsTab';

// ** Reactstrap Imports
import { Row, Col, Card } from 'reactstrap';

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors';

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

// ** Icons Imports
import { CheckCircle, CheckSquare } from 'react-feather';

// ** Redux Action Import
// import { getEventInfo } from './store'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss';
import '@styles/base/pages/dashboard-ecommerce.scss';

// ** Componenets
import ManagePaymentsMain from './ManagePayments';
import ViewMembersMain from './ViewMembers';
import EventSettingsMain from './EventSetting';
import EventStatsMain from './EventStats';
import BracketingMain from './Bracketing';
import Options from './Options';
import Cost from './Cost';
import EventView from './showevents/EventView';
import Registrants from './registrants';
import ReportingTable from './reporting/ReportingTable';

// ** Actions
import { fetchEventRegistrantData } from '../../requests/event/event-registrant';
import {
  progressionCategoriesDivisionFetchAction,
  progressionCategoriesRankFetchAction
} from '../settings/tabs/progressiontab/store/actions';
import { sportFetchAction } from '../settings/tabs/progressiontab/store/actions';
import { fetchParticularEventAction } from './store/actions';

const EventDetails = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const [curEvent, setCurEvent] = useState({});
  // ** Redux Store
  const { data: registrantData, refetch: refetchRegistrantData } = useQuery(
    ['event-registrant-table', curEvent?._id],
    fetchEventRegistrantData
  );
  const eventStore = useSelector((state) => state.eventMain);
  useEffect(() => {
    dispatch(progressionCategoriesDivisionFetchAction());
    dispatch(progressionCategoriesRankFetchAction());
    dispatch(sportFetchAction());
    dispatch(fetchParticularEventAction(eventId));
  }, []);
  useEffect(() => {
    eventStore && setCurEvent(eventStore.eventListingDataById);
  }, [eventId, eventStore]);
  // ** Context
  const { colors } = useContext(ThemeColors);
  // const  { eventId } = useParams()
  // const eventInfo = useSelector( state => state.event.eventInfo)
  // const [ eventInfo, setEventInfo ] = useState({})

  // ** Store vars

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getEventInfo(eventId))
  // }, [])
  // const guestData = useSelector( state => state.event )
  // console.log(eventInfo)

  const [active, setActive] = useState('1');

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <>
      <Row>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
          <Fragment>
            <Nav pills className="mb-2">
              <NavItem>
                <NavLink active={active === '1'} onClick={() => toggle('1')}>
                  <CheckSquare className="font-medium-1 me-50" />
                  <span className="fs-6">Event Dashboard</span>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink active={active === '2'} onClick={() => toggle('2')}>
                  <CheckSquare className="font-medium-1 me-50" />
                  <span className="fs-6">Registrants</span>
                </NavLink>
              </NavItem>

              {/* <NavItem>
                <NavLink active={active === '4'} onClick={() => toggle('4')}>
                  <CheckSquare className="font-medium-1 me-50" />
                  <span className="fs-6">Event Stats</span>
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink active={active === '3'} onClick={() => toggle('3')}>
                  <CheckSquare className="font-medium-1 me-50" />
                  <span className="fs-6">Manage Payments</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '4'} onClick={() => toggle('4')}>
                  <CheckSquare className="font-medium-1 me-50" />
                  <span className="fs-6">Bracketing</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink active={active === '5'} onClick={() => toggle('5')}>
                  <CheckSquare className="font-medium-1 me-50" />
                  <span className="fs-6">Reporting</span>
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink active={active === '8'} onClick={() => toggle('8')}>
                  <CheckSquare className="font-medium-1 me-50" />
                  <span className="fs-6">Cost</span>
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink active={active === '6'} onClick={() => toggle('6')}>
                  <CheckSquare className="font-medium-1 me-50" />
                  <span className="fs-6">Setting</span>
                </NavLink>
              </NavItem>
            </Nav>
          </Fragment>
        </Col>
      </Row>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          <div>
            <Row className="match-height">
              <Col lg="4" md="6" xs="12">
                <CardEvent event={curEvent} registrantData={registrantData} />
              </Col>
              <Col lg="4" md="6" xs="12">
                <GuestTracker
                  primary={colors.primary.main}
                  danger={colors.danger.main}
                  registrantData={registrantData}
                />
              </Col>
              <Col lg="4" md="6" xs="12">
                <CardInvite event={curEvent} />
              </Col>
              <Col lg="12" xs="12">
                <StatsTabs
                  event={curEvent}
                  registrantData={registrantData}
                  refetchRegistrantData={refetchRegistrantData}
                />
              </Col>
            </Row>
          </div>
        </TabPane>
        {/* <TabPane tabId="1">
          <EventView />
        </TabPane> */}
        <TabPane tabId="2">
          <Registrants
            event={curEvent}
            registrantData={registrantData}
            refetchRegistrantData={refetchRegistrantData}
          />
        </TabPane>
        {/* <TabPane tabId="3">
          <EventStatsMain />
        </TabPane> */}
        <TabPane tabId="3">
          <ManagePaymentsMain />
        </TabPane>
        <TabPane tabId="4">
          <BracketingMain
            event={curEvent}
            registrantData={registrantData}
            refetchRegistrantData={refetchRegistrantData}
          />
        </TabPane>
        <TabPane tabId="5">
          <ReportingTable event={curEvent} />
        </TabPane>
        <TabPane tabId="6">
          <EventSettingsMain event={curEvent} />
        </TabPane>
      </TabContent>
    </>
  );
};

export default EventDetails;
