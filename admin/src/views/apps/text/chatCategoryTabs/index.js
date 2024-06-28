import React, { memo, useState, useEffect, Fragment } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container
} from 'reactstrap';
import classnames from 'classnames';

import { FaRocketchat, FaAppStore, FaNewspaper, FaCalendarAlt } from 'react-icons/fa';
function TextChatTabs() {
  const [activeTab, setActiveTab] = useState('1');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === '1'
            })}
            onClick={() => {
              toggle('1');
            }}
          >
            <FaNewspaper />
            New
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === '2'
            })}
            onClick={() => {
              toggle('2');
            }}
          >
            <FaRocketchat />
            Chat
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === '3'
            })}
            onClick={() => {
              toggle('3');
            }}
          >
            {' '}
            <FaAppStore />
            AUTOMATION
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === '4'
            })}
            onClick={() => {
              toggle('4');
            }}
          >
            <FaCalendarAlt />
            SCHEDULE
          </NavLink>
        </NavItem>
      </Nav>
    </Fragment>
  );
}
export default memo(TextChatTabs);
