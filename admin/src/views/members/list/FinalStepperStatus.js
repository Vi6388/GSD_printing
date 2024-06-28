// ** React Imports
import React, { Fragment, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, Edit2, Eye, Trash2, User } from 'react-feather';
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import { Badge, Button, Input } from 'reactstrap';
import axios from 'axios';
import { createMemberRankAction, updateMemberRankAction } from '../stores/action';
import { useDispatch } from 'react-redux';

const FinalStepperStatus = (props) => {
  const dispatch = useDispatch();
  const { stepper, selectCustomerData, setOpenAddProgression } = props;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };
  const columns = [
    {
      name: 'Full Name',
      sortable: true,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div
            className="d-flex justify-content-center align-items-center me-1"
            style={{
              height: '40px',
              width: '40px',
              backgroundColor: '#f3f2f7',
              borderRadius: '50%'
            }}
          >
            <User />
          </div>
          {row.firstName} {row.middleName} {row.lastName}
        </div>
      )
    },
    {
      name: 'Sport Categories',
      sortable: true,
      selector: (row) => row.selectSportCategoryName
    },
    {
      name: 'Rank',
      sortable: true,
      selector: (row) => row.lastRankName,
      cell: (row) => (
        <div>
          <img height="40" width="40" src={row.lastRankFile} />
          {row.lastRankName}
        </div>
      )
    },
    {
      name: 'Next Rank',
      sortable: true,
      selector: (row) => row.nextRankName,
      cell: (row) => (
        <div>
          <img height="40" width="40" src={row.nextRankFile} />
          {row.nextRankName}
        </div>
      )
    },
    {
      name: 'Last Promoted',
      sortable: true,
      selector: (row) => row.lastPromote
    }

    // {
    //   name: 'Next Promoted',
    //   sortable: true,
    //   selector: (row) => row.nextPromote
    // }
  ];

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(selectCustomerData.length / 7) || 1}
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
    <Fragment>
      <div className="react-dataTable mt-2">
        <DataTable
          noHeader
          pagination
          columns={columns}
          paginationPerPage={7}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationDefaultPage={currentPage + 1}
          paginationComponent={CustomPagination}
          data={selectCustomerData}
          // selectableRowsComponent={BootstrapCheckbox}
          // selectableRows
        />
      </div>
      <div className="d-flex justify-content-between">
        <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button
          color="primary"
          className="btn-next"
          onClick={() => {
            // let payload = [];
            selectCustomerData.length > 0
              ? selectCustomerData.map((item) => {
                  let memberRankId, memberId, categoryId, rankId, memberName;
                  if (item.nextRankName !== 'N/A' && item.nextRankName !== 'Member is Top') {
                    memberId = item._id;
                    memberRankId = item.lastMemberRankId;
                    categoryId = item.selectCategoryId;
                    rankId = item.nextRankId;
                    memberName = item.firstName
                      ? item.firstName
                      : null + item.middleName
                      ? ' ' + item.middleName
                      : null + item.middleName
                      ? ' ' + item.lastName
                      : null;
                    memberRankId === undefined
                      ? dispatch(
                          createMemberRankAction(
                            {
                              memberId,
                              categoryId,
                              rankId,
                              type: 'member'
                            },
                            memberName
                          )
                        )
                      : dispatch(
                          updateMemberRankAction(
                            memberRankId,
                            {
                              rankId
                            },
                            memberName
                          )
                        );
                  }
                })
              : null;
            setOpenAddProgression(false);
          }}
        >
          <span className="align-middle d-sm-inline-block d-none">Publish</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};
export default FinalStepperStatus;
