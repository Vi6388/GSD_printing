// ** React Imports
import { useState, Fragment, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import {
  ListGroup,
  ListGroupItem,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Label,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Button,
  Input
} from 'reactstrap';

// ** Third Party Components
import Flatpickr from 'react-flatpickr';

// ** Icons Import
import { Edit, Trash, MoreVertical } from 'react-feather';

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss';
import { useSelector, useDispatch } from 'react-redux';
import useMessage from '../../../../lib/useMessage';
// import tasks action
import { fetchTaskListAction, taskDeleteAction } from '../store/action';
import moment from 'moment';
import { taskDeleteReset, setEditTask } from '../store/reducer';

const Tasks = (props) => {
  // ** State
  const [picker, setPicker] = useState(new Date());
  const [active, setActive] = useState(false);
  const { error, success } = useMessage();

  const { setSelectedTask, toggleSidebar, active: activatedTab } = props;
  const dispatch = useDispatch();
  const taskSelectHandler = (task) => {
    setSelectedTask((p) => task);
    dispatch(setEditTask(task));
  };

  // Fetch Task List
  const { taskList } = useSelector((state) => state.tasks);
  const [tasks, setTasks] = useState([]);
  const { list, loading, success: fetchSuccess } = taskList;

  function filterData(data) {
    if (activatedTab === 'active') {
      setTasks(Array.from(data).filter((x) => x.isActive));
    } else {
      setTasks(Array.from(data).filter((x) => !x.isActive));
    }
  }

  useMemo(() => {
    if (list?.list) {
      filterData(list?.list);
    }
  }, [list, activatedTab]);

  const initialOptions = {
    sort: 1,
    sortByDate: false
  };

  const [options, setOptions] = useState(initialOptions);

  useEffect(() => {
    dispatch(fetchTaskListAction(options));
  }, [dispatch, options]);

  // Lets Delete Task -------------------------------------------------------------
  const [deleteModal, setDeleteModal] = useState({
    _id: '',
    modal: false
  });

  const { taskDelete } = useSelector((state) => state.tasks);
  const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = taskDelete;

  useMemo(() => {
    if (deleteSuccess) {
      setDeleteModal(() => ({ _id: '', modal: false }));
      dispatch(taskDeleteReset());
      // message
      success('Task Deleted');
    }
  }, [deleteSuccess]);

  function onDeleteConfirm() {
    dispatch(taskDeleteAction(deleteModal));
  }

  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center mb-1">
        {tasks.length > 0 && (
          <div>
            <Input
              // value={picker}
              placeholder="Search"
              id="range-picker"
              className="form-control"
              onChange={(e) => {
                // setPicker(date)
                // sort data by date
                var filteredData = [];
                if (activatedTab === 'active') {
                  var filteredData = Array.from(list?.list).filter((x) => x.isActive);
                } else {
                  var filteredData = Array.from(list?.list).filter((x) => !x.isActive);
                }

                // sort data with date range
                filteredData = filteredData.filter((a) => {
                  if (
                    String(a.taskName).toLowerCase().indexOf(String(e.target.value).toLowerCase()) >
                    -1
                  ) {
                    return true;
                  }
                  return false;
                });
                // set filtered data
                setTasks(filteredData);
              }}
              options={{
                mode: 'range',
                defaultDate: ['2022-02-01', '2022-06-15']
              }}
            />
          </div>
        )}
        {tasks.length > 0 && (
          <div>
            <UncontrolledDropdown>
              <DropdownToggle
                className="hide-arrow me-1"
                tag="a"
                // href="/"
                onClick={(e) => e.preventDefault()}
              >
                <MoreVertical className="text-body" size={16} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem
                  tag={Link}
                  // to="/"
                  onClick={(e) => {
                    setTasks((p) => p.sort((a, b) => String(a.taskName).localeCompare(b.taskName)));
                  }}
                >
                  Sort A-Z
                </DropdownItem>
                <DropdownItem
                  tag={Link}
                  onClick={(e) => {
                    setTasks((p) => p.sort((a, b) => String(b.taskName).localeCompare(a.taskName)));
                  }}
                >
                  Sort Z-A
                </DropdownItem>
                <DropdownItem
                  tag={Link}
                  onClick={(e) => {
                    setTasks((p) =>
                      p.sort((a, b) => {
                        var c = new Date(a?.startDate);
                        var d = new Date(b?.startDate);
                        return c - d;
                      })
                    );
                  }}
                >
                  Short By Time
                </DropdownItem>
                <DropdownItem
                  tag={Link}
                  onClick={(e) => {
                    filterData(list?.list);
                  }}
                >
                  Reset Sort
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )}
      </div>
      <ListGroup tag="div">
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <Spinner />
          </div>
        ) : tasks.length === 0 ? (
          <>
            <ListGroupItem
              key={'empty-list'}
              tag="a"
              action
              className={active ? 'bg-primary' : 'bg-white'}
              style={{
                textAlign: 'center',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img style={{ width: '100px', height: '100px' }} src="/empty.svg" alt="" />
              <br />
              <span> Create new Task </span>
            </ListGroupItem>
          </>
        ) : (
          tasks?.map((item) => (
            <ListGroupItem
              tag="a"
              action
              onClick={() => taskSelectHandler(item)}
              className={active ? 'bg-primary' : 'bg-white'}
            >
              <div className="d-flex justify-content-between w-100">
                <h5 className={active ? 'mb-1 text-white' : 'mb-1'}>{item?.taskName}</h5>
                <div>
                  <Edit onClick={toggleSidebar} size={20} className="me-1" />
                  <Trash
                    onClick={(_) =>
                      setDeleteModal({
                        _id: item._id,
                        modal: true
                      })
                    }
                    size={20}
                  />
                </div>
              </div>
              <div className="mb-1">
                <span className={active ? 'text-white' : 'text-black'}>
                  {moment(item?.startDate).format(' h:mm a , MMMM Do YYYY')}
                </span>
              </div>

              <div>
                <ListGroup className="list-group-horizontal-sm">
                  <ListGroupItem
                    className={`${
                      item.repeat.includes('sunday') ? 'active' : ''
                    } bg-light text-dark`}
                  >
                    S
                  </ListGroupItem>

                  <ListGroupItem
                    className={`${
                      item.repeat.includes('monday') ? 'active' : ''
                    }  bg-light text-dark`}
                  >
                    M
                  </ListGroupItem>
                  <ListGroupItem
                    className={`${
                      item.repeat.includes('tuesday') ? 'active' : ''
                    }  bg-light text-dark`}
                  >
                    T
                  </ListGroupItem>
                  <ListGroupItem
                    className={`${
                      item.repeat.includes('wednesday') ? 'active' : ''
                    }  bg-light text-dark`}
                  >
                    W
                  </ListGroupItem>
                  <ListGroupItem
                    className={`${
                      item.repeat.includes('thursday') ? 'active' : ''
                    } bg-light text-dark`}
                  >
                    T
                  </ListGroupItem>
                  <ListGroupItem
                    className={`${
                      item.repeat.includes('friday') ? 'active' : ''
                    } bg-light text-dark`}
                  >
                    F
                  </ListGroupItem>
                  <ListGroupItem
                    className={`${
                      item.repeat.includes('saturday') ? 'active' : ''
                    } bg-light text-dark`}
                  >
                    S
                  </ListGroupItem>
                </ListGroup>
              </div>
            </ListGroupItem>
          ))
        )}
      </ListGroup>

      <Modal
        isOpen={deleteModal.modal}
        toggle={() => setDeleteModal((p) => ({ _id: '', modal: false }))}
        className="modal-dialog-centered"
        // onClosed={onModalClosed}
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setDeleteModal((p) => ({ _id: '', modal: false }))}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <h3 className="text-center mb-1">Are you sure to Delete ?</h3>

          <Row>
            <Col className="text-center mt-1" xs={12}>
              <Button
                onClick={(e) => {
                  setDeleteModal((p) => ({
                    _id: '',
                    modal: false
                  }));
                }}
                className="mt-1 me-1"
                color="secondary"
                outline
              >
                Cancel
              </Button>
              <Button
                onClick={onDeleteConfirm}
                className="mt-1 "
                color="primary"
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Deleting...' : 'confirm'}
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};
export default Tasks;
