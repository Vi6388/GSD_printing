import React, { Fragment, useState } from 'react';
import DataTable from 'react-data-table-component';
import useColumns from './useColumn';
import { ChevronDown, Share, TrendingUp } from 'react-feather';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import {
  Button,
  Card,
  Col,
  Collapse,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';
import { selectThemeColors } from '@utils';

import Select from 'react-select';
import { MdCancel } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { BsPrinter } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const mockData = [
  {
    id: 1,
    schoolName: 'Delhi Public School',
    address: 'Delhi India',
    athletes: 3,
    coach: 5,
    referee: 12
  },
  {
    id: 2,
    schoolName: 'Georj School',
    address: 'New York',
    athletes: 3,
    coach: 5,
    referee: 12
  },
  {
    id: 3,
    schoolName: 'New Elec',
    address: 'USA',
    athletes: 3,
    coach: 5,
    referee: 12
  }
];

const newData = [
  {
    id: 1,
    fullName: 'Bohemia',
    tournamentAge: 7,
    rank: '7th',
    status: 'Paid'
  },
  {
    id: 2,
    fullName: 'Sonu Nigam',
    tournamentAge: 7,
    rank: '7th',
    status: 'Not Paid'
  },
  {
    id: 3,
    fullName: 'Salman Khan',
    tournamentAge: 7,
    rank: '7th',
    status: 'Paid'
  }
];

function ReportingTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [showdelete, setShowdelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentEventStat, setCurrentEventStat] = useState({
    value: '',
    label: 'Select Statistics'
  });

  const toggle = () => setIsOpen(!isOpen);
  const toggleDivision = (row) => {
    setSelectedRow(row);
    setOpen(!open);
  };

  const eventStats = [
    { value: '', label: 'Select Statistics' },
    { value: 'Member', label: 'Member' },
    { value: 'Coaches', label: 'Coaches' },
    { value: 'Referee', label: 'Referee' }
  ];

  const handleRowSelected = ({ selectedRows }) => {
    if (selectedRows.length > 0) {
      setShowdelete(true);
    } else {
      setShowdelete(false);
    }
    // dispatch(setSelectedRows(selectedRows));
  };
  const { columns, modalColumns } = useColumns({ toggleDivision });

  return (
    <Fragment>
      <div className="d-flex justify-content-end mt-1">
        <Select
          isClearable={false}
          value={currentEventStat}
          options={eventStats}
          className="react-select me-1"
          classNamePrefix="select"
          theme={selectThemeColors}
          // onChange={(data) => {
          //   setCurrentEventStat(data);
          // }}
        />
        <Link to={{ pathname: '/event-states-print' }}>
          <Button className="btn-icon me-1" outline color="primary">
            <BsPrinter className="font-small-4 me-50" />
            <span className="align-middle">Print</span>
          </Button>
        </Link>
        <div>
          <Button.Ripple className="btn-icon me-1" outline color="primary">
            <Share className="font-small-4 me-50" />
            <span className="align-middle">Export</span>
          </Button.Ripple>
        </div>
      </div>
      <div className="app-user-list mt-1">
        <Card>
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
              // paginationComponent={CustomPagination}
              data={mockData}
              onSelectedRowsChange={handleRowSelected}
              selectableRows
            />
          </div>
        </Card>
      </div>
      <Modal isOpen={open} toggle={toggleDivision} size="lg" centered>
        <Card>
          <ModalHeader className="bg-white">
            <div className="d-flex">
              <h4>School Name here </h4>
              <div style={{ marginLeft: '20px', fontWeight: 'bold' }}>( 3 )</div>
            </div>
          </ModalHeader>
          <button
            style={{
              border: '2px solid #fff',
              position: 'absolute',
              right: '-15px',
              top: '-15px',
              background: '#fff',
              padding: '5px',
              borderRadius: '5px',
              zIndex: '898989'
            }}
            onClick={toggleDivision}
          >
            <AiOutlineClose size={18} />
          </button>{' '}
          {selectedRow && (
            <div className="react-dataTable">
              <DataTable
                noHeader
                sortServer
                pagination
                responsive
                paginationServer
                columns={modalColumns}
                sortIcon={<ChevronDown />}
                className="react-dataTable"
                // paginationComponent={CustomPagination}
                data={newData}
                // onSelectedRowsChange={handleRowSelected}
                // selectableRows
              />
            </div>
          )}
        </Card>
      </Modal>
    </Fragment>
  );
}

export default ReportingTable;
