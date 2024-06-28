import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Input, Button } from 'reactstrap';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { GetBalanceInfo } from './store';
const API = customInterIceptors();

function StripeForm({ amount }) {
  const dispatch = useDispatch();
  let { userData } = useSelector((state) => state.auth);

  // child component data end
  const [cardNum, setCardNum] = useState('');
  const [cvc, setCvc] = useState('');

  const [expMonth, setExpMonth] = useState('');
  const [zip, setZip] = useState('');
  // handel loading
  const [loader, setLoader] = useState(false);
  const onHandelBuySubscription = async () => {
    try {
      let year = expMonth.split('-')[0];
      let month = expMonth.split('-')[1];
      // if (!buySubscription) {
      //     toast.error('Please Select Subscription')
      // }
      if (!cardNum) {
        toast.error('Card Number  is Required');
      } else if (!expMonth) {
        toast.error('Expery date is Required');
      } else if (!cvc) {
        toast.error('CVC is Required');
      } else if (!zip) {
        toast.error('Zip is Required');
      } else {
        setLoader(true);
        const stripePayment = async () => {
          let pData = {
            userId: userData?.id,
            email: userData?.email,
            amount: parseFloat(amount).toFixed(2),
            currency: 'USD',
            description: 'Your Company Description',
            payment_method: 0,
            confirm: true,
            exp_month: month,
            exp_year: year,
            country: 'US',
            cardNum: cardNum,
            cvc: cvc
          };

          return await API.post(`${baseUrl}/api/stripePaymentSubscriptions`, pData);
        };
        Promise.all([
          stripePayment()
          // DepositAmount()
        ])
          .then(function (results) {
            const data = results[0];
            // const data1 = results[1];
            toast.success('Transaction Successfully');
            // setModal(false)
            setLoader(false);
          })
          .catch((e) => {
            setLoader(false);
            toast.error('Something Went Wrong');
          });
      }
    } catch (e) {
      setLoader(false);
    }
  };
  // buy credits
  const BuyCreditsBtn = async () => {
    let year = expMonth?.split('-')[0];
    let month = expMonth?.split('-')[1];
    if (!amount) {
      toast.error('Please Select deposit Amount ');
    } else if (!cardNum) {
      toast.error('Card Number  is Required');
    } else if (!expMonth) {
      toast.error('Expery date is Required');
    } else if (!cvc) {
      toast.error('CVC is Required');
    } else if (!zip) {
      toast.error('Zip is Required');
    } else {
      setLoader(true);
      const stripePayment = async () => {
        let pData = {
          email: userData?.email,
          amount: parseFloat(amount).toFixed(2),
          currency: 'USD',
          description: 'Your Company Description',
          payment_method: 0,
          confirm: true,
          exp_month: month,
          exp_year: year,
          country: 'US',
          cardNum: cardNum,
          cvc: cvc
        };
        return await API.post(`/deposit/stripePayment/`, pData);
      };
      const DepositAmount = async () => {
        let newData = {
          wallet: amount,
          user_id: userData?.id
        };
        return await API.post(`/deposit/depositAmount`, newData);
      };
      Promise.all([stripePayment(), DepositAmount()])
        .then(function (results) {
          const data = results[0];
          const data1 = results[1];
          toast.success('Transaction Successfully');

          setLoader(false);
          // window.location.reload()
          dispatch(GetBalanceInfo(userData?.id));
        })
        .catch((e) => {
          setLoader(false);
          setLoader(false);
          toast.error('Something Went Wrong');
        });
    }
  };
  return (
    <div>
      <div style={{ marginTop: '5%', marginBottom: '5%' }}>
        <span>Card Number</span>
        <Input
          type="text"
          placeholder="Enter Amount"
          onChange={(e) => {
            setCardNum(e.target.value);
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <span>Card Holder Name</span>
          <Input
            contentEditable={false}
            value={userData?.email}
            type="Text"
            placeholder="Enter Amount"
            // onChange={(e) => {
            //     setAmount(e.target.value)
            // }}
            width="100%"
          />
        </div>
        <div>
          <span>Expire Date</span>
          <Input
            type="date"
            placeholder="Enter Amount"
            onChange={(e) => {
              setExpMonth(e.target.value);
            }}
            width="100%"
          />
        </div>
        <div>
          <span>CVC</span>
          <Input
            type="text"
            placeholder="Enter Amount"
            onChange={(e) => {
              setCvc(e.target.value);
            }}
            width="100%"
          />
        </div>
        <div>
          <span>Zip Code</span>
          <Input
            type="text"
            placeholder="Enter Amount"
            onChange={(e) => {
              setZip(e.target.value);
            }}
            width="100%"
          />
        </div>
      </div>
      <div style={{ marginTop: '5%', textAlign: 'center' }}>
        {loader ? (
          <Button color="primary" className="add-todo-item me-1">
            Loading
          </Button>
        ) : (
          <Button color="primary" className="add-todo-item me-1" onClick={() => BuyCreditsBtn()}>
            Buy Credits
          </Button>
        )}
      </div>
    </div>
  );
}
export default memo(StripeForm);
