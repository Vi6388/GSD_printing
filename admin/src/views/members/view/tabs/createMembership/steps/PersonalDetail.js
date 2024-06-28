// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button, FormText } from 'reactstrap';

// ** Third Party Components
import Select from 'react-select';

import Flatpickr from 'react-flatpickr';
import '@styles/react/libs/flatpickr/flatpickr.scss';

import { useForm, Controller } from 'react-hook-form';

const Address = ({ stepper, type, eventForm }) => {
  // ** Default Form Values
  const defaultValues = {
    eventLocation: '',
    eventState: '',
    city: '',
    street: '',
    zip: parseInt('')
  };

  // ** Register Inputs to React Hook Form
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  // ** Start & End Time Picker
  const [startPicker, setStartPicker] = useState(new Date());
  const [endPicker, setEndPicker] = useState(new Date());

  // ** Date Picker Options
  const options = {
    dateFormat: 'h:i K', //change format also
    enableTime: true,
    weekNumbers: true,
    // noCalendar: true,
    altInput: true,
    // altFormat: 'F j, Y - h:i ',
    time_24hr: false
  };

  const handleVenueFormSubmit = (data) => {
    // const curTimeStart =
    //   startPicker.getHours() + ':' + startPicker.getMinutes() + ':' + startPicker.getSeconds();
    // const curTimeEnd =
    //   endPicker.getHours() + ':' + endPicker.getMinutes() + ':' + endPicker.getSeconds();
    var sDate = new Date(startPicker);
    let yearStartEvent = sDate?.getFullYear();
    let monthStartEvent = sDate?.getMonth();
    let dayStartEvent = sDate?.getDate();
    let millisecondsStartEvent = new Date(
      yearStartEvent,
      monthStartEvent,
      dayStartEvent,
      sDate.getHours(),
      sDate.getMinutes(),
      sDate.getSeconds()
    ).getTime();
    //end date
    var eDate = new Date(endPicker);

    let yearEndEvent = eDate.getFullYear();
    let monthEndEvent = eDate.getMonth();
    let dayEndEvent = eDate.getDate();
    let millisecondsEndEvent = new Date(
      yearEndEvent,
      monthEndEvent,
      dayEndEvent,
      eDate.getHours(),
      sDate.getMinutes(),
      eDate.getSeconds()
    ).getTime();

    eventForm.set('startDate', millisecondsStartEvent);
    eventForm.set('endDate', millisecondsEndEvent);
    eventForm.set('startTime', '5');
    eventForm.set('endTime', '6');
    eventForm.set('eventLocation', data.eventLocation);
    eventForm.set('endRigestrationDate', '12345');
    eventForm.set('state', data.eventState);

    eventForm.set('street', data.street);
    eventForm.set('city', data.city);
    // eventForm.set('avaliableQuantity', 'eventCity');

    eventForm.set('zip', data.zip);
    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Your Personal Information</h5>
        <small>Enter Personal Information.</small>
      </div>

      <Form onSubmit={handleSubmit(handleVenueFormSubmit)}>
        <Row>
          <Col md={8}>
            <p>
              Your information will be visible by USA Taekwondo and any clubs you affiliate to on
              this membership form. Please note that you will not be able to edit your name, gender
              or date of birth once these have been submitted.
            </p>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md="4">
            <Label className="form-label" for="date-time-picker">
              First Name
            </Label>
            <Input />
          </Col>
          <Col md="4">
            <Label className="form-label" for="date-time-picker">
              Last Name
            </Label>
            <Input />
          </Col>
          <Col md="4">
            <Label className="form-label" for="date-time-picker">
              Date Of Birth
            </Label>
            <Input type="date" />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md="4" className="">
            <Label className="form-label" for="date-time-picker">
              Primary Contact Number
            </Label>
            <Input type="text" />
          </Col>
          <Col md="4" className="">
            <Label className="form-label" for="date-time-picker">
              Secondary Contact Number
            </Label>
            <Input type="text" />
          </Col>
          <Col md="4" className="">
            <Label className="form-label" for="date-time-picker">
              Gender
            </Label>
            <div className="d-flex mt-1">
              <div className="form-check me-2">
                <Label className="form-check-label" for="ex1-active">
                  Male
                </Label>
                <Input
                  type="radio"
                  id="ex1-active"
                  name="eventType"
                  value="Tournament"
                  defaultChecked
                />
              </div>
              <div className="form-check me-2">
                <Label className="form-check-label" for="ex1-active">
                  Female
                </Label>
                <Input
                  type="radio"
                  id="ex1-active"
                  name="eventType"
                  value="Tournament"
                  defaultChecked
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mb-2 mt-2">
          <Col md="6">
            <Label className="form-label" for="selectMember">
              Race/Ethnicity
            </Label>
            <Select className="react-select" />
          </Col>
          <Col md="6">
            <Label className="form-label" for="selectMember">
              Email Address
            </Label>
            <Input type="email" />
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
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

export default Address;
