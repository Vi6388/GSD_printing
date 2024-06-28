// ** React Imports
import { Fragment, useRef, useState } from 'react';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button, FormText } from 'reactstrap';

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form';
import FileUploaderSingle from '../../edit/FileUploaderSingle';

const BannerOne = ({ stepper, type, eventForm }) => {
  // ** Default Form Values
  const defaultValues = {
    eventTitle: ''
  };

  // ** Event Type
  const [eventType, setEventType] = useState('Tournament');
  const [files, setFiles] = useState([]);

  // ** Register Inputs to React Hook Form
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  // ** Next Button Click Handler
  const handleEventTitleFormSubmit = (data) => {
    console.log('eventName', data);
    eventForm.set('eventName', data.eventTitle);
    eventForm.set('eventType', data.selectedOption);

    stepper.next();
  };

  const handleNext = (data) => {
    eventForm.set('file', files[0]);
    // console.log('data  handleNext',data,files[0]);

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
        <h5 className="mb-0">Edit Banner</h5>
        <small className="text-muted">Update Event Banner.</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col sm="12">
            <FileUploaderSingle files={files} setFiles={setFiles} />
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button
            color="secondary"
            className="btn-prev btn btn-primary"
            outline
            onClick={() => stepper.previous()}
          >
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" onClick={() => handleNext()}>
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};
export default BannerOne;
