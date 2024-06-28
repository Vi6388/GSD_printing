// ** React Imports
import React, { Fragment, useState } from 'react';

// ** Third Imports
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import { Badge, Button, Input } from 'reactstrap';
import { ArrowLeft, ArrowRight, ChevronDown, Edit2, Eye, Trash2, User } from 'react-feather';

// **  Actions Imports
import { createMemberRankAction, updateMemberRankAction } from '../../../members/stores/action';
import { useDispatch } from 'react-redux';

// ** Images Imports
import topRankImg from '@src/assets/images/rank/topmedal.png';
import notRankImg from '@src/assets/images/rank/notrank.png';

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

const FinalStepperStatus = (props) => {
  const dispatch = useDispatch();
  const {
    stepper,
    selectCustomerData,
    setOpenAddProgression,
    eventId,
    progressionSearchDataRefresh
  } = props;
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
          {row.data.memberData?.firstName} {row.data.memberData?.middleName}
          {row.data.memberData?.lastName}
        </div>
      )
    },
    {
      name: 'Category',
      sortable: true,
      selector: (row) => row.selectCategory.label
    },
    {
      name: 'Division',
      sortable: true,
      selector: (row) => row.selectDivision.label
    },
    {
      name: 'Rank',
      sortable: true,
      cell: (row) => (
        <div>
          <img
            height="40"
            width="40"
            src={row.data.rankData ? row.data.rankData.rankImage : notRankImg}
          />
          {row.data.rankData ? row.data.rankData.rankName : 'N/A'}
        </div>
      )
    },
    {
      name: 'Next Rank',
      sortable: true,
      cell: (row) => (
        <div>
          <img
            height="40"
            width="40"
            src={row.data.nextRankData ? row.data.nextRankData.rankImage : topRankImg}
          />
          {row.data.nextRankData ? row.data.nextRankData.rankName : 'Top'}
        </div>
      )
    },
    {
      name: 'Last Promoted',
      sortable: true,
      selector: (row) =>
        row.data.memberRankData
          ? new Date(row.data.memberRankData.updatedAt).toLocaleDateString()
          : 'N/A'
    }
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
                  let memberRankId, memberId, categoryId, divisionId, rankId, memberName;
                  if (item.data.nextRankData !== null) {
                    memberId = item.data.memberData._id;
                    memberRankId = item.data.memberRankData?._id;
                    categoryId = item.selectCategory.value;
                    divisionId = item.selectDivision.value;
                    rankId = item.data.nextRankData._id;
                    memberName = item.data.memberData.firstName
                      ? item.data.memberData.firstName
                      : null + item.data.memberData.middleName
                      ? ' ' + item.data.memberData.middleName
                      : null + item.data.memberData.middleName
                      ? ' ' + item.data.memberData.lastName
                      : null;
                    memberRankId === undefined
                      ? dispatch(
                          createMemberRankAction(
                            {
                              memberId,
                              eventId,
                              memberRankId,
                              categoryId,
                              divisionId,
                              rankId,
                              type: 'event'
                            },
                            memberName,
                            progressionSearchDataRefresh
                          )
                        )
                      : dispatch(
                          updateMemberRankAction(
                            memberRankId,
                            {
                              rankId
                            },
                            memberName,
                            progressionSearchDataRefresh
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
