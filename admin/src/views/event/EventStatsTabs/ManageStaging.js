import React from 'react';
import { Button, Card, Col, Input, Row } from 'reactstrap';

const ManageStaging = (props) => {
  return (
    <div>
      {' '}
      <div>
        <div style={{ backgroundColor: '#f9f4d9', padding: '5px' }}>
          <span>
            <b>Manage Staging</b>
          </span>
        </div>
        <Card className="p-1 mt-1">
          <div className="p-1">
            <div className="cursor-pointer" onClick={() => true}>
              <span className="textcolor"> Members per School</span>
            </div>
            <div className="cursor-pointer" onClick={() => true}>
              <span className="textcolor">Coaches per School</span>
            </div>
            <div className="cursor-pointer" onClick={() => true}>
              <span className="textcolor">Referee per School</span>
            </div>
          </div>
          <div>
            <span>
              <b>Manage Staging</b>
            </span>
            <div>
              <span>
                Use this to freeze divisions (Staging Tools), assign divisions to rings, view
                current medal count, etc{' '}
              </span>
            </div>
            <div>
              <span style={{ color: 'red' }}>{'[Check-in/Weigh-in Members]'}</span>
            </div>
          </div>
          <Row className="mt-1">
            <Col sm={6} lg={6} md={6}>
              <div>
                <h5>Export Div Files for GUSS or Match Tool:</h5>
                <div className="d-flex align-items-center">
                  <Input type="select" style={{ width: '150px' }}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </Input>
                  <span className="ms-1">Limit to this event id:</span>
                </div>
              </div>
            </Col>
            <Col sm={6} lg={6} md={6}>
              <div className="d-flex mt-2">
                <Input className="me-1" type="text" style={{ width: '150px' }} />
                <Button color="primary">Submit</Button>
              </div>
            </Col>
          </Row>
          <div>
            <h5>OR</h5>
            <span style={{ color: 'red' }}>{'[export RAW for GUSS Management]'}</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ManageStaging;
