import axios from 'axios';
import React, { useState } from 'react';
import { Edit, MoreVertical, Trash2 } from 'react-feather';
import {
  DropdownToggle,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  Input
} from 'reactstrap';

const PositionTableRow = ({ positionId, position, i, setDeleteModal, refetch }) => {
  const [editPosition, setEditPosition] = useState(false);

  return (
    <tr>
      <th scope="row">{i + 1}</th>
      <td>
        {editPosition ? (
          <form>
            <Input bsSize="sm" id="position" name="position" placeholder={position} />
          </form>
        ) : (
          <span>{position}</span>
        )}
      </td>
      <td className="d-flex gap-2">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => setEditPosition(!editPosition)} className="w-100">
              <Edit size={14} className="me-50" />
              <span className="align-middle">Edit</span>
            </DropdownItem>

            <DropdownItem
              className="w-100"
              onClick={(e) => {
                setDeleteModal({
                  id: positionId,
                  show: true
                });
              }}
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};

export default PositionTableRow;
