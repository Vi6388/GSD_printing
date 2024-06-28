import { Fragment } from 'react';
import { User, UserPlus, UserCheck, UserX } from 'react-feather';
import Breadcrumbs from '@components/breadcrumbs';
import { Link } from 'react-router-dom';
import Avatar from '@components/avatar';
import { MoreVertical } from 'react-feather';
import { AiOutlineUser } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { ClientStatus } from '../userAllData/ClientStatus';
import { FilterData } from '../userAllData/FilterData';
import { TableData } from '../userAllData/TableData';

import '@styles/react/apps/app-users.scss';
import { fetchUsersdata } from '../../requests/users/UsersAPI';
import '../../assets/styles/Admin.scss';

import { fetchLocationdata } from '../../requests/location/LocationAPI';
import { useDispatch } from 'react-redux';
import changeUserType from '../manageusers/changeUserType';

const Client = () => {
  const dispatch = useDispatch();
  const { data, refetch } = fetchUsersdata();
  const { data: locationData } = fetchLocationdata();
  const dropdownClasses = data?.length >= 2 ? 'dropsidebar' : '';
  const reloadData = {
    location: false,
    users: true,
    operators: false,
    members: false,
    admin: false
  };
  const statsData = [
    {
      color: 'primary',
      title: 'Total Clients',
      icon: <User size={20} />,
      value: data?.length
    },
    {
      color: 'danger',
      title: 'Active Clients',
      icon: <UserPlus size={20} />,
      value: data?.length
    },
    {
      color: 'success',
      title: 'Past Due Clients',
      icon: <UserCheck size={20} />,
      value: data?.length
    },
    {
      color: 'warning',
      title: 'Former Clients',
      icon: <UserX size={20} />,
      value: data?.length
    }
  ];

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
        <Link
          to={{
            pathname: `/other/membership/view/${row._id}`,
            state: { users: 'users', label: 'User' }
          }}
        >
          <Avatar className="me-1" img={row?.photo} width="32" height="32" />
        </Link>
      );
    } else {
      return (
        <Link
          to={{
            pathname: `/other/membership/view/${row._id}`,
            state: { users: 'users', label: 'User' }
          }}
        >
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

  const columns = [
    {
      name: 'Name',
      sortable: true,
      minWidth: '200px',
      sortField: 'fullName',
      selector: (row) => row.firstName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <Link
              to={{
                pathname: `/other/membership/view/${row._id}`,
                state: { users: 'users', label: 'User' }
              }}
              className="user_name text-truncate text-body"
            >
              {row.firstName} {row.lastName}
            </Link>
          </div>
        </div>
      )
    },
    {
      name: 'email',
      sortable: true,
      width: '240px',
      sortField: 'rank',
      selector: (row) => row.email,
      cell: (row) => <span>{row.email}</span>
    },
    {
      name: 'phone',
      sortable: true,
      minWidth: '110px',
      sortField: 'status',
      selector: (row) => (row.locations && row.locations.length > 0 ? row.locations[0].phone : ''),
      cell: (row) => (
        <span>{row.locations && row.locations.length > 0 ? row.locations[0].phone : ''}</span>
      )
    },
    {
      name: 'location',
      width: '150px',
      sortable: true,
      sortField: 'status',
      selector: (row) =>
        row.locations && row.locations.length > 0 ? row.locations[0].address.city : '',
      cell: (row) => (
        <span>
          {row.locations && row.locations.length > 0 ? row.locations[0].address.city : ''}
        </span>
      )
    },
    {
      name: 'Actions',
      minWidth: '100px',
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu className={dropdownClasses}>
              <DropdownItem tag="span" className="w-100">
                <CiEdit size={14} className="me-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
              <DropdownItem
                tag="span"
                className="w-100"
                onClick={() => {
                  changeUserType({
                    dispatch,
                    userId: row._id,
                    promoteTo: 'operator',
                    locationId: row.locations[0]._id,
                    refetch
                  });
                }}
              >
                <AiOutlineUser size={14} className="me-50" />
                <span className="align-middle">Promote to operator</span>
              </DropdownItem>
              <DropdownItem
                tag="span"
                className="w-100"
                onClick={() =>
                  changeUserType({
                    dispatch,
                    userId: row._id,
                    promoteTo: 'admin',
                    refetch
                  })
                }
              >
                <AiOutlineUser size={14} className="me-50" />
                <span className="align-middle">Promote to Admin</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];
  const roleOptions = [
    { value: '', label: 'Select Position' },
    { value: 'Owner', label: 'Owner' },
    { value: 'Assistant', label: 'Assistant' },
    { value: 'Billing', label: 'Billing' }
  ];

  const planOptions = [
    { value: '', label: 'Select Plan' },
    { value: 'Individual', label: 'Individual' },
    { value: 'company', label: 'Company' }
  ];

  const statusOptions = [
    { value: '', label: 'Select Status', number: 0 },
    { value: 'pending', label: 'Pending', number: 1 },
    { value: 'active', label: 'Active', number: 2 },
    { value: 'inactive', label: 'Inactive', number: 3 }
  ];
  const filterData = [
    {
      value: '',
      option: roleOptions,
      lable: 'Position'
    },
    {
      value: '',
      option: planOptions,
      lable: 'Client Type'
    },
    {
      value: '',
      option: statusOptions,
      lable: 'Status'
    },
    {
      value: '',
      option: roleOptions,
      lable: 'Tag'
    }
  ];
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Users"
        breadCrumbParent="Manage Others"
        breadCrumbActive="Users"
      />
      <div className="app-user-list">
        <ClientStatus statsData={statsData} />
        <FilterData filterData={filterData} />
        <TableData reloadData={reloadData} tableColumns={columns} />
      </div>
    </Fragment>
  );
};

export default Client;
