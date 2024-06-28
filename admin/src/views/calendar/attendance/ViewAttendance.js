// ** React Imports
import { useState } from 'react';

// ** Third Party Components
// import Flatpickr from 'react-flatpickr'
import { Calendar, ChevronDown, Trash2, X } from 'react-feather';
// import Select, { components } from 'react-select'
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Reactstrap Imports
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import AttendanceAction from './AttendanceAction';

// ** Bootstrap Checkbox Component
// const BootstrapCheckbox = forwardRef((props, ref) => (
//     <div className='form-check'>
//         <Input type='checkbox' ref={ref} {...props} />
//     </div>
// ))

const DailyAttendance = [
  { class: 'Maths Class', date: '01/13/23', program: 'Little Tiger' },
  { class: 'English Class', date: '01/18/23', program: 'Taekwondo' },
  { class: 'Science Class', date: '01/24/23', program: 'Little Tiger' },
  { class: 'Practice Class', date: '01/03/23', program: 'Taekwondo' },
  { class: 'Maths Class', date: '01/13/23', program: 'Little Tiger' },
  { class: 'English Class', date: '01/18/23', program: 'Taekwondo' },
  { class: 'Science Class', date: '01/24/23', program: 'Little Tiger' },
  { class: 'Practice Class', date: '01/03/23', program: 'Taekwondo' },
  { class: 'Maths Class', date: '01/13/23', program: 'Little Tiger' },
  { class: 'English Class', date: '01/18/23', program: 'Taekwondo' },
  { class: 'Science Class', date: '01/24/23', program: 'Little Tiger' },
  { class: 'Practice Class', date: '01/03/23', program: 'Taekwondo' }
];
const columns = [
  {
    name: 'Class',
    sortable: true,
    selector: (row) => row.class
  },
  {
    name: 'Date',
    sortable: true,
    selector: (row) => row.date
  },

  {
    name: 'Program',
    sortable: true,
    selector: (row) => row.program
  },
  {
    name: 'Actions',
    allowOverflow: true,
    // style: {
    //     display: "flex", justifyContent: "center"
    // },
    cell: (row) => <AttendanceAction row={row} />
  }
];

const ViewAttendance = (props) => {
  // ** Props
  const { viewAttendanceOpen, setViewAttendanceOpen } = props;

  // ** States
  const [currentPage, setCurrentPage] = useState(0);

  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Close BTN
  const CloseBtn = (
    <X
      className="cursor-pointer"
      size={15}
      onClick={() => setViewAttendanceOpen(!viewAttendanceOpen)}
    />
  );
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(DailyAttendance.length / 7) || 1}
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
    <Modal
      isOpen={viewAttendanceOpen}
      // className="sidebar-xl"
      style={{ width: '600px' }}
      toggle={() => setViewAttendanceOpen(!viewAttendanceOpen)}
      contentClassName="p-0 overflow-hidden"
      modalClassName="modal-slide-in event-sidebar"
    >
      <ModalHeader
        className="mb-1"
        toggle={() => setViewAttendanceOpen(!viewAttendanceOpen)}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">Attendance</h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
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
              data={DailyAttendance}
              // selectableRowsComponent={BootstrapCheckbox}
              // selectableRows
            />
          </div>
          <Button
            color="secondary"
            type="reset"
            onClick={() => setViewAttendanceOpen(false)}
            outline
          >
            Close
          </Button>
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  );
};

export default ViewAttendance;
