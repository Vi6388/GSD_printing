// ** React Imports
import { Fragment, useState } from 'react';
// ** Custom Components
import { AiOutlinePlus } from 'react-icons/ai';
import Avatar from '../../../../../../@core/components/avatar';
import { Progress } from 'reactstrap';
import { BiPhoneCall } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsChatLeftTextFill } from 'react-icons/bs';
import { Edit } from 'react-feather';
import { MoreVertical } from 'react-feather';

// ** User List Component
import DataTable from 'react-data-table-component';
// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Modal,
  DropdownItem,
  ModalHeader,
  Button,
  Row,
  Col,
  ModalBody,
  ModalFooter
} from 'reactstrap';

// ** Styles
// import '@styles/react/apps/app-users.scss'
import '@styles/react/apps/app-kanban.scss';
import Card from './Card';
import Modaldata from './Modaldata';
import Description from './Description';
import progressionimage from './belt.png';
const Layout = (props) => {
  const { title, subtitle1, subtitle2, des1, des2 } = props;

  const [descriptiondetails, setDescriptiondetails] = useState();
  const [showdetails, setShowdetails] = useState(false);
  const expandcard = (item) => {
    setDescriptiondetails(item);
    setShowdetails(true);
  };

  const [activecard, setActivecard] = useState('');
  const [itemmodal, setItemmodal] = useState(false);
  const toggleitemmodal = () => setItemmodal(!itemmodal);

  const projectsArr = [
    {
      progress: 'Candidate',
      programme: 'Leadership Club',
      progressColor: 'info',
      totalTasks: '1',
      subtitle: 'React Project',
      title: 'BGC eCommerce App',
      img: progressionimage
    },
    {
      programme: 'Leadership Clubh',
      progress: 'Candidate',
      totalTasks: '1',
      progressColor: 'danger',
      subtitle: 'UI/UX Project',
      title: 'Falcon Logo Design',
      img: progressionimage
    },
    {
      progress: 'Candidate',
      programme: 'Leadership Club',
      totalTasks: '2',
      progressColor: 'success',
      subtitle: 'Vuejs Project',
      title: 'Dashboard Design',
      img: progressionimage
    },
    {
      programme: 'Leadership Club',
      progress: 'Candidate',
      totalTasks: '3',
      progressColor: 'warning',
      subtitle: 'iPhone Project',
      title: 'Foodista mobile app',
      img: progressionimage
    },

    {
      progress: 'Candidate',
      programme: 'Leadership Club',
      totalTasks: '2',
      progressColor: 'info',
      subtitle: 'React Project',
      title: 'Dojo React Project',
      img: progressionimage
    },
    {
      progress: 'Candidate',
      programme: 'Leadership Club',
      totalTasks: '1',
      title: 'HTML Project',
      progressColor: 'success',
      subtitle: 'Crypto Website',
      img: progressionimage
    },
    {
      progress: 'Candidate',
      programme: 'Leadership Club',
      totalTasks: '2',
      progressColor: 'success',
      subtitle: 'Vuejs Project',
      title: 'Vue Admin template',
      img: progressionimage
    }
  ];

  const columns = [
    {
      sortable: true,
      minWidth: '100px',
      name: 'Profile',
      selector: (row) => row.title,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="avatar-wrapper ">
              <Avatar className="me-1" img={row.img} alt={row.title} imgWidth="40" imgHeight="40" />
            </div>
          </div>
        );
      }
    },
    {
      name: 'Program',
      selector: (row) => row.programme
    },
    {
      name: 'Rank Name',
      selector: (row) => row.progress,
      sortable: true,

      selector: (row) => row.progress
    },
    {
      name: 'Day to ready',
      selector: (row) => row.totalTasks
    },

    {
      name: 'Lession to ready',
      selector: (row) => row.totalTasks
    },
    {
      name: 'Rank order',
      selector: (row) => row.totalTasks
    },
    {
      name: 'Manage',
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

  return !showdetails ? (
    <>
      <div>
        <Modal centered={true} isOpen={itemmodal} toggle={toggleitemmodal} size="lg">
          <ModalHeader toggle={toggleitemmodal}>Roles</ModalHeader>
          <ModalBody className="p-3">
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
        <div className="app-user-list p-1">
          <div className="my-1 d-flex justify-content-end">
            <Button color="primary">Add AUTOMATION</Button>
          </div>

          <div className="react-dataTable user-view-account-projects">
            <DataTable
              noHeader
              responsive
              columns={columns}
              data={projectsArr}
              className="react-dataTable"
            />
          </div>
        </div>
      </Fragment>
    </>
  ) : (
    <Description setShowdetails={setShowdetails} descriptiondetails={descriptiondetails} />
  );
};

export default Layout;
