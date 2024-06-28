import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';
import DataTable from 'react-data-table-component';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  CardTitle,
  FormGroup,
  CardText,
  Table,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';

import RankTable from './../../../views/Ranking/RankTable';
import { BiPrinter } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import useColumns from './useColumn';
import EventStatTable from './EventStatTable';
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';
import Select from 'react-select';
import { ChevronDown, User, UserCheck, UserPlus, UserX } from 'react-feather';

const mockData = [
  {
    id: 1,
    gender: 'Male',
    divisionName: 'Little Tigers No Belt',
    round: 3,
    ring: 5,
    total: 12
  },
  {
    id: 2,
    gender: 'Male',
    divisionName: 'Little Tigers White Belt',
    round: 3,
    ring: 5,
    total: 12
  },
  {
    id: 3,
    gender: 'Male',
    divisionName: 'Little Tigers White Gree Belt',
    round: 3,
    ring: 5,
    total: 12
  },
  {
    id: 4,
    gender: 'Male',
    divisionName: 'Little Tigers White Blue Belt',
    round: 3,
    ring: 5,
    total: 12
  },
  {
    id: 5,
    gender: 'Male',
    divisionName: 'Little Tigers White Red Belt',
    round: 3,
    ring: 5,
    total: 12
  },
  {
    id: 6,
    gender: 'Male',
    divisionName: 'Little Tigers White Black Belt',
    round: 3,
    ring: 5,
    total: 12
  },
  {
    id: 7,
    gender: 'Male',
    divisionName: 'Little Tigers White Green Tip Belt',
    round: 3,
    ring: 5,
    total: 12
  }
];

const EventStatsMain = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [active, setActive] = useState('1');
  const [beltRound, setBeltRound] = useState('');
  const [beltRing, setBeltRing] = useState('');
  const [data, setData] = useState([]);

  // const [open, setShowDetails] = useState(false);

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const { eventTiger } = useColumns({ setBeltRound, mockData, setBeltRing, setData });

  const [open, setOpen] = useState(false);

  // const toggle = (tab) => {
  //   if (active !== tab) {
  //     setActive(tab);
  //   }
  // };

  // const [active, setActive] = useState('1')

  // const toggle = (tab) => {
  //   if (active !== tab) {
  //     setActive(tab)
  //   }
  // }
  //
  // const [modal, setModal] = useState(false);
  // const toggle2 = () => setModal(!modal);

  const [eventStatModal, setEventStatModal] = useState(false);

  const eventStatToggle = () => setEventStatModal(!eventStatModal);

  const history = useHistory();
  function handleClick() {
    history.goBack();
  }

  const columns = [
    {
      name: 'Member Name',
      sortable: true,
      selector: (row) => row.date
    },
    {
      name: 'Start Date',
      sortable: true,
      selector: (row) => row.name
    },

    {
      name: 'Last Tested',
      sortable: true,
      selector: (row) => row.type
    },
    {
      name: 'Belt',
      sortable: true,
      selector: (row) => row.type
    },
    {
      name: 'Age	Weight',
      sortable: true,
      selector: (row) => row.type
    },
    {
      name: 'Age	Weight',
      allowOverflow: true,
      cell: (row) => <div></div>
    },
    {
      name: 'CMA ID',
      sortable: true,
      selector: (row) => row.type
    },
    {
      name: 'Action',
      allowOverflow: true,
      cell: (row) => <div></div>
    }
  ];

  return !showDetails ? (
    <Fragment>
      <Card className="p-1">
        <div>
          <h4>2023 CMA BROOKLYN REGIONAL CHAMPIONSHIPS</h4>
        </div>
        <div>
          <Card className="p-1 bg-primary text-white mb-1">
            <b>Event Setting</b>
          </Card>
          <div>
            <h5 className="text-center">
              Total Register Registrants is: (<span className="text-primary">50</span>) Check/Export
            </h5>
            <div>
              <Row className="mt-1">
                <Col sm={3} lg={3} md={3}>
                  <Card>
                    <CardHeader
                      className="d-flex justify-content-center"
                      style={{ backgroundColor: '#f1f2f7', padding: '5px' }}
                    >
                      <span>
                        <b>Forms</b>
                      </span>
                    </CardHeader>
                    <CardBody className="mt-1">
                      <div className="cursor-pointer" onClick={() => setShowDetails(true)}>
                        <span className="textcolor">Little Tigers Forms [M] (10)</span>
                      </div>
                      <div className="cursor-pointer" onClick={eventStatToggle}>
                        <span className="textcolor">Little Tigers Forms [F] (40)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Team Forms [M] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Team Forms [F] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Color Belt Traditional Forms [M] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Color Belt Traditional Forms [F] (0)</span>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm={3} lg={3} md={3}>
                  <Card>
                    <CardHeader
                      className="d-flex justify-content-center"
                      style={{ backgroundColor: '#f1f2f7', padding: '5px' }}
                    >
                      <span>
                        <b>Sparring</b>
                      </span>
                    </CardHeader>
                    <CardBody className="mt-1">
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Little Tigers Sparring [M] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Little Tigers Sparring [F] (0)</span>
                      </div>

                      <div className="cursor-pointer" onClick={() => setShowDetails(true)}>
                        <span className="textcolor">Color Belt Sparring [M] (1)</span>
                      </div>

                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Color Belt Sparring [F] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Color Belt Olympic Sparring [M] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Color Belt Olympic Sparring [F] (0)</span>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm={3} lg={3} md={3}>
                  <Card>
                    <CardHeader
                      className="d-flex justify-content-center"
                      style={{ backgroundColor: '#f1f2f7', padding: '5px' }}
                    >
                      <span>
                        <b>Black Belt</b>
                      </span>
                    </CardHeader>
                    <CardBody className="mt-1">
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Black Belt Grassroots Sparring [M] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Black Belt Grassroots Sparring [F] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Black Belt World Class Sparring [M] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Black Belt World Class Sparring [F] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Black Belt Traditional Forms [M] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Black Belt Traditional Forms [F] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Black Belt Weapons [M] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Black Belt Weapons [F] (0)</span>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm={3} lg={3} md={3}>
                  <Card>
                    <CardHeader
                      className="d-flex justify-content-center"
                      style={{ backgroundColor: '#f1f2f7', padding: '5px' }}
                    >
                      <span>
                        <b>Black Belt</b>
                      </span>
                    </CardHeader>
                    <CardBody className="mt-1">
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Black Belt Creative Form [M] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Black Belt Creative Form [F] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Black Belt Team Forms [M] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Black Belt Team Forms [F] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Black Belt Breaking [M] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Black Belt Breaking [F] (0)</span>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm={3} lg={3} md={3}>
                  <Card>
                    <CardHeader
                      className="d-flex justify-content-center"
                      style={{ backgroundColor: '#f1f2f7', padding: '5px' }}
                    >
                      <span>
                        <b>Breaking</b>
                      </span>
                    </CardHeader>
                    <CardBody className="mt-1">
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Little Tigers Breaking [M] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Little Tigers Breaking [F] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Color Belt Breaking [M] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Color Belt Breaking [F] (0)</span>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm={3} lg={3} md={3}>
                  <Card>
                    <CardHeader
                      className="d-flex justify-content-center"
                      style={{ backgroundColor: '#f1f2f7', padding: '5px' }}
                    >
                      <span>
                        <b>Weapons</b>
                      </span>
                    </CardHeader>
                    <CardBody className="mt-1">
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Little Tigers Weapons [M] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Little Tigers Weapons [F] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Color Belt Weapons [M] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Color Belt Weapons [F] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Weapons [M] (0)</span>
                      </div>
                      <div className="cursor-pointer" onClick={() => true}>
                        <span className="textcolor">Weapons [F] (0)</span>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <div style={{ backgroundColor: '#f9f4d9', padding: '5px' }}>
                <span>
                  <b>Further breakdown of Registrants</b>
                </span>
              </div>
              <Row className="mt-1">
                <Col lg="3" sm="6">
                  <Card className="border mb-0">
                    <StatsHorizontal
                      color="primary"
                      statTitle="Athlete Per School"
                      icon={<User size={20} />}
                      renderStats={<h3 className="fw-bolder">0</h3>}
                    />
                  </Card>
                </Col>
                <Col lg="3" sm="6">
                  <Card className="border mb-0">
                    <StatsHorizontal
                      color="danger"
                      statTitle="Coach Per School"
                      icon={<UserPlus size={20} />}
                      renderStats={<h3 className="fw-bolder mb-75"> 0</h3>}
                    />
                  </Card>
                </Col>
                <Col lg="3" sm="6">
                  <Card className="border mb-0">
                    <StatsHorizontal
                      color="success"
                      statTitle="Referee Per School"
                      icon={<UserCheck size={20} />}
                      renderStats={<h3 className="fw-bolder mb-75"> 0</h3>}
                    />
                  </Card>
                </Col>
                <Col lg="3" sm="6">
                  <Card className="border mb-0">
                    <StatsHorizontal
                      color="warning"
                      statTitle="Event Breakdown"
                      icon={<UserX size={20} />}
                      renderStats={<h3 className="fw-bolder mb-75"> 0</h3>}
                    />
                  </Card>
                </Col>
              </Row>
              <EventStatTable />
              <div>
                <div style={{ backgroundColor: '#f9f4d9', padding: '5px' }}>
                  <span>
                    <b>Manage Staging</b>
                  </span>
                </div>
                <div className="p-1">
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor"> Members per School</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Coaches per School</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Referee per School</span>
                  </div>
                </div>
                <div>
                  <span>
                    <b>Manage Staging</b>
                  </span>
                  <div>
                    <span>
                      Use this to freeze divisions (Staging Tools), assign divisions to rings, view
                      current medal count, etc{' '}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: 'red' }}>{'[Check-in/Weigh-in Members]'}</span>
                  </div>
                </div>
                <Row className="mt-1">
                  <Col sm={6} lg={6} md={6}>
                    <div>
                      <h5>Export Div Files for GUSS or Match Tool:</h5>
                      <div className="d-flex align-items-center">
                        <Input type="select" style={{ width: '150px' }}>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </Input>
                        <span className="ms-1">Limit to this event id:</span>
                      </div>
                    </div>
                  </Col>
                  <Col sm={6} lg={6} md={6}>
                    <div className="d-flex mt-2">
                      <Input className="me-1" type="text" style={{ width: '150px' }} />
                      <Button color="primary">Submit</Button>
                    </div>
                  </Col>
                </Row>
                <div>
                  <h5>OR</h5>
                  <span style={{ color: 'red' }}>{'[export RAW for GUSS Management]'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Modal
        toggle={() => setOpen(false)}
        size={'lg'}
        className="modal-dialog-centered"
        isOpen={open}
      >
        <ModalHeader className="bg-transparent" toggle={() => setOpen((p) => !p)}></ModalHeader>
        <ModalBody>
          <div>
            <div
              className="p-1"
              style={{
                backgroundColor: '#756df0',
                color: '#fff',
                borderRadius: '6px 6px 0px 0px'
              }}
            >
              <span>
                <span className="fw-bolder fs-4  d-flex justify-content-center align-items-center">
                  1st Dan
                </span>
              </span>
            </div>
            <DataTable columns={columns} data={[{ name: 'fajsdlk', class: 'fkdlajs' }]} />
          </div>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between ">
          <Button className="mt-1 me-3" outline onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="mt-1" color="primary">
            Confirm
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={eventStatModal} toggle={eventStatToggle} size={'lg'} style={{ color: '#000' }}>
        <ModalHeader toggle={eventStatToggle}>
          <h4 style={{ color: '#000' }}> Little Tigers Forms</h4>
        </ModalHeader>
        <div className="react-dataTable">
          <DataTable
            noHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={eventTiger}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            // paginationComponent={CustomPagination}
            data={mockData}
          />
        </div>
      </Modal>

      {/* <Modal isOpen={eventStatModal} toggle={eventStatToggle} size={'lg'} style={{ color: '#000' }}>
        <ModalHeader toggle={eventStatToggle}>
          <h4 style={{ color: '#000' }}> Little Tigers Forms</h4>
        </ModalHeader>
        <Card className="p-1 m-1 bg-primary text-white mb-0">
          <b>Little Tiger</b>
        </Card>
        <Row>
          <Col md={6}>
            <div className="p-1 m-1 little-tiger-wrapper">
              <div>
                <div className="d-flex little-tiger-child">
                  <h5 className="me-1">Male</h5>
                  <h5>Little Tigers No Belt</h5>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <div className="me-1">|</div>
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <Button className="btn btn-sm me-1" color="primary">
                    Update
                  </Button>
                  <Button className="btn btn-sm me-1" color="primary">
                    Print
                  </Button>
                </div>
                <div className="table-rating">
                  <span>5</span>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-1 m-1  little-tiger-wrapper">
              <div>
                <div className="d-flex text-black little-tiger-child">
                  <h5 className="me-1">Male</h5>
                  <h5>Little Tigers White Belt</h5>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <div className="me-1">|</div>
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <Button className="btn btn-sm me-1" color="primary">
                    Update
                  </Button>
                  <Button className="btn btn-sm me-1" color="primary">
                    Print
                  </Button>
                </div>
                <div className="table-rating">
                  <span>2</span>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-1 m-1 little-tiger-wrapper">
              <div>
                <div className="d-flex little-tiger-child">
                  <h5 className="me-1">Male</h5>
                  <h5>Little Tigers White Orange Belt</h5>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <div className="me-1">|</div>
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <Button className="btn btn-sm me-1" color="primary">
                    Update
                  </Button>
                  <Button className="btn btn-sm me-1" color="primary">
                    Print
                  </Button>
                </div>
                <div className="table-rating">
                  <span>4</span>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-1 m-1 little-tiger-wrapper">
              <div>
                <div className="d-flex little-tiger-child">
                  <h5 className="me-1">Male</h5>
                  <h5>Little Tigers White Green Belt</h5>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <div className="me-1">|</div>
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <Button className="btn btn-sm me-1" color="primary">
                    Update
                  </Button>
                  <Button className="btn btn-sm me-1" color="primary">
                    Print
                  </Button>
                </div>
                <div className="table-rating">
                  <span>3</span>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-1 m-1 little-tiger-wrapper">
              <div>
                <div className="d-flex little-tiger-child">
                  <h5 className="me-1">Male</h5>
                  <h5>Little Tigers White Blue Belt</h5>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <div className="me-1">|</div>
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <Button className="btn btn-sm me-1" color="primary">
                    Update
                  </Button>
                  <Button className="btn btn-sm me-1" color="primary">
                    Print
                  </Button>
                </div>
                <div className="table-rating">
                  <span>3</span>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-1 m-1 little-tiger-wrapper">
              <div>
                <div className="d-flex little-tiger-child">
                  <h5 className="me-1">Male</h5>
                  <h5>Little Tigers White Red Belt</h5>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <div className="me-1">|</div>
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <Button className="btn btn-sm me-1" color="primary">
                    Update
                  </Button>
                  <Button className="btn btn-sm me-1" color="primary">
                    Print
                  </Button>
                </div>
                <div className="table-rating">
                  <span>3</span>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-1 m-1 little-tiger-wrapper">
              <div>
                <div className="d-flex little-tiger-child">
                  <h5 className="me-1">Male</h5>
                  <h5>Little Tigers White Black Belt</h5>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <div className="me-1">|</div>
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <Button className="btn btn-sm me-1" color="primary">
                    Update
                  </Button>
                  <Button className="btn btn-sm me-1" color="primary">
                    Print
                  </Button>
                </div>
                <div className="table-rating">
                  <span>3</span>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-1 m-1 little-tiger-wrapper">
              <div>
                <div className="d-flex little-tiger-child">
                  <h5 className="me-1">Male</h5>
                  <h5>Little Tigers Yellow Belt</h5>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <div className="me-1">|</div>
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <Button className="btn btn-sm me-1" color="primary">
                    Update
                  </Button>
                  <Button className="btn btn-sm me-1" color="primary">
                    Print
                  </Button>
                </div>
                <div className="table-rating">
                  <span>3</span>
                </div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-1 m-1 little-tiger-wrapper">
              <div>
                <div className="d-flex little-tiger-child">
                  <h5 className="me-1">Male</h5>
                  <h5>Little Tigers Green Tip Belt</h5>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <div className="me-1">|</div>
                  <div className="me-1">
                    <span>Rounds</span>
                    <select style={{ marginLeft: '5px', padding: '2px' }}>
                      <option>1</option>
                    </select>
                  </div>
                  <Button className="btn btn-sm me-1" color="primary">
                    Update
                  </Button>
                  <Button className="btn btn-sm me-1" color="primary">
                    Print
                  </Button>
                </div>
                <div className="table-rating">
                  <span>3</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Modal> */}
    </Fragment>
  ) : (
    <div>
      <Row>
        <Col sm="6">
          <Card body>
            {/* <div tag="h5" className='bg-primary p-1 text-white rounded'>
                Little Tiger
              </div> */}
            <CardTitle tag="h5">
              <div tag="h5" className="bg-primary p-1 text-white rounded">
                Little Tiger
              </div>
            </CardTitle>
            <div className="">
              <div className="text-dark fw-bolder py-2">
                <span>Male</span>
                <span className="ms-2">NOVOICE</span>
                <span className="ms-2"> Yellow Belts and Up</span>
              </div>
              <div>
                <Row className="d-flex justify-content-space align-items-center">
                  <Col md="2">
                    <div className="d-flex me-1">Round</div>
                  </Col>
                  <Col md="4">
                    <div>
                      <Input id="exampleSelect" name="select" type="select">
                        <option>Empty</option>
                        <option>2</option>
                      </Input>
                    </div>
                  </Col>

                  <Col md="2">
                    <div className="d-flex">Rings</div>
                  </Col>
                  <Col md="4">
                    <div>
                      <Input id="exampleSelect" name="select" type="select">
                        <option>Empty</option>
                        <option>2</option>
                      </Input>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <div className="d-flex justify-content-center align-items-center mt-1">
                    <Col>
                      <button type="button" className="btn btn-primary me-2 ">
                        Update
                      </button>
                    </Col>
                    <Col>
                      <button type="button" className="btn btn-primary ">
                        Print
                      </button>
                    </Col>
                    <Col xl="6" className="d-flex justify-content-end align-items-center">
                      <button type="button" className="btn btn-primary rounded-circle m-1 btn-sm">
                        <div
                          className="align-items-center justify-content-center"
                          style={{ paddingBottom: '4px', paddingTop: '4px' }}
                        >
                          8
                        </div>
                      </button>
                    </Col>
                  </div>
                </Row>
              </div>
            </div>
          </Card>
        </Col>
        <Col sm="6">
          <Card body>
            <CardTitle tag="h5">
              <div tag="h5" className="bg-primary p-1 text-white rounded">
                Age: 12 To 14
              </div>
            </CardTitle>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm="6">
          <Card body>
            <CardTitle tag="h5">
              <div tag="h5" className="bg-primary p-1 text-white rounded">
                Age: 8 To 9
              </div>
            </CardTitle>
          </Card>
        </Col>
        <Col sm="6">
          <Card body>
            <CardTitle tag="h5">
              <div tag="h5" className="bg-primary p-1 text-white rounded">
                Age: 15 To 17
              </div>
            </CardTitle>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm="6">
          <Card body>
            <CardTitle tag="h5">
              <div tag="h5" className="bg-primary p-1 text-white rounded">
                Age: 10 To 11
              </div>
            </CardTitle>
          </Card>
        </Col>
        <Col sm="6">
          <Card body>
            <CardTitle tag="h5">
              <div tag="h5" className="bg-primary p-1 text-white rounded">
                Age: 18 UP
              </div>
            </CardTitle>
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <button onClick={handleClick} type="button" class="btn btn-primary">
          Back
        </button>
      </div>
    </div>
  );
};
export default EventStatsMain;
