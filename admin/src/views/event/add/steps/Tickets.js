// ** React Imports
import { Fragment, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';

// ** Icons Imports
import { ArrowLeft, ArrowRight, Check, X } from 'react-feather';

// ** Reactstrap Imports
import {
  Label,
  Row,
  Col,
  Input,
  Form,
  Button,
  FormText,
  FormGroup,
  InputGroupText,
  InputGroup,
  FormFeedback
} from 'reactstrap';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventAction, deleteEventAction, createEventAction } from '../../store/actions';
// ** Message Imports
import useMessage from '../../../../lib/useMessage';

const Tickets = ({ stepper, type, eventForm }) => {
  const options = {
    dateFormat: 'h:i K', //change format also
    enableTime: true,
    weekNumbers: true,
    // noCalendar: true,
    altInput: true,
    // altFormat: 'F j, Y - h:i ',
    time_24hr: false
  };

  const eventComment = ['1st', '2nd', '3rd', '4th', '5th'];
  // ** State
  const [ticketType, setTicketType] = useState('Paid');
  const [startDatePicker, setStartDatePicker] = useState([]);
  const [endDatePicker, setEndDatePicker] = useState([]);
  const [checkAthlete, setCheckAthlete] = useState(false);
  const [checkCoach, setCheckCoach] = useState(false);
  const [checkReferee, setCheckReferee] = useState(false);
  const [eventCount, setEventCount] = useState(1);
  const [paymentType, setPaymentType] = useState('upon');
  const [coachFee, setCoachFee] = useState('');
  const [eventFee, setEventFee] = useState([
    { normal: '', late: '' },
    { normal: '', late: '' },
    { normal: '', late: '' },
    { normal: '', late: '' },
    { normal: '', late: '' }
  ]);
  const [lateOption, setLateOption] = useState(false);

  const [invalid, setInvalid] = useState({
    startDatePicker: true,
    endDatePicker: true,
    checkAthlete: true,
    checkCoach: true,
    checkReferee: true,
    eventFee: [
      { normal: true, late: true },
      { normal: true, late: true },
      { normal: true, late: true },
      { normal: true, late: true },
      { normal: true, late: true }
    ],
    coachFee: true
  });

  // ** Store Vars
  const dispatch = useDispatch();
  const history = useHistory();
  const handleCreateClickHandler = () => {
    let invalidEventFee = [];
    for (let i = 0; i < eventCount; i++) invalidEventFee.push(invalid.eventFee[i]);
    if (
      invalid.startDatePicker ||
      invalid.endDatePicker ||
      (invalid.checkAthlete && invalid.checkCoach && invalid.checkReferee) ||
      (ticketType === 'Paid' && invalid.coachFee) ||
      (ticketType === 'Paid' && invalidEventFee.filter((item) => item === true).length > 0)
    )
      return;

    eventForm.set('isFree', ticketType === 'Free');
    if (ticketType === 'Paid') {
      eventForm.set('coachFee', coachFee);
      let newEventFee = [],
        newLateEventFee = [];
      for (let i = 0; i < eventCount; i++) {
        newEventFee.push(eventFee[i].normal);
        if (lateOption) newLateEventFee.push(eventFee[i].late);
      }
      eventForm.set('eventFee', newEventFee);
      if (lateOption) eventForm.set('lateEventFee', newLateEventFee);
      else eventForm.set('lateEventFee', []);
    } else {
      eventForm.set('coachFee', 0);
      eventForm.set('eventFee', []);
      eventForm.set('lateEventFee', []);
    }
    let registrationType = [];
    if (checkAthlete) registrationType.push('Athlete');
    if (checkCoach) registrationType.push('Coach');
    if (checkReferee) registrationType.push('Referee');
    eventForm.set('isImmediatePay', paymentType === 'upon');
    eventForm.set('registrationType', registrationType);
    eventForm.set('earlyRegistrationEndDate', startDatePicker);
    eventForm.set('earlyRegistrationEndDate', startDatePicker);
    eventForm.set('endRegistrationDate', endDatePicker);
    dispatch(createEventAction(eventForm, history));
  };

  const handleChangeEventFee = (value, index, type) => {
    const newEventFee = eventFee;
    const newEventFeeInvalid = invalid.eventFee;
    if (type === 'normal') {
      newEventFee[index].normal = value;
      if (value) newEventFeeInvalid[index].normal = false;
      else newEventFeeInvalid[index].normal = true;
    } else {
      newEventFee[index].late = value;
      if (value) newEventFeeInvalid[index].late = false;
      else newEventFeeInvalid[index].late = true;
    }
    setEventFee(newEventFee);
    setInvalid({ ...invalid, eventFee: newEventFeeInvalid });
  };
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Event Fees</h5>
      </div>
      <Row>
        <Col md="12" className="mb-1 mt-1">
          <div className="d-flex" onChange={(e) => setTicketType(e.target.value)}>
            <div className="form-check me-2">
              <Input type="radio" id="ex1-active" name="ex1" value="Paid" defaultChecked />
              <Label className="form-check-label" for="ex1-active">
                Paid
              </Label>
            </div>
            <div className="form-check">
              <Input type="radio" name="ex1" id="ex1-inactive" value="Free" />
              <Label className="form-check-label" for="ex1-inactive">
                Free
              </Label>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="6" className="mb-1">
          <Label className="form-label" for="startDatePicker">
            Early Registration Ends
          </Label>
          <Flatpickr
            id="startDatePicker"
            className="form-control"
            options={options}
            data-enable-time
            value={startDatePicker}
            onChange={(e) => {
              setStartDatePicker(e);
              if (e.length > 0) setInvalid({ ...invalid, startDatePicker: false });
              else setInvalid({ ...invalid, startDatePicker: true });
            }}
          />
          {invalid.startDatePicker && (
            <small className="text-danger">Please enter a valid Early Registration Ends</small>
          )}
        </Col>
        <Col sm="6" className="mb-1">
          <Label className="form-label" for="endDatePicker">
            Registration Ends
          </Label>
          <Flatpickr
            id="endDatePicker"
            className="form-control"
            options={options}
            data-enable-time
            value={endDatePicker}
            onChange={(e) => {
              setEndDatePicker(e);
              if (e.length > 0) setInvalid({ ...invalid, endDatePicker: false });
              else setInvalid({ ...invalid, endDatePicker: true });
            }}
          />
          {invalid.endDatePicker && (
            <small className="text-danger">Please enter a valid Registration Ends</small>
          )}
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Label className="form-label">Registration Type</Label>
          <div className="mb-1">
            <div>
              <Input
                type="checkbox"
                id="checkAthlete"
                value={checkAthlete}
                onChange={(e) => {
                  setCheckAthlete(e.target.checked);
                  if (e.target.checked) setInvalid({ ...invalid, checkAthlete: false });
                  else setInvalid({ ...invalid, checkAthlete: true });
                }}
              />
              <Label className="mx-1" for="checkAthlete">
                Athlete
              </Label>
              <Input
                type="checkbox"
                id="checkCoach"
                value={checkCoach}
                onChange={(e) => {
                  setCheckCoach(e.target.checked);
                  if (e.target.checked) setInvalid({ ...invalid, checkCoach: false });
                  else setInvalid({ ...invalid, checkCoach: true });
                }}
              />
              <Label className="mx-1" for="checkCoach">
                Coach
              </Label>
              <Input
                type="checkbox"
                id="checkReferee"
                value={checkReferee}
                onChange={(e) => {
                  setCheckReferee(e.target.checked);
                  if (e.target.checked) setInvalid({ ...invalid, checkReferee: false });
                  else setInvalid({ ...invalid, checkReferee: true });
                }}
              />
              <Label className="mx-1" for="checkReferee">
                Referee
              </Label>
            </div>

            {invalid.checkAthlete && invalid.checkCoach && invalid.checkReferee && (
              <small className="text-danger">Please Check Any Registration Type</small>
            )}
          </div>
        </Col>
      </Row>
      <Row className="mb-2">
        {ticketType === 'Paid' && (
          <Col md="6">
            <Label className="form-label">Max Events per registrant</Label>
            <div>
              <Input
                id="exampleSelect"
                name="select"
                type="select"
                onChange={(e) => setEventCount(parseInt(e.target.value))}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Input>
            </div>
          </Col>
        )}
        <Col md="6">
          <Label className="form-label">Pay When</Label>
          <div>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              value={paymentType}
              onChange={(e) => {
                setPaymentType(e.target.value);
              }}
            >
              <option value="upon">Upon Registration</option>
              <option value="later">Pay Later</option>
            </Input>
          </div>
        </Col>
      </Row>
      <div className="d-flex flex-row align-items-center my-1">
        <div className="form-switch d-flex flex-row">
          <Input
            type="switch"
            defaultChecked
            id="late-reg"
            name="late-reg"
            checked={lateOption}
            onClick={(e) => {
              setLateOption(e.target.checked);
            }}
          />
          <Label className="form-check-label" htmlFor="late-reg">
            <span className="switch-icon-left">
              <Check size={14} />
            </span>
            <span className="switch-icon-right">
              <X size={14} />
            </span>
          </Label>
          <Label className="d-flex flex-row align-items-center ms-1 mb-0" for="late-reg">
            Add Late registrant
          </Label>
        </div>
      </div>
      {ticketType === 'Paid' &&
        eventFee.map((eventFeeItem, index) => {
          if (index < eventCount)
            return (
              <Row>
                <Col md="6" className="mb-1">
                  <Label className="form-label">
                    {eventCount === 1 ? '' : eventComment[index]} Event Fee
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      placeholder="Normal Event Fee"
                      value={eventFeeItem.normal}
                      onChange={(e) => handleChangeEventFee(e.target.value, index, 'normal')}
                      invalid={invalid.eventFee[index].normal && true}
                    />
                    <InputGroupText>$</InputGroupText>
                    {lateOption && (
                      <>
                        <Input
                          type="number"
                          placeholder="Late Event Fee"
                          value={eventFeeItem.late}
                          onChange={(e) => handleChangeEventFee(e.target.value, index, 'late')}
                          invalid={invalid.eventFee[index].late && true}
                        />
                        <InputGroupText>$</InputGroupText>
                      </>
                    )}
                  </InputGroup>{' '}
                  <div className="d-flex flex-row">
                    {(invalid.eventFee[index].normal ||
                      (lateOption && invalid.eventFee[index].late)) && (
                      <small className="text-danger float-start">
                        Please enter a valid {eventCount === 1 ? '' : eventComment[index]} Event
                        {invalid.eventFee[index].normal &&
                        lateOption &&
                        invalid.eventFee[index].late
                          ? ' Normal & Late'
                          : invalid.eventFee[index].normal
                          ? ' Normal'
                          : ' Late'}{' '}
                        Fee
                      </small>
                    )}
                  </div>
                </Col>
                {index === 0 && (
                  <Col md="6" className="mb-1">
                    <Label className="form-label" for="coachFee">
                      Coach Fee
                    </Label>
                    <InputGroup>
                      <Input
                        id="coachFee"
                        htmlFor="coachFee"
                        type="number"
                        value={coachFee}
                        onChange={(e) => {
                          setCoachFee(e.target.value);
                          if (e.target.value) setInvalid({ ...invalid, coachFee: false });
                          else setInvalid({ ...invalid, coachFee: true });
                        }}
                        invalid={invalid.coachFee && true}
                      />
                      <InputGroupText>$</InputGroupText>
                    </InputGroup>
                    {invalid.coachFee && (
                      <small className="text-danger">Please enter a valid Coach Fee</small>
                    )}
                  </Col>
                )}
              </Row>
            );
        })}
      <div className="d-flex justify-content-between">
        <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
          <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">Previous</span>
        </Button>
        <Button color="primary" className="btn-next" onClick={() => handleCreateClickHandler()}>
          <span className="align-middle d-sm-inline-block d-none">Create</span>
          <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};

export default Tickets;
