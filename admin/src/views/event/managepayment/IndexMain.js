import { Fragment, useContext, useState } from 'react';
import { Col, Row } from 'reactstrap';
import Earning from './Earning';
import StatsCard from './StatasCard';
import { ThemeColors } from '@src/utility/context/ThemeColors';
import Transactions from './Transactions';
import PaymentTable from './PaymentTable';
function IndexMain() {
  const { colors } = useContext(ThemeColors);
  return (
    <div>
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <Earning success={colors.success.main} />
        </Col>
        <Col xl="8" md="6" xs="12">
          <StatsCard cols={{ xl: '3', sm: '6' }} />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="4" md="6" xs="12">
          <Transactions />
        </Col>
        <Col lg="8" md="6" xs="12">
          <PaymentTable />
        </Col>
      </Row>
    </div>
  );
}

export default IndexMain;
