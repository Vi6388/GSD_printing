// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button, FormText } from 'reactstrap';

// ** Third Party Components
import Flatpickr from 'react-flatpickr';
import '@styles/react/libs/flatpickr/flatpickr.scss';

import { useForm, Controller } from 'react-hook-form';

const Address = ({ stepper, type, eventForm, editEventData }) => {
  // ** Start & End Time Picker
  const [startPicker, setStartPicker] = useState(new Date(Number(editEventData?.startDate)));
  const [endPicker, setEndPicker] = useState(new Date(Number(editEventData?.endDate)));
  // ** Register Inputs to React Hook Form
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      startDate: startPicker, // Set default value for "name" field
      // _id :  editEventData?._id ,// Set default value for "age" field
      endDate: endPicker,
      startTime: editEventData?.startTime,
      endTime: editEventData?.endTime,
      eventLocation: editEventData?.eventLocation,
      street: editEventData?.street,
      city: editEventData?.city,
      state: editEventData?.state,
      zip: editEventData?.zip
    }
  });

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
    const curTimeStart =
      startPicker.getHours() + ':' + startPicker.getMinutes() + ':' + startPicker.getSeconds();
    const curTimeEnd =
      endPicker.getHours() + ':' + endPicker.getMinutes() + ':' + endPicker.getSeconds();
    //start date
    let sDate = new Date(startPicker);

    let yearStartEvent = sDate?.getFullYear();
    console.log('startPicker', yearStartEvent);
    let monthStartEvent = sDate?.getMonth();
    let dayStartEvent = sDate?.getDate();
    let millisecondsStartEvent = new Date(yearStartEvent, monthStartEvent, dayStartEvent).getTime();
    //end date
    let eDate = new Date(endPicker);

    let yearEndEvent = eDate.getFullYear();
    let monthEndEvent = eDate.getMonth();
    let dayEndEvent = eDate.getDate();
    let millisecondsEndEvent = new Date(yearEndEvent, monthEndEvent, dayEndEvent).getTime();

    eventForm.set('startDate', millisecondsStartEvent);
    eventForm.set('endDate', millisecondsEndEvent);
    eventForm.set('startTime', curTimeStart);
    eventForm.set('endTime', curTimeEnd);
    eventForm.set('eventLocation', data.eventLocation);
    eventForm.set('endRigestrationDate', '12345');
    eventForm.set('state', data.state);

    eventForm.set('street', data.street);
    eventForm.set('city', data.city);
    eventForm.set('zip', data.zip);
    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Edit Venue</h5>
        <small>Edit Event Address.</small>
      </div>
      <Form onSubmit={handleSubmit(handleVenueFormSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              Start Date & Time
            </Label>
            <Flatpickr
              value={startPicker}
              data-enable-time
              id="date-time-picker"
              className="form-control"
              options={options}
              onChange={(date) => setStartPicker(date)}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="date-time-picker">
              End Date & Time
            </Label>
            <Flatpickr
              value={endPicker}
              data-enable-time
              id="date-time-picker"
              className="form-control"
              options={options}
              onChange={(date) => setEndPicker(date)}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Location
            </Label>
            <Controller
              name="eventLocation"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="text"
                  placeholder="House, Bar ..."
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            {errors.eventLocation && (
              <FormText color="danger" id="validation-add-board">
                Please Enter Valid Event Location
              </FormText>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Street
            </Label>

            <Controller
              name="street"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="text"
                  placeholder="Enter Street"
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            {errors.street && (
              <FormText color="danger" id="validation-add-board">
                Please Enter Valid Event Street
              </FormText>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="basicInput">
              City
            </Label>
            <Controller
              name="city"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="text"
                  placeholder="Enter City"
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            {errors.city && (
              <FormText color="danger" id="validation-add-board">
                Please Enter Valid Event City
              </FormText>
            )}
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="basicInput">
              State
            </Label>
            <Controller
              name="state"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="text"
                  placeholder="Enter State"
                  value={value}
                  onChange={onChange}
                  eventLocation
                />
              )}
            />

            {errors.state && (
              <FormText color="danger" id="validation-add-board">
                Please Enter Valid Event State
              </FormText>
            )}
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="basicInput">
              ZIP
            </Label>
            <Controller
              name="zip"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="number"
                  placeholder="Enter Zip Code"
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            {errors.zip && (
              <FormText color="danger" id="validation-add-board">
                Please Enter Valid Zip Code
              </FormText>
            )}
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
