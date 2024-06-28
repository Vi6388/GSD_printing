import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

// ** Icons Imports
import { ChevronDown, MoreVertical } from 'react-feather';

import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// ** Custom Components
import Avatar from '@components/avatar';

// icons import from react-icon
import { BiPhoneCall } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';

const ProgressionPage = () => {
  const [showdelete, setShowdelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const columns = [
    {
      name: 'ID',
      sortable: true,
      width: '130px',
      sortField: 'id',
      selector: (row) => row.user_id,
      cell: (row) => <span>{row.user_id}</span>
    },
    {
      name: 'Full Name',
      sortable: true,
      minWidth: '240px',
      sortField: 'fullName',
      selector: (row) => row.fullName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <Link
              to={`/contacts/client/view/${row._id}`}
              className="user_name text-truncate text-body"
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <span className="fw-bolder">{row.fullName}</span>
            </Link>
            <small className="text-truncate text-muted mb-0">{row.email}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Rank',
      sortable: true,
      width: '130px',
      sortField: 'rank',
      selector: (row) => row.rank,
      cell: (row) => <span>{row.rank}</span>
    },
    {
      name: 'Status',
      sortable: true,
      minWidth: '110px',
      sortField: 'status',
      selector: (row) => row.status,
      cell: (row) => <span>{row.status}</span>
    },
    {
      name: 'Progression',
      width: '210px',
      sortable: true,
      sortField: 'type',
      selector: (row) => row.type,
      cell: (row) => <span className="text-capitalize">{row.type}</span>
    },

    {
      name: 'Location Name',
      sortable: true,
      minWidth: '190px',
      sortField: 'address',
      selector: (row) => row?.address,
      cell: (row) => <span>{row?.address}</span>
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
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  ];

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = 5;
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    );
  };

  const handleRowSelected = ({ selectedRows }) => {
    if (selectedRows.length > 0) {
      setShowdelete(true);
    } else {
      setShowdelete(false);
    }
  };

  // ** Table data to render
  const dataToRender = () => {
    return [
      {
        category: 'Little Tigers Breaking',
        name: 'Little Tigers Breaking',
        fullName: 'Shiv',
        age_from: 16,
        email: 'cmatkd187th@gmail.com',
        rank: 16.0,
        status: 'pending',
        type: 'Little Tigers Breaking',
        gender: 'Male',
        user_id: '63d',
        address: 'dfgytf'
      },
      {
        category: 'Little Tigers Breaking',
        name: 'Little Tigers Breaking',
        email: 'cmatkd187th@gmail.com',
        age_from: 16,
        fullName: 'Shiv',
        rank: 16.0,
        status: 'pending',
        gender: 'Female',
        type: 'Little Tigers Breaking',
        user_id: '63d',
        address: 'dfgytf'
      },
      {
        category: 'Little Tigers Breaking',
        name: 'Little Tigers Breaking',
        email: 'cmatkd187th@gmail.com',
        age_from: 16,
        fullName: 'Shiv',
        rank: 16.0,
        status: 'pending',
        gender: 'Female',
        type: 'Little Tigers Breaking',
        user_id: '63d',
        address: 'dfgytf'
      }
    ];
  };

  // ** Function in get data on page change
  const handlePagination = async (page) => {
    setCurrentPage(page.selected + 1);
  };

  return (
    <Fragment>
      <div className="app-user-list">
        <h1>Progressions</h1>
        <DataTable
          noHeader
          subHeader
          sortServer
          pagination
          responsive
          paginationServer
          columns={columns}
          // onSort={handleSort}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          paginationComponent={CustomPagination}
          data={dataToRender()}
          onSelectedRowsChange={handleRowSelected}
          selectableRows
        />
      </div>
    </Fragment>
  );
};

export default ProgressionPage;
