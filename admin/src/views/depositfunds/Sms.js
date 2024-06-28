import React, { memo, useEffect, useState } from 'react';
import { Input, Label, Button, CardText } from 'reactstrap';

// ** Custom Components
import Card from '@components/card-snippet';
import { MessageSquare } from 'react-feather';
import Select from 'react-select';
// ** Utils
import { selectThemeColors } from '@utils';
import { useSelector, useDispatch } from 'react-redux';
import { GetBalanceInfo } from './store';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { toast } from 'react-toastify';
const API = customInterIceptors();

function Sms() {
  const dispatch = useDispatch();
  let { userData } = useSelector((state) => state.auth);
  let { balanceInfo } = useSelector((state) => state.deposit);

  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Type'
  });
  // handel loading
  const [loader, setLoader] = useState(false);
  // get balance info

  useEffect(() => {
    const init = async () => {
      dispatch(GetBalanceInfo(userData?.id));
    };
    init();
  }, []);
  const planOptions = [
    { value: '', label: 'Select Plan' },
    { value: '5', label: '$5 for 300 credits' },
    { value: '10', label: '$10 for 700 credits' },
    { value: '15', label: '$10 for 1500 credits' }
  ];
  const handleEventType = (data) => {};
  const SmsBuyCreditsBtn = async () => {
    try {
      if (!currentPlan.value) {
        toast.error('Please select funds for Buy Sms credits ');
      } else if (!balanceInfo?.data?.wallet > 0) {
        toast.error('No Enough Balance in  Wallet ');
      } else if (+balanceInfo?.data?.wallet <= +currentPlan?.value) {
        toast.error('Please Deposit Funds First');
      } else {
        const DepositAmount = async () => {
          let newData = {
            wallet: +currentPlan?.value,
            cretits: +currentPlan?.value == 5 ? 300 : +currentPlan?.value == 10 ? 700 : 1500,
            user_id: userData?.id
          };

          return await API.post(`/deposit/withdrawAmount`, newData);
        };
        Promise.all([DepositAmount()])
          .then(function (results) {
            const data = results[0];
            toast.success('Transaction Successfully');

            setLoader(false);
            dispatch(GetBalanceInfo(userData?.id));
            // window.location.reload()
          })
          .catch((e) => {
            setLoader(false);

            toast.error('Something Went Wrong');
          });
      }
    } catch (e) {}
  };
  return (
    <div>
      <Card title="Sms">
        <div className="icon-container">
          <div className="icon-style">
            <MessageSquare size={20} />
          </div>
        </div>
        <CardText className="despost-text-main mb-0">$9.99/ months</CardText>
        <CardText className="despost-text">
          <span>
            Balance: ${balanceInfo?.data?.wallet ? ' ' + balanceInfo?.data?.wallet : ' ' + 0}
          </span>
          <span>
            Credits: $ {balanceInfo?.data?.cretits ? ' ' + balanceInfo?.data?.cretits : ' ' + 0}
          </span>
        </CardText>
        <div className="deposit-input">
          <Select
            theme={selectThemeColors}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            options={planOptions}
            value={currentPlan}
            onChange={(data) => {
              handleEventType(data), setCurrentPlan(data);
            }}
          />
        </div>
      </Card>
      <div style={{ marginTop: '5%', textAlign: 'center' }}>
        {loader ? (
          <Button color="primary" className="add-todo-item me-1">
            Loading
          </Button>
        ) : (
          <Button color="primary" className="add-todo-item me-1" onClick={() => SmsBuyCreditsBtn()}>
            Buy Credits
          </Button>
        )}
      </div>
    </div>
  );
}
export default memo(Sms);
