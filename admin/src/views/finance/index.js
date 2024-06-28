// ** React Imports
import { Fragment, useState, useContext } from 'react';
// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
// ** Icons Imports
import { GiRank2 } from 'react-icons/gi';
import { FiSettings } from 'react-icons/fi';
import { BsUiChecks } from 'react-icons/bs';
import { BsListCheck } from 'react-icons/bs';

// ** Context
import { AbilityContext } from '@src/utility/context/Can';

// ** User Components
import Income from './income/index';
import Expense from './expense/index';
import Invoice from './invoice/list/index';
import ProfitAndLoss from './pnl/index';

import axios from 'axios';
import { Col, Row } from 'reactstrap';

const UserTabs = () => {
  const [active, setActive] = useState('1');

  const ability = useContext(AbilityContext);
  const toggleTab = (tab) => {
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
              {ability.can('read', 'invoice') ? (
                <NavItem>
                  <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                    <FiSettings className="font-medium-1 me-50" />
                    <span className="fs-6">Invoice</span>
                  </NavLink>
                </NavItem>
              ) : (
                <></>
              )}
              {ability.can('read', 'income') ? (
                <NavItem>
                  <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                    <GiRank2 className="font-medium-1 me-50" />
                    <span className="fs-6">Income</span>
                  </NavLink>
                </NavItem>
              ) : (
                <></>
              )}
              {ability.can('read', 'expense') ? (
                <NavItem>
                  <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
                    <BsUiChecks className="font-medium-1 me-50" />
                    <span className="fs-6">Expense</span>
                  </NavLink>
                </NavItem>
              ) : (
                <></>
              )}
              {ability.can('read', 'pnl') ? (
                <NavItem>
                  <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
                    <BsListCheck className="font-medium-1 me-50" />
                    <span className="fs-6">Profit & Loss</span>
                  </NavLink>
                </NavItem>
              ) : (
                <></>
              )}
            </Nav>
            <TabContent activeTab={active}>
              <TabPane tabId="1">
                <Invoice />
              </TabPane>
              <TabPane tabId="2">
                <Income />
              </TabPane>
              <TabPane tabId="3">
                <Expense />
              </TabPane>
              <TabPane tabId="4">
                <ProfitAndLoss />
              </TabPane>
            </TabContent>
          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default UserTabs;
