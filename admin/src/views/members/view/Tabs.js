import { Fragment } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { User, Bookmark } from 'react-feather';
import { GiRank2 } from 'react-icons/gi';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import OverviewTab from './tabs/overview';
import Membership from './Membership';
import Progression from './Progression';
import Events from './Events';

const UserTabs = ({ active, toggleTab, users, progressionTableData, memberRankDataRefetch }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Overview</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">Memberships</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <GiRank2 className="font-medium-3 me-50" />
            <span className="fw-bold">Progression</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
            <AiOutlineSafetyCertificate className="font-medium-3 me-50" />
            <span className="fw-bold">Payments</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '5'} onClick={() => toggleTab('5')}>
            <AiOutlineSafetyCertificate className="font-medium-3 me-50" />
            <span className="fw-bold">Events</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <OverviewTab users={users} />
        </TabPane>
        <TabPane tabId="2">
          <Membership users={users} />
        </TabPane>
        <TabPane tabId="3">
          <Progression
            progressionTableData={progressionTableData}
            memberRankDataRefetch={memberRankDataRefetch}
          />
        </TabPane>
        <TabPane tabId="5">
          <Events users={users} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
