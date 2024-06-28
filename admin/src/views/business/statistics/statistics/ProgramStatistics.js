import React from 'react';
import { Card, Col, FormGroup, Input, Row } from 'reactstrap';
import IncomeChart from '../Chart';
import IncomeType from '../IncomeType';

function MemberStatistics() {
  return (
    <Card>
      <IncomeChart />
    </Card>
  );
}

export default MemberStatistics;
