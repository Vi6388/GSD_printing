// ** React Imports
import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';

// ** Third Party Components
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
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
import { Badge, Button, Input, Row } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// ** action
import { removeMemberRankAction } from '../../../members/stores/action';
import { useDispatch } from 'react-redux';
import { fetchAddProgressionInputDataRQ } from '../../../../requests/progression/progression';

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Images Imports
import topRankImg from '@src/assets/images/rank/topmedal.png';
import notRankImg from '@src/assets/images/rank/notrank.png';

const MySwal = withReactContent(Swal);

const customConfirmClass = 'w-40 btn btn-danger';
const customCancelClass = 'w-40 ms-1 btn btn-outline-danger';

const RankTable = (props) => {
  const {
    stepper,
    setSelectCustomerData,
    setOpenAddProgression,
    eventId,
    sportId,
    progressionSearchDataRefresh
  } = props;

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [selectRows, setSelectRows] = useState([]);

  const { data, refetch } = useQuery(
    ['get-add-progression-data', eventId, sportId],
    fetchAddProgressionInputDataRQ
  );

  const tableData = (e, item, type) => {
    let result = [];
    if (data)
      for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        let categoryNames = dataItem.map((item) => {
          return { value: item.categoryData._id, label: item.categoryData.categoryName };
        });
        dataItem.categoryNames = Array.from(new Set(categoryNames));
        if (
          e &&
          item.data.memberData._id.toString() === dataItem[0].memberData._id.toString() &&
          type === 'category'
        )
          dataItem.selectCategory = e;
        else
          dataItem.selectCategory = dataItem.selectCategory
            ? dataItem.selectCategory
            : dataItem.categoryNames[0];
        let divisionNames = [];
        dataItem.map((item) => {
          if (item.divisionData.categoryId?.toString() === dataItem.selectCategory.value.toString())
            divisionNames.push({
              value: item.divisionData._id,
              label: item.divisionData.divisionName
            });
        });
        dataItem.divisionNames = divisionNames;
        if (
          e &&
          item.data.memberData._id.toString() === dataItem[0].memberData._id.toString() &&
          type === 'division'
        )
          dataItem.selectDivision = e;
        else
          dataItem.selectDivision = dataItem.selectDivision
            ? dataItem.selectDivision
            : divisionNames[0];
        dataItem.data = dataItem.filter(
          (item) =>
            item.categoryData._id.toString() === dataItem.selectCategory.value.toString() &&
            item.divisionData._id.toString() === dataItem.selectDivision.value.toString()
        )[0];
        result.push(dataItem);
      }
    return result;
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
      name: 'Categories',
      sortable: true,
      selector: (row) => row.selectCategory,
      cell: (row) => (
        <Select
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          isClearable={false}
          placeholder={'Category'}
          value={row.selectCategory}
          onChange={(e) => {
            tableData(e, row, 'category');
            refetch();
          }}
          options={row.categoryNames}
          className="react-select"
          classNamePrefix="select"
          theme={selectThemeColors}
        />
      )
    },
    {
      name: 'Divisions',
      sortable: true,
      selector: (row) => row.selectDivision,
      // selector: (row) => row.sport
      cell: (row) => (
        <Select
          menuPortalTarget={document.body}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          isClearable={false}
          placeholder={'Division'}
          value={row.selectDivision}
          onChange={(e) => {
            tableData(e, row, 'division');
            refetch();
          }}
          options={row.divisionNames}
          className="react-select"
          classNamePrefix="select"
          theme={selectThemeColors}
        />
      )
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

  const handleDeleteRank = (item) => {
    if (item.data.rankData === null) {
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
          let memberName = item.data.memberData.firstName
            ? item.data.memberData.firstName
            : null + item.data.memberData.middleName
            ? ' ' + item.data.memberData.middleName
            : null + item.data.memberData.middleName
            ? ' ' + item.data.memberData.lastName
            : null;
          dispatch(
            removeMemberRankAction(
              item.data.memberRankData._id,
              memberName,
              refetch,
              progressionSearchDataRefresh
            )
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
      pageCount={Math.ceil(tableData() ? tableData().length / 7 : 1) || 1}
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

  const handleRowSelected = ({ selectedRows }) => {
    if (selectedRows.length > 0) {
      setSelectRows(selectedRows.map((item) => item.data.memberData._id));
    } else {
      setSelectRows([]);
    }
  };

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
          data={tableData()}
          selectableRowsVisibleOnly={false}
          onSelectedRowsChange={handleRowSelected}
          selectableRows
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
            let payload = [];
            selectRows
              ? selectRows.map((selectRowItem) => {
                  let resultArray = tableData().filter(
                    (item) =>
                      item.data.memberData._id.toString() === selectRowItem.toString() &&
                      item.data.nextRankData !== null
                  );
                  resultArray.length > 0 ? payload.push(resultArray[0]) : null;
                })
              : [];
            setSelectCustomerData(payload);
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
