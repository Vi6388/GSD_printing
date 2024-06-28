import { Fragment } from 'react';
import Breadcrumbs from '@components/breadcrumbs';
import moment from 'moment';
import { User, UserPlus, UserCheck, UserX } from 'react-feather';
import { Link } from 'react-router-dom';
import Avatar from '@components/avatar';
import { ClientStatus } from '../../../userAllData/ClientStatus';
import '@styles/react/apps/app-users.scss';
import { FilterData } from '../../../userAllData/FilterData';
import { TableData } from '../../../userAllData/TableData';
import { fetchLocationdata } from '../../../../requests/location/LocationAPI';

const Client = () => {
  const addNewLocation = true;
  const { data } = fetchLocationdata();

  const statsData = [
    {
      key: 1,
      color: 'primary',
      title: 'Total Clients',
      icon: <User size={20} />,
      value: data?.length
    },
    {
      key: 2,
      color: 'danger',
      title: 'Active Clients',
      icon: <UserPlus size={20} />,
      value: data?.length
    },
    {
      key: 3,
      color: 'success',
      title: 'Past Due Clients',
      icon: <UserCheck size={20} />,
      value: data?.length
    },
    {
      key: 4,
      color: 'warning',
      title: 'Former Clients',
      icon: <UserX size={20} />,
      value: data?.length
    }
  ];
  const reloadData = {
    location: true,
    users: false,
    operators: false,
    members: false,
    admin: false
  };

  const rendarLocationAvatar = (row) => {
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
        <Link to={`/location/view/${row._id}`}>
          <Avatar className="me-1" img={row?.photo} width="32" height="32" />
        </Link>
      );
    } else {
      return (
        <Link to={`/location/view/${row._id}`}>
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
      width: '230px',
      sortField: 'id',
      selector: (row) => row?.name,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {rendarLocationAvatar(row)}
          <div className="d-flex flex-column">
            <Link to={`/location/view/${row._id}`} className="user_name text-truncate text-body">
              {row.name.slice(0, 20)}
            </Link>
          </div>
        </div>
      )
    },
    {
      name: 'Address',
      sortable: true,
      minWidth: '240px',
      sortField: 'fullName',
      selector: (row) => row.address?.country,
      cell: (row) => <span>{row.address?.country}</span>
    },
    {
      name: 'City',
      sortable: true,
      width: '130px',
      sortField: 'rank',
      selector: (row) => row.address?.city,
      cell: (row) => <span>{row.address?.city}</span>
    },
    {
      name: 'State',
      sortable: true,
      minWidth: '110px',
      sortField: 'status',
      selector: (row) => row.address?.state,
      cell: (row) => <span>{row.address?.state}</span>
    },
    {
      name: 'Zip',
      width: '150px',
      sortable: true,
      sortField: 'status',
      selector: (row) => row.address?.zipCode,
      cell: (row) => <span>{row.address?.zipCode}</span>
    },

    {
      name: 'Operator',
      sortable: true,
      minWidth: '190px',
      sortField: 'address',
      selector: (row) => row?.mainOperatorId,
      cell: (row) => (
        <span>
          {row?.mainOperatorId?.firstName} {row?.mainOperatorId?.lastName}
        </span>
      )
    },
    {
      name: 'Start Date',
      sortable: true,
      minWidth: '190px',
      sortField: 'address',
      selector: (row) => row?.createdAt,
      cell: (row) => <span>{row.createdAt && moment(row.createdAt).format('DD-MM-YYYY')}</span>
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
      key: 1,
      value: '',
      option: roleOptions,
      lable: 'Position'
    },
    { key: 2, value: '', option: planOptions, lable: 'Client Type' },
    { key: 3, value: '', option: statusOptions, lable: 'Status' },
    { key: 4, value: '', option: roleOptions, lable: 'Tag' }
  ];
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Location"
        breadCrumbParent="Manage Others"
        breadCrumbActive="Location"
      />
      <div className="app-user-list">
        <ClientStatus statsData={statsData} />
        <FilterData filterData={filterData} />
        <TableData reloadData={reloadData} tableColumns={columns} addNewLocation={addNewLocation} />
      </div>
    </Fragment>
  );
};

export default Client;
