import { memo, useState, useEffect } from 'react';
import React from 'react';
import { Input, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// ** Custom Components
import Card from '@components/card-snippet';
import { Hash, XCircle } from 'react-feather';
import Select from 'react-select';
// ** Utils
import { selectThemeColors } from '@utils';
import { customInterIceptors } from '../../lib/AxiosProvider';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { GetBalanceInfo } from './store';
import { toast } from 'react-toastify';

const API = customInterIceptors();

function BuyNum() {
  const dispatch = useDispatch();
  let { userData } = useSelector((state) => state.auth);
  let { balanceInfo } = useSelector((state) => state.deposit);

  const [currentPlan, setCurrentPlan] = useState({
    value: '',
    label: 'Select Type'
  });
  // handel loading
  const [loader, setLoader] = useState(false);
  const [region, setRegion] = useState('');
  const [selectNum, setSelectNum] = useState(false);
  const [NumList, setNumList] = useState([]);
  const [selectedNum, setSelectedNum] = useState('');

  const [modal, setModal] = useState(false);
  const planOptions = [
    { value: 'US', label: 'United States' },
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'DC', label: 'District Of Columbia' },

    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },

    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
    { value: 'CA_AB', label: 'Alberta' },
    { value: 'CA_BC', label: 'British Columbia' },
    { value: 'CA_MB', label: 'Manitoba' },
    { value: 'CA_NB', label: 'New Brunswick' },
    { value: 'CA_NL', label: 'Newfoundland' },
    { value: 'CA_NS', label: 'Nova Scotia' },
    { value: 'CA_ON', label: 'Ontario' },
    { value: 'CA_PE', label: 'Prince Edward Island' },
    { value: 'CA_QC', label: 'Quebec' },
    { value: 'CA_SK', label: 'Saskatchewan' }
  ];
  const handleEventType = (data) => {
    setRegion(data.value);
  };

  useEffect(() => {
    const init = async () => {
      dispatch(GetBalanceInfo(userData?.id));
    };
    init();
  }, []);
  useEffect(() => {
    const init = async () => {
      try {
        setLoader(true);
        let data = await API.post(`/deposit/availablePhoneNumbers`, {
          value: region
        });

        setNumList(data?.data?.data);
        setLoader(false);
        setSelectNum(true);
      } catch (error) {
        setLoader(false);
      }
    };
    if (region) {
      init();
    }
  }, [region]);
  const NumberBuyCreditsBtn = async () => {
    let bal = +balanceInfo?.data?.wallet ? +balanceInfo?.data?.wallet : 0;

    try {
      if (!selectedNum) {
        toast.error('Please select Phone Number ');
      } else if (10 > bal) {
        toast.error('Please Deposit Funds First ');
      } else {
        setLoader(true);
        const DepositAmount = async () => {
          let newData = {
            wallet: balanceInfo?.data?.is_Already_Purchase ? 10 : 0,
            // cretits: +SmsBuyCredits == 5 ? 300 : +SmsBuyCredits == 10 ? 700 : 1500,
            user_id: userData?.id
          };

          return await API.post(`/deposit/withdrawAmountForBuyingNumber`, newData);
        };
        const PurchaseNum = async () => {
          let ndata = {
            purchased_Num: selectedNum,

            is_Already_Purchase: true
          };

          return await API.put(`/deposit/purchase_num/${userData?.id}`, ndata);
        };

        Promise.all([DepositAmount(), PurchaseNum()])
          .then(function (results) {
            const data = results[0];
            const data1 = results[1];
            toast.success('Transaction Successfully');

            setLoader(false);
            setModal(!modal);
            dispatch(GetBalanceInfo(userData?.id));
            //  window.location.reload()
          })
          .catch((e) => {
            setLoader(false);
            setLoader(false);
            setModal(!modal);
            toast.error('Something Went Wrong');
          });
      }
    } catch (e) {}
  };

  return (
    <div>
      {/* modal start here */}

      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={modal}>Buy Number : {selectedNum}</ModalHeader>
        <ModalBody>Buy or Exchange Number for $10</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => NumberBuyCreditsBtn()}>
            Buy
          </Button>{' '}
          <Button color="secondary" onClick={() => setModal(!modal)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* modal end here  */}
      {selectNum ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button color="link" onClick={() => setSelectNum(!selectNum)}>
              <XCircle color="red" />
            </Button>
          </div>
          <DataTable
            columns={[
              {
                name: 'Number List',
                selector: 'phoneNumber',
                sortable: true
              },
              {
                name: 'Buy Number',
                selector: 'credit',
                sortable: true,
                cell: (item) => (
                  <Button
                    color="primary"
                    className="add-todo-item me-1"
                    onClick={() => {
                      setSelectedNum(item.phoneNumber);
                      setModal(!modal);
                    }}
                  >
                    Select
                  </Button>
                )
              }
            ]}
            data={NumList}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            paginationComponentOptions={{
              rowsPerPageText: 'Rows per page:',
              rangeSeparatorText: 'of'
            }}
          />
        </div>
      ) : (
        <Card title="Buy Number">
          <div className="icon-container">
            <div className="icon-style">
              <Hash size={20} />
            </div>
          </div>
          <CardText className="despost-text-main mb-0">Buy or Exchange Number for $10</CardText>
          <CardText className="despost-text">
            <span>
              Balance: Balance: $
              {balanceInfo?.data?.wallet ? ' ' + balanceInfo?.data?.wallet : ' ' + 0}
            </span>
            <span>
              Credits: ${balanceInfo?.data?.cretits ? ' ' + balanceInfo?.data?.cretits : ' ' + 0}
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
      )}
    </div>
  );
}
export default memo(BuyNum);
