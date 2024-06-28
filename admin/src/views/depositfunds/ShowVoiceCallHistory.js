import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetCallHistory } from './store';

function ShowVoiceCallHistory() {
  const dispatch = useDispatch();
  let { userData } = useSelector((state) => state.auth);

  let { callHistory } = useSelector((state) => state.deposit);

  useEffect(() => {
    dispatch(GetCallHistory(userData?.id));
  }, []);
  const columns = [
    {
      name: 'Date',
      selector: (row) => row.Date,
      sortable: false,
      cell: (params) => {
        return (
          <>
            <span>{moment(params?.date).format('MM/DD/YYYY')}</span>
          </>
        );
      }
    },
    {
      selector: (row) => row.num,
      name: 'Number',
      sortable: true
    },

    {
      selector: (row) => row.duration + ' sec',
      name: 'Duration',
      sortable: true
    },
    {
      selector: (row) => row.recording_url,
      name: 'Recording',
      sortable: true,
      cell: (params) => {
        return (
          <>
            <div className="text">
              <audio controls>
                <source src={params?.recording_url} type="audio/mpeg" />
              </audio>
            </div>
          </>
        );
      }
    }
  ];
  return (
    <div>
      {callHistory.length > 0 ? (
        <DataTable
          responsive={true}
          columns={columns}
          data={callHistory || []}
          noHeader
          defaultSortDirection={'asc'}
          defaultSortField="firstName"
          defaultSortAsc={true}
          pagination
          sortIcon={<ArrowDown style={{ color: '#bababa' }} />}
          highlightOnHover
          customStyles={customStyles}
        />
      ) : (
        <div className="d-flex justify-content-center mt-5 pt-1" style={{ width: '500px' }}>
          <div className="align-self-center">
            <b />
            <h4>No Record Found !</h4>
          </div>
        </div>
      )}
    </div>
  );
}
export default memo(ShowVoiceCallHistory);
