import React from 'react';

import { useState } from 'react/cjs/react.development';
import TableRows from './TableRows';
function AddDeleteTableRows() {
  const [rowsData, setRowsData] = useState([]);

  const addTableRows = () => {
    const rowsInput = {
      fullName: '',
      emailAddress: '',
      salary: ''
    };
    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };
  return (
    <div className="row">
      <div className="dynamic-tab">
        <table className="table">
          <thead>
            <tr>
              <th>Membership ID </th>
              <th>Date Of Birth</th>
              <th>Access Type</th>
              <th>
                <button className="btn btn-outline-success" onClick={addTableRows}>
                  +
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <TableRows
              rowsData={rowsData}
              deleteTableRows={deleteTableRows}
              handleChange={handleChange}
            />
          </tbody>
        </table>
      </div>
      {/* <div className="col-sm-4"></div> */}
    </div>
  );
}
export default AddDeleteTableRows;
