import React from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';

function RecentProgression() {
  const columns = [
    {
      name: 'Rank',
      sortable: true,
      minWidth: '240px',
      sortField: 'rank',
      selector: (row) => row.rank,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <span className="fw-bolder">{row.rank}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Date',
      width: '150px',
      selector: (row) => row.date,
      cell: (row) => <span>{row.date}</span>
    },
    {
      name: 'Promoted',
      sortable: true,
      minWidth: '180px',
      sortField: 'won',
      selector: (row) => row.promoted,
      cell: (row) => <span>{row.promoted}</span>
    }
  ];

  const data = [
    { id: 1, rank: 'Rank 1', date: '1 June, 2023', promoted: 'Rank 2' },
    { id: 2, rank: 'Rank 2', date: '1 June, 2023', promoted: 'Rank 3' },
    { id: 3, rank: 'Rank 3', date: '1 June, 2023', promoted: 'Rank 4' }
  ];
  return (
    <div>
      <h4 className="p-1">Recent Progression Promotions</h4>
      <div className="react-dataTable">
        <DataTable
          noHeader
          sortServer
          pagination
          responsive
          paginationServer
          columns={columns}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          data={data}
        />
      </div>
    </div>
  );
}

export default RecentProgression;
