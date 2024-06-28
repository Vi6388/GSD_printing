// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Components
import axios from 'axios';
import DataTable from 'react-data-table-component';
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
  ArrowDownCircle,
  TrendingDown,
  MoreHorizontal
} from 'react-feather';
import { CiCircleCheck } from 'react-icons/ci';
import { GrReactjs } from 'react-icons/gr';

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Progress,
  Button
} from 'reactstrap';

// ** Reactstrap Imports
import { UncontrolledTooltip } from 'reactstrap';

import topRankImg from '@src/assets/images/rank/topmedal.png';
import newRankImg from '@src/assets/images/rank/newmedal.png';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { dropMemberRankAction, promoteMemberRankAction } from '../stores/action';
import { useDispatch } from 'react-redux';
const MySwal = withReactContent(Swal);
const customConfirmClass = 'w-40 btn btn-danger';
const customCancelClass = 'w-40 ms-1 btn btn-outline-danger';
// ** Vars
const states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];

const invoiceStatusObj = {
  Sent: { color: 'light-secondary', icon: Send },
  Paid: { color: 'light-success', icon: CheckCircle },
  Draft: { color: 'light-primary', icon: Save },
  Downloaded: { color: 'light-info', icon: ArrowDownCircle },
  'Past Due': { color: 'light-danger', icon: Info },
  'Partial Payment': { color: 'light-warning', icon: PieChart }
};

const status = {
  1: { title: 'Monthly', color: 'light-primary' },
  2: { title: 'Weekly', color: 'light-success' },
  3: { title: 'Auto Pay', color: 'light-danger' },
  4: { title: 'Resigned', color: 'light-warning' },
  5: { title: 'Applied', color: 'light-info' }
};

export let data;

// ** Get initial Data
axios.get('/api/datatables/initial-data').then((response) => {
  data = response.data;
});

//Progression
export const useColumns = () => {
  // ** Table Common Column
  const columns = [
    {
      name: 'Sport ',
      // minWidth: '80px',
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.sportName}</span>
          </div>
        </div>
      )
    },

    {
      name: 'Sport Category ',
      sortable: true,
      // minWidth: '140px',
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ">
            <span className="d-block fw-bold text-truncate width-100 ">{row.categoryName}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Current Rank',
      // minWidth: '230px',
      cell: (row) => (
        <div className="d-flex align-items-center">
          <Avatar className="mx-1" img={row.rankImage} alt={row.rankName} imgWidth="32" />
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.rankName}</span>
            <small className="text-muted">{row.categoryName}</small>
          </div>
        </div>
      )
    },

    {
      name: 'Date Promoted',
      sortable: true,
      // minWidth: '150px',
      cell: (row) => (
        <div className="d-flex align-items-center">
          <span className="">{row.promote}</span>
        </div>
      )
    },

    {
      name: 'Total',
      // minWidth: '150px',
      sortable: (row) => row.total,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <Badge
            style={{ width: '30px', height: '30px', borderRadius: '16px', fontSize: '20px' }}
            color="light-primary"
          >
            {row.total}
          </Badge>
        </div>
      )
    }
  ];
  return {
    columns
  };
};

const ExpandableTable = (props) => {
  const dispatch = useDispatch();
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
            <small className="text-muted">{row.categoryName}</small>
          </div>
        </div>
      )
    },
    {
      name: 'Date Promoted',
      // sortable: true,
      // minWidth: '140px',
      sortable: (row) => row.promote,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.promote}</span>
          </div>
        </div>
      )
    },

    {
      name: 'Promote',
      // sortable: true,
      // minWidth: '150px',
      cell: (row) => (
        <div className="d-flex align-items-center">
          {row._id === props.data._id ? (
            <Badge className="cursor-pointer" color="light-success">
              Now Promoted
            </Badge>
          ) : row.promote === 'N/A' ? (
            <Badge className="cursor-pointer" color="primary">
              Not Promoted
            </Badge>
          ) : (
            <Badge className="cursor-pointer" color="light-primary">
              Promoted
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
                {row._id === props.data._id ? (
                  <MoreHorizontal color="#C52F2F" size={16} />
                ) : row.promote === 'N/A' ? (
                  <TrendingUp
                    className="cursor-pointer"
                    color="#C52F2F"
                    size={16}
                    onClick={() => {
                      handlePromote(row, true);
                    }}
                  />
                ) : (
                  <TrendingDown
                    className="cursor-pointer"
                    color="#C52F2F"
                    size={16}
                    onClick={() => {
                      handlePromote(row, false);
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
        const historyRankIds = props.data.history.map((historyItem) => historyItem._id);
        const currentRankPosition = historyRankIds.indexOf(props.data._id);
        const selectRankPosition = historyRankIds.indexOf(row._id);
        const slicedHistoryIds = promoteActionState
          ? historyRankIds.slice(currentRankPosition + 1, selectRankPosition + 1)
          : historyRankIds.slice(selectRankPosition + 1, currentRankPosition + 1);
        promoteActionState
          ? dispatch(
              promoteMemberRankAction(
                {
                  memberRankId: props.data.memberRankId,
                  sportName: props.data.sportName,
                  categoryName: props.data.categoryName,
                  rankName: row.rankName
                },
                { promoteRankId: row._id, rankIds: slicedHistoryIds },
                props.memberRankDataRefetch
              )
            )
          : dispatch(
              dropMemberRankAction(
                {
                  memberRankId: props.data.memberRankId,
                  sportName: props.data.sportName,
                  categoryName: props.data.categoryName,
                  rankName: row.rankName
                },
                { promoteRankId: row._id, rankIds: slicedHistoryIds },
                // { id: row._id, promote: row.promote }
                props.memberRankDataRefetch
              )
            );
      }
    });
  };

  return (
    <div className="expandable-content p-2">
      <DataTable data={props.data.history} columns={columns}></DataTable>
    </div>
  );
};

export default ExpandableTable;
