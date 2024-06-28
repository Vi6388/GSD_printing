// ** React Imports
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, TabContent, TabPane } from 'reactstrap';
import { Menu, Share2, Users, TrendingUp } from 'react-feather';
// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import AddModuleModal from './AddModuleModal';
import OperatorPermission from './tabs/operators';
import UserPermission from './tabs/users';
import { getAllLinksAction } from './store/action';
// ** Reactstrap Imports

const Sidebar = (props) => {
  const dispatch = useDispatch();
  // ** Props
  const { sidebarOpen, setSidebarOpen } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState('0');
  useEffect(() => {
    dispatch(getAllLinksAction());
  }, []);
  // ** Handlers
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const handleAddNew = () => {
    setModalOpen(true);
  };

  const toggle = () => {
    setModalOpen(!modalOpen);
  };
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
                <div className="form-group-compose text-center compose-btn">
                  <Button color="primary" onClick={(e) => handleAddNew()}>
                    Add New Modal
                  </Button>
                </div>
                <ListGroup tag="div" className="list-group-labels">
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('0')}
                    active={active === '0'}
                  >
                    <Users size={18} className="me-75" />
                    <span className="align-middle"></span>
                    Users
                  </ListGroupItem>
                  <ListGroupItem
                    tag={NavLink}
                    onClick={() => toggleTab('1')}
                    active={active === '1'}
                  >
                    <Share2 size={18} className="me-75" />
                    <span className="align-middle"></span>
                    Operators
                  </ListGroupItem>
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
            <div className="card p-2">
              <h3>Roles and Permissions</h3>
            </div>
            <PerfectScrollbar>
              <TabContent activeTab={active}>
                <TabPane tabId="0">
                  <UserPermission />
                </TabPane>
                <TabPane tabId="1">
                  <OperatorPermission />
                </TabPane>
              </TabContent>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
      <AddModuleModal modalOpen={modalOpen} setModalOpen={setModalOpen} toggle={toggle} />
    </>
  );
};

export default Sidebar;
