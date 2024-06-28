// ** React Imports
import { Fragment, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button, FormText } from 'reactstrap';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, setErrors } from '../../store';
import { getUserData } from '../../../../../auth/utils';

// ** Message Imports
import useMessage from '../../../../../lib/useMessage';

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form';
//import redux
// import {
//   fetchEventAction,
//   deleteEventAction
// } from '../../../../client/src/views/event/store/actions';
import {
  fetchEventAction,
  deleteEventAction,
  createEventAction,
  editParticularEventAction
} from '../../../.././event/store/actions';

const Tickets = ({ stepper, type, eventForm, editEventData }) => {
  // ** Default Form Values
  const defaultValues = {
    ticketName: ''
  };

  // ** Register Inputs to React Hook Form
  const {
    reset,
    register,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      ticketName: editEventData?.ticketName, // Set default value for "name" field
      // _id :  editEventData?._id ,// Set default value for "age" field
      ticketType: editEventData?.ticketType,
      singleTicketPrice: editEventData?.singleTicketPrice,
      ticketQuantity: editEventData?.ticketQuantity
    }
  });

  // ** State
  const [ticketType, setTicketType] = useState('Paid');
  const [ticketAvailableQuantity, setTicketAvailableQuantity] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [pastStep, setPastStep] = useState(0);
  // ** History var
  const history = useHistory();
  const { error, success } = useMessage();

  // // ** Message Vars
  // const { success, error } = useMessage()

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.event);

  // ** Event handlers
  const isNumeric = (str) => {
    if (typeof str != 'string') return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  };

  const handleNumberChange = (value, type) => {
    if (isNumeric(value)) {
      if (type === 'Price') {
        setTicketPrice(parseFloat(value));
      } else if (type === 'Quantity') {
        setTicketAvailableQuantity(parseInt(value));
      }
    }
  };

  const handleTicketTypeChange = (value) => {
    setTicketType(value);
    if (value === 'Free') setTicketPrice(0);
    // setError('ticketPrice', { type: 'manual', message: '' });
  };

  const handlePastStepHandler = () => {
    stepper.to(pastStep);
  };

  const handleCreateClickHandler = async (data) => {
    // if (ticketType == 'Paid' && ticketPrice == 0) {
    //   console.log('handleCreateClickHandler is running');
    //   setError('ticketPrice', { type: 'manual', message: 'Ticket Price Should be Set' });
    // } else {
    eventForm.set('ticketName', data.ticketName);
    eventForm.set('ticketType', ticketType);
    eventForm.set('ticketQuantity', data.ticketQuantity);
    eventForm.set('singleTicketPrice', data.singleTicketPrice);

    await dispatch(editParticularEventAction(editEventData._id, eventForm));
    await history.push('/eventsmanagement');
    // }
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0"> Edit Tickets</h5>
        <small>Lets Edit Tickets</small>
      </div>
      <Form onSubmit={handleSubmit(handleCreateClickHandler)}>
        <Row>
          <Col md="12" className="mb-1 mt-1">
            <Label className="form-label mb-1" for="eventType">
              Ticket Type
            </Label>
            <div className="d-flex" onChange={(e) => handleTicketTypeChange(e.target.value)}>
              <div className="form-check me-2">
                <Input
                  type="radio"
                  id="ex1-active"
                  name="ex1"
                  value="Paid"
                  defaultChecked={editEventData?.ticketType === 'Paid' ? true : false}
                />
                <Label className="form-check-label" for="ex1-active">
                  Paid
                </Label>
              </div>
              <div className="form-check">
                <Input
                  type="radio"
                  name="ex1"
                  id="ex1-inactive"
                  value="Free"
                  defaultChecked={editEventData?.ticketType === 'Free' ? true : false}
                />
                <Label className="form-check-label" for="ex1-inactive">
                  Free
                </Label>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Name
            </Label>
            <Controller
              name="ticketName"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  placeholder="Give your tickets a name ..."
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            {errors.ticketName && (
              <FormText color="danger" id="validation-add-board">
                Please Enter Ticket Name
              </FormText>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Available Quantity
            </Label>
            <Controller
              name="ticketQuantity"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="number"
                  placeholder="How many tickets are available?"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.ticketQuantity && (
              <FormText color="danger" id="validation-add-board">
                Please Enter Ticket Quantity
              </FormText>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Price
            </Label>
            <Controller
              name="singleTicketPrice"
              step="any"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Input
                  autoFocus
                  type="number"
                  placeholder="Price per ticket"
                  value={value}
                  disabled={ticketType === 'Free'}
                  onChange={onChange}
                />
              )}
            />
            {ticketType === 'Paid'
              ? errors.singleTicketPrice && (
                  <FormText color="danger" id="validation-add-board">
                    Please Enter Ticket Price
                  </FormText>
                )
              : null}

            {/* <Input
              name="singleTicketPrice"
              type="number"
              step="any"
              id="basicInput"
              placeholder="Price per ticket"
              value={ticketType === 'Free' ? '' : value}
              disabled={ticketType === 'Free'}
              {...register('ticketPrice')}
              onChange={(e) => handleNumberChange(e.target.value, 'Price')}
            /> */}
            {/* {errors.ticketPrice && (
              <FormText color="danger" id="validation-add-board">
                {errors.ticketPrice.message}
              </FormText>
            )} */}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="basicInput">
              Total Income
            </Label>
            <Input
              type="number"
              id="basicInput"
              step="0.01"
              value={(ticketAvailableQuantity * ticketPrice).toFixed(2)}
              singleTicketPrice
              disabled
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" type="submit">
            <span className="align-middle d-sm-inline-block d-none">Update</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
      {errors.previous && (
        <FormText color="danger" id="validation-add-board">
          You did not enter the required values in the{' '}
          <Link onClick={handlePastStepHandler} style={{ textDecoration: 'underline' }}>
            past steps
          </Link>
          .
        </FormText>
      )}
    </Fragment>
  );
};

export default Tickets;
