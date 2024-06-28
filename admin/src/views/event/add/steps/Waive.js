// ** React Imports
import { Fragment, useState } from 'react';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button, FormFeedback } from 'reactstrap';

// ** Third Party Components
import Flatpickr from 'react-flatpickr';

const Waive = ({ stepper, type, eventForm }) => {
  // ** State
  const [eventWaive, setEventWaive] = useState('');
  const [invalidEventWaive, setInvalidEventWaive] = useState(false);

  const handleNext = () => {
    if (!eventWaive) return setInvalidEventWaive(true);
    eventForm.set('eventWaive', eventWaive);
    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Waive</h5>
        <small>Enter Waive.</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Input
          type="textarea"
          id="basicInput"
          placeholder="In consideration of your acceptance of my entry, ..."
          value={eventWaive}
          height={'40vh'}
          onChange={(e) => {
            setEventWaive(e.target.value);
            if (e.target.value) setInvalidEventWaive(false);
          }}
          invalid={invalidEventWaive && true}
        />
        {invalidEventWaive && <FormFeedback>Please Check Event Waive</FormFeedback>}
        <div className="d-flex justify-content-between mt-1">
          <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
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

export default Waive;
