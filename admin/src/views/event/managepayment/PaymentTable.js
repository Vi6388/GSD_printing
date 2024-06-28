import React from 'react';
import DataTable from 'react-data-table-component';
import { Card, CardBody } from 'reactstrap';

function PaymentTable() {
  return (
    <div>
      <Card>
        <CardBody>
          <DataTable />
        </CardBody>
      </Card>
    </div>
  );
}

export default PaymentTable;
