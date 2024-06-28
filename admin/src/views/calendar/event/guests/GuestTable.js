// ** React Imports
import { useState } from 'react';

// ** Icons Imports
import { Edit, UserX } from 'react-feather';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Third Party Components
import Select from 'react-select';

// ** Reactstrap Imports
import {
  Table,
  Badge,
  Label,
  Input,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledButtonDropdown
} from 'reactstrap';

import { ExternalLink, Printer, File, Clipboard } from 'react-feather';

const GuestTable = (props) => {
  // ** States
  const [currentFilter, setCurrentFilter] = useState({
    value: '',
    label: 'Select Filter'
  });

  // ** Guest filter options
  const filterOptions = [
    { value: '', label: 'Select Filter' },
    { value: 'coming', label: 'Coming' },
    { value: 'nextTime', label: 'Next Time' },
    { value: 'noreply', label: 'No Reply' },
    { value: 'paid', label: 'Paid' },
    { value: 'notPaid', label: 'Not Paid' }
  ];
  return (
    <Card>
      <CardHeader>
        <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
          <div className="me-1">
            <Input
              id="search-invoice"
              placeholder="Search Guest"
              className="w-100"
              type="text"
              // value={searchTerm}
              // onChange={(e) => handleFilter(e.target.value)}
            />
          </div>
          <div>
            <Select
              isClearable={false}
              value={currentFilter}
              options={filterOptions}
              className="react-select"
              classNamePrefix="select"
              theme={selectThemeColors}
            />
          </div>
        </div>
        <div>
          <UncontrolledButtonDropdown>
            <DropdownToggle color="secondary" outline caret>
              <ExternalLink className="font-small-4 me-50" />
              <span>Export</span>
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem className="w-100">
                <Printer className="font-small-4 me-50" />
                <span>Print</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <File className="font-small-4 me-50" />
                <span>Excel</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <Clipboard className="font-small-4 me-50" />
                <span>PDF</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </div>
      </CardHeader>
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.data != undefined &&
            props.data.map((guest) => {
              return (
                <tr>
                  <td>{guest.name}</td>
                  <td>{guest.email}</td>
                  <td>{guest.phone}</td>
                  <td>
                    <Badge pill color="light-primary" className="me-1">
                      {guest.category}
                    </Badge>
                  </td>
                  <td>
                    <Badge pill color="light-primary" className="me-1">
                      {guest.status}
                    </Badge>
                    {/* <Badge pill color="light-warning" className="me-1">
                                Next Time
                            </Badge>
                            <Badge pill color="light-danger" className="me-1">
                                No Reply
                            </Badge> */}
                  </td>
                  <td>
                    {/* <Edit className="me-2 cursor-pointer" size={20} /> */}
                    <UserX size={20} className="cursor-pointer" id="positionLeft" />
                    <UncontrolledTooltip placement="left" target="positionLeft">
                      Remove Guest
                    </UncontrolledTooltip>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Card>
  );
};

export default GuestTable;
