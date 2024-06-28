// ** React Imports
import { useState, useEffect } from 'react';

// ** Reactstrap Imports
import {
  NavLink,
  Button,
  Input,
  Label,
  Nav,
  NavItem,
  Row,
  TabContent,
  TabPane,
  Col
} from 'reactstrap';
import Select from 'react-select';

// ** Store & Actions
import { getData } from '@src/views/apps/invoice/store';
import { useDispatch, useSelector } from 'react-redux';
import { createEventRegistrantAction } from '../../store/actions';

// ** Styles
import '@styles/react/apps/app-invoice.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { toast } from 'react-toastify';

// ** Third Party Components
import Flatpickr from 'react-flatpickr';
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Styles
import '@src/assets/styles/event.scss';
require('flatpickr/dist/plugins/monthSelect/style.css');
require('flatpickr/dist/flatpickr.css');

const Pay = (props) => {
  const { stepper, event, payload, toggle, refetchRegistrantData, selectMemberData } = props;

  const dispatch = useDispatch();
  // ** States
  const [chequeNo, setChequeNo] = useState('');
  const [coupon, setCoupon] = useState({ value: '', label: 'None' });
  const [total, setTotal] = useState(0);

  let totalFee = 0,
    divisionFees =
      payload?.divisions &&
      payload.divisions.filter((divisionItem) => divisionItem.divisionFee !== '0'),
    payListData = [];
  if (event?.eventFee?.length && payload?.divisions?.length) {
    for (let i = 0; i < payload?.divisions?.length; i++) {
      if (i < payload?.divisions?.length - divisionFees?.length) {
        payListData.push({
          name:
            i === 0
              ? '1 st Event Fee'
              : i === 1
              ? '2 nd Event Fee'
              : i === 2
              ? '3 rd Event Fee'
              : (i + 1).toString() + ' th Event Fee',
          amount: event?.eventFee[i],
          state: true
        });

        totalFee += parseInt(event.eventFee[i]);
      } else
        payListData.push({
          name:
            i === 0
              ? '1 st Event Fee'
              : i === 1
              ? '2 nd Event Fee'
              : i === 2
              ? '3 rd Event Fee'
              : (i + 1).toString() + ' th Event Fee',
          amount: event?.eventFee[i],
          state: false
        });
    }
    divisionFees.map((divisionItem) => {
      totalFee += parseInt(divisionItem.divisionFee);
      payListData.push({
        name: divisionItem.divisionName,
        amount: divisionItem.divisionFee,
        state: true
      });
    });
  }

  useEffect(() => {
    if (!coupon.value) setTotal(totalFee);
    else if (coupon.couponType === 'percent')
      setTotal(parseInt((totalFee * (100 - coupon.couponAmount)) / 100));
    else setTotal(parseInt(totalFee - coupon.couponAmount));
  }, [coupon, totalFee]);
  // ** Handlers
  const handlePay = () => {
    if (parseInt(chequeNo) === total) {
      let id = selectMemberData._id;
      let divisions = payload.divisions.map((item) => {
        return item._id;
      });
      dispatch(updateEventRegistrantAction({ id, divisions }, refetchRegistrantData));
      toggle();
    } else return toast.warning('Pay a valid value');
  };

  const option = {
    disable: [
      function (date) {
        return date < new Date();
      }
    ],
    plugins: [
      new monthSelectPlugin({
        shorthand: true,
        dateFormat: 'F Y',
        altFormat: 'F Y',
        theme: 'light'
      })
    ]
  };

  return (
    <div className="">
      {event?.coupons?.length > 0 && (
        <Col md={6}>
          <h5>Event Coupon</h5>
          <Select
            id="coupon"
            className="react-select mb-1"
            classNamePrefix="select"
            isClearable={false}
            options={[
              { value: '', label: 'None' },
              ...event?.coupons?.map((couponItem) => {
                return { ...couponItem, value: couponItem._id, label: couponItem.couponName };
              })
            ]}
            value={coupon}
            onChange={(data) => setCoupon(data)}
            bsSize="sm"
            theme={selectThemeColors}
          />
        </Col>
      )}
      <div md={5}>
        <h5>Event Registration Fee</h5>
        {event?.isFree && (
          <p style={{ fontWeight: 'bold', color: '#000' }} className="text-center my-3">
            The Event's Registration is Free
          </p>
        )}
        {event?.isFree === false && (
          <Row className="mt-1">
            <Col md={6}>
              {payListData.length > 0 &&
                payListData.map((payDataItem, index) => (
                  <Row>
                    <Col md={10}>
                      {payDataItem.state ? (
                        <p style={{ fontWeight: 'bold', color: '#000' }}>{payDataItem.name}</p>
                      ) : (
                        <p
                          className="text-decoration-line-through"
                          style={{ fontWeight: 'bold', color: '#444' }}
                        >
                          {payDataItem.name}
                        </p>
                      )}
                    </Col>
                    <Col md={2}>
                      {payDataItem.state ? (
                        <p style={{ marginLeft: '20px' }}>{'$' + payDataItem.amount}</p>
                      ) : (
                        <p
                          className="text-decoration-line-through"
                          style={{ marginLeft: '20px', fontWeight: 'bold', color: '#444' }}
                        >
                          {'$' + payDataItem.amount}
                        </p>
                      )}
                    </Col>
                  </Row>
                ))}
              {coupon.value && (
                <Row className="mt-2">
                  <Col md={10}>
                    <p style={{ fontWeight: 'bold', color: '#000' }}>{coupon.couponName}</p>
                  </Col>
                  <Col md={2}>
                    <p style={{ marginLeft: '20px' }}>
                      {coupon.couponType === 'percent'
                        ? '-' + coupon.couponAmount + '%'
                        : '$' + '-' + coupon.couponAmount}
                    </p>
                  </Col>
                </Row>
              )}
            </Col>
            <Col md={6} className="d-flex flex-column justify-content-center">
              <h1 style={{ fontWeight: 'bold', color: '#000' }} className="text-center">
                You have to pay $ {total}
              </h1>
            </Col>
          </Row>
        )}
      </div>
      <h5 className="mt-2">Card</h5>
      <div>
        <Label>Cheque No.</Label>
        <Input type="text" name="chequeNo" onChange={(e) => setChequeNo(e.target.value)} />
      </div>
      {/* <div>
        <Label className="mt-1">Card Holder Name</Label>
        <Input
          type="text"
          name="cardholderName"
        />
        <Label className="mt-1">Card Number</Label>
        <Input
          type="number"
          name="cardNumber"
        />
        <Row className="mt-1">
          <Col md={6}>
            <Label>Expiry Date</Label>
            <Flatpickr
              id="date-time-picker"
              className="form-control"
              options={option}
              className = "cardExpiryDate"
            />
          </Col>
          <Col md={6}>
            <Label>CVV</Label>
            <Input
              type="number"
              name="cardCvv"
            />
          </Col>
        </Row>
      </div> */}
      <div className="d-flex justify-content-end mt-1">
        <Button color="primary" onClick={() => stepper.previous()} className="me-1">
          Previous
        </Button>
        <Button color="primary" onClick={handlePay}>
          Pay
        </Button>
      </div>
    </div>
  );
};

export default Pay;
