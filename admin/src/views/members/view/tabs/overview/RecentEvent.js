import React from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';

function RecentEvent() {
  const columns = [
    {
      name: 'Event Name',
      sortable: true,
      minWidth: '240px',
      sortField: 'eventname',
      selector: (row) => row.eventname,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <span className="fw-bolder">{row.eventname}</span>
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
      name: 'Won',
      sortable: true,
      minWidth: '180px',
      sortField: 'won',
      selector: (row) => row.won,
      cell: (row) => <span>{row.won}</span>
    }
  ];

  const data = [
    { id: 1, eventname: 'Dance', date: '1 June, 2023', won: '$300' },
    { id: 2, eventname: 'Dance', date: '1 June, 2023', won: '$300' },
    { id: 3, eventname: 'Dance', date: '1 June, 2023', won: '$300' }
  ];

  return (
    <div>
      <h4 className="p-1">Recent Event Results</h4>
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

export default RecentEvent;
