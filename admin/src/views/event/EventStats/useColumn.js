// ** React Imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Store & Actions

// ** Icons Imports
import { MoreVertical, Printer } from 'react-feather';

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
  DropdownItem,
  Button,
  Input
} from 'reactstrap';
import { MdSave, MdUpdate } from 'react-icons/md';

// ** Renders Client Columns
const useColumns = ({ toggleDivision, mockData, setData }) => {
  const [editable, setEditable] = useState(false);
  const [editedData, setEditedData] = useState({});

  const handleInputChange = (id, key, value) => {
    if (id === editable) {
      setEditedData((prevData) => ({
        ...prevData,
        [id]: {
          ...prevData[id],
          [key]: value
        }
      }));
    }
  };

  const handleSave = () => {
    const updatedData = mockData?.map((item) => {
      if (editedData[item.id]) {
        return { ...item, ...editedData[item.id] };
      }
      return item;
    });
    setData(updatedData);
    setEditable(false);
    setEditedData({});
  };

  const eventTiger = [
    {
      name: 'Gender',
      sortable: true,
      minWidth: '125px',
      sortField: 'gender',
      selector: (row) => row.gender,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {editable === row.id ? (
            <Input
              type="text"
              name={`gender${row.id}`}
              value={editedData[row.id]?.gender ?? row.gender}
              onChange={(e) => handleInputChange(row.id, 'gender', e.target.value)}
            />
          ) : (
            <div>{row.gender}</div>
          )}
        </div>
      )
    },
    {
      name: 'Division Name',
      minWidth: '265px',
      selector: (row) => row.divisionName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {editable === row.id ? (
            <Input
              type="text"
              name={`divisionName${row.id}`}
              value={editedData[row.id]?.divisionName ?? row.divisionName}
              onChange={(e) => handleInputChange(row.id, 'divisionName', e.target.value)}
            />
          ) : (
            <div>{row.divisionName}</div>
          )}
        </div>
      )
    },
    {
      name: 'Round',
      minWidth: '80px',
      selector: (row) => row.round,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {editable === row.id ? (
            <select
              name={`round${row.id}`}
              value={editedData[row.id]?.round ?? row.round}
              style={{
                padding: '5px',
                border: '1px solid #dfdbdb',
                background: 'transparent',
                borderRadius: '5px'
              }}
              onChange={(e) => handleInputChange(row.id, 'round', e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          ) : (
            <div>{row.round}</div>
          )}
        </div>
      )
    },
    {
      name: 'Ring',
      minWidth: '80px',
      selector: (row) => row.ring,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {editable === row.id ? (
            <select
              name={`ring${row.id}`}
              value={editedData[row.id]?.ring ?? row.ring}
              style={{
                padding: '5px',
                border: '1px solid #dfdbdb',
                background: 'transparent',
                borderRadius: '5px'
              }}
              onChange={(e) => handleInputChange(row.id, 'Ring', e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          ) : (
            <div>{row.ring}</div>
          )}
        </div>
      )
    },
    {
      name: 'Total',
      minWidth: '80px',
      selector: (row) => row.total,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <div className="table-rating">
            <span>{row.total}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Actions',
      minWidth: '100px',
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm" container="body">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu>
              {editable === row.id ? (
                <DropdownItem tag="span" className="w-100" onClick={handleSave}>
                  <MdSave size={14} className="me-50" />
                  <span className="align-middle">Save</span>
                </DropdownItem>
              ) : (
                <DropdownItem
                  tag="span"
                  className="w-100"
                  onClick={() => {
                    setEditable(row.id);
                  }}
                >
                  <MdUpdate size={14} className="me-50" />
                  <span className="align-middle">Update</span>
                </DropdownItem>
              )}
              <DropdownItem
                tag="span"
                // href="/"
                className="w-100"
              >
                <Printer size={14} className="me-50" />
                <span className="align-middle">Print</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];

  const statusObj = {
    pending: 'light-warning',
    Confirm: 'light-success'
  };

  const modalColumns = [
    {
      name: 'Full Name',
      sortable: true,
      sortField: 'fullName',
      minWidth: '150px',
      selector: (row) => row.fullName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">{row.fullName}</div>
      )
    },
    {
      name: 'Tournament Age',
      center: true,
      minWidth: '180px',
      selector: (row) => row.tournamentAge,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">{row.tournamentAge}</div>
      )
    },
    {
      name: 'Division',
      center: true,
      minWidth: '150px',
      selector: (row) => row.division,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">{row.division}</div>
      )
    },
    {
      name: 'Rank',
      center: true,
      selector: (row) => row.rank,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">{row.rank}</div>
      )
    },
    {
      name: 'Status',
      center: true,
      selector: (row) => row.status,
      cell: (row) => (
        <>
          {row.status === 'Paid' ? (
            <Badge className="text-capitalize" color="light-success" pill>
              Paid
            </Badge>
          ) : row.status === 'Not Paid' ? (
            <Badge className="text-capitalize" color="light-primary" pill>
              Not Paid
            </Badge>
          ) : (
            ''
          )}
        </>
      )
    },
    {
      name: 'Actions',
      minWidth: '100px',
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm" container="body">
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

  const columns = [
    {
      name: 'School Name',
      sortable: true,
      sortField: 'schoolName',
      selector: (row) => row.schoolName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">{row.schoolName}</div>
      )
    },
    {
      name: 'Address',
      center: true,
      selector: (row) => row.address,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">{row.address}</div>
      )
    },
    {
      name: 'Athletes',
      selector: (row) => row.athletes,
      cell: (row) => (
        <span className="d-flex justify-content-left align-items-center">{row.athletes}</span>
      )
    },
    {
      name: 'Coach',
      selector: (row) => row.coach,
      cell: (row) => (
        <div className="d-flex justify-content-center align-items-center">{row.coach}</div>
      )
    },
    {
      name: 'Referee',
      selector: (row) => row.referee,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">{row.referee}</div>
      )
    },
    {
      name: 'View Details',
      selector: (row) => row.id,
      cell: (row) => (
        <Button color="primary" className="btn-sm" outline onClick={() => toggleDivision(row)}>
          View
        </Button>
      )
    }
  ];

  return {
    columns,
    modalColumns,
    eventTiger
  };
};

export default useColumns;
