// ** React Imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';
import AvatarGroup from '@components/avatar-group';

// ** Store & Actions

// ** Icons Imports
import { Edit, MoreVertical, Trash } from 'react-feather';

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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch } from 'react-redux';
import { removeEventRegistrantAction } from '../store/actions';
const MySwal = withReactContent(Swal);

const customConfirmClass = 'w-40 btn btn-danger';
const customCancelClass = 'w-40 ms-1 btn btn-outline-danger';
// ** Renders Client Columns
const useColumns = (
  setDeleteModal,
  toggle,
  divisionOption,
  refetchRegistrantData,
  setUpdateModalState,
  setSelectRow
) => {
  const dispatch = useDispatch();

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

    if (row?.profilePhoto) {
      return (
        <Link
          to={`/other/membership/view/${row._id}`}
          // onClick={() => store.dispatch(getUser(row.id))}
        >
          <Avatar className="me-1" img={row?.photo} width="32" height="32" />
        </Link>
      );
    } else {
      return (
        <Link
          to={`/other/membership/view/${row._id}`}
          // onClick={() => store.dispatch(getUser(row.id))}
        >
          <Avatar
            color={color || 'primary'}
            className="me-1"
            content={row.member[0].firstName || 'N A'}
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

  const onDelete = async (id) => {
    const result = await confirm('Are you sure?', {
      closeOnOverlayClick: true,
      classNames: 'custom_confirm_box'
    });
    if (result) {
      store.dispatch(deleteClientContact(id));
      return;
    }
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

  const columns = [
    {
      name: 'Full Name',
      sortable: true,
      width: '14%',
      sortField: 'fullName',
      selector: (row) =>
        row.member[0].firstName +
        (row.member[0].middleName ? ' ' + row.member[0].middleName : '') +
        (row.member[0].lastName ? ' ' + row.member[0].lastName : ''),
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <Link
              to={`/other/membership/view/${row.member[0]._id}`}
              className="user_name text-truncate text-body"
              // onClick={() => store.dispatch(getUser(row.id))}
            >
              <span className="fw-bolder">
                {row.member[0].firstName +
                  (row.member[0].middleName ? ' ' + row.member[0].middleName : '') +
                  (row.member[0].lastName ? ' ' + row.member[0].lastName : '')}
              </span>
            </Link>
            <small className="text-truncate text-muted mb-0">{row.member[0].email}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Rank',
      sortable: true,
      sortField: 'rank',
      width: '7%',
      selector: (row) => row.rank,
      cell: (row) => (
        <>
          {row.rank && row.rank.length > 0 ? (
            <AvatarGroup
              data={row.rank.map((rankItem, index) => {
                return {
                  _id: rankItem._id,
                  title: rankItem.rankName,
                  placement: 'bottom',
                  img: rankItem.rankImage,
                  imgHeight: 33,
                  imgWidth: 33
                };
              })}
            />
          ) : (
            <h6> Not Rank</h6>
          )}
        </>
      )
    },
    {
      name: 'Divisions',
      sortable: true,
      sortField: 'divisions',
      width: '20%',
      selector: (row) => row.division,
      cell: (row) => (
        <div className="d-flex flex-row">
          {row.division.map((divisionItem, divisionIndex) => {
            let indexNum;
            divisionOption.map((item, index) => {
              if (item.value.toString() === divisionItem._id.toString()) indexNum = index;
            });
            const states = [
                'light-success',
                'light-danger',
                'light-warning',
                'light-info',
                'light-primary',
                'light-secondary',
                'success',
                'danger',
                'warning',
                'info',
                'primary',
                'secondary'
              ],
              color = states[indexNum % 12];
            if (divisionIndex < 2)
              return (
                <Badge className="ms-1" color={color || 'primary'}>
                  {divisionItem.divisionName}
                </Badge>
              );
            else if (divisionIndex + 1 === row.division.length && row.division.length > 2)
              return (
                <Badge className="ms-1" color={'light-primary'}>
                  + {row.division.length - 2}
                </Badge>
              );
          })}
        </div>
      )
    },
    {
      name: 'Location',
      sortable: true,
      sortField: 'location',
      width: '20%',
      selector: (row) => row.location[0].name,
      cell: (row) => <span>{row.location[0].name}</span>
    },
    {
      name: 'Type',
      sortable: true,
      sortField: 'type',
      width: '7%',
      selector: (row) => row.registrantType,
      cell: (row) => <span>{row.registrantType}</span>
    },
    {
      name: 'Status',
      sortable: true,
      sortField: 'status',
      width: '8%',
      selector: (row) => row.signStatus,
      cell: (row) => (
        <>
          {row.signStatus ? (
            <Badge className="text-white bg-light-success">Confirmed</Badge>
          ) : (
            <Badge className="text-white bg-light-danger">Pending</Badge>
          )}
        </>
      )
    },
    {
      name: 'Date Registered',
      sortable: true,
      sortField: 'register',
      width: '12%',
      selector: (row) => row.updatedAt,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column">
            <span className="">{new Date(row.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Manage',
      width: '8%',
      cell: (row) => (
        <div className="column-action">
          <UncontrolledDropdown>
            <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu container="body">
              <DropdownItem
                tag="span"
                className="w-100"
                onClick={() => {
                  setUpdateModalState(true);
                  setSelectRow(row);
                }}
              >
                <Edit size={14} className="me-50" />
                <span className="align-middle">Edit</span>
              </DropdownItem>
              <DropdownItem
                tag="span"
                className="w-100"
                onClick={() => {
                  handleDeleteRegistrant(row);
                }}
              >
                <Trash size={14} className="me-50" />
                <span className="align-middle">Trash</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];
  const handleDeleteRegistrant = (item) => {
    MySwal.fire({
      icon: 'info',
      showCancelButton: true,
      title: `Are you delete Member's registrant ?`,
      customClass: {
        confirmButton: customConfirmClass,
        cancelButton: customCancelClass
      },
      showClass: {
        popup: 'animate__animated animate__bounceIn'
      },
      buttonsStyling: false
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        let memberName =
          item.member[0].firstName +
          (item.member[0].middleName ? ' ' + item.member[0].middleName : '') +
          (item.member[0].lastName ? ' ' + item.member[0].lastName : '');
        dispatch(removeEventRegistrantAction(item._id, memberName, refetchRegistrantData));
      }
    });
  };

  return {
    columns
  };
};

export default useColumns;
