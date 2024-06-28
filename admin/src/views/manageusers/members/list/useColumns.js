// ** React Imports
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Store & Actions
import { store } from '@store/store';
import { getUser } from '../store';

// ** Icons Imports
import { MoreVertical } from 'react-feather';

// icons import from react-icon

import { BiPhoneCall } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsChatLeftTextFill } from 'react-icons/bs';
// import Note
import Note from './Note';

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { fetchMemberdata } from '../../../../requests/member/GetMembers';

// ** Renders Client Columns
const useColumns = ({ setDeleteModal }, { toggle }) => {
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
          to={`/contacts/client/view/${row._id}`}
          onClick={() => store.dispatch(getUser(row.id))}
        >
          <Avatar className="me-1" img={row?.photo} width="32" height="32" />
        </Link>
      );
    } else {
      return (
        <Link
          to={`/contacts/client/view/${row._id}`}
          onClick={() => store.dispatch(getUser(row.id))}
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

  const statusObj = {
    pending: 'light-warning',
    active: 'light-success',
    inactive: 'light-secondary'
  };

  function PrintAddress({ address }) {
    let fullAddress = '';

    if (!address) {
      return <></>;
    }

    const reorderedAddress = {
      city: null,
      state: null,
      country: null,
      street: null,
      zipCode: null
    };
    const newAddressData = Object.assign(reorderedAddress, address);
    const addressValues = Object.values(newAddressData);
    const displayableAddress = addressValues.slice(0, 3);

    fullAddress = displayableAddress
      .filter((x) => typeof x === 'string' && x.length > 0)
      .join(', ');

    return <>{fullAddress}</>;
  }

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

  const columns = [
    {
      name: 'CMA ID',
      sortable: true,
      width: '130px',
      sortField: 'id',
      selector: (row) => row._id,
      cell: (row) => <span></span>
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
              to={`/contacts/client/view/${row._id}`}
              className="user_name text-truncate text-body"
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <span className="fw-bolder">
                {row.firstName} {row.middleName} {row.lastName}
              </span>
            </Link>
          </div>
        </div>
      )
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
      cell: (row) => <span>{row.gender}</span>
    },
    {
      name: 'status',
      width: '150px',
      sortable: true,
      sortField: 'status',
      selector: (row) => row?.isActive,
      cell: (row) => <span>{row?.shareDisability}</span>
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
            <DropdownMenu>
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
              <DropdownItem
                tag="span"
                // href="/"
                className="w-100"
              >
                <BsChatLeftTextFill size={14} className="me-50" />
                <span className="align-middle">Text</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];

  return {
    columns
  };
};

export default useColumns;
