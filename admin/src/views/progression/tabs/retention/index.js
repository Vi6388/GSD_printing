import React, { useEffect, useState } from 'react';
// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  Progress,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Button
} from 'reactstrap';

import { GrReactjs } from 'react-icons/gr';

// ** Third Party Components
import { ChevronDown, MoreHorizontal, TrendingDown } from 'react-feather';
// ** Utils
import { selectThemeColors } from '@utils';

import DataTable from 'react-data-table-component';

// ** Custom Components
import Avatar from '@components/avatar';

// ** User List Component
// import Table from './retentionTable'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather';

// redux
import { useDispatch, useSelector } from 'react-redux';

// ** Styles
import '@styles/react/apps/app-users.scss';

// ** Third Party Components
import Select from 'react-select';

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss';

//**timeline component
import AvatarGroup from '@components/avatar-group';

import AddProgression from './AddProgression';

// ** Reactstrap Imports
import { UncontrolledTooltip } from 'reactstrap';
import { CardBody } from 'reactstrap';
import { CardTitle } from 'reactstrap';
import { CardText } from 'reactstrap';
import { Label, Input } from 'reactstrap';

const filterOptions = [
  { value: '', label: 'Select Filter' },
  { value: 'coming', label: 'Coming' },
  { value: 'nextTime', label: 'Next Time' },
  { value: 'noreply', label: 'No Reply' },
  { value: 'paid', label: 'Paid' },
  { value: 'notPaid', label: 'Not Paid' }
];

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {
  MoreVertical,
  Edit,
  FileText,
  Archive,
  Trash,
  Send,
  Save,
  Info,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  ArrowDownCircle
} from 'react-feather';
import ReactPaginate from 'react-paginate';
import { fetchProgressionDataRQ } from '../../../../requests/progression/progression';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import notRankImg from '@src/assets/images/rank/notrank.png';
import {
  createMemberRankAction,
  dropMemberRankAction,
  promoteMemberRankAction
} from '../../../members/stores/action';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const customConfirmClass = 'w-40 btn btn-danger';
const customCancelClass = 'w-40 ms-1 btn btn-outline-danger';
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

  if (row?.member?.length ? row.member[0].photo?.length : false) {
    return (
      <Link to={`/other/membership/view/${row.member[0]._id}`}>
        <Avatar className="me-1" img={row.member[0].photo} width="32" height="32" />
      </Link>
    );
  } else {
    return (
      <Link to={`/other/membership/view/${row.member[0]._id}`}>
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
function Retention(props) {
  const dispatch = useDispatch();
  const { selectSportData, eventId } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const [openAddProgression, setOpenAddProgression] = useState(false);
  const [search, setSearch] = useState('');
  const [selectCategoryName, setSelectCategoryName] = useState({
    value: '',
    label: 'Select Category'
  });
  const [selectDivisionName, setSelectDivisionName] = useState({
    value: '',
    label: 'Select Division'
  });
  const [selectRankName, setSelectRankName] = useState({ value: '', label: 'Select Rank' });
  const [selectYear, setSelectYear] = useState({ value: '', label: 'Select Year' });

  const { data: progressionSearchData, refetch: progressionSearchDataRefresh } = useQuery(
    [
      'progression-table',
      search,
      eventId,
      selectSportData?._id,
      selectCategoryName.value,
      selectDivisionName.value,
      selectRankName.value,
      selectYear.value,
      currentPage
    ],
    fetchProgressionDataRQ
  );
  const { categoryNames, rankNames, divisionNames, yearNames, progressionData, pageCount } =
    progressionSearchData ? progressionSearchData : [];

  useEffect(() => {
    setSelectCategoryName({ value: '', label: 'Select Category' });
    setSelectDivisionName({ value: '', label: 'Select Division' });
    setSelectRankName({ value: '', label: 'Select Rank' });
    setSelectYear({ value: '', label: 'Select Year' });
  }, [selectSportData]);

  const columns = [
    {
      name: 'CMA ID ',
      sortable: (row) => row.member[0]._id.substr(-4),
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column">
            <span className="">{row.member[0]._id.substr(-4)}</span>
          </div>
        </div>
      )
    },

    {
      name: 'FullName ',
      cell: (row) => (
        <div className="d-flex align-items-center">
          {renderClient(row)}
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">
              {row.member[0].firstName} {row.member[0].middleName} {row.member[0].lastName}
            </span>
            <small className="text-muted">{row.member[0].email}</small>
          </div>
        </div>
      )
    },

    {
      name: 'Category',
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column">
            <span className="">{row.category[0].categoryName}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Division',
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column">
            <span className="">{row.division[0].divisionName}</span>
          </div>
        </div>
      )
    },
    {
      name: 'RANK',
      cell: (row) => (
        <div className="d-flex align-items-center">
          <Avatar
            className="mx-1"
            img={row.rank[0].rankImage ? row.rank[0].rankImage : notRankImg}
            alt={row.rank[0].rankName}
            imgWidth="32"
          />
          <div className="d-flex flex-column">
            <span className="">{row.rank[0].rankName}</span>
            <small className="text-muted">{row.category[0].categoryName}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Date Promoted',
      sortable: (row) => row.updatedAt,
      cell: (row) => {
        let promoteDate, promote;
        row.updatedAt
          ? ((promoteDate = new Date(row.updatedAt)), (promote = promoteDate.toLocaleDateString()))
          : (promote = 'N/A');
        return (
          <div className="d-flex align-items-center">
            <div className="d-flex flex-column">
              <span className="">{promote}</span>
            </div>
          </div>
        );
      }
    },

    {
      name: 'Total',
      sortable: (row) => row.rankAll.length,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <Badge
            style={{ width: '30px', height: '30px', borderRadius: '16px', fontSize: '20px' }}
            color="light-primary"
          >
            {row.rankAll.length}
          </Badge>
        </div>
      )
    }
  ];

  const CustomPagination = () => {
    // const count = Math.ceil(clientStore?.contacts?.total / rowsPerPage)
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={pageCount}
        forcePage={currentPage}
        activeClassName="active"
        // forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => setCurrentPage(page.selected)}
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
  const ExpandableTable = (props) => {
    let categoryName = props.data.category[0].categoryName;
    let promoteArray = [],
      promote,
      promoteDate;
    // const dispatch = useDispatch();
    const columns = [
      {
        name: 'Order ',
        maxWidth: '120px',
        sortable: (row) => row.rankOrder,
        cell: (row) => (
          <div className="d-flex align-items-center">
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">{row.rankOrder}</span>
            </div>
          </div>
        )
      },
      {
        name: 'Rank Name',
        minWidth: '250px',
        sortable: (row) => row.rankName,
        cell: (row) => (
          <div className="d-flex align-items-center">
            <Avatar className="mx-1" img={row.rankImage} alt={row.rankName} imgWidth="32" />
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">{row.rankName}</span>
              <small className="text-muted">{categoryName}</small>
            </div>
          </div>
        )
      },
      {
        name: 'Date Promoted',
        // sortable: true,
        // minWidth: '140px',
        // sortable: (row) => row.promote,
        cell: (row) => (
          (promoteArray = props.data?.history
            ? props.data.history.filter((item) => item.rankId.toString() === row._id.toString())
            : []),
          (promoteDate = promoteArray.length !== 0 ? new Date(promoteArray[0].promote) : ''),
          (promote = promoteArray.length === 0 ? 'N/A' : promoteDate.toLocaleDateString()),
          (
            <div className="d-flex align-items-center">
              <div className="d-flex flex-column">
                <span className="text-truncate fw-bolder">{promote}</span>
              </div>
            </div>
          )
        )
      },

      {
        name: 'Promote',
        // sortable: true,
        // minWidth: '150px',
        cell: (row) => (
          <div className="d-flex align-items-center">
            {row._id === props.data.rank[0]._id ? (
              <Badge className="cursor-pointer" color="light-success">
                Now Promoted
              </Badge>
            ) : props.data.history &&
              props.data.history.filter((item) => item.rankId.toString() === row._id.toString())
                .length > 0 ? (
              <Badge className="cursor-pointer" color="light-primary">
                Promoted
              </Badge>
            ) : (
              <Badge className="cursor-pointer" color="primary">
                Not Promoted
              </Badge>
            )}
          </div>
        )
      },

      {
        name: 'Action',
        allowOverflow: true,
        cell: (row) => {
          return (
            <div className="d-flex">
              <UncontrolledDropdown>
                <DropdownToggle className="px-1" tag="span">
                  {row._id === props.data.rank[0]._id ? (
                    <MoreHorizontal color="#C52F2F" size={16} />
                  ) : props.data.history &&
                    props.data.history.filter(
                      (item) => item.rankId.toString() === row._id.toString()
                    ).length > 0 ? (
                    <TrendingDown
                      className="cursor-pointer"
                      color="#C52F2F"
                      size={16}
                      onClick={() => {
                        handlePromote(row, false);
                      }}
                    />
                  ) : (
                    <TrendingUp
                      className="cursor-pointer"
                      color="#C52F2F"
                      size={16}
                      onClick={() => {
                        handlePromote(row, true);
                      }}
                    />
                  )}
                </DropdownToggle>
              </UncontrolledDropdown>
            </div>
          );
        }
      }
    ];

    const handlePromote = (row, promoteActionState) => {
      MySwal.fire({
        icon: promoteActionState ? 'info' : 'question',
        showCancelButton: true,
        title: `Do you really ${promoteActionState ? 'Promote' : 'Drop down'} to this rank?`,
        customClass: {
          confirmButton: customConfirmClass,
          cancelButton: customCancelClass
        },
        showClass: {
          popup: 'animate__animated animate__bounceIn'
        },
        buttonsStyling: false
      }).then((Confirm) => {
        if (Confirm.isConfirmed) {
          if (props.data.rank[0].rankOrder === 0) {
            const historyRankIds = props.data.rankAll.map((rankItem) => rankItem._id);
            const selectRankPosition = historyRankIds.indexOf(row._id);
            const slicedHistoryIds = historyRankIds.slice(0, selectRankPosition + 1);
            const history = slicedHistoryIds.map((item) => {
              return { rankId: item, promote: new Date() };
            });
            dispatch(
              createMemberRankAction(
                {
                  memberId: props.data.member[0]._id,
                  eventId: eventId,
                  categoryId: props.data.category[0]._id,
                  divisionId: props.data.division[0]._id,
                  rankId: row._id,
                  history: history,
                  type: 'event'
                },
                props.data.member[0].firstName,
                props.refetch
              )
            );
          } else {
            const historyRankIds = props.data.rankAll.map((rankItem) => rankItem._id);
            const currentRankPosition = historyRankIds.indexOf(props.data.rank[0]._id);
            const selectRankPosition = historyRankIds.indexOf(row._id);
            const slicedHistoryIds = promoteActionState
              ? historyRankIds.slice(currentRankPosition + 1, selectRankPosition + 1)
              : historyRankIds.slice(selectRankPosition + 1, currentRankPosition + 1);
            promoteActionState
              ? dispatch(
                  promoteMemberRankAction(
                    {
                      memberRankId: props.data._id,
                      sportName: selectSportData?.sportName,
                      categoryName: props.data.category[0].categoryName,
                      rankName: row.rankName
                    },
                    { promoteRankId: row._id, rankIds: slicedHistoryIds },
                    props.refetch
                  )
                )
              : dispatch(
                  dropMemberRankAction(
                    {
                      memberRankId: props.data._id,
                      sportName: selectSportData?.sportName,
                      categoryName: props.data.category[0].categoryName,
                      rankName: row.rankName
                    },
                    { promoteRankId: row._id, rankIds: slicedHistoryIds },
                    // { id: row._id, promote: row.promote }
                    props.refetch
                  )
                );
          }
        }
      });
    };

    return (
      <div className="expandable-content p-2">
        <DataTable data={props.data.rankAll} columns={columns}></DataTable>
      </div>
    );
  };
  return (
    <>
      <div className="bg-white p-1 h-100 ">
        <div
          style={{
            backgroundColor: '#c52f2f',
            borderRadius: '6px',
            color: '#fff'
          }}
          className="d-flex justify-content-center align-items-center mb-1"
        >
          <h4 className="mt-1" style={{ color: '#fff' }}>
            {selectSportData?.sportName}
          </h4>
        </div>
        <div class="d-flex justify-content-between align-items-center pb-1">
          <div>
            <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
              <div className="mx-1">
                <Input
                  id="search-invoice"
                  placeholder="Search "
                  className="w-100"
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setSearch(e.target.value);
                    }
                  }}
                />
              </div>
              <div class="mx-1">
                <Select
                  isClearable={false}
                  placeholder={'Sport Category'}
                  value={selectCategoryName}
                  onChange={(e) => {
                    setSelectCategoryName(e);
                    setSelectDivisionName({ value: '', label: 'Select Division' });
                    setSelectRankName({ value: '', label: 'Select Rank' });
                    setSelectYear({ value: '', label: 'Select Year' });
                  }}
                  options={categoryNames}
                  className="react-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                />
              </div>
              <div class="mx-1">
                <Select
                  isClearable={false}
                  placeholder={'Division'}
                  onChange={(e) => {
                    setSelectDivisionName(e);
                    setSelectYear({ value: '', label: 'Select Year' });
                  }}
                  value={selectDivisionName}
                  options={divisionNames}
                  className="react-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                />
              </div>
              <div class="mx-1">
                <Select
                  isClearable={false}
                  placeholder={'Rank'}
                  onChange={(e) => {
                    setSelectRankName(e);
                    setSelectYear({ value: '', label: 'Select Year' });
                  }}
                  value={selectRankName}
                  options={rankNames}
                  className="react-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                />
              </div>
              <div class="mx-1">
                <Select
                  isClearable={false}
                  onChange={(e) => setSelectYear(e)}
                  value={selectYear}
                  placeholder={'Select Year'}
                  options={yearNames}
                  className="react-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                />
              </div>
            </div>
          </div>
          <div class=" mx-2">
            <button
              class="rounded btn btn-primary text-white customFilterBtn mx-1"
              style={{ width: '100%' }}
              onClick={() => setOpenAddProgression(true)}
            >
              Add Progression
            </button>
          </div>
        </div>
        <div className="react-dataTable user-view-account-projects">
          <DataTable
            noHeader
            responsive
            columns={columns}
            data={progressionData}
            className="react-dataTable"
            // paginationPerPage={8}
            pagination
            paginationServer
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
            sortIcon={<ChevronDown size={10} />}
            expandableRows
            expandableRowsComponent={ExpandableTable}
            expandableRowsComponentProps={{ refetch: progressionSearchDataRefresh }}
          />
        </div>
      </div>
      <AddProgression
        openAddProgression={openAddProgression}
        setOpenAddProgression={setOpenAddProgression}
        eventId={eventId}
        sportId={selectSportData?._id}
        progressionSearchDataRefresh={progressionSearchDataRefresh}
      />
    </>
  );
}
export default Retention;
