// ** React Imports
import React, { Fragment, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Edit2,
  Eye,
  Trash2,
  User,
} from "react-feather";

// ** Styles Imports
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { Badge, Button, Col, Input, Row } from "reactstrap";
// import Avatar from '../../../components/avatar';
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

const DailyAttendance = [
  { name: "Maths Class", date: "01/13/23", type: "New Member" },
  { name: "English Class", date: "01/18/23", type: "Personal" },
  { name: "Science Class", date: "01/24/23", type: "Business" },
  { name: "Practice Class", date: "01/03/23", type: "Business" },
  { name: "Maths Class", date: "01/13/23", type: "Other" },
  { name: "English Class", date: "01/18/23", type: "New Member" },
  { name: "Science Class", date: "01/24/23", type: "Other" },
  { name: "Practice Class", date: "01/03/23", type: "Information" },
  { name: "Maths Class", date: "01/13/23", type: "New Member" },
  { name: "English Class", date: "01/18/23", type: "Personal" },
  { name: "Science Class", date: "01/24/23", type: "Reschedule" },
  { name: "Practice Class", date: "01/03/23", type: "Business" },
];
const columns = [
  {
    name: "Name",
    sortable: true,
  },
  {
    name: "Email",
    sortable: true,
  },
  {
    name: "Phone No.",
    sortable: true,
  },
  {
    name: "Description",
    sortable: true,
  },
  {
    name: "Date",
    sortable: true,
  },
  {
    name: "Actions",
    allowOverflow: true,
    cell: (row) => (
      <div>
        {/* <Eye size={16} /> */}
        {/* <Edit2 size={16} /> */}
        <Trash2 size={16} className="ms-1" />
      </div>
    ),
  },
];

const ContactList = (props) => {
  const { stepper } = props;
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
    <Fragment>
      <Row>
        <Col lg="12">
          <Breadcrumb>
            <BreadcrumbItem>
              <h4 style={{ marginBottom: "10px" }}>Contacts</h4>
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>

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
    </Fragment>
  );
};

export default ContactList;
