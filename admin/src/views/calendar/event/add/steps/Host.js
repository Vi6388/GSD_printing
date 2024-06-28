// ** React Imports
import { Fragment, useState } from 'react';

// ** Third Party Components
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button, FormText } from 'reactstrap';

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form';

const Host = ({ stepper, type, eventForm }) => {
  // ** Default Form Value
  const defaultValues = {
    hostName: '',
    hostEmail: '',
    hostMobileNumber: '',
    hostAlternateNumber: ''
  };

  // ** Register Inputs to React Hook Form
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  // ** Next Button Click Handler
  const handleHostFormSubmit = (data) => {
    console.log('data in host', data);
    eventForm.set('eventDirectorName', data.hostName);
    eventForm.set('directorEmail', data.hostEmail);
    eventForm.set('directorContactNo', data.hostMobileNumber);
    eventForm.set('alternateNumber', data.hostAlternateNumber);

    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Host Info</h5>
        <small>Enter Host Info.</small>
      </div>
      <Form onSubmit={handleSubmit(handleHostFormSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Host Name
            </Label>

            <Controller
              name="hostName"
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
            {errors.hostName && (
              <FormText color="danger" id="validation-add-board">
                Please enter a valid Host Name
              </FormText>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Email
            </Label>
            <Controller
              name="hostEmail"
              control={control}
              rules={{
                required: 'Please Enter Email',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format'
                }
              }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="text"
                  placeholder="Enter Email"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.hostEmail && (
              <FormText color="danger" id="validation-add-board">
                {errors.hostEmail.message}
              </FormText>
            )}
          </Col>
        </Row>

        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Mobile Number
            </Label>
            <Controller
              name="hostMobileNumber"
              control={control}
              rules={{
                required: 'Please Enter Mobile Number'
              }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="number"
                  placeholder="Enter Mobile Number"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.hostMobileNumber && (
              <FormText color="danger" id="validation-add-board">
                Please Enter Valid Mobile Number
              </FormText>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Alternate Mobile Number
            </Label>
            <Controller
              name="hostAlternateNumber"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="number"
                  placeholder="Enter Alternate Mobile Number"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.hostAlternateNumber && (
              <FormText color="danger" id="validation-add-board">
                Please Enter valid Alternate Mobile Nubmer
              </FormText>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="basicInput">
              Age of Date (age by 12/31 of the current year)
            </Label>
            <Controller
              name="city"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="date"
                  placeholder="Enter City"
                  value={value}
                  // onChange={onChange}
                />
              )}
            />

            {errors.eventCity && (
              <FormText color="danger" id="validation-add-board">
                Please Enter Valid Event City
              </FormText>
            )}
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="basicInput">
              Event Divisions (Affects Division Rules Applied)
            </Label>
            <Controller
              name="eventState"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="select"
                  placeholder="Enter State"
                  value={value}
                  // onChange={onChange}
                >
                  <option>Champions (Selected)</option>
                </Input>
              )}
            />

            {errors.eventState && (
              <FormText color="danger" id="validation-add-board">
                Please Enter Valid Event State
              </FormText>
            )}
          </Col>
          <Col md="4" className="mb-1">
            <Label className="form-label" for="basicInput">
              Event Affiliation ( division rules type)
            </Label>
            <Controller
              name="zip"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="text"
                  placeholder="CMA"
                  value={value}
                  // onChange={onChange}
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

export default Host;
