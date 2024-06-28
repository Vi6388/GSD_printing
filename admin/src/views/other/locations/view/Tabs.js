// ** React Imports
import { Fragment } from 'react';

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

// ** Icons Imports
import { MdOutlineEmojiEvents, MdCardMembership } from 'react-icons/md';
import { HiOutlineUsers } from 'react-icons/hi';
import { BsInfoCircle } from 'react-icons/bs';
import { GrUserAdmin } from 'react-icons/gr';

// ** User Components
import MainOperatorInfo from './MainOperatorInfo';
import OperatorsList from './OperatorsList';
import MembershipSold from './MembershipSold';
import ParticipatedEvents from './ParticipatedEvents';
import StatsCard from './StatsCard';
import UsersList from './UsersList';

const UserTabs = ({
  locationOperators,
  selectedLocation,
  membershipData,
  locationID,
  memberData,
  usersData,
  eventData,
  toggleTab,
  active
}) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <BsInfoCircle className="font-medium-3 me-50" />
            <span className="fw-bold">Overview</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <MdCardMembership className="font-medium-3 me-50" />
            <span className="fw-bold">Memberships Sold</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <GrUserAdmin className="font-medium-3 me-50" />
            <span className="fw-bold">Operators</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
            <HiOutlineUsers className="font-medium-3 me-50" />
            <span className="fw-bold">Users</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
            <MdOutlineEmojiEvents className="font-medium-3 me-50" />
            <span className="fw-bold">Participated Events</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <StatsCard
            cols={{ md: '3', sm: '6', xs: '12' }}
            locationOperators={locationOperators}
            membershipData={membershipData}
            locationID={locationID}
            memberData={memberData}
            usersData={usersData}
          />
          <MainOperatorInfo
            selectedLocation={selectedLocation}
            locationOperators={locationOperators}
          />
        </TabPane>
        <TabPane tabId="2">
          <MembershipSold />
        </TabPane>
        <TabPane tabId="3">
          <OperatorsList locationOperators={locationOperators} />
        </TabPane>
        <TabPane tabId="4">
          <UsersList usersData={usersData} locationID={locationID} />
        </TabPane>
        <TabPane tabId="5">
          <ParticipatedEvents eventData={eventData} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
