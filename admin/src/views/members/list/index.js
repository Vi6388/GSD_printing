// ** React Imports
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';
import Avatar from '@components/avatar';

// ** Components
import { ClientStatus } from '../../userAllData/ClientStatus';
import { FilterData } from '../../userAllData/FilterData';
import { TableData } from '../../userAllData/TableData';

// ** Icons
import { User, UserPlus, UserCheck, UserX, MoreVertical } from 'react-feather';
import { BiPhoneCall } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsChatLeftTextFill } from 'react-icons/bs';

// ** Reactstrap
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge
} from 'reactstrap';

// ** Data
import { fetchMemberdata } from '../../../requests/member/GetMembers';
import { locationById } from '../../../requests/location/LocationAPI';
import { fetchMemberRankById } from '../../../requests/member/GetMembers';
import { fetchRankAllData } from '../../../requests/settings/sport-management';

// ** Styles
import '@styles/react/apps/app-users.scss';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import '../../../assets/styles/Admin.scss';

const Client = () => {
  const { data } = fetchMemberdata();
  const { data: allRankCategory } = fetchRankAllData();

  const addMemberPopUp = true;
  const dropdownClasses = data?.length >= 2 ? 'dropsidebar dropdown-menu show' : '';
  const reloadData = {
    location: false,
    users: false,
    operators: false,
    members: true,
    admin: false
  };

  const male = data?.filter((item) => item.gender === 'male').length;
  const female = data?.filter((item) => item.gender === 'female').length;
  const other = data?.filter((item) => item.gender === 'other').length;
  const genderCount = male !== undefined ? `${male}/${female}/${other}` : '0';

  const statsData = [
    {
      key: 1,
      color: 'primary',
      title: 'Total Members',
      icon: <User size={20} />,
      value: data?.length
    },
    {
      key: 2,
      color: 'danger',
      title: 'Active Members',
      icon: <UserPlus size={20} />,
      value: data?.filter((item) => item.isActive === true).length
    },
    {
      key: 3,
      color: 'success',
      title: 'Deactive Members',
      icon: <UserCheck size={20} />,
      value: data?.filter((item) => item.isActive === false).length
    },
    {
      key: 4,
      color: 'warning',
      title: 'Male/Female/Other',
      icon: <UserX size={20} />,
      value: genderCount
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

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDifference = today.getMonth() - dobDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }
    return age;
  };

  const renderLatestRanks = (id) => {
    const { data: memberRankAllData } = fetchMemberRankById(id);
    let latestRanks = [];
    const history =
      memberRankAllData && memberRankAllData[memberRankAllData?.length - 1]?.history?.slice(-2);
    history?.map((h) => {
      allRankCategory?.map((item) => {
        if (h.rankId == item._id) {
          latestRanks.push({ rankId: item._id, rankName: item.rankName, rankImg: item.rankImage });
        }
      });
    });
    return (
      <>
        {latestRanks?.map((item) => (
          <span key={item.rankId}>
            <img src={item?.rankImg} alt={item?.rankName} height={40} />
          </span>
        ))}
      </>
    );
  };

  const location = (id) => {
    const { data } = locationById(id);

    if (data && data.length > 0) {
      return data[0]?.name;
    }
  };
  const columns = [
    {
      name: 'CMA ID',
      sortable: true,
      width: '130px',
      sortField: 'id',
      selector: (row) => row?.membershipId,
      cell: (row) => <span>{row?.membershipId}</span>
    },
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
              to={`/other/membership/view/${row._id}`}
              className="user_name text-truncate text-body"
            >
              {row.firstName} {row.middleName} {row.lastName}
            </Link>
          </div>
        </div>
      )
    },
    {
      name: 'latest ranks',
      sortable: true,
      width: '170px',
      sortField: 'rank',
      cell: (row) => <>{renderLatestRanks(row._id)}</>
    },
    {
      name: 'age',
      sortable: true,
      width: '130px',
      sortField: 'rank',
      selector: (row) => row.dateOfBirth,
      cell: (row) => <span>{calculateAge(row.dateOfBirth)}</span>
    },
    {
      name: 'gender',
      sortable: true,
      minWidth: '110px',
      sortField: 'status',
      selector: (row) => row.gender,
      cell: (row) => <span>{row.gender.charAt(0).toUpperCase() + row.gender.slice(1)}</span>
    },
    {
      name: 'location',
      sortable: true,
      width: '130px',
      sortField: 'rank',
      selector: (row) => row.dateOfBirth,
      cell: (row) => <span>{location(row?.locationId)}</span>
    },
    {
      name: 'status',
      width: '150px',
      sortable: true,
      sortField: 'status',
      cell: (row) => (
        <>
          <Badge color={row.isActive ? 'success' : 'danger'} pill>
            {row.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </>
      )
    },

    {
      name: 'communicationType',
      sortable: true,
      minWidth: '190px',
      sortField: 'address',
      selector: (row) => row?.communicationType,
      cell: (row) => <span>{row.communicationType}</span>
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
              <DropdownItem
                tag="span"
                // href="/"
                className="w-100"
              >
                <BiPhoneCall size={14} className="me-50" />
                <span className="align-middle">Call</span>
              </DropdownItem>
              <DropdownItem
                tag="span"
                // href="/"
                className="w-100"
              >
                <AiOutlineMail size={14} className="me-50" />
                <span className="align-middle">Email</span>
              </DropdownItem>
              <DropdownItem tag="span" className="w-100">
                <BsChatLeftTextFill size={14} className="me-50" />
                <span className="align-middle">Text</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];
  const roleOptions = [
    { value: '', label: 'All' },
    { value: 'Owner', label: 'Location 1' },
    { value: 'Assistant', label: 'Location 2' },
    { value: 'Billing', label: 'Location 3' }
  ];

  const planOptions = [
    { value: '', label: 'Male & Female' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];

  const statusOptions = [
    { value: '', label: 'All', number: 0 },
    { value: 'active', label: 'Active', number: 1 },
    { value: 'deactive', label: 'Deactive', number: 2 }
  ];

  const communicationOptions = [
    { value: '', label: 'All', number: 0 },
    { value: 'call', label: 'Call', number: 1 },
    { value: 'sms', label: 'SMS', number: 2 },
    { value: 'email', label: 'Email', number: 2 }
  ];
  const filterData = [
    {
      key: 1,
      value: '',
      option: roleOptions,
      lable: 'Location'
    },
    {
      key: 2,
      value: '',
      option: planOptions,
      lable: 'Gender'
    },
    {
      key: 3,
      value: '',
      option: statusOptions,
      lable: 'Status'
    },
    {
      key: 4,
      value: '',
      option: communicationOptions,
      lable: 'Communication Type'
    }
  ];
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Member"
        breadCrumbParent="Manage Others"
        breadCrumbActive="Member"
      />
      <ClientStatus statsData={statsData} />
      <FilterData filterData={filterData} />
      <TableData reloadData={reloadData} tableColumns={columns} addMemberPopUp={addMemberPopUp} />
    </Fragment>
  );
};

export default Client;
