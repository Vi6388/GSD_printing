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
} from '../../../../requests/settings/sport-management';
import { array } from 'prop-types';

const RankTable = (props) => {
  // const sportDataToRender = () => sportData;

  const { stepper, selectCustomerData, setSelectCustomerData } = props;
  const [currentPage, setCurrentPage] = useState(0);
  // const [selectCategoryId, setSelectCategoryId] = useState('');

  const { data: sportCategoryData } = fetchSportCategorydata();
  const { data: rankAllData } = fetchRankAllData();
  // const { data: rankItemData } = useQuery(['rank-table', selectCategoryId], fetchRankDataRQ);

  const sportNameArray = sportCategoryData
    ? sportCategoryData.map((item) => item.categoryName)
    : [];

  let userTableData = [];
  let customerData = [];
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
  if (sportCategoryWithRankData.length) {
    for (let i = 0; i < selectCustomerData.length; i++) {
      let arrayItem;
      arrayItem = selectCustomerData[i];
      arrayItem.index = i;
      arrayItem.sportCategoryNames = sportNameArray;
      arrayItem.selectSportCategory = arrayItem.selectSportCategory
        ? arrayItem.selectSportCategory
        : sportCategoryWithRankData[0];
      arrayItem.selectSportCategoryName = arrayItem.selectSportCategory?.categoryName;
      arrayItem.rank = arrayItem.rank ? arrayItem.rank : [];
      let rankData = arrayItem.rank;
      let selectRank = rankData
        ? rankData.filter((item) => item.categoryName === arrayItem.selectSportCategoryName)
        : [];
      arrayItem.initialRank = selectRank.lenght > 0 ? selectRank[0].categoryName : 'Not Rank';
      arrayItem.rankNames = arrayItem.selectSportCategory.rankData
        ? arrayItem.selectSportCategory.rankData.map((item) => item.rankName)
        : [];
      let selectRankData = arrayItem.selectSportCategory?.rankData
        ? arrayItem.selectSportCategory.rankData
        : [];
      arrayItem.rankName = selectRankData.lenght > 0 ? selectRankData[0].rankName : '';
      arrayItem.promote = arrayItem.promote ? arrayItem.promote : 'New member';
      arrayItem.promoteDate = new Date().toLocaleDateString();
      customerData.push(arrayItem);
    }
    userTableData = customerData;
  }

  const handleChangeTableData = (e, item) => {
    let arrayData = [];
    for (let i = 0; i < selectCustomerData.length; i++) {
      let arrayItem = selectCustomerData[i];
      if (selectCustomerData[i]._id === item._id)
        switch (e.target.name) {
          case 'sportCategoryName':
            arrayItem.selectSportCategoryName = e.target.value;
            let updateSelectCategoryData = sportCategoryData.filter(
              (item) => item.categoryName === e.target.value
            );
            arrayItem.selectSportCategory = updateSelectCategoryData[0];
            arrayItem.rankNames = arrayItem.selectSportCategory.rankData
              ? arrayItem.selectSportCategory.rankData.map((item) => item.rankName)
              : [];
            let rankData = arrayItem.rank;
            let selectRank = rankData
              ? rankData.filter((item) => item.categoryName === e.target.value)
              : [];
            arrayItem.initialRank = selectRank ? selectRank.categoryName : 'Not Rank';
            let selectRankData = arrayItem.rankNames;
            arrayItem.rankName = selectRankData.lenght > 0 ? selectRankData[0].rankName : '';

            break;
          case 'selectrank':
            arrayItem.rankName = e.target.value;
            break;
          case 'promote':
            arrayItem.promote = e.target.value;
            break;
          default:
            break;
        }

      arrayData.push(arrayItem);
    }
    userTableData = arrayData;
  };
  const DailyAttendance = [
    { name: 'Maths Class', date: '01/13/23', type: 'New Member' },
    { name: 'English Class', date: '01/18/23', type: 'Personal' },
    { name: 'Science Class', date: '01/24/23', type: 'Business' },
    { name: 'Practice Class', date: '01/03/23', type: 'Business' },
    { name: 'Maths Class', date: '01/13/23', type: 'Other' },
    { name: 'English Class', date: '01/18/23', type: 'New Member' },
    { name: 'Science Class', date: '01/24/23', type: 'Other' },
    { name: 'Practice Class', date: '01/03/23', type: 'Information' },
    { name: 'Maths Class', date: '01/13/23', type: 'New Member' },
    { name: 'English Class', date: '01/18/23', type: 'Personal' },
    { name: 'Science Class', date: '01/24/23', type: 'Reschedule' },
    { name: 'Practice Class', date: '01/03/23', type: 'Business' }
  ];

  const tableData = [
    {
      fullName: 'Jason',
      sportName: 'Baseball',
      sportCategories: 'World Cup',
      rank: 5,
      nextRank: 4,
      lastPromote: 'New Member'
    },
    {
      fullName: 'Anna',
      sportName: 'Table Tennis',
      sportCategories: 'Olympics',
      rank: 4,
      nextRank: 3,
      lastPromote: 'Personal'
    },
    {
      fullName: 'Jack',
      sportName: 'Horse Racing',
      sportCategories: 'European Cup',
      rank: 2,
      nextRank: 1,
      lastPromote: 'Business'
    },
    {
      fullName: 'Tong',
      sportName: 'Rugby',
      sportCategories: 'America Cup',
      rank: 11,
      nextRank: 10,
      lastPromote: 'Business'
    },
    {
      fullName: 'Bob',
      sportName: 'Racing',
      sportCategories: 'Africa Cup',
      rank: 8,
      nextRank: 7,
      lastPromote: 'Other'
    },
    {
      fullName: 'Maxim',
      sportName: 'Football',
      sportCategories: 'FIFA Cup',
      rank: 7,
      nextRank: 6,
      lastPromote: 'New Member'
    },
    {
      fullName: 'King',
      sportName: 'Judo',
      sportCategories: 'Espanoal Cup',
      rank: 6,
      nextRank: 5,
      lastPromote: 'Other'
    },
    {
      fullName: 'Andy',
      sportName: 'wrestling',
      sportCategories: 'England Cup',
      rank: 3,
      nextRank: 2,
      lastPromote: 'Information'
    },
    {
      fullName: 'Ryan',
      sportName: 'Swim',
      sportCategories: 'Australia Cup',
      rank: 9,
      nextRank: 8,
      lastPromote: 'New Member'
    },
    {
      fullName: 'William',
      sportName: 'BusketBall',
      sportCategories: 'national Cup',
      rank: 10,
      nextRank: 9,
      lastPromote: 'Personal'
    },
    {
      fullName: 'Smith',
      sportName: 'Material Art',
      sportCategories: 'Karate',
      rank: 13,
      nextRank: 12,
      lastPromote: 'Reschedule'
    },
    {
      fullName: 'Tobi',
      sportName: 'Criket',
      sportCategories: 'Asia Cup',
      rank: 12,
      nextRank: 11,
      lastPromote: 'Business'
    }
  ];

  const promoteArray = ['New Member', 'Manager', 'Boss', 'New Member', 'Manager', 'Boss'];
  // const columns = [
  //   {
  //     name: 'Full Name',
  //     sortable: true,
  //     selector: (row) => row.name
  //   },
  //   {
  //     name: 'Program',
  //     sortable: true,
  //     selector: (row) => row.date
  //   },
  //   {
  //     name: 'Rank',
  //     sortable: true,
  //     selector: (row) => (
  //       <div className="d-flex align-items-center">
  //         <div
  //           className="d-flex justify-content-center align-items-center me-1"
  //           style={{
  //             height: '40px',
  //             width: '40px',
  //             backgroundColor: '#f3f2f7',
  //             borderRadius: '50%'
  //           }}
  //         >
  //           <User />
  //         </div>
  //         {row.name}
  //       </div>
  //     )
  //   },
  //   {
  //     name: 'Next Rank',
  //     sortable: true,
  //     selector: (row) => row.type
  //   },
  //   {
  //     name: 'Last Promoted',
  //     sortable: true,
  //     selector: (row) => row.type
  //   },
  //   // {
  //   //     name: "Status",
  //   //     sortable: true,
  //   //     selector: (row) => (
  //   //         <Badge
  //   //             className="text-capitalize"
  //   //             color="light-primary"
  //   //             pill
  //   //         >
  //   //             Pay Now
  //   //         </Badge >
  //   //     )
  //   // },
  //   {
  //     name: 'Actions',
  //     allowOverflow: true,
  //     cell: (row) => (
  //       <div className="d-flex">
  //         <Edit2 size={16} />
  //         <Trash2 size={16} className="ms-1" />
  //         {/* <Mail size={16} className="ms-1" />
  //                 <PhoneCall size={16} className="ms-1" /> */}
  //       </div>
  //     )
  //   }
  // ];
  const columns = [
    {
      name: 'Full Name',
      sortable: true,
      // selector: (row) => row.firstName + row.middleName + row.lastName,
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
          onChange={(e) => handleChangeTableData(e, row)}
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
      selector: (row) => row.initialRank
    },
    {
      name: 'Next Rank',
      sortable: true,
      selector: (row) => row.rankNames,
      cell: (row) => (
        <Input
          type="select"
          name="selectrank"
          defaultValue={row.rankName}
          onChange={(e) => handleChangeTableData(e, row)}
        >
          {row.rankNames
            ? row.rankNames.map((item, key) => {
                return <option value={item}>{item}</option>;
              })
            : null}
        </Input>
      )
    },
    {
      name: 'Last Promoted',
      sortable: true,
      selector: (row) => row.promote,
      cell: (row) => (
        <Input
          type="select"
          name="promote"
          defaultValue={row.promote}
          onChange={(e) => handleChangeTableData(e, row)}
        >
          {promoteArray
            ? promoteArray.map((item, key) => {
                return (
                  <option value={item}>
                    {/* <span
                      id="promote"
                      className={`badge rounded-pill cursor-pointer ${
                        item.id === 'new' ? 'bg-success' : 'bg-danger'
                      }`}
                      onClick={(e) => handleChangeTableData(e, row)}
                      size={12}
                    > */}
                    {item}
                    {/* </span> */}
                  </option>
                );
              })
            : null}
        </Input>
      )
    },
    // {
    //     name: "Status",
    //     sortable: true,
    //     selector: (row) => (
    //         <Badge
    //             className="text-capitalize"
    //             color="light-primary"
    //             pill
    //         >
    //             Pay Now
    //         </Badge >
    //     )
    // },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: (row) => (
        <div className="d-flex">
          <Edit2 size={16} />
          <Trash2 size={16} className="ms-1" />
          {/* <Mail size={16} className="ms-1" />
                <PhoneCall size={16} className="ms-1" /> */}
        </div>
      )
    }
  ];

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

  const defaultSelected = userTableData.map((row) => row.id);

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
          data={userTableData}
          // selectableRowsComponent={BootstrapCheckbox}
          selectableRows
          selectableRowsVisibleOnly={false}
          selectableRowSelected={(row) => defaultSelected.includes(row.id)}
        />
      </div>

      <div className="d-flex justify-content-between">
        <Button color="primary" className="btn-prev" disabled>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          {/* <span className="align-middle d-sm-inline-block d-none">Previous</span> */}
        </Button>
        <Button
          color="primary"
          className="btn-next"
          onClick={() => {
            setSelectCustomerData(userTableData);
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
