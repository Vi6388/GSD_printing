// ** React Imports
import { useEffect, useState } from 'react';
import { TrendingUp, Menu, MoreVertical } from 'react-feather';
// ** Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Row,
  Col,
  Button,
  Modal,
  Label,
  Input,
  Form,
  FormGroup,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  NavLink,
  TabContent,
  TabPane,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
//for redux
import { useSelector, useDispatch } from 'react-redux';
import {
  sportAddAction,
  sportEditAction,
  progressionAddAction,
  sportFetchAction,
  progressionCategoriesFetchAction,
  sportDeleteAction
} from './store/actions';
import Layout from './tabs/layout';
import Emptypage from './tabs/emptypage';
// ** Custom Hooks
import { useSkin } from '@hooks/useSkin';

const Sidebar = (props) => {
  // ** Hooks
  const { skin } = useSkin();
  const backgroundColor = skin === 'dark' ? 'bg-gray-dark' : 'bg-white';

  const dispatch = useDispatch();
  const [itemmodal, setItemmodal] = useState(false);
  const [itemmodal2, setItemmodal2] = useState(false);

  const store = useSelector((state) => state.progression);

  const toggleitemmodal = () => setItemmodal(!itemmodal);
  const toggleitemmodal2 = () => setItemmodal2(!itemmodal2);

  // ** Props
  const { sidebarOpen, setSidebarOpen } = props;
  const [active, setActive] = useState(-1);
  const [selectSportItem, setSelectSportItem] = useState({});
  const [sportList, setSportList] = useState([]);
  const [selectCategoryId, setSelectCategoryId] = useState('');

  const toggleTab = (tab, progressionItem) => {
    if (active !== tab) {
      setActive(tab);
      setSelectSportItem(progressionItem);
    }
  };

  useEffect(() => {
    setSelectCategoryId('');
  }, [selectSportItem]);

  useEffect(() => {
    const sportListData = store?.sportList ? store.sportList : [];
    setSportList(sportListData);
    if (selectSportItem) {
      const selectSportId = selectSportItem._id;
      const updateSelectItem = sportListData
        ? sportListData.filter((obj) => obj._id === selectSportId)
        : [];
      setSelectSportItem(updateSelectItem ? updateSelectItem[0] : []);
    }
  }, [store?.sportList]);

  const [sportData, setSportData] = useState();
  const handleSportAdd = (e) => {
    e.preventDefault();
    dispatch(sportAddAction(sportData));
    setSportData();
  };
  const handleSportEdit = (e) => {
    e.preventDefault();
    dispatch(sportEditAction(sportData));
  };
  const fetchData = () => {
    dispatch(sportFetchAction());
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Modal isOpen={itemmodal} toggle={toggleitemmodal} centered={true} size="md">
        <ModalHeader toggle={toggleitemmodal}>Add Sport</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSportAdd}>
            <div>
              <Label for="SportName">Sport Name</Label>
              <Input
                onChange={(e) => {
                  setSportData({ ...sportData, [e.target.name]: e.target.value });
                }}
                type="text"
                name="sportName"
                id="SportName"
                placeholder=""
              />
            </div>
            <div className="mt-1">
              <Label for="rule">Age Rule</Label>
              <Input
                id="rule"
                name="rule"
                type="select"
                onChange={(e) =>
                  setSportData({
                    ...sportData,
                    [e.target.name]: e.target.value
                  })
                }
              >
                <option>By Calender Year</option>
                <option>By D.O.B</option>
              </Input>
            </div>
            <div className="mt-1 mb-2">
              <Label for="SportType">Progression Type</Label>
              <Input
                type="select"
                name="type"
                id="SportType"
                onChange={(e) =>
                  setSportData({
                    ...sportData,
                    [e.target.name]: e.target.value
                  })
                }
              >
                <option>By Action</option>
                <option>By time</option>
                <option>By Attendence</option>
              </Input>
            </div>
            <Button color="btn btn-outline-danger" onClick={toggleitemmodal}>
              Cancel
            </Button>{' '}
            <Button type="submit" color="btn btn-primary" onClick={toggleitemmodal}>
              Save
            </Button>
          </Form>
        </ModalBody>
      </Modal>
      <Modal isOpen={itemmodal2} toggle={toggleitemmodal2} centered={true} size="md">
        <ModalHeader toggle={toggleitemmodal2}>Edit Sport</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSportEdit}>
            <FormGroup>
              <Label for="SportName">Sport Name</Label>
              <Input
                onChange={(e) => {
                  setSportData({ ...sportData, [e.target.name]: e.target.value });
                }}
                type="text"
                name="sportName"
                id="SportName"
                placeholder=""
                value={sportData?.sportName}
              />
            </FormGroup>
            <Button color="btn btn-outline-danger" onClick={toggleitemmodal2}>
              Cancel
            </Button>{' '}
            <Button type="submit" color="btn btn-primary" onClick={toggleitemmodal2}>
              Edit
            </Button>
          </Form>
        </ModalBody>
      </Modal>
      <div
        className={classnames('sidebar-left', {
          show: sidebarOpen
        })}
      >
        <div className="sidebar">
          <div className="sidebar-content email-app-sidebar">
            <div className="email-app-menu">
              <PerfectScrollbar className="sidebar-menu-list">
                <div className="form-group-compose text-center compose-btn">
                  <Button color="primary" onClick={toggleitemmodal}>
                    Add Sport
                  </Button>
                </div>
                <ListGroup tag="div" className="list-group-labels">
                  {sportList?.map((progressionItem, index) => (
                    <ListGroupItem
                      tag={NavLink}
                      key={index}
                      onClick={() => toggleTab(index, progressionItem)}
                      active={active === index}
                    >
                      <div className="d-flex">
                        <Col md="2">
                          <TrendingUp size={18} className="me-75" />
                        </Col>
                        <Col md="8">{progressionItem.sportName}</Col>
                        <Col md="2">
                          <UncontrolledDropdown>
                            <DropdownToggle tag="div" className="btn btn-sm">
                              <MoreVertical size={14} className="cursor-pointer" />
                            </DropdownToggle>

                            <DropdownMenu>
                              <DropdownItem
                                tag="span"
                                className="w-100"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSportData({
                                    ...sportData,
                                    id: progressionItem._id,
                                    sportName: progressionItem.sportName
                                  });
                                  toggleitemmodal2();
                                }}
                              >
                                <FiEdit size={14} className="me-50" />
                                <span className="align-middle">Edit</span>
                              </DropdownItem>
                              <DropdownItem
                                tag="span"
                                className="w-100"
                                onClick={() => {
                                  Swal.fire({
                                    title: 'Are you sure?',
                                    text: `Are you delete ${progressionItem.sportName} ?`,
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Delete !'
                                  }).then((willDelete) => {
                                    if (willDelete.isConfirmed) {
                                      dispatch(sportDeleteAction(progressionItem._id));
                                    }
                                  });
                                }}
                              >
                                <AiOutlineDelete size={14} className="me-50" />
                                <span className="align-middle">Remove Sport</span>
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </Col>
                      </div>

                      <span className="align-middle"></span>
                    </ListGroupItem>
                  ))}
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
            <div className={`${backgroundColor} p-2 border-bottom border-2`}>
              <h3>Sport Management</h3>
            </div>
            {selectSportItem ? (
              <PerfectScrollbar className="sidebar-menu-list">
                <Layout
                  progressionId={selectSportItem._id}
                  categories={selectSportItem.categoryId}
                  sportName={selectSportItem.sportName}
                  selectCategoryId={selectCategoryId}
                  setSelectCategoryId={setSelectCategoryId}
                />
              </PerfectScrollbar>
            ) : (
              <Emptypage />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
