// ** React Imports
import { useState } from 'react';
// import { Link } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Edit,
  Trash,
  RefreshCcw
} from 'react-feather';

import { useForm, Controller } from 'react-hook-form';
import { data, isEmptyObject } from 'jquery';
import { Home, Layers } from 'react-feather';

// ** Reactstrap Imports
import {
  Button,
  FormFeedback,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavLink
} from 'reactstrap';

import NewModal from './NewModal';
import { useDispatch } from 'react-redux';

const PointTypeSidebar = (props) => {
  const {
    sidebarOpen,
    data,
    selectPT,
    setSelectPT,
    setEditState,
    eventPointTypeDefaultData,
    eventPointTypeUpdateAction
  } = props;
  const dispatch = useDispatch();

  const [newPointType, setNewPointType] = useState(false);
  const [createNewValidation, setCreateNewValidation] = useState(true);
  const [newPTName, setNewPTName] = useState('');
  const [style, setStyle] = useState({ display: 'none' });
  const [modalType, setModalType] = useState(0);

  const userData = JSON.parse(localStorage.getItem('userData'));
  if (!userData) {
    return;
  }

  const handleOpenAddPointType = (e) => {
    e.preventDefault();
    setNewPointType(true);
  };

  const handleAddPointTypeFormSubmit = (e) => {
    e.preventDefault();
    dispatch(eventPointTypeUpdateAction([...data, { name: newPTName, points: [] }]));
    setNewPointType(false);
  };

  const handlePointTypeClick = (index, e) => {
    if (index !== selectPT) {
      setSelectPT(index);
      setEditState(false);
    }
  };

  const handleNewPointTypeTitle = (e) => {
    e.preventDefault();
    setNewPTName(e.target.value);
    setCreateNewValidation(data?.filter((x) => x.name === e.target.value).length === 0);
  };

  return (
    <div
      className={classnames('sidebar-left', {
        show: sidebarOpen
      })}
    >
      <div className="sidebar border-end border-1">
        <div className="sidebar-content email-app-sidebar">
          <div className="email-app-menu p-1">
            <PerfectScrollbar className="sidebar-menu-list" style={{ height: '100%' }}>
              <ListGroup
                tag="div"
                className="list-group-labels"
                options={{ wheelPropagation: false }}
              >
                <div className="p-1 d-flex justify-content-start align-items-center">
                  <Home size={20} />
                  <div
                    className="ms-1"
                    style={{ fontSize: '18px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {'CMA Event Point'}
                  </div>
                  {/* <Button
                className="btn-icon"
                color="flat-dark"
                   onClick={handlePointTypeCollapse}
              >
                {collapse ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              </Button> */}
                </div>

                {data?.map((dataItem, index) => {
                  return dataItem.name === 'Local' ||
                    dataItem.name === 'Regionals' ||
                    dataItem.name === 'Nationals' ||
                    dataItem.name === 'Worlds' ? (
                    <ListGroupItem
                      key={index}
                      tag={NavLink}
                      active={selectPT === index ? true : false}
                      onClick={() => handlePointTypeClick(index)}
                      action
                      onMouseEnter={(e) => {
                        setStyle({
                          display: 'block'
                        });
                      }}
                      onMouseLeave={(e) => {
                        setStyle({
                          display: 'none'
                        });
                      }}
                    >
                      <div className="d-flex justify-content-between align-middle">
                        <div className="ws-name">
                          <span>{dataItem.name}</span>
                        </div>
                        <div style={style}>
                          <div className="d-flex align-items-center">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="icon-btn hide-arrow m-0 p-0"
                                color="transparent"
                                size="sm"
                                caret
                              >
                                <MoreHorizontal size={18} />
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem
                                  href="/"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setModalType(1);
                                  }}
                                >
                                  <RefreshCcw className="me-50" size={15} />{' '}
                                  <span className="align-middle">Reset</span>
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
                        </div>
                      </div>
                    </ListGroupItem>
                  ) : null;
                })}
                <div className="p-1 d-flex justify-content-start align-items-center">
                  <Layers size={20} style={{ marginInlineEnd: '5px' }} />
                  <div
                    className="ms-1"
                    style={{ fontSize: '18px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {'My Event Point'}
                  </div>
                  {/* <Button
                className="btn-icon"
                color="flat-dark"
                   onClick={handlePointTypeCollapse}
              >
                {collapse ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              </Button> */}
                </div>
                {data?.map((dataItem, index) => {
                  return dataItem.name !== 'Local' &&
                    dataItem.name !== 'Regionals' &&
                    dataItem.name !== 'Nationals' &&
                    dataItem.name !== 'Worlds' ? (
                    <ListGroupItem
                      key={index}
                      tag={NavLink}
                      active={selectPT > 3 && selectPT === index ? true : false}
                      onClick={() => handlePointTypeClick(index)}
                      action
                      onMouseEnter={(e) => {
                        setStyle({
                          display: 'block'
                        });
                      }}
                      onMouseLeave={(e) => {
                        setStyle({
                          display: 'none'
                        });
                      }}
                    >
                      <div className="d-flex justify-content-between align-middle">
                        <div className="ws-name">
                          <span>{dataItem.name}</span>
                        </div>
                        <div style={style}>
                          <div className="d-flex align-items-center">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="icon-btn hide-arrow m-0 p-0"
                                color="transparent"
                                size="sm"
                                caret
                              >
                                <MoreHorizontal size={18} />
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem
                                  href="/"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setModalType(2);
                                  }}
                                >
                                  <Edit className="me-50" size={15} />
                                  <span className="align-middle">Edit Name</span>
                                </DropdownItem>
                                <DropdownItem
                                  href="/"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setModalType(3);
                                  }}
                                >
                                  <Trash className="me-50" size={15} />
                                  <span className="align-middle">Delete</span>
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
                        </div>
                      </div>
                    </ListGroupItem>
                  ) : null;
                })}
                <div className="create-pointType-btn mt-1">
                  <Button color="primary" block outline onClick={handleOpenAddPointType}>
                    <Plus size={14} className="me-25" />
                    New Point Type
                  </Button>
                </div>
              </ListGroup>
            </PerfectScrollbar>
            <Modal
              isOpen={newPointType}
              toggle={() => setNewPointType(!newPointType)}
              className="modal-dialog-centered"
            >
              <ModalHeader toggle={() => setNewPointType(!newPointType)}>
                Create A New Point Type
              </ModalHeader>
              <ModalBody>
                <div>
                  <Label className="form-label" for="validState">
                    Point Type title
                  </Label>
                  <Input
                    type="text"
                    id="newPointTypeTitle"
                    name="newPointTypeTitle"
                    placeholder="My Point Type"
                    onChange={handleNewPointTypeTitle}
                    valid={createNewValidation}
                    invalid={!createNewValidation}
                  />
                  <FormFeedback valid={createNewValidation}>
                    {createNewValidation
                      ? 'Sweet! That name is available.'
                      : 'Oh no! That name is already taken.'}
                  </FormFeedback>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={handleAddPointTypeFormSubmit}
                  disabled={!createNewValidation || !newPTName}
                >
                  Create
                </Button>
                <Button color="secondary" onClick={() => setNewPointType(!newPointType)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            <NewModal
              key={`newModal_${Math.random() * 1000}`}
              selectPT={selectPT}
              setSelectPT={setSelectPT}
              data={data}
              dispatch={dispatch}
              modalType={modalType}
              setModalType={setModalType}
              eventPointTypeDefaultData={eventPointTypeDefaultData}
              eventPointTypeUpdateAction={eventPointTypeUpdateAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointTypeSidebar;
