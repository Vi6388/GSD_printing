// ** React Imports
import { Fragment, useRef, useState } from 'react';
import React from 'react';
// import { , Input,Form } from 'reactstrap';
import CheckboxTreeView from '../../CheckboxComponent/CheckboxTreeView';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import {
  Label,
  Row,
  Col,
  Input,
  Form,
  Button,
  FormText,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form';

const Title = ({ stepper, type, eventForm }) => {
  // ** Event Type
  const [eventType, setEventType] = useState('Tournament');
  // ** Default Form Values
  const defaultValues = {
    eventTitle: '',
    typeValue: 'tournament',
    eventType: eventType
  };

  // ** Register Inputs to React Hook Form
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  // ** Next Button Click Handler
  const handleEventTitleFormSubmit = (data) => {
    console.log('eventName', data, eventType);
    eventForm.set('eventName', data.eventTitle);
    eventForm.set('eventType', eventType);

    stepper.next();
  };
  const options = [
    { label: 'Tournament', value: 'tournament' },
    { label: 'Testing', value: 'testing' },
    { label: 'Guest', value: 'guest' },
    { label: 'Instructor', value: 'instructor' },
    { label: 'Seminar', value: 'seminar' }
  ];

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Event Title</h5>
        <small className="text-muted">Enter Your Event Title.</small>
      </div>
      <Form onSubmit={handleSubmit(handleEventTitleFormSubmit)}>
        <Row>
          <Col md="12" className="mb-2">
            <Label className="form-label" for="basicInput">
              Event Title
            </Label>
            <Controller
              name="eventTitle"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  placeholder="Enter Event Title"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.eventTitle && (
              <FormText color="danger" id="validation-add-board">
                Please Enter a Valid Event Title
              </FormText>
            )}
          </Col>
          <Col md="12" className="mb-3">
            <Label className="form-label mb-1" for="eventType">
              Event Type
            </Label>
            <div className="d-flex">
              <div className="form-check me-2">
                <Input
                  type="radio"
                  id="ex1-active"
                  name="eventType"
                  value="Tournament"
                  defaultChecked
                  onChange={(e) => setEventType(e.target.value)}
                />
                <Label className="form-check-label" for="ex1-active">
                  Tournament
                </Label>
              </div>
              <div className="form-check me-2">
                <Input
                  type="radio"
                  id="ex1-active"
                  name="eventType"
                  value="Testing"
                  onChange={(e) => setEventType(e.target.value)}
                />
                <Label className="form-check-label" for="ex1-inactive">
                  Testing
                </Label>
              </div>
              <div className="form-check me-2">
                <Input
                  type="radio"
                  id="ex1-active"
                  name="eventType"
                  value="Guest"
                  onChange={(e) => setEventType(e.target.value)}
                />

                {/* <Input type="radio" name="ex1" value="Guest" id="ex1-inactive" /> */}
                <Label className="form-check-label" for="ex1-inactive">
                  Guest
                </Label>
              </div>
              <div className="form-check me-2">
                <Input
                  type="radio"
                  id="ex1-active"
                  name="eventType"
                  value="Instructor"
                  onChange={(e) => setEventType(e.target.value)}
                />
                <Label className="form-check-label" for="ex1-inactive">
                  Instructor
                </Label>
              </div>
              <div className="form-check me-2">
                <Input
                  type="radio"
                  id="ex1-active"
                  name="eventType"
                  value="Seminar"
                  onChange={(e) => setEventType(e.target.value)}
                />

                {/* <Input type="radio" name="ex1" value="Seminar" id="ex1-inactive" /> */}
                <Label className="form-check-label" for="ex1-inactive">
                  Seminar
                </Label>
              </div>
            </div>
          </Col>

          <Col md="4" className="">
            <Label className="form-label" for="basicInput">
              <h5 className="mb-0">Sport Type</h5>
            </Label>
            <CheckboxTreeView />
          </Col>

          {/* <Col className="mb-3" md="12">
            <Label className="form-label" for="basicInput">
              Event Type
            </Label>
            <Row>
              <Controller
                name="typeValue"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field: { onChange, value } }) =>
                  options.map(({ label, value: optionValue }) => (
                    <Col xl="2" className="me-1">
                      <div key={optionValue}>
                        <div className="d-flex  form-check ">
                          <input
                            type="radio"
                            value={optionValue}
                            checked={value === optionValue}
                            onChange={onChange}
                            className="p-5"
                          />
                          <div style={{ padding: '4px' }}> {label}</div>
                        </div>
                      </div>
                    </Col>
                  ))
                }
              />
            </Row>
          </Col>   */}
        </Row>
        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" type="submit">
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};
export default Title;
