import React from 'react';
import { Button, Card, Col, Input, Label, Row } from 'reactstrap';
import Select from 'react-select';

function EventStatesPrint() {
  return (
    <Card className="p-1 ">
      <div className="bordered">
        <Card className="bg-primary mb-1 p-1 text-white">
          <b>Print Brackets</b>
        </Card>
        <h5>Display/Printing Division Sheets</h5>
        <Row className="mb-1">
          <Col md={3}>
            <Label>Choose an event to print brackets</Label>
            <Select />
          </Col>
          <Col md={3}>
            <Label>Limited By Rank From</Label>
            <Select />
          </Col>
          <Col md={2}>
            <Label>Limited By Rank To</Label>
            <Select />
          </Col>
          <Col md={2}>
            <Label>Gender</Label>
            <Select />
          </Col>
          <Col md={1}>
            <Label>Age From</Label>
            <Input />
          </Col>
          <Col md={1}>
            <Label>Age To</Label>
            <Input />
          </Col>
        </Row>
        <span className="text-primary">
          New to split divisions by age type in the age you want (div is 6-7 just want 6 type 6 into
          both upper and lower age limit). Works with single div tool!
        </span>
        <div style={{ width: '100px' }} className="mb-1">
          <Label>One Div</Label>
          <Input />
        </div>
        <div className="mt-1 mb-2">
          <div>
            <Input type="radio" /> <span>Print as a list</span>
          </div>
          <div>
            <Input type="radio" /> <span>Print as bracketed</span>
          </div>
          <div>
            <Input type="radio" /> <span>Print Vertical bracketing</span>
          </div>
          <div>
            <Input type="radio" /> <span>Print Landscape bracketing</span>
          </div>
          <div>
            <Input type="checkbox" />{' '}
            <span>Print double elimination? (12 or less competitors)</span>
          </div>
          <div>
            <Input type="checkbox" />{' '}
            <span>Print Brazilian Repachage bracketing? (16 or less competitors)</span>
          </div>
        </div>
        <Row>
          <Col md={3}>
            <Input type="select" id="rows-per-page" style={{ width: '5rem', marginBottom: '10px' }}>
              <option>4</option>
              <option>8</option>
              <option>16</option>
              <option>32</option>
            </Input>
            <Button className="btn" color="primary">
              Open Division Sheet
            </Button>
          </Col>
          <Col md={9}>
            <span>
              Limit to N competitors (ie, no more than 4 in a division before it breaks into
              subdivisions)
            </span>
          </Col>
        </Row>
      </div>
    </Card>
  );
}

export default EventStatesPrint;
