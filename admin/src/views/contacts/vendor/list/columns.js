// ** React Imports
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Third Party Component
import { Eye } from 'react-feather';

// ** Store & Actions
import { store } from '@store/store';
import { getUser, deleteUser } from '../store';

// ** Icons Imports
import { MoreVertical, FileText, Trash2, Archive } from 'react-feather';

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

// ** Renders Client Columns
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

  if (row.avatar.length) {
    return <Avatar className="me-1" img={row.avatar} width="32" height="32" />;
  } else {
    return (
      <Avatar
        color={color || 'primary'}
        className="me-1"
        content={row.fullName || 'John Doe'}
        initials
      />
    );
  }
};

const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
};

export const columns = [
  {
    name: 'Vendor',
    sortable: true,
    minWidth: '240px',
    sortField: 'fullName',
    selector: (row) => row.fullName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/contacts/vendor/view/${row.id}`}
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
    name: 'Status',
    width: '120px',
    sortable: true,
    sortField: 'status',
    selector: (row) => row.status,
    cell: (row) => (
      <Badge className="text-capitalize" color={statusObj[row.status]} pill>
        {row.status}
      </Badge>
    )
  },
  {
    name: 'Position',
    sortable: true,
    width: '130px',
    sortField: 'role',
    selector: (row) => row.company,
    cell: (row) => <span>{row.role}</span>
  },
  {
    name: 'Company',
    sortable: true,
    minWidth: '180px',
    sortField: 'role',
    selector: (row) => row.company,
    cell: (row) => <span>{row.company}</span>
  },
  {
    name: 'Type',
    width: '110px',
    sortable: true,
    sortField: 'currentPlan',
    selector: (row) => row.currentPlan,
    cell: (row) => <span className="text-capitalize">retial</span>
  },

  {
    name: 'Address',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: (row) => row.country,
    cell: (row) => <span>{row.country}</span>
  },
  {
    name: 'Phone',
    width: '150px',
    selector: (row) => row.contact,
    cell: (row) => <span>{row.contact}</span>
  },
  {
    name: 'Rating',
    width: '100px',
    center: true,
    selector: (row) => row.billing,
    cell: () => (
      <div className="table-rating">
        <span>15</span>
      </div>
    )
  },
  {
    name: 'Note',
    width: '80px',
    center: true,
    selector: (row) => row.billing,
    cell: () => <Eye />
  },
  {
    name: 'Tag',
    width: '80px',
    // center: true,
    selector: (row) => row.billing,
    cell: () => (
      <Badge pill color="light-primary">
        Tag Name
      </Badge>
    )
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
              tag={Link}
              className="w-100"
              to={`/contacts/vendor/view/${row.id}`}
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">Details</span>
            </DropdownItem>
            <DropdownItem tag="a" href="/" className="w-100" onClick={(e) => e.preventDefault()}>
              <Archive size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                store.dispatch(deleteUser(row.id));
              }}
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
];
