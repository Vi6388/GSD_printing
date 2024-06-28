import React from 'react';
import { Table } from 'reactstrap';
import { BsThreeDots } from 'react-icons/bs';

function Archive() {
  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Type</th>
          <th>Form</th>
          <th>Steps</th>
          <th>Smartlist Tags</th>
          <th>Last Update</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Optin</td>
          <td>azvdsa</td>
          <td>N/A</td>
          <td>Smartlist tags</td>
          <td>17 hours ago</td>
          <td>
            <BsThreeDots></BsThreeDots>
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>T</td>
          <td>nas jch</td>
          <td>N/A</td>
          <td>Smartlist tags</td>
          <td>17 hours ago</td>
          <td>
            <BsThreeDots></BsThreeDots>
          </td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Forms</td>
          <td>TEMP</td>
          <td>N/A</td>
          <td>Smartlist tags</td>
          <td>4 days ago</td>
          <td>
            <BsThreeDots />
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Archive;
