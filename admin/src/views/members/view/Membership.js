import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { columns } from './Data';
import ReactPaginate from 'react-paginate';
import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';
import { Button, Card, CardHeader, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { fetchMemberMembershipById } from '../../../requests/member/GetMembers';

const DataTableWithButtons = ({ users }) => {
  const { id } = useParams();
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
        <CardTitle tag="h4">Memberships</CardTitle>
        <Link
          to={{ pathname: '/membership', state: { memberId: id, url: window.location.pathname } }}
        >
          <Button color="primary">Add New Membership</Button>
        </Link>
      </CardHeader>
      <div className="react-dataTable">
        {!users && (
          <DataTable
            noHeader
            pagination
            data={fetchMemberMembershipById(id) ? fetchMemberMembershipById(id).data : []}
            columns={columns}
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

export default DataTableWithButtons;
