// ** React Imports
import { useState, useEffect } from 'react';

// ** Third Party Components
import DataTable from 'react-data-table-component';
import { ChevronDown, ExternalLink, Printer, FileText, File, Clipboard, Copy } from 'react-feather';

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown
} from 'reactstrap';

// ** Store & Actions
import { getData } from '@src/views/apps/invoice/store';
import { useDispatch, useSelector } from 'react-redux';

// ** Styles
import '@styles/react/apps/app-invoice.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

const EventOverview = () => {
  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="py-1">
          <CardTitle tag="h4">Invoices</CardTitle>
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
                <FileText className="font-small-4 me-50" />
                <span>CSV</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <File className="font-small-4 me-50" />
                <span>Excel</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <Clipboard className="font-small-4 me-50" />
                <span>PDF</span>
              </DropdownItem>
              <DropdownItem className="w-100">
                <Copy className="font-small-4 me-50" />
                <span>Copy</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </CardHeader>
      </Card>
    </div>
  );
};

export default EventOverview;
