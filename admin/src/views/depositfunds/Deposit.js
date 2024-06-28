import React, { memo, useState } from 'react';
import { Input, CardText, Row, Col, Button } from 'reactstrap';

// ** Custom Components
import Card from '@components/card-snippet';
import DataTable from 'react-data-table-component';

import StripeForm from './StripeForm';
import { toast } from 'react-toastify';
import Select from 'react-select';
// ** Utils
import { selectThemeColors } from '@utils';
function Deposit() {
  const [data, setData] = React.useState([
    { dollar: '$5', credit: '300 credits' },
    { dollar: '$10', credit: '700 credits' },
    { dollar: '$15', credit: '1500 credits' }
  ]);

  const planOptions = [
    { value: '', label: 'Select Plan ' },
    { value: '5', label: '$5 ' },
    { value: '10', label: '$10 ' },
    { value: '15', label: '$15 ' },
    { value: '20', label: '$20 ' }
  ];
  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Type'
  });

  const [Amount, setAmount] = React.useState(0);
  // handel card display
  const [cardDisplay, setCardDisplay] = React.useState(false);
  return (
    <div>
      <Card title="Buy Credits">
        <Row>
          <Col md="6">
            <div
              style={{
                textAlign: 'center',
                marginTop: '5%',
                marginBottom: '15%'
              }}
            >
              <h3>how many Credits Would you like to purchase</h3>
              <p>Calculate your credit cost</p>
            </div>
            <div className="deposit-input">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                value={currentPlan}
                onChange={(data) => {
                  setCurrentPlan(data);
                }}
              />
              {/* <Input
                type="text"
                placeholder="Enter Amount"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              /> */}
            </div>
            <div className="deposit-amount">
              <h1>$ {currentPlan.value ? currentPlan.value : 0}</h1>
            </div>
            <div style={{ marginTop: '5%', textAlign: 'center' }}>
              <Button
                color="primary"
                className="add-todo-item me-1"
                onClick={() => {
                  if (!currentPlan.value) {
                    toast.error('Please enter amount');
                  } else {
                    setCardDisplay(true);
                  }
                }}
              >
                Buy Credits
              </Button>
            </div>
          </Col>
          <Col md="6">
            <div>
              <DataTable
                columns={[
                  {
                    name: 'Dollar',
                    selector: 'dollar',
                    sortable: true
                  },
                  {
                    name: 'Credit',
                    selector: 'credit',
                    sortable: true
                  }
                ]}
                data={data}
                // pagination
                // paginationPerPage={5}
                // paginationRowsPerPageOptions={[5, 10, 15]}
                paginationComponentOptions={{
                  rowsPerPageText: 'Rows per page:',
                  rangeSeparatorText: 'of'
                }}
              />
            </div>
          </Col>
        </Row>
        {cardDisplay && <StripeForm amount={currentPlan.value} />}
      </Card>
    </div>
  );
}
export default memo(Deposit);
