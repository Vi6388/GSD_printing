// ** React Imports
import React, { Fragment, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Edit2,
  Eye,
  Mail,
  MessageSquare,
  PhoneCall,
  Trash2,
  User
} from 'react-feather';
import PerfectScrollbar from 'react-perfect-scrollbar';
// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import { Badge, Button, Input, Row } from 'reactstrap';
import {
  fetchRankDataRQ,
  fetchRankAllData,
  fetchSportCategorydata
} from '../../../requests/settings/sport-management';
import topRankImg from '@src/assets/images/rank/topmedal.png';
import notRankImg from '@src/assets/images/rank/notrank.png';
import { removeMemberRankAction } from '../stores/action';
import { useDispatch } from 'react-redux';
import { fetchMemberRankData } from '../../../requests/member/GetMembers';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const customConfirmClass = 'w-40 btn btn-danger';
const customCancelClass = 'w-40 ms-1 btn btn-outline-danger';
const RankTable = (props) => {
  // const sportDataToRender = () => sportData;

  const dispatch = useDispatch();
  const { stepper, selectCustomerData, setSelectCustomerData, setOpenAddProgression } = props;
  const [currentPage, setCurrentPage] = useState(0);

  // let userTableData = [];
  // const [selectCategoryId, setSelectCategoryId] = useState('');

  const { data: sportCategoryData } = fetchSportCategorydata();
  const { data: rankAllData } = fetchRankAllData();
  const { data: memberRankAllData, refetch: memberRankAllDataRefetch } = fetchMemberRankData();

  const sportNameArray = sportCategoryData
    ? sportCategoryData.map((item) => item.categoryName)
    : [];

  let sportCategoryWithRankData = [];
  if (sportCategoryData)
    if (rankAllData) {
      sportCategoryData.map((item) => {
        let sportCategoryItem = item;
        sportCategoryItem.rankData = rankAllData.filter(
          (rankItem) => rankItem.categoryId === item._id
        );
        sportCategoryWithRankData.push(sportCategoryItem);
      });
    } else {
      sportCategoryData.map((item) => {
        let sportCategoryItem = item;
        sportCategoryItem.rankData = [];
        sportCategoryWithRankData.push(sportCategoryItem);
      });
    }

  const setUserItemData = (categoryName, userId) => {
    let arrayItem;
    let selectUserDataArray = selectCustomerData.filter((item) => item._id === userId);

    arrayItem = selectUserDataArray[0];

    let selectCategoryDataArray = sportCategoryWithRankData.filter(
      (item) => item.categoryName === categoryName
    );
    let selectSportCategory = selectCategoryDataArray[0];
    arrayItem.selectCategoryId = selectSportCategory._id;
    let selectMemberRankDataArray = memberRankAllData
      ? memberRankAllData.filter(
          (item) =>
            item.memberId === arrayItem._id &&
            item.categoryId === selectSportCategory._id &&
            item.type === 'member'
        )
      : [];
    let selectMemberRankData = selectMemberRankDataArray ? selectMemberRankDataArray[0] : {};
    let selectCategoryRankArray = selectSportCategory.rankData ? selectSportCategory.rankData : []; // rank datas id order image ...

    selectCategoryRankArray = selectCategoryRankArray.slice().sort(function (a, b) {
      return a.rankOrder - b.rankOrder;
    });
    if (selectCategoryRankArray.length < 1) {
      arrayItem.lastRankName = 'Not Rank';
      arrayItem.lastRankFile = '';
      arrayItem.lastPromote = 'N/A';
      arrayItem.nextRankName = 'Not Rank';
      arrayItem.nextRankFile = '';
      arrayItem.nextPromote = 'N/A';
    } else {
      if (selectMemberRankData === undefined) {
        arrayItem.lastRankName = 'Not Rank';
        arrayItem.lastRankFile = notRankImg;
        arrayItem.lastPromote = 'N/A';

        arrayItem.lastMemberRankId = undefined;

        arrayItem.nextRankName = selectCategoryRankArray[0].rankName;
        arrayItem.nextRankFile = selectCategoryRankArray[0].rankImage;

        arrayItem.nextRankId = selectCategoryRankArray[0]._id;
      } else {
        // let selectuserRankData = selectuserRankDataArray[0]; // categoryId rankId date
        let selectUserRankDTArray = [];
        selectUserRankDTArray = selectCategoryRankArray.filter(
          (obj) => obj._id === selectMemberRankData.rankId
        );
        let selectUserRankDT = selectUserRankDTArray[0];
        arrayItem.lastRankName = selectUserRankDT.rankName;
        arrayItem.lastRankFile = selectUserRankDT.rankImage;
        let lastPromote = new Date(selectMemberRankData.updatedAt);
        arrayItem.lastPromote = lastPromote.toLocaleDateString();
        arrayItem.lastMemberRankId = selectMemberRankData._id;

        let index = selectCategoryRankArray.findIndex(
          (obj) => obj._id === selectMemberRankData.rankId
        );
        if (index + 1 === selectCategoryRankArray.length) {
          arrayItem.nextRankName = 'Member is Top';
          arrayItem.nextRankFile = topRankImg;
        } else {
          arrayItem.nextRankName = selectCategoryRankArray[index + 1].rankName;
          arrayItem.nextRankFile = selectCategoryRankArray[index + 1].rankImage;

          arrayItem.nextRankId = selectCategoryRankArray[index + 1]._id;
        }
      }
    }
    return arrayItem;
  };

  const tableData = (e, item) => {
    let userTableData = [];
    if (sportCategoryWithRankData.length) {
      for (let i = 0; i < selectCustomerData.length; i++) {
        let customerItem = selectCustomerData[i];
        if (e !== undefined && item !== undefined && customerItem._id === item._id)
          customerItem.selectSportCategoryName = e.target.value;
        else
          customerItem.selectSportCategoryName = customerItem.selectSportCategoryName
            ? customerItem.selectSportCategoryName
            : sportCategoryWithRankData[0]?.categoryName;
        customerItem = setUserItemData(customerItem.selectSportCategoryName, customerItem._id);
        customerItem.index = i;
        customerItem.sportCategoryNames = sportNameArray;
        customerItem.memberId = selectCustomerData[i]._id;
        userTableData.push(customerItem);
      }
    }
    return userTableData;
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
      selector: (row) => row.sportCategoryNames,
      // selector: (row) => row.sport
      cell: (row) => (
        <Input
          type="select"
          name="sportCategoryName"
          value={row.selectSportCategoryName}
          onChange={(e) => {
            tableData(e, row), memberRankAllDataRefetch();
          }}
        >
          {row.sportCategoryNames
            ? row.sportCategoryNames.map((item, key) => {
                return <option value={item}>{item}</option>;
              })
            : null}
        </Input>
      )
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
    },

    {
      name: 'Actions',
      allowOverflow: true,
      cell: (row) => (
        <div className="d-flex">
          {/* <Edit2 size={16} /> */}
          <Trash2 size={16} className="ms-1 cursor-pointer" onClick={() => handleDeleteRank(row)} />
        </div>
      )
    }
  ];

  const customConfirmClass = 'w-40 btn btn-danger';
  const customCancelClass = 'w-40 ms-1 btn btn-outline-danger';

  const handleDeleteRank = (item) => {
    if (item.lastMemberRankId === undefined) {
      MySwal.fire({
        icon: 'warning',
        title: 'The Rank is not avaiable',
        customClass: {
          confirmButton: customConfirmClass
        },
        showClass: {
          popup: 'animate__animated animate__bounceIn'
        },
        buttonsStyling: false
      });
    } else {
      MySwal.fire({
        icon: 'info',
        showCancelButton: true,
        title: 'Are you delete promote ?',
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
          let memberName = item.firstName
            ? item.firstName
            : null + item.middleName
            ? ' ' + item.middleName
            : null + item.middleName
            ? ' ' + item.lastName
            : null;
          dispatch(
            removeMemberRankAction(item.lastMemberRankId, memberName, memberRankAllDataRefetch)
          );
        }
      });
    }
  };
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      // pageCount={Math.ceil(DailyAttendance.length / 7) || 1}
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

  // const defaultSelected = userTableData.map((row) => row.id);

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
          // data={DailyAttendance}
          data={tableData()}
          // selectableRowsComponent={BootstrapCheckbox}
          // selectableRows
          // selectableRowsVisibleOnly={false}
          // selectableRowSelected={(row) => defaultSelected.includes(row.id)}
        />
      </div>

      <div className="d-flex justify-content-between">
        <Button color="primary" className="btn-prev" onClick={() => setOpenAddProgression(false)}>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Close</span>
        </Button>
        <Button
          color="primary"
          className="btn-next"
          onClick={() => {
            setSelectCustomerData(tableData());
            stepper.next();
          }}
        >
          <span className="align-middle d-sm-inline-block d-none">Promote</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};

export default RankTable;
