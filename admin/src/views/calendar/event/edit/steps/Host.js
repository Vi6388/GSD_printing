// ** React Imports
import { Fragment, useState } from 'react';

// ** Third Party Components
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button, FormText } from 'reactstrap';

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form';

const Host = ({ stepper, type, eventForm, editEventData }) => {
  console.log('event data in host', editEventData);
  // ** Default Form Value
  // const defaultValues = {
  //   hostName: '',
  //   hostEmail: '',
  //   hostMobileNumber: '',
  //   hostAlternateNumber: ''
  // };

  // ** Register Inputs to React Hook Form
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      eventDirectorName: editEventData?.eventDirectorName, // Set default value for "name" field
      // _id :  editEventData?._id ,// Set default value for "age" field
      directorEmail: editEventData?.directorEmail,
      alternateNumber: editEventData?.alternateNumber,
      directorContactNo: editEventData?.directorContactNo
    }
  });

  // ** Next Button Click Handler
  const handleHostFormSubmit = (data) => {
    eventForm.set('eventDirectorName', data.eventDirectorName);
    eventForm.set('directorEmail', data.directorEmail);
    eventForm.set('directorContactNo', data.directorContactNo);
    eventForm.set('hostAlternateNumber', data.hostAlternateNumber);

    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Edit Host Info</h5>
        <small>Edit Host Info.</small>
      </div>
      <Form onSubmit={handleSubmit(handleHostFormSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Host Name
            </Label>

            <Controller
              name="eventDirectorName"
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
              name="directorEmail"
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
                  value={editEventData?.directorEmail}
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
              name="directorContactNo"
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
              name="alternateNumber"
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
            {errors.alternateNumber && (
              <FormText color="danger" id="validation-add-board">
                Please Enter valid Alternate Mobile Nubmer
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
