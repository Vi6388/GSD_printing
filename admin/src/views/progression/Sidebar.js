// ** React Imports
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink, TabContent, TabPane } from 'reactstrap';
import { Menu } from 'react-feather';
import { MessageCircle, Twitch } from 'react-feather';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Mail, Send, Edit2, Folder, Trash, Plus, Code } from 'react-feather';
// ** Components imports live chat layout etc
import Layout from './layout';
import Livechat from './tabs/livechat';
import Chatbot from './tabs/chatbot';
import Retention from './tabs/retention';
import Api from './tabs/api';
import Scripts from './tabs/scripts';
import { BiUser } from 'react-icons/bi';
import { BsCircle } from 'react-icons/bs';
import { fetchEventProgressionRQ } from '../../requests/progression/progression.js';
// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import Select from 'react-select';
import { selectThemeColors } from '@utils';
import { useQuery } from 'react-query';

const Sidebar = (props) => {
  const [selectEventName, setSelectEventName] = useState({ value: '', label: 'Select Event' });
  const { data } = useQuery(['progression-table', selectEventName.value], fetchEventProgressionRQ);

  const { eventNames, sportData } = data ? data : [];
  // ** Props
  const { sidebarOpen, setSidebarOpen } = props;
  const [active, setActive] = useState(0);
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  useEffect(() => {
    if (!selectEventName.value && data) setSelectEventName(eventNames[0]);
  }, [data]);
  return (
    <>
      <div
        className={classnames('sidebar-left', {
          show: sidebarOpen
        })}
      >
        <div className="sidebar">
          <div className="sidebar-content email-app-sidebar">
            <div className="email-app-menu p-1">
              <div
                style={{
                  backgroundColor: '#c52f2f',
                  borderRadius: '6px',
                  color: '#fff'
                }}
                className="d-flex justify-content-center align-items-center"
              >
                <h4 className="mt-1" style={{ color: '#fff' }}>
                  Some Action
                </h4>
              </div>
              <div class="mx-1 mt-1">
                <Select
                  isClearable={false}
                  // placeholder={'Event'}
                  value={selectEventName}
                  onChange={(e) => {
                    setSelectEventName(e);
                    setActive(0);
                  }}
                  options={eventNames}
                  className="react-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                />
              </div>
              {/* <div className="form-group-compose text-center compose-btn">
                <Button className="compose-email" color="primary" block>
                  Some Action
                </Button>
              </div> */}
              <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
                <ListGroup tag="div" className="list-group-messages mt-2">
                  {sportData
                    ? sportData.map((sportDataItem, index) => {
                        return (
                          <ListGroupItem
                            tag={NavLink}
                            className="zindex-0"
                            onClick={() => toggleTab(index)}
                            active={active === index}
                            action
                          >
                            <BiUser size={18} className="me-75" />
                            <span className="align-middle">{sportDataItem.sportName}</span>
                          </ListGroupItem>
                        );
                      })
                    : null}
                </ListGroup>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
      <div className="content-right">
        <div className="content-body">
          <div
            className={classnames('body-content-overlay', {
              show: sidebarOpen
            })}
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="email-app-list">
            <div className="app-fixed-search d-flex d-lg-none align-items-center">
              <div
                className="sidebar-toggle d-block d-lg-none ms-1"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size="21" />
              </div>
            </div>
            <PerfectScrollbar>
              <Retention
                eventId={selectEventName?.value}
                selectSportData={sportData ? sportData[active] : []}
              />
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
