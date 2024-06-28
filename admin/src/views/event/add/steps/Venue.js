// ** React Imports
import { Fragment, useState } from 'react';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button, FormFeedback } from 'reactstrap';

// ** Third Party Components
import Flatpickr from 'react-flatpickr';
import { Controller, useForm } from 'react-hook-form';

const Address = ({ stepper, type, eventForm }) => {
  // ** Default Form Values
  const defaultValues = {
    startPicker: '',
    endPicker: '',
    eventLocation: '',
    eventStreet: '',
    eventCity: '',
    eventState: '',
    zip: ''
  };
  // ** Register Inputs to React Hook Form
  const {
    reset,
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const options = {
    dateFormat: 'h:i K', //change format also
    enableTime: true,
    weekNumbers: true,
    // noCalendar: true,
    altInput: true,
    // altFormat: 'F j, Y - h:i ',
    time_24hr: false
  };

  const handleCreateClickHandler = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      eventForm.set('startTime', data.startPicker);
      eventForm.set('endTime', data.endPicker);
      eventForm.set('eventLocation', data.eventLocation);
      eventForm.set('street', data.eventStreet);
      eventForm.set('city', data.eventCity);
      eventForm.set('state', data.eventState);
      eventForm.set('zip', data.zip);
      stepper.next();
    } else {
      for (const key in data) {
        if (!data[key] || data[key].length === 0) {
          setError(key, {
            type: 'manual'
          });
        }
      }
    }
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Venue</h5>
        <small>Enter Event Address.</small>
      </div>
      <Form onSubmit={handleSubmit(handleCreateClickHandler)}>
        <Row>
          <Col sm="6" className="mb-1">
            <Label className="form-label" for="startPicker">
              Start Date & Time
            </Label>
            <Controller
              name="startPicker"
              control={control}
              render={({ field }) => (
                <Flatpickr
                  id="startPicker"
                  className="form-control"
                  style={{ backgroundColor: 'transparent!important' }}
                  options={options}
                  data-enable-time
                  invalid={errors.startPicker && true}
                  {...field}
                />
              )}
            />
            {errors && errors.startPicker && (
              <small className="text-danger">Please select Start Date & Time</small>
            )}
          </Col>
          <Col sm="6" className="mb-1">
            <Label className="form-label" for="endPicker">
              End Date & Time
            </Label>
            <Controller
              name="endPicker"
              control={control}
              render={({ field }) => (
                <Flatpickr
                  id="endPicker"
                  className="form-control"
                  style={{ backgroundColor: 'transparent !important' }}
                  options={options}
                  data-enable-time
                  invalid={errors.endPicker && true}
                  {...field}
                />
              )}
            />
            {errors && errors.endPicker && (
              <small className="text-danger">Please select End Date & Time</small>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="eventLocation">
              Location
            </Label>
            <Controller
              name="eventLocation"
              control={control}
              render={({ field }) => (
                <Input
                  id="eventLocation"
                  htmlFor="eventLocation"
                  invalid={errors.eventLocation && true}
                  {...field}
                />
              )}
            />
            {errors && errors.eventLocation && (
              <FormFeedback>Please enter a valid Location</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="eventStreet">
              Street
            </Label>
            <Controller
              name="eventStreet"
              control={control}
              render={({ field }) => (
                <Input
                  id="eventStreet"
                  htmlFor="eventStreet"
                  invalid={errors.eventStreet && true}
                  {...field}
                />
              )}
            />
            {errors && errors.eventStreet && (
              <FormFeedback>Please enter a valid Street</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="eventCity">
              City
            </Label>
            <Controller
              name="eventCity"
              control={control}
              render={({ field }) => (
                <Input
                  id="eventCity"
                  htmlFor="eventCity"
                  invalid={errors.eventCity && true}
                  {...field}
                />
              )}
            />
            {errors && errors.eventCity && <FormFeedback>Please enter a valid City</FormFeedback>}
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="eventState">
              State
            </Label>
            <Controller
              name="eventState"
              control={control}
              render={({ field }) => (
                <Input
                  id="eventState"
                  htmlFor="eventState"
                  invalid={errors.eventState && true}
                  {...field}
                />
              )}
            />
            {errors && errors.eventState && <FormFeedback>Please enter State</FormFeedback>}
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="zip">
              ZIP Code
            </Label>
            <Controller
              name="zip"
              control={control}
              render={({ field }) => (
                <Input id="zip" htmlFor="zip" invalid={errors.zip && true} {...field} />
              )}
            />
            {errors && errors.zip && <FormFeedback>Please enter ZIP Code</FormFeedback>}
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
