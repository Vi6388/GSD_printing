// ** React Imports
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from 'react-feather';

// ** Breadcrumb
import BreadCrumbs from '@components/breadcrumbs';

// ** Tabs
import EventOverView from '../showevents/EventOverView';
import Members from './members';
import Payment from './Payment';

// ** Actions
import { fetchEventRegistrantData } from '../../../requests/event/event-registrant';
import {
  progressionCategoriesDivisionFetchAction,
  progressionCategoriesRankFetchAction
} from '../../settings/tabs/progressiontab/store/actions';
import { sportFetchAction } from '../../settings/tabs/progressiontab/store/actions';
import { fetchParticularEventAction } from '../store/actions';
const EventEnter = () => {
  const [active, setActive] = useState('1');
  const [curEvent, setCurEvent] = useState({});
  const { eventId } = useParams();
  const dispatch = useDispatch();
  // ** Redux Store
  const eventStore = useSelector((state) => state.eventMain);
  const { data: registrantData, refetch: refetchRegistrantData } = useQuery(
    ['event-registrant-table', curEvent?._id],
    fetchEventRegistrantData
  );
  // ** Effects
  useEffect(() => {
    dispatch(progressionCategoriesDivisionFetchAction());
    dispatch(progressionCategoriesRankFetchAction());
    dispatch(sportFetchAction());
    dispatch(fetchParticularEventAction(eventId));
  }, []);
  useEffect(() => {
    eventStore && setCurEvent(eventStore.eventListingDataById);
  }, [eventId, eventStore]);
  // ** Handlers
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Event Overview</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">Members</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">Payment</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <BreadCrumbs breadCrumbParent="Members Entries" breadCrumbActive="Entry Member" />
        <TabPane tabId="1">
          <EventOverView
            event={curEvent}
            registrantData={registrantData}
            refetchRegistrantData={refetchRegistrantData}
          />
        </TabPane>
        <TabPane tabId="2">
          <Members />
        </TabPane>
        <TabPane tabId="3">
          <Payment />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default EventEnter;
