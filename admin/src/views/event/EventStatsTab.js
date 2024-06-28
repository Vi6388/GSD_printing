// ** React Imports
import { Fragment, useState } from 'react';

// ** Components
import StatsSetting from './EventStatsTabs/StatsSetting';
import BreakdownRegistrant from './EventStatsTabs/BreakdownRegistrant';
import ManageStaging from './EventStatsTabs/ManageStaging';

// ** Icons Imports
import { CheckCircle, CheckSquare } from 'react-feather';
import { BsGear } from 'react-icons/bs';

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

const StatsTabs = (props) => {
  const { event, registrantData, refetchRegistrantData } = props;
  // ** State
  const [active, setActive] = useState('1');

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink
            active={active === '1'}
            onClick={() => {
              toggle('1');
            }}
          >
            <CheckCircle size={14} />
            <span className="align-middle">Event Stats Setting</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '2'}
            onClick={() => {
              toggle('2');
            }}
          >
            <CheckSquare size={14} />
            <span className="align-middle">Further breakdown of Registrants</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '3'}
            onClick={() => {
              toggle('3');
            }}
          >
            <BsGear size={14} />
            <span className="align-middle">Manage Staging</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          {/* <GuestTable data={props.data} /> */}
          <StatsSetting
            event={event}
            registrantData={registrantData}
            refetchRegistrantData={refetchRegistrantData}
          />
        </TabPane>
        <TabPane tabId="2">
          <BreakdownRegistrant
            event={event}
            registrantData={registrantData}
            refetchRegistrantData={refetchRegistrantData}
          />
        </TabPane>
        <TabPane tabId="3">
          <ManageStaging />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default StatsTabs;
