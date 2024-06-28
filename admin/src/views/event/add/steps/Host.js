// ** React Imports
import { Fragment, useState } from 'react';

// ** Third Party Components
import { ArrowLeft, ArrowRight } from 'react-feather';
import { Controller, useForm } from 'react-hook-form';

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button, FormFeedback } from 'reactstrap';
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.us';

const Host = ({ stepper, type, eventForm }) => {
  // ** Default Form Values
  const defaultValues = {
    hostName: '',
    hostEmail: '',
    hostMobileNumber: '',
    hostAlternateNumber: ''
  };
  const {
    reset,
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  const handleCreateHost = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      eventForm.set('hostName', data.hostName);
      eventForm.set('hostEmail', data.hostEmail);
      eventForm.set('hostMobileNumber', data.hostMobileNumber);
      eventForm.set('hostAlternateNumber', data.hostAlternateNumber);
      stepper.next();
    } else {
      for (const key in data) {
        if (data[key] === '') {
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
        <h5 className="mb-0">Host Info</h5>
        <small>Enter Host Info.</small>
      </div>
      <Form onSubmit={handleSubmit(handleCreateHost)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="hostName">
              Host Name
            </Label>
            <Controller
              name="hostName"
              control={control}
              render={({ field }) => (
                <Input
                  id="hostName"
                  htmlFor="hostName"
                  placeholder="Enter Host Name"
                  invalid={errors.hostName && true}
                  {...field}
                />
              )}
            />
            {errors && errors.hostName && (
              <FormFeedback>Please enter a valid Host Name</FormFeedback>
            )}
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for="hostEmail">
              Host Email
            </Label>
            <Controller
              name="hostEmail"
              control={control}
              render={({ field }) => (
                <Input
                  id="hostEmail"
                  type="email"
                  htmlFor="hostEmail"
                  placeholder="Enter Host Email"
                  invalid={errors.hostEmail && true}
                  {...field}
                />
              )}
            />
            {errors && errors.hostEmail && (
              <FormFeedback>Please enter a valid Host Email</FormFeedback>
            )}
          </Col>
        </Row>

        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="hostMobileNumber">
              Mobile Number
            </Label>
            <Controller
              name="hostMobileNumber"
              control={control}
              render={({ field }) => (
                <Cleave
                  id="hostMobileNumber"
                  htmlFor="hostMobileNumber"
                  placeholder="Enter Mobile Number"
                  options={{ phone: true, phoneRegionCode: 'US' }}
                  className="form-control"
                  invalid={errors.hostMobileNumber && true}
                  {...field}
                />
              )}
            />
            {errors && errors.hostMobileNumber && (
              <small className="text-danger">Please enter a valid Mobile Number</small>
            )}
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for="hostAlternateNumber">
              Alternative Mobile
            </Label>
            <Controller
              name="hostAlternateNumber"
              control={control}
              render={({ field }) => (
                <Cleave
                  id="hostAlternateNumber"
                  htmlFor="hostAlternateNumber"
                  placeholder="Enter Alternative Mobile"
                  options={{ phone: true, phoneRegionCode: 'US' }}
                  className="form-control"
                  {...field}
                />
              )}
            />
            {errors && errors.hostAlternateNumber && (
              <small className="text-danger">Please enter a valid Alternative Mobile</small>
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

export default Host;
