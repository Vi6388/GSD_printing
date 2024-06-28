// ** React Imports
import { useParams } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { Mail, Send, Edit2, Folder, Trash, Plus, MessageCircle, ChevronDown } from 'react-feather';

// ** myforms App Component Imports
import Sidebar from './Sidebar';
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Third Party Components
import classnames from 'classnames';
import DataTable from 'react-data-table-component';

import { myFormData, data, mytask, myTask } from './data';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, ListGroupItem, Badge, NavLink, TabContent, TabPane } from 'reactstrap';

// ** Styles
import '@styles/react/apps/app-email.scss';
import FormList from './FormList';
import Addmyforms from './Addmyforms';

const customStyles = {
  rows: {
    style: {
      minHeight: '50px' // override the row height
    }
  },
  headCells: {
    style: {
      background: '#efeff099'
    }
  }
};

const MyFormlist = () => {
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [addFolderHide, setAddFolderHide] = useState(false);
  const [active, setActive] = useState('1');

  // ** Toggle Compose Function
  const toggleCompose = () => setComposeOpen(!composeOpen);

  // ** Store Variables
  const dispatch = useDispatch();
  const store = useSelector((state) => state.email);

  // ** Vars
  const params = useParams();

  // ** UseEffect: GET initial data on Mount
  // useEffect(() => {
  //     dispatch(
  //         getMails({
  //             q: query || '',
  //             folder: params.folder || 'inbox',
  //             label: params.label || ''
  //         })
  //     )
  // }, [query, params.folder, params.label])

  // ** Props

  // ** Vars

  // ** Functions To Handle Folder, Label & Compose
  const handleFolder = (folder) => {};

  const handleNewFolderAdd = () => {
    setAddFolderHide(!addFolderHide);
  };

  const handleLabel = (label) => {
    // dispatch(getMails({ ...store.params, label }))
    // dispatch(resetSelectedMail())
  };

  // ** Functions To Active List Item
  const handleActiveItem = (value) => {
    // if ((params.folder && params.folder === value) || (params.label && params.label === value)) {
    //   return true;
    // } else {
    //   return false;
    // }
  };

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <>
      <div className="overflow-hidden email-application">
        <div className="content-area-wrapper container-xxl p-0 animate__animated animate__fadeIn">
          {/* <div className="form-group-compose text-center compose-btn">
            
          </div> */}
          {/* <Addmyforms /> */}
          <div
            className={classnames('sidebar-left', {
              show: sidebarOpen
            })}
          >
            <div className="sidebar">
              <div className="sidebar-content email-app-sidebar">
                <div className="email-app-menu">
                  <div className="form-group-compose text-center compose-btn">
                    <Addmyforms />
                  </div>
                  <PerfectScrollbar
                    className="sidebar-menu-list"
                    options={{ wheelPropagation: false }}
                  >
                    <ListGroup tag="div" className="list-group-messages">
                      <ListGroupItem
                        tag={NavLink}
                        onClick={() => toggleTab('1')}
                        active={active === '1'}
                        action
                      >
                        <Mail size={18} className="me-75" />
                        <span className="align-middle">My Form</span>
                      </ListGroupItem>
                      <ListGroupItem
                        tag={NavLink}
                        onClick={() => toggleTab('2')}
                        active={active === '2'}
                      >
                        <MessageCircle size={18} className="me-75" />
                        <span className="align-middle">My Task</span>
                      </ListGroupItem>
                    </ListGroup>
                    <h6 className="section-label mt-3 mb-1 px-2">Status</h6>
                    <ListGroup tag="div" className="list-group-labels">
                      <ListGroupItem
                        // tag={Link}
                        // to="/documents/label/personal"
                        // onClick={() => handleLabel('personal')}
                        active={handleActiveItem('personal')}
                        action
                      >
                        <span className="bullet bullet-sm bullet-warning me-1"></span>
                        Waiting
                        <Badge className="float-end" color="light-primary" pill>
                          {0}
                        </Badge>
                      </ListGroupItem>
                      <ListGroupItem
                        // tag={Link}
                        // to="/documents/label/company"
                        // onClick={() => handleLabel('company')}
                        active={handleActiveItem('company')}
                        action
                      >
                        <span className="bullet bullet-sm bullet-primary me-1"></span>
                        Viewed
                      </ListGroupItem>
                      <ListGroupItem
                        // tag={Link}
                        // to="/documents/label/important"
                        // onClick={() => handleLabel('important')}
                        active={handleActiveItem('important')}
                        action
                      >
                        <span className="bullet bullet-sm bullet-success me-1"></span>
                        Completed
                      </ListGroupItem>
                      <ListGroupItem
                        // tag={Link}
                        // to="/documents/label/private"
                        // onClick={() => handleLabel('private')}
                        active={handleActiveItem('private')}
                        action
                      >
                        <span className="bullet bullet-sm bullet-danger me-1"></span>
                        Expired
                      </ListGroupItem>
                    </ListGroup>
                    <div className="mt-3 px-2 d-flex justify-content-between">
                      <h6 className="section-label mb-1">Folders</h6>
                      <Plus
                        className="cursor-pointer"
                        size={14}
                        // onClick={() =>
                        //     setAddFolderHide(!addFolderHide)
                        // }
                      />
                    </div>
                    <ListGroup tag="div" className="list-group-labels">
                      <ListGroupItem
                        // tag={Link}
                        // to="/documents/label/personal"
                        // onClick={() => handleLabel('personal')}
                        active={handleActiveItem('personal')}
                        action
                      >
                        <Folder size={18} className="me-75" />
                        <span className="align-middle">Invoices</span>
                      </ListGroupItem>
                      <ListGroupItem
                        // tag={Link}
                        // to="/documents/label/company"
                        // onClick={() => handleLabel('company')}
                        active={handleActiveItem('company')}
                        action
                      >
                        <Folder size={18} className="me-75" />
                        <span className="align-middle">Contracts</span>
                      </ListGroupItem>
                    </ListGroup>
                  </PerfectScrollbar>
                </div>
              </div>
            </div>
          </div>
          <div className="content-right">
            <div className="content-body">
              <PerfectScrollbar>
                <TabContent activeTab={active}>
                  <TabPane tabId="1">
                    <DataTable
                      noHeader
                      pagination
                      selectableRows
                      columns={myFormData}
                      paginationPerPage={7}
                      className="react-dataTable"
                      sortIcon={<ChevronDown size={10} />}
                      data={data}
                      customStyles={customStyles}
                    />
                  </TabPane>
                  <TabPane tabId="2">
                    <DataTable
                      noHeader
                      pagination
                      selectableRows
                      columns={myTask}
                      paginationPerPage={7}
                      className="react-dataTable"
                      sortIcon={<ChevronDown size={10} />}
                      data={mytask}
                      customStyles={customStyles}
                    />
                  </TabPane>
                </TabContent>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyFormlist;
