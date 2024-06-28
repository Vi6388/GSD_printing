import React, { Fragment, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';

const ViewMembersMain = () => {
  return (
    <Fragment>
      <Card className="p-1">
        <div>
          <h4>2023 CMA BROOKLYN REGIONAL CHAMPIONSHIPS</h4>
        </div>
        <div className="p-1">
          <span>
            NOTE: to edit event information please use the EDIT tag next to the Events Created list
            on your MyAccounts page. Also, please note that you will need Javascript ENABLED to use
            this page to it's fullest extent. If you don't know what that means, then don't worry
            about it. By default Javascript is enabled.
          </span>
          <div className="mt-2">
            <Card className="p-1 bg-primary text-white">
              <b>View/Edit Members/Assistants</b>
            </Card>
            <div style={{ borderBottom: '1px solid #b8b6c2' }} className=" mt-1">
              <span>
                Choose the Member from the drop list and submit. A new menu will result. To remove
                coaches/officials use coach/official.
              </span>
              <Row className=" my-1">
                <Col sm={4} lg={4} md={4}>
                  <Label>Members</Label>
                  <Input type="select">
                    <option>Title 1</option>
                    <option>Title 1</option>
                    <option>Title 1</option>
                    <option>Title 1</option>
                  </Input>
                </Col>
                <Col sm={4} lg={4} md={4}>
                  <Label>Coaches</Label>
                  <Input type="select">
                    <option>Title 1</option>
                    <option>Title 1</option>
                    <option>Title 1</option>
                    <option>Title 1</option>
                  </Input>
                </Col>
                <Col sm={4} lg={4} md={4}>
                  <Label>Officials</Label>
                  <Input type="select">
                    <option>Title 1</option>
                    <option>Title 1</option>
                    <option>Title 1</option>
                    <option>Title 1</option>
                  </Input>
                </Col>
              </Row>
            </div>
            <div className="mt-1">
              <div>
                <span>
                  <b>Students Pending Registration</b>
                </span>
                <div>
                  <span style={{ color: 'red' }}>Check Now</span>
                </div>
              </div>
              <div>
                <span>
                  <b>Add Assistant Director</b>
                </span>
                <div>
                  <span>
                    Assistant Directors have access to this one event to help manage the event.
                  </span>
                </div>
                <div>
                  <span style={{ color: 'red' }}>{'[Manage Assistence]'}</span>
                </div>
              </div>
              <div>
                <span>
                  <b>Add Members to My event</b>
                </span>
                <div>
                  <span>
                    Use this to add Members to your event without having to log into their account
                  </span>
                </div>
                <div>
                  <span style={{ color: 'red' }}>{'[Add Mambers]'}</span>
                </div>
              </div>
              <div>
                <span>
                  <b>Display Divisions</b>
                </span>
                <div>
                  <span>View the current division rules Tourneyreg is using for this event</span>
                </div>
                <div>
                  <span style={{ color: 'red' }}>{'[Views Division]'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};
export default ViewMembersMain;
