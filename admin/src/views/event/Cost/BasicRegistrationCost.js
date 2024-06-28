import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Col, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap';

import { editParticularEventAction } from '../store/actions';
import { Plus, Check, X } from 'react-feather';

import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const MySwal = withReactContent(Swal);
const customConfirmClass = 'w-40 btn btn-danger';
const customCancelClass = 'w-40 ms-1 btn btn-outline-danger';
const eventComment = ['1st', '2nd', '3rd', '4th', '5th'];

const BasicRegistrationCost = (props) => {
  const {
    event,
    eventFee,
    setEventFee,
    lateEventFee,
    setLateEventFee,
    coachFee,
    setCoachFee,
    lateOption,
    setLateOption
  } = props;

  const [addEventFeeState, setAddEventFeeState] = useState(false);
  const [newEventFee, setNewEventFee] = useState(0);
  const [newLateEventFee, setNewLateEventFee] = useState(0);
  const dispatch = useDispatch();

  const handleEditEventFee = (amount, eventIndex) => {
    const newArray = [...eventFee];
    newArray[eventIndex] = amount;
    setEventFee(newArray);
  };
  const handleDeleteEventFee = (eventIndex) => {
    MySwal.fire({
      icon: 'info',
      showCancelButton: true,
      title: 'Delete Event?',
      customClass: {
        confirmButton: customConfirmClass,
        cancelButton: customCancelClass
      },
      showClass: {
        popup: 'animate__animated animate__bounceIn'
      },
      buttonsStyling: false
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        const newEventFee = [],
          newLateEventFee = [];
        eventFee && eventFee.map((item, index) => index !== eventIndex && newEventFee.push(item));
        lateEventFee &&
          lateEventFee.map((item, index) => index !== eventIndex && newLateEventFee.push(item));
        dispatch(
          editParticularEventAction(
            event?._id,
            { eventFee: newEventFee, lateEventFee: newLateEventFee },
            'Deleted Event Fee'
          )
        );
      }
    });
  };

  return (
    <>
      <h5 className="fw-bolder">Basic Registration Cost</h5>
      <Card className="my-1 p-2 border-2" style={{ border: '1px solid #e5e5e5' }}>
        <div>
          <div className="">
            Normal registration costs. Please add totals for the extra registration fees, for
            example: 40 Normal Registration, 60 Late Registration, NOT 20 Late Registration.
            <br />
            You may add up to 5 different cost increases - a base, then up to 4 increases. Example:
            The event costs 40 for one event, while each additional division cost 10 more. In this
            case I put 40 in the base cost, then only add 10 in the 2nd field. If the base is 40,
            one additional is 10, and all other additional are 5, I would put 40 in the base, 10 in
            the 2nd field, and 5 in the 3rd field.
          </div>
        </div>
        <h5 className="mt-1 fw-bolder">Global Cost Options</h5>
        <Card className="my-1 p-2 border-2" style={{ border: '1px solid #e5e5e5' }}>
          <div className="">
            Can set base on payment options you chose during event Editings/Creation. If Member Must
            Pay is disabled, it is because you are accepting checks or using Paypal through eventreg
            and must manually mark people as paid.
          </div>
          <FormGroup check className="mt-1 fw-bolder">
            <Input
              type="checkbox"
              checked={event?.isCCFee}
              onChange={(e) =>
                dispatch(editParticularEventAction(event._id, { isCCFee: e.target.checked }))
              }
            />
            <Label check>Add 3% Fee to Event to cover CC fees</Label>
          </FormGroup>
          <FormGroup check className="mt-1 fw-bolder">
            <Input
              type="checkbox"
              checked={event?.isImmediatePay}
              onChange={(e) =>
                dispatch(editParticularEventAction(event._id, { isImmediatePay: e.target.checked }))
              }
            />
            <Label check>Member Must Pay Immediately to Register</Label>
          </FormGroup>
          <FormGroup check className="mt-1 fw-bolder">
            <Input
              type="checkbox"
              checked={event?.isEventCostFee}
              onChange={(e) =>
                dispatch(editParticularEventAction(event._id, { isEventCostFee: e.target.checked }))
              }
            />
            <Label check>Add Fees to event Cost (must use Stripe Connect)</Label>
          </FormGroup>
        </Card>
        <h5 className="fw-bolder">
          Normal Registration (ends{' '}
          {new Date(event?.endRegistrationDate && event.endRegistrationDate).toLocaleDateString()})
        </h5>
        <Card className="my-1 p-2 border-2" style={{ border: '1px solid #e5e5e5' }}>
          <Row>
            <Col md={6}>
              <Col>
                {event?.isFree ? (
                  <span className="ms-1"> Event is Free </span>
                ) : (
                  <>
                    <div className="d-flex flex-row align-items-center my-1">
                      <div className="form-switch d-flex flex-row">
                        <Input
                          type="switch"
                          defaultChecked
                          id="late-reg"
                          name="late-reg"
                          checked={lateOption}
                          onClick={(e) => {
                            dispatch(
                              editParticularEventAction(
                                event?._id,
                                { eventFee, lateEventFee: e.target.checked ? eventFee : [] },
                                e.target.checked ? 'Add Late Event Fee' : 'Delete Late Event Fee'
                              )
                            );
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
                        <Label
                          className="d-flex flex-row align-items-center ms-1 mb-0"
                          for="late-reg"
                        >
                          Add Late registrant
                        </Label>
                      </div>
                    </div>
                    {event?.eventFee?.map((eventFeeItem, index) => {
                      return (
                        <div className="mb-1">
                          <Label className="form-label">
                            {event?.eventFee?.length > 1 ? eventComment[index] : ''} Event Fee
                          </Label>
                          <InputGroup>
                            <Input
                              type="number"
                              bsSize="sm"
                              onChange={(e) => {
                                const newArray = [...eventFee];
                                newArray[index] = e.target.value;
                                setEventFee(newArray);
                              }}
                              value={event?.eventFee?.length > 0 && eventFee && eventFee[index]}
                            />
                            <InputGroupText>$</InputGroupText>
                            {lateOption && (
                              <>
                                <Input
                                  type="number"
                                  bsSize="sm"
                                  onChange={(e) => {
                                    const newArray = [...lateEventFee];
                                    newArray[index] = e.target.value;
                                    setLateEventFee(newArray);
                                  }}
                                  value={
                                    event?.lateEventFee?.length > 0 &&
                                    lateEventFee &&
                                    lateEventFee[index]
                                  }
                                />
                                <InputGroupText>$</InputGroupText>
                              </>
                            )}
                            {index > 0 && (
                              <InputGroupText
                                className="cursor-pointer"
                                onClick={() => handleDeleteEventFee(index)}
                              >
                                x
                              </InputGroupText>
                            )}
                          </InputGroup>
                        </div>
                      );
                    })}
                    {addEventFeeState && (
                      <Row>
                        <Col md="12" className="mb-1">
                          <Card
                            className="my-1 p-2 border-2"
                            style={{ border: '1px solid #e5e5e5' }}
                          >
                            <div className="d-flex flex-column" style={{ width: '100%' }}>
                              <InputGroup style={{ width: '100%' }} className="mt-2">
                                <Input
                                  type="number"
                                  bsSize="sm"
                                  onChange={(e) => setNewEventFee(e.target.value)}
                                  value={newEventFee}
                                />
                                <InputGroupText>$</InputGroupText>
                                {lateOption && (
                                  <>
                                    <Input
                                      type="number"
                                      bsSize="sm"
                                      onChange={(e) => setNewLateEventFee(e.target.value)}
                                      value={newLateEventFee}
                                    />
                                    <InputGroupText>$</InputGroupText>
                                  </>
                                )}
                              </InputGroup>
                              <div className="d-flex flex-row justify-content-between">
                                <button
                                  type="button"
                                  style={{ width: '30%' }}
                                  className="btn btn-primary mt-1 float-start"
                                  disabled={
                                    newEventFee <= 0 || (lateOption && newLateEventFee <= 0)
                                  }
                                  onClick={() => {
                                    const newEventFeeArray = [...eventFee];
                                    const newLateEventFeeArray = [...lateEventFee];
                                    newEventFeeArray[eventFee.length] = newEventFee;
                                    if (lateOption)
                                      newLateEventFeeArray[lateEventFee.length] = newLateEventFee;
                                    dispatch(
                                      editParticularEventAction(
                                        event?._id,
                                        {
                                          eventFee: newEventFeeArray,
                                          lateEventFee: lateOption ? newLateEventFeeArray : []
                                        },
                                        'Added Event Fee'
                                      )
                                    );
                                    setAddEventFeeState(false);
                                    setNewEventFee(0);
                                    setNewLateEventFee(0);
                                  }}
                                >
                                  Add Event
                                </button>
                                <button
                                  type="button"
                                  style={{ width: '30%' }}
                                  className="btn btn-outline-primary mt-1 float-end"
                                  onClick={() => {
                                    setAddEventFeeState(false);
                                    setNewEventFee(0);
                                    setNewLateEventFee(0);
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </Card>
                        </Col>
                      </Row>
                    )}

                    <Col md="12" className="mb-1">
                      {event?.eventFee?.length < 5 && !addEventFeeState && (
                        <button
                          type="button"
                          style={{ width: '100%' }}
                          className="btn btn-outline-primary mt-1"
                          onClick={() => setAddEventFeeState(true)}
                        >
                          Add Event
                        </button>
                      )}
                    </Col>
                  </>
                )}
              </Col>
            </Col>
            <Col md={6}>
              {' '}
              <Label className="form-label mt-5">Coach Fee</Label>
              <InputGroup>
                <Input
                  type="number"
                  bsSize="sm"
                  value={coachFee}
                  onChange={(e) => {
                    setCoachFee(e.target.value);
                  }}
                />
                <InputGroupText>$</InputGroupText>
              </InputGroup>
            </Col>
            <Col md="12" className="mb-1">
              <button
                type="button"
                className="btn btn-primary mt-1 float-end"
                disabled={
                  (eventFee === event?.eventFee && lateOption
                    ? lateEventFee === event?.lateEventFee
                    : false && coachFee === event?.coachFee) ||
                  (eventFee && eventFee.filter((eventFeeItem) => !eventFeeItem).length > 0) ||
                  (lateOption &&
                    lateEventFee &&
                    lateEventFee.filter((eventFeeItem) => !eventFeeItem).length > 0) ||
                  !coachFee
                }
                onClick={() =>
                  dispatch(
                    editParticularEventAction(
                      event?._id,
                      { eventFee, lateEventFee, coachFee },
                      'Updated Event Fee'
                    )
                  )
                }
              >
                Edit Basic Event Cost
              </button>
            </Col>
          </Row>
        </Card>
      </Card>
    </>
  );
};

export default BasicRegistrationCost;
