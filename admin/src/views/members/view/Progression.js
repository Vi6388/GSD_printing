// ** React Imports
import { useState } from 'react';

// ** Table columns & Expandable Data
import ExpandableTable from './useColumn';
import { useColumns } from './useColumn';

// ** Third Party Components
import ReactPaginate from 'react-paginate';
import { ChevronDown } from 'react-feather';
import DataTable from 'react-data-table-component';

// ** Reactstrap Imports
import { Button, Card, CardHeader, CardTitle, UncontrolledTooltip, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

const Progression = ({ progressionTableData, memberRankDataRefetch }) => {
  // ** State

  const [currentPage, setCurrentPage] = useState(0);

  const datas = [
    {
      id: 1,
      type: 'type name',
      rank: {
        rank: 'Rank 1',
        image:
          'https://storage.googleapis.com/mymember-storage/All-Images/53eca07a-b288-46ab-9f79-3fc46d6fba60-white-orange.png'
      },
      payment: 'paid',
      promoteDate: '09/23/2016'
    },
    {
      id: 2,
      type: 'type name',
      rank: {
        rank: 'Rank 1',
        image:
          'https://storage.googleapis.com/mymember-storage/All-Images/53eca07a-b288-46ab-9f79-3fc46d6fba60-white-orange.png'
      },
      payment: 'paid',
      promoteDate: '05/23/2016'
    },
    {
      id: 3,
      type: 'type name',
      rank: {
        rank: 'Rank 1',
        image:
          'https://storage.googleapis.com/mymember-storage/All-Images/53eca07a-b288-46ab-9f79-3fc46d6fba60-white-orange.png'
      },
      payment: 'paid',
      promoteDate: '01/23/2016'
    },
    {
      id: 4,
      type: 'type name',
      rank: {
        rank: 'Rank 1',
        image:
          'https://storage.googleapis.com/mymember-storage/All-Images/53eca07a-b288-46ab-9f79-3fc46d6fba60-white-orange.png'
      },
      payment: 'paid',
      promoteDate: '02/23/2016'
    }
  ];

  const { columns } = useColumns();
  // ** Function to handle filter
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Custom Pagination
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
        <h4>Progression</h4>

        <h5 color="primary">Progression Name </h5>
      </CardHeader>
      <div className="react-dataTable">
        <DataTable
          noHeader
          pagination
          data={progressionTableData}
          expandableRows
          columns={columns}
          expandOnRowClicked
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          paginationDefaultPage={currentPage + 1}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          expandableRowsComponent={ExpandableTable}
          expandableRowsComponentProps={{ memberRankDataRefetch: memberRankDataRefetch }}
        />
      </div>
    </Card>
  );
};

export default Progression;
