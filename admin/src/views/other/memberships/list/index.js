import { Fragment, useContext, useState } from 'react';
import Breadcrumbs from '@components/breadcrumbs';
import { Users, DollarSign, MoreVertical } from 'react-feather';
import { Link } from 'react-router-dom';
import Avatar from '@components/avatar';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from 'reactstrap';
import { Col, Row } from 'reactstrap';
import { TableData } from '../../../userAllData/TableData';
import { CiEdit } from 'react-icons/ci';
import '@styles/react/apps/app-users.scss';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import '../../../../assets/styles/Admin.scss';
import { AddNewMemberShip } from '../../../cmacomponent/AddNewMembership';
import { locationById } from '../../../../requests/location/LocationAPI';
import { AbilityContext } from '@src/utility/context/Can';
import { useSelector } from 'react-redux';

const MemberShips = () => {
  const [active, setActive] = useState('1');
  const ability = useContext(AbilityContext);
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const store = useSelector((state) => state?.eventMain.eventListingData);
  const eventData = store ? store : null;
  const [isOpen, setIsOpen] = useState(new Array(eventData.length).fill(false));
  const eventTypes = eventData
    ? {
        Tournament: eventData.filter((event) => event.eventType === 'tournament'),
        Testing: eventData.filter((event) => event.eventType === 'testing'),
        Instructor: eventData.filter((event) => event.eventType === 'instructor'),
        Seminars: eventData.filter((event) => event.eventType === 'seminar'),
        Guest: eventData.filter((event) => event.eventType === 'guest')
      }
    : {};
  const addMemberShipsPopUp = true;
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showMembershipData, setShowMembershipData] = useState(false);

  const handleEdit = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };
  const reloadData = {
    location: false,
    users: false,
    operators: false,
    members: false,
    admin: false,
    memberShipData: true
  };

  const renderClient = (row) => {
    const stateNum = Math.floor(Math.random() * 6),
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum];

    if (row?.photo?.length) {
      return (
        <Link to={`/other/membership/view/${row._id}`}>
          <Avatar className="me-1" img={row?.photo} width="32" height="32" />
        </Link>
      );
    } else {
      return (
        <Link to={`/other/membership/view/${row._id}`}>
          <Avatar
            color={color || 'primary'}
            className="me-1"
            content={row.fullName || 'N A'}
            initials
          />
        </Link>
      );
    }
  };
  const locationName = (locationId) => {
    const response = locationById(locationId);
    if (response && response.data && response.data.length > 0) {
      return response.data[0].name;
    } else {
      return '';
    }
  };

  const columns = [
    {
      name: 'Name',
      sortable: true,
      minWidth: '220px',
      sortField: 'fullName',
      selector: (row) => row.name,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <Link
              to={`/other/membership/view/${row._id}`}
              className="user_name text-truncate text-body"
            >
              {row.name}
            </Link>
          </div>
        </div>
      )
    },
    {
      name: 'location',
      sortable: true,
      width: '150px',
      sortField: 'rank',
      selector: (row) => row.locationId,
      cell: (row) => <span>{locationName(row?.locationId) || '-'}</span>
    },
    {
      name: 'cost',
      sortable: true,
      width: '110px',
      sortField: 'status',
      selector: (row) => row.cost?.amount,
      cell: (row) => <span>{row.cost?.amount || '-'}</span>
    },
    {
      name: 'renewal period',
      width: '150px',
      sortable: true,
      sortField: 'status',
      selector: (row) => row?.renewalPeriod?.periodType,
      cell: (row) => <span>{row?.renewalPeriod?.periodType || '-'}</span>
    },
    {
      name: 'age',
      width: '100px',
      sortable: true,
      sortField: 'status',
      selector: (row) => row?.ageTo?.value,
      cell: (row) => <span>{row?.ageTo?.value || '-'}</span>
    },
    {
      name: 'height',
      width: '100px',
      sortable: true,
      sortField: 'status',
      selector: (row) => row?.heightTo?.value,
      cell: (row) => <span>{row?.heightTo?.value || '-'}</span>
    },
    {
      name: 'weight',
      width: '100px',
      sortable: true,
      sortField: 'status',
      selector: (row) => row?.weightTo?.value,
      cell: (row) => <span>{row?.weightTo?.value || '-'}</span>
    },
    {
      name: 'rank',
      width: '110px',
      sortable: true,
      sortField: 'status',
      selector: (row) => row?.rankTo,
      cell: (row) => <span>{row?.rankTo || '-'}</span>
    },
    {
      name: 'gender',
      sortable: true,
      minWidth: '100px',
      sortField: 'address',
      selector: (row) => row?.gender,
      cell: (row) => <span>{row.gender || '-'}</span>
    },
    {
      name: 'Actions',
      width: '100px',
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu className="dropmembersidebar">
              <DropdownItem tag="span" className="w-100">
                <button
                  style={{
                    border: 'none',
                    margin: 0,
                    padding: 0,
                    backgroundColor: 'transparent',
                    cursor: 'pointer'
                  }}
                  className="align-middle"
                  onClick={() => row && handleEdit(row._id)}
                >
                  <CiEdit size={14} className="me-50" />
                  <span>Edit</span>
                </button>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Memberships"
        breadCrumbParent="Manage Others"
        breadCrumbActive="Memberships"
      />
      <Row>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
          <Fragment>
            <Nav pills className="mb-2">
              {ability.can('read', 'tournament') ? (
                <NavItem>
                  <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
                    <Users className="font-medium-1 me-50" />
                    <span className="fs-6">Memberships</span>
                  </NavLink>
                </NavItem>
              ) : (
                <></>
              )}
              {ability.can('read', 'testing') ? (
                <NavItem>
                  <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
                    <DollarSign className="font-medium-1 me-50" />
                    <span className="fs-6">Sales</span>
                  </NavLink>
                </NavItem>
              ) : (
                <></>
              )}
            </Nav>
          </Fragment>
        </Col>
      </Row>
      <TableData
        reloadData={reloadData}
        tableColumns={columns}
        addMemberShipsPopUp={addMemberShipsPopUp}
        setShowMembershipData={setShowMembershipData}
        showMembershipData={showMembershipData}
      />
      {showModal && (
        <AddNewMemberShip
          showModal={showModal}
          selectedId={selectedId}
          setShowModal={setShowModal}
          setShowMembershipData={setShowMembershipData}
        />
      )}
    </Fragment>
  );
};

export default MemberShips;
