// ** React Imports
import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Store & Actions

// ** Icons Imports
import { MoreVertical, Printer } from 'react-feather';

// icons import from react-icon

import { BiPhoneCall } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsChatLeftTextFill, BsEye } from 'react-icons/bs';
// import Note

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from 'reactstrap';
import { convertUnit } from '../../../utility/Utils';

// ** Renders Client Columns
const useColumns = ({ toggleDivision, event }) => {
  // ** react dom
  const history = useHistory();

  const statusObj = {
    pending: 'light-warning',
    Confirm: 'light-success'
  };

  const modalColumn = [
    {
      name: 'Division',
      sortable: true,
      sortField: 'division',
      selector: (row) => row.division,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">(ID) Member</div>
      )
    },
    {
      name: 'Gender',
      selector: (row) => row.gender,
      cell: (row) => <span>{row.gender}</span>
    },
    {
      name: 'Age',
      center: true,
      selector: (row) => row.age,
      cell: () => (
        <div className="table-rating">
          <span>0</span>
        </div>
      )
    },
    {
      name: 'Rank',
      selector: (row) => row.rank,
      cell: (row) => <span>{row.rank}</span>
    },
    {
      name: 'Weight',
      selector: (row) => row.weight,
      cell: (row) => <span>{row.weight}</span>
    }
  ];

  const columns = [
    {
      name: 'Division Name',
      selector: (row) => row.divisionData.divisionName
      // cell: (row) => <span>{row.divisionData.divisionName}</span>
    },
    {
      name: 'Gender',
      selector: (row) => convertUnit(row.divisionData.gender)
      // cell: (row) => <span>{convertUnit(row.divisionData.gender)}</span>
    },
    {
      name: 'Age Group',
      center: true,
      selector: (row) => row.divisionData.ageFrom + ' - ' + row.divisionData.ageTo
      // cell: (row) => (
      //   <div
      //     className="d-flex justify-content-center align-items-center"
      //     // color="light-primary"
      //     // style={{ width: '80px', height: '32px', fontSize: '18px' }}
      //   >
      //     {row.divisionData.ageFrom + ' - ' + row.divisionData.ageTo}
      //   </div>
      // )
    },
    {
      name: 'Rank Group',
      center: true,
      selector: (row) => row.divisionData.rankFrom + ' - ' + row.divisionData.rankTo
      // cell: (row) => (
      //   <div
      //     className="d-flex justify-content-center align-items-center"
      //     // color="light-primary"
      //     // style={{ width: '80px', height: '32px', fontSize: '18px' }}
      //   >
      //     {row.divisionData.rankFrom + ' - ' + row.divisionData.rankTo}
      //   </div>
      // )
    },
    {
      name: 'Total',
      selector: (row) => row.registrantData.length,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <Badge
            style={{
              width: '30px',
              height: '24px',
              borderRadius: '12px',
              fontSize: '16px',
              textAlign: 'center'
            }}
            color="light-primary"
          >
            {row.registrantData.length}
          </Badge>
        </div>
      )
    },
    {
      name: 'Status',
      sortable: true,
      sortField: 'status',
      // selector: (row) => row.status,
      cell: (row) => (
        <>
          {row.status ? (
            <Badge className="text-capitalize" color="light-success" pill>
              Completed
            </Badge>
          ) : (
            <Badge className="text-capitalize" color="light-primary" pill>
              Pending
            </Badge>
          )}
        </>
      )
    },
    {
      name: 'Report',
      selector: (row) => row.divisionData._id,
      cell: (row) => (
        <>
          {' '}
          <BsEye
            size={16}
            color="#c52f2f"
            className="cursor-pointer"
            onClick={() => toggleDivision(row)}
          />
          <Printer
            size={16}
            color="#c52f2f"
            className="ms-1 cursor-pointer"
            onClick={() => {
              history.push({
                state: {
                  categoryData: row.categoryData,
                  divisionData: row.divisionData,
                  registrantData: row.registrantData,
                  event: event,
                  url: window.location.pathname
                },
                pathname: '/newpage'
              });
            }}
          />
        </>
      )
    }
  ];

  return {
    columns,
    modalColumn
  };
};

export default useColumns;
