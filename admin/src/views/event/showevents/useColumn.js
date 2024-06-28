// ** React Imports
import React from 'react';
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Store & Actions

// ** Icons Imports
import { MoreVertical } from 'react-feather';

// icons import from react-icon

import { BiPhoneCall } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsChatLeftTextFill } from 'react-icons/bs';
// import Note

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

// ** Renders Client Columns
const useColumns = () => {
  const statusObj = {
    pending: 'light-warning',
    Confirm: 'light-success'
  };

  const columns = [
    {
      name: 'Full Name',
      sortable: true,
      sortField: 'fullName',
      selector: (row) => row.fullName,
      cell: (row) => <div className="d-flex justify-content-left align-items-center">Full Name</div>
    },
    {
      name: 'Event',
      center: true,
      selector: (row) => row.billing,
      cell: () => (
        <div className="table-rating">
          <span>0</span>
        </div>
      )
    },
    {
      name: 'Divisions',
      selector: (row) => row.phone,
      cell: (row) => <span>{row.phone}</span>
    },
    {
      name: 'Status',
      sortable: true,
      sortField: 'status',
      selector: (row) => row.status,
      cell: (row) => (
        <Badge className="text-capitalize" color={statusObj[row.status]} pill>
          {row.status}
        </Badge>
      )
    }
  ];

  return {
    columns
  };
};

export default useColumns;
