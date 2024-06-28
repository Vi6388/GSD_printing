// ** React Imports
import { Fragment, useState, useRef } from 'react';

// ** Custom Components
import { AiOutlinePlus } from 'react-icons/ai';

// ** User List Component
import DataTable from 'react-data-table-component';
import { MoreVertical, Edit, Eye } from 'react-feather';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Avatar from '../../../../../../components/avatar';
// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  Row,
  Col,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
// ** Styles
// import '@styles/react/apps/app-users.scss'
import '@styles/react/apps/app-kanban.scss';
import Card from './Card';
import Modaldata from './Modaldata';
import progressionimage from './belt.png';
const Roles = () => {
  const projectsArr = [
    {
      progress: 'Type A',
      programme: 'Form 1',
      progressColor: 'info',
      totalTasks: '01/01/2023',
      subtitle: 'React Project',
      title: 'BGC eCommerce App',
      img: progressionimage
    },
    {
      progress: 'Type B',
      programme: 'Form 2',
      totalTasks: '01/01/2023',
      progressColor: 'danger',
      subtitle: 'UI/UX Project',
      title: 'Falcon Logo Design',
      img: progressionimage
    },
    {
      progress: 'Type C',
      programme: 'Form 3',
      totalTasks: '01/01/2023',
      progressColor: 'success',
      subtitle: 'Vuejs Project',
      title: 'Dashboard Design',
      img: progressionimage
    },
    {
      progress: 'Type D',
      programme: 'Form 4',
      totalTasks: '01/01/2023',
      progressColor: 'warning',
      subtitle: 'iPhone Project',
      title: 'Foodista mobile app',
      img: progressionimage
    }
  ];

  const columns = [
    {
      name: 'Form Name',
      selector: (row) => row.programme
    },
    {
      name: 'Type',
      selector: (row) => row.progress,
      sortable: true,

      selector: (row) => row.progress
    },
    {
      name: 'Last Updated',
      selector: (row) => row.totalTasks
    },

    {
      name: 'Status',
      selector: (row) => row.totalTasks
    },
    {
      name: 'View',
      selector: (row) => row.totalTasks,
      cell: (row) => <Eye></Eye>
    },
    {
      name: 'Take Action',
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag="span" className="w-100">
                <Edit size={14} className="me-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];
  const carddata = [
    {
      title: 'Role Type 1',
      date: '01/01/23',
      time: '03:09',
      totalrank: '12',
      type: 'By Stripe',
      rank: '21'
    },
    {
      title: 'Role Type 2',
      date: '01/01/23',
      time: '03:09',
      totalrank: '12',
      type: 'By Stripe',
      rank: '21'
    },
    {
      title: 'Role Type 3',
      date: '01/01/23',
      time: '03:09',
      totalrank: '12',
      type: 'By Stripe',
      rank: '21'
    }
  ];
  const hiddenFileInput = useRef();
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const [activecard, setActivecard] = useState('');
  const [tabledata, setTabledata] = useState([]);
  const [itemmodal, setItemmodal] = useState(false);
  const toggleitemmodal = () => setItemmodal(!itemmodal);
  return (
    <div className="m-1">
      <div className="">
        <Modal isOpen={itemmodal} toggle={toggleitemmodal} size="md">
          <ModalHeader toggle={toggleitemmodal}>Roles</ModalHeader>
          <ModalBody>
            <Modaldata />
          </ModalBody>
          <ModalFooter>
            <Button color="btn btn-outline-danger" onClick={toggleitemmodal}>
              Cancle
            </Button>{' '}
            <Button color="btn btn-primary" onClick={toggleitemmodal}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <Fragment>
        <div className="app-user-list">
          <Row>
            {carddata?.map((item, i) => (
              <>
                <Col lg="4" sm="6">
                  <div
                    className={`card border ${
                      activecard === item?.title ? 'border border-primary' : ''
                    }`}
                    onClick={() => {
                      setActivecard(item?.title);

                      item?.title === 'Teakwondo' ? setTabledata([]) : setTabledata([]);
                    }}
                  >
                    <Card
                      togglemodal={toggleitemmodal}
                      title={item?.title}
                      subtitle1={item?.date}
                      subtitle2={item?.time}
                      des1={item?.rank}
                      des2={item?.type}
                    />
                  </div>
                </Col>
              </>
            ))}
            {/* <Col xl="12" className="d-flex justify-content-end">

              <Button onClick={toggleitemmodal} color="primary " className="mb-1">
                Add New Role
              </Button >

            </Col> */}
          </Row>
        </div>
      </Fragment>
      <Col xl={12}>
        <div className="react-dataTable user-view-account-projects">
          <DataTable
            noHeader
            responsive
            columns={columns}
            data={projectsArr}
            className="react-dataTable"
          />
        </div>
      </Col>
    </div>
  );
};

export default Roles;
