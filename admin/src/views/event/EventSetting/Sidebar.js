/* eslint-disable no-unused-vars */
// ** React Imports
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink, TabContent, TabPane } from 'reactstrap';
import { Calendar, Menu, Target } from 'react-feather';
import { MessageCircle, Twitch } from 'react-feather';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Mail, Send, Edit2, Folder, Trash, Plus, Code } from 'react-feather';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Edit } from 'react-feather';
import { MoreVertical } from 'react-feather';
// ** Components imports live chat layout etc

// ** Store & Actions
// import { getData, createSmartList, listIdSet } from './store';
import { useDispatch, useSelector } from 'react-redux';

// ** Reactstrap Imports
import {
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  Modaldata,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap';
import { BiDollar } from 'react-icons/bi';
import Cost from '../Cost';
import Options from '../Options';
import PointSetting from '../PointSetting.js';
import { MdReport } from 'react-icons/md';
import { FaMedal } from 'react-icons/fa';

const Sidebar = (props) => {
  // ** Props
  const { sidebarOpen, setSidebarOpen, event } = props;
  const [active, setActive] = useState('1');
  const [modalnewsmartlist, setModalnewsmartlist] = useState(false);
  const togglemodalnewsmartlist = () => setModalnewsmartlist(!modalnewsmartlist);
  const [newSmartList, setNewSmartList] = useState('');
  const dispatch = useDispatch();
  const store = useSelector((state) => state.smartList);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
    // dispatch(listIdSet(tab));
  };

  const onAddSmartList = () => {
    setModalnewsmartlist(false);
    setNewSmartList('');
    // dispatch(
    //   createSmartList({
    //     name: newSmartList
    //   })
    // );
    // dispatch(getData());
  };

  useEffect(() => {
    // dispatch(getData());
  }, [dispatch]);

  return (
    <>
      <div
        className={classnames('sidebar-left', {
          show: sidebarOpen
        })}
      >
        <div className="sidebar">
          <div className="sidebar-content email-app-sidebar">
            <div className="email-app-menu">
              <PerfectScrollbar className="sidebar-menu-list" options={{ wheelPropagation: false }}>
                <ListGroup tag="div" className="list-group-messages mt-2">
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('1')}
                    active={active === '1'}
                    action
                  >
                    <BiDollar size={18} className="me-75" />
                    <span className="align-middle">Cost</span>
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('2')}
                    active={active === '2'}
                    action
                  >
                    <Calendar size={18} className="me-75" />
                    <span className="align-middle">Options</span>
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('3')}
                    active={active === '3'}
                    action
                  >
                    <Target size={18} className="me-75" />
                    <span className="align-middle">Point</span>
                  </ListGroupItem>
                </ListGroup>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
      <div className="content-right h-100">
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
              <TabContent activeTab={active}>
                <TabPane tabId="1">
                  <Cost event={event} />
                </TabPane>
                <TabPane tabId="2">
                  <Options event={event} />
                </TabPane>
                <TabPane tabId="3">
                  <PointSetting event={event} />
                </TabPane>
              </TabContent>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
