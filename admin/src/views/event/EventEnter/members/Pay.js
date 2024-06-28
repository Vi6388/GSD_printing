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
  const { stepper, event, payload, toggle, refetchRegistrantData } = props;

  const dispatch = useDispatch();
  // ** States
  const [coupon, setCoupon] = useState({ value: '', label: 'None' });
  const [total, setTotal] = useState(0);

  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: ''
  });
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

  const handleChangeCardData = (e) => {
    if (e?.length > -1) {
      setCardData({ ...cardData, expiryDate: e[0] || '' });
    } else if (e.target.type === 'text') {
      setCardData({ ...cardData, [e.target.name]: e.target.value });
    } else if (e.target.type === 'number') {
      setCardData({ ...cardData, [e.target.name]: e.target.value ? parseInt(e.target.value) : '' });
    }
  };

  const handlePay = () => {
    if (Object.values(cardData).filter((item) => item === '').length === 0) {
      let newPayload = payload;
      newPayload.divisions = payload.divisions.map((item) => {
        return item._id;
      });
      newPayload.cardData = { ...cardData, amount: total };
      dispatch(createEventRegistrantAction(newPayload, refetchRegistrantData, toggle));
    } else return toast.warning('Input correct Card Data.');
  };

  const option = {
    // disable: [
    //   function (date) {
    //     return date < new Date();
    //   }
    // ],
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
      <div md={5}>
        {event?.isFree && (
          <p style={{ fontWeight: 'bold', color: '#000' }} className="text-center my-3">
            The Event's Registration is Free
          </p>
        )}
        {event?.isFree === false && (
          <>
            <Row className="mt-1">
              <Col md={6}>
                {event?.coupons?.length > 0 && (
                  <>
                    <h5>Event Coupon</h5>
                    <Select
                      id="coupon"
                      className="react-select mb-1"
                      classNamePrefix="select"
                      isClearable={false}
                      options={[
                        { value: '', label: 'None' },
                        ...event?.coupons?.map((couponItem) => {
                          return {
                            ...couponItem,
                            value: couponItem._id,
                            label: couponItem.couponName
                          };
                        })
                      ]}
                      value={coupon}
                      onChange={(data) => setCoupon(data)}
                      bsSize="sm"
                      theme={selectThemeColors}
                    />
                  </>
                )}
                <h5>Event Registration Fee</h5>
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
            <h5 className="mt-2">Card</h5>
            <div>
              <Label className="mt-1">Card Holder Name</Label>
              <Input
                type="text"
                name="cardHolderName"
                value={cardData?.cardHolderName}
                onChange={handleChangeCardData}
              />
              <Label className="mt-1">Card Number</Label>
              <Input
                type="number"
                name="cardNumber"
                value={cardData?.cardNumber}
                onChange={handleChangeCardData}
              />
              <Row className="mt-1">
                <Col md={6}>
                  <Label>Expiry Date</Label>
                  <Flatpickr
                    id="expiryDate"
                    className="form-control cardExpiryDate"
                    options={option}
                    name="expiryDate"
                    value={cardData?.expiryDate}
                    onChange={handleChangeCardData}
                  />
                </Col>
                <Col md={6}>
                  <Label>CVV</Label>
                  <Input
                    type="number"
                    name="cvv"
                    value={cardData?.cvv}
                    onChange={handleChangeCardData}
                  />
                </Col>
              </Row>
            </div>
          </>
        )}
      </div>
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
