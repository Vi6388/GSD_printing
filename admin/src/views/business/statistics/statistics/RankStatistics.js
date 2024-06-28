import React from 'react';
import { Card, Col, FormGroup, Input, Row } from 'reactstrap';
import IncomeChart from '../Chart';
import IncomeType from '../IncomeType';
import VerticleChart from '../Verticle';

function MemberStatistics() {
  return (
    <Card>
      <VerticleChart className="mt-1" />
      <Row className="d-flex align-item-center p-1 ">
        <Col md={2}>
          <Input id="exampleSelect" name="select" type="select">
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </Input>
        </Col>
        <Col md={2}>
          <Input id="exampleSelect" name="select" type="select">
            <option>2010</option>
            <option>2011</option>
            <option>2012</option>
            <option>2013</option>
            <option>2014</option>
            <option>2015</option>
            <option>2016</option>
            <option>2017</option>
            <option>2018</option>
            <option>2019</option>
            <option>2020</option>
            <option>2021</option>
          </Input>
        </Col>
        {/* <Col md={2}>
                    <FormGroup>
                        <Input id="exampleSelect" name="select" type="select">
                            <option>All</option>
                            <option>Join</option>
                            <option>Not Join</option>
                        </Input>
                    </FormGroup>
                </Col> */}
      </Row>
    </Card>
  );
}

export default MemberStatistics;
