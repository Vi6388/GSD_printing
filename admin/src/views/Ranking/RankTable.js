import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { ChevronDown, User } from 'react-feather';
import ReactPaginate from 'react-paginate';
import { Card } from 'reactstrap';
// import Avatar from '../components/avatar';
import Avatar from '@components/avatar';
import notRankImg from '@src/assets/images/rank/notrank.png';

import { calculateAge, convertUnit } from '../../utility/Utils';

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
      <Link to={`/other/membership/view/${row._id}`}>
        <Avatar className="me-1" img={row.profilePhoto} width="32" height="32" />
      </Link>
    );
  } else {
    return (
      <Link to={`/other/membership/view/${row._id}`}>
        <Avatar
          color={color || 'primary'}
          className="me-1"
          content={row.firstName || 'N A'}
          initials
        />
      </Link>
    );
  }
};

const columns = [
  {
    name: 'CMA ID',
    sortable: true,
    selector: (row) => row._id.substr(-4)
  },
  {
    name: 'Name',
    sortable: true,
    minWidth: '230px',
    sortable: (row) => row.firstName,
    cell: (row) => (
      <div className="d-flex align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <span className="text-truncate fw-bolder">
            {row.firstName + row.middleName
              ? row.middleName
              : '' + row.lastName
              ? row.lastName
              : ''}
          </span>
          <small className="text-muted">{row.email}</small>
        </div>
      </div>
    )
  },

  {
    name: 'Belt Rank',
    sortable: true,
    minWidth: '230px',
    sortable: (row) => row.full_name,
    cell: (row) => (
      <div className="d-flex align-items-center">
        <Avatar
          className="mx-1"
          img={row.rankData ? row.rankData.rankImage : notRankImg}
          alt={row.rankData ? row.rankData.rankName : 'N/A'}
          imgWidth="32"
        />
        <div className="d-flex flex-column">
          <span className="text-truncate fw-bolder">
            {row.rankData ? row.rankData.rankName : 'N/A'}
          </span>
          <small className="text-muted">{row.rankData ? row.rankData.categoryName : null}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Gender',
    sortable: true,
    selector: (row) => convertUnit(row.gender)
  },
  {
    name: 'Age',
    sortable: true,
    selector: (row) => calculateAge(row.dateOfBirth).toString()
  },
  {
    name: 'Location',
    sortable: true,
    selector: (row) => row.type
  },
  {
    name: 'Total PTS',
    allowOverflow: true,
    cell: (row) => <div>{row.point}</div>
  }
];
// const DailyAttendance = [
//   { name: 'Maths Class', date: '01/13/23', type: 'New Member' },
//   { name: 'English Class', date: '01/18/23', type: 'Personal' },
//   { name: 'Science Class', date: '01/24/23', type: 'Business' },
//   { name: 'Practice Class', date: '01/03/23', type: 'Business' },
//   { name: 'Maths Class', date: '01/13/23', type: 'Other' },
//   { name: 'English Class', date: '01/18/23', type: 'New Member' },
//   { name: 'Science Class', date: '01/24/23', type: 'Other' },
//   { name: 'Practice Class', date: '01/03/23', type: 'Information' },
//   { name: 'Maths Class', date: '01/13/23', type: 'New Member' },
//   { name: 'English Class', date: '01/18/23', type: 'Personal' },
//   { name: 'Science Class', date: '01/24/23', type: 'Reschedule' },
//   { name: 'Practice Class', date: '01/03/23', type: 'Business' },
//   { name: 'Maths Class', date: '01/13/23', type: 'New Member' },
//   { name: 'English Class', date: '01/18/23', type: 'Personal' },
//   { name: 'Science Class', date: '01/24/23', type: 'Business' },
//   { name: 'Practice Class', date: '01/03/23', type: 'Business' },
//   { name: 'Maths Class', date: '01/13/23', type: 'Other' },
//   { name: 'English Class', date: '01/18/23', type: 'New Member' },
//   { name: 'Science Class', date: '01/24/23', type: 'Other' },
//   { name: 'Practice Class', date: '01/03/23', type: 'Information' },
//   { name: 'Maths Class', date: '01/13/23', type: 'New Member' },
//   { name: 'English Class', date: '01/18/23', type: 'Personal' },
//   { name: 'Science Class', date: '01/24/23', type: 'Reschedule' },
//   { name: 'Practice Class', date: '01/03/23', type: 'Business' },
//   { name: 'Maths Class', date: '01/13/23', type: 'New Member' },
//   { name: 'English Class', date: '01/18/23', type: 'Personal' },
//   { name: 'Science Class', date: '01/24/23', type: 'Business' },
//   { name: 'Practice Class', date: '01/03/23', type: 'Business' },
//   { name: 'Maths Class', date: '01/13/23', type: 'Other' },
//   { name: 'English Class', date: '01/18/23', type: 'New Member' },
//   { name: 'Science Class', date: '01/24/23', type: 'Other' },
//   { name: 'Practice Class', date: '01/03/23', type: 'Information' },
//   { name: 'Maths Class', date: '01/13/23', type: 'New Member' },
//   { name: 'English Class', date: '01/18/23', type: 'Personal' },
//   { name: 'Science Class', date: '01/24/23', type: 'Reschedule' },
//   { name: 'Practice Class', date: '01/03/23', type: 'Business' },
//   { name: 'Maths Class', date: '01/13/23', type: 'New Member' },
//   { name: 'English Class', date: '01/18/23', type: 'Personal' },
//   { name: 'Science Class', date: '01/24/23', type: 'Business' },
//   { name: 'Practice Class', date: '01/03/23', type: 'Business' },
//   { name: 'Maths Class', date: '01/13/23', type: 'Other' },
//   { name: 'English Class', date: '01/18/23', type: 'New Member' },
//   { name: 'Science Class', date: '01/24/23', type: 'Other' },
//   { name: 'Practice Class', date: '01/03/23', type: 'Information' },
//   { name: 'Maths Class', date: '01/13/23', type: 'New Member' },
//   { name: 'English Class', date: '01/18/23', type: 'Personal' },
//   { name: 'Science Class', date: '01/24/23', type: 'Reschedule' },
//   { name: 'Practice Class', date: '01/03/23', type: 'Business' }
// ];

const RankTable = (props) => {
  const { data: tableData } = props;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(tableData.length / 10) || 1}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );

  return (
    // <Card className="p-1">
    <div className="react-dataTable">
      <DataTable
        noHeader
        pagination
        columns={columns}
        paginationPerPage={10}
        className="react-dataTable"
        sortIcon={<ChevronDown size={10} />}
        paginationDefaultPage={currentPage + 1}
        paginationComponent={CustomPagination}
        data={tableData}
        // selectableRowsComponent={BootstrapCheckbox}
        selectableRows
      />
    </div>
    // </Card>
  );
};

export default RankTable;
