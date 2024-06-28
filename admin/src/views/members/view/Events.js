import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { eventColumns } from './Data';
import ReactPaginate from 'react-paginate';
import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';
import { Card, CardHeader, CardTitle } from 'reactstrap';
import { fetchEventById } from '../../../requests/memberships/membershipAPI';

const Events = ({ users }) => {
  const { id } = useParams();
  const { data: event } = fetchEventById(id);
  const [currentPage, setCurrentPage] = useState(0);
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={10}
      breakLabel={'...'}
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
      containerClassName={
        'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1'
      }
    />
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Events</CardTitle>
      </CardHeader>
      <div className="react-dataTable">
        {!users && (
          <DataTable
            noHeader
            pagination
            data={[event]}
            columns={eventColumns}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
        )}
      </div>
    </Card>
  );
};

export default Events;
