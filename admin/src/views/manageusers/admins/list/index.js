import { Fragment } from 'react';
import Breadcrumbs from '@components/breadcrumbs';
import { Link } from 'react-router-dom';
import Avatar from '@components/avatar';
import { MoreVertical } from 'react-feather';
import { AiOutlineUser } from 'react-icons/ai';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { User, UserPlus, UserCheck, UserX } from 'react-feather';
import '@styles/react/apps/app-users.scss';
import { ClientStatus } from '../../../userAllData/ClientStatus';
import { FilterData } from '../../../userAllData/FilterData';
import { TableData } from '../../../userAllData/TableData';
import { CiEdit } from 'react-icons/ci';
import { fetchAdmindata } from '../../../../requests/admin/AdminAPI';
import '../../../../assets/styles/Admin.scss';
import changeUserType from '../../changeUserType';
import { fetchLocationdata } from '../../../../requests/location/LocationAPI';
import { useDispatch } from 'react-redux';

const AdminPage = () => {
  const dispatch = useDispatch();
  const { data, refetch } = fetchAdmindata();
  const { data: locationData } = fetchLocationdata();
  const dropdownClasses = data?.length >= 2 ? 'dropsidebar' : '';
  const reloadData = {
    location: false,
    users: false,
    operators: false,
    members: false,
    admin: true
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
            state: { users: 'users', label: 'Admin' }
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
            state: { users: 'users', label: 'Admin' }
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
      minWidth: '240px',
      sortField: 'fullName',
      selector: (row) => row.firstName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <Link
              to={{
                pathname: `/other/membership/view/${row._id}`,
                state: { users: 'users', label: 'Admin' }
              }}
              className="user_name text-truncate text-body"
            >
              {row.firstName} {row.middleName} {row.lastName}
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
      selector: (row) => row.phone,
      cell: (row) => <span>{row.phone}</span>
    },
    {
      name: 'location',
      width: '150px',
      sortable: true,
      sortField: 'status',
      selector: (row) => row.city,
      cell: (row) => <span>{row.city}</span>
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
                onClick={() =>
                  changeUserType({
                    dispatch,
                    userId: row._id,
                    demoteTo: 'operator',
                    locationData: locationData,
                    refetch
                  })
                }
              >
                <AiOutlineUser size={14} className="me-50" />
                <span className="align-middle">Demote to operator</span>
              </DropdownItem>
              <DropdownItem
                tag="span"
                className="w-100"
                onClick={() =>
                  changeUserType({
                    dispatch,
                    userId: row._id,
                    demoteTo: 'user',
                    locationData: locationData,
                    refetch
                  })
                }
              >
                <AiOutlineUser size={14} className="me-50" />
                <span className="align-middle">Demote to user</span>
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
        breadCrumbTitle="Admin"
        breadCrumbParent="Manage Users"
        breadCrumbActive="Admin"
      />
      <div className="app-user-list">
        <ClientStatus statsData={statsData} />
        <FilterData filterData={filterData} />
        <TableData reloadData={reloadData} tableColumns={columns} />
      </div>
    </Fragment>
  );
};

export default AdminPage;
