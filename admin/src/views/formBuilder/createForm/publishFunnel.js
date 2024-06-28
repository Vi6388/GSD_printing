// React import
import React from 'react';
import { Row, Col, Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

// toast
import { toast } from 'react-toastify';
import { getUserData } from '../../../utility/Utils';
// Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { createForm } from '../store';

const PublishFunnel = (props) => {
  const { stepper, name, memberType, automateEntry, smartList, subCategory, formType } = props;

  const dispatch = useDispatch();

  // const dataArray = [{
  //   "Form Name": name,
  //   "Member Type": memberType,
  //   "Automate Entry": automateEntry,
  //   "Smart List": smartList,
  //   "Sub Category": subCategory,
  //   "Form Type": formType }];

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = dispatch(
      createForm({
        userId: getUserData().id,
        name,
        memberType,
        automateEntry,
        smartList,
        subCategory,
        formType
      })
    );

    if (data) {
      toast.success('Ticket created successfully');
    } else {
      toast.error('Ticket creation failed');
    }
  };

  return (
    <Form>
      <FormGroup row>
        <Label for="formName" sm={2}>
          Form Name:
        </Label>
        <Col sm={10}>
          <Input id="formName" name="formName" value={name} disabled />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="memberType" sm={2}>
          Member Type:
        </Label>
        <Col sm={10}>
          <Input id="memberType" name="memberType" value={memberType} disabled />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="automateEntry" sm={2}>
          Automate Entry:
        </Label>
        <Col sm={10}>
          <Input id="automateEntry" name="automateEntry" value={automateEntry} disabled />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="smartList" sm={2}>
          Smart List:
        </Label>
        <Col sm={10}>
          <Input id="smartList" name="smartList" value={smartList} disabled />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="subCategory" sm={2}>
          Sub Category:
        </Label>
        <Col sm={10}>
          <Input id="subCategory" name="subCategory" value={subCategory} disabled />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="formType" sm={2}>
          Form Type:
        </Label>
        <Col sm={10}>
          <Input id="formType" name="formType" value={formType} disabled />
        </Col>
      </FormGroup>
      <Col className="d-flex flex-row-reverse">
        <Button color="primary" onClick={handleSubmit}>
          Publish
        </Button>
        <Button className="px-1 me-1" onClick={() => stepper.previous()}>
          Back
        </Button>
      </Col>
    </Form>
  );
};

export default PublishFunnel;
