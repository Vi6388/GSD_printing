import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Card, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import Select, { components } from 'react-select';
import { Edit, Trash } from 'react-feather';

import { editParticularEventAction } from '../store/actions';

import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const MySwal = withReactContent(Swal);
const customConfirmClass = 'w-40 btn btn-danger';
const customCancelClass = 'w-40 ms-1 btn btn-outline-danger';

const CouponManagement = (props) => {
  const { event } = props;

  const dispatch = useDispatch();
  const [couponName, setCouponName] = useState('');
  const [couponAmount, setCouponAmount] = useState(0);
  const [couponType, setCouponType] = useState({ value: 'percent', label: '%' });

  const couponTypeOption = [
    {
      value: 'percent',
      label: '%'
    },
    {
      value: 'dollar',
      label: '$'
    }
  ];

  const columns = [
    {
      name: 'Coupon Name',
      selector: (row) => row.couponName
    },
    {
      name: 'Coupon Amount',
      selector: (row) => row.couponAmount
    },
    {
      name: 'Coupon Type',
      selector: (row) => (row.couponType.toString() === 'percent' ? '%' : '$')
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="column-action">
          <Edit
            size={16}
            className="cursor-pointer me-2"
            onClick={() => {
              MySwal.fire({
                showCancelButton: true,
                title: `Reset coupon`,
                customClass: {
                  confirmButton: customConfirmClass,
                  cancelButton: customCancelClass
                },
                showClass: {
                  popup: 'animate__animated animate__bounceIn'
                },
                buttonsStyling: false,
                html:
                  `<div class="d-flex justify-content-start align-items-center fw-bolder mt-1">
                    <Input id="swal-input-coupon-name" class="form-control-sm form-control" style="width: 220px;" value=${row.couponName}>
                      <span class="ms-1">
                        Coupon Name
                      </span>
                  </div>` +
                  `<div class="d-flex justify-content-start align-items-center fw-bolder mt-1">
                    <div class="d-flex" style={width: 300px;}>
                      <input id="swal-input-coupon-amount" class="form-control-sm form-control" style="flex: 5;" value=${
                        row.couponAmount
                      }>
                      <Select id="swal-select-coupon-type" class="select__control css-1s2u09g-control" style='margin-left:10px; flex:1; min-height:  0px!important;'>
                        <option value="percent" ${
                          row.couponType === 'percent' ? 'selected' : ''
                        } >%</option>
                          <option value="dollar" ${
                            row.couponType === 'dollar' ? 'selected' : ''
                          }>$</option>
                      </Select>
                    </div>
                    <span class="ms-1">Coupon Amount</span>
                  </div>`,
                focusConfirm: false,
                preConfirm: () => {
                  let editCoupon = {
                    _id: row._id,
                    couponName: document.getElementById('swal-input-coupon-name').value,
                    couponAmount:
                      parseInt(document.getElementById('swal-input-coupon-amount').value) === NaN
                        ? 0
                        : parseInt(document.getElementById('swal-input-coupon-amount').value),
                    couponType: document.getElementById('swal-select-coupon-type').value
                  };
                  let prevCouponItem = event.coupons.filter(
                    (couponItem) => couponItem._id === editCoupon._id
                  )[0];
                  if (
                    editCoupon.couponName === prevCouponItem.couponName &&
                    editCoupon.couponAmount === prevCouponItem.couponAmount &&
                    editCoupon.couponType === prevCouponItem.couponType
                  )
                    return toast.warning('Not changed!');
                  if (
                    editCoupon.couponName !== prevCouponItem.couponName &&
                    event.coupons.filter(
                      (couponItem) => couponItem.couponName === editCoupon.couponName
                    ).length === 1
                  )
                    return toast.warning('There are same coupon name, Reset coupon name!');

                  let couponsData = [];
                  event.coupons.map((couponItem) => {
                    if (couponItem._id.toString() === editCoupon._id.toString())
                      couponsData.push(editCoupon);
                    else couponsData.push(couponItem);
                  });
                  dispatch(
                    editParticularEventAction(
                      event._id,
                      { coupons: couponsData },
                      'Edited Select Coupon'
                    )
                  );
                }
              });
            }}
          />
          <Trash
            size={16}
            className="cursor-pointer"
            onClick={() => {
              MySwal.fire({
                icon: 'info',
                showCancelButton: true,
                title: 'Delete Coupon ?',
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
                  let couponsData = [];
                  event.coupons.map((couponItem) => {
                    if (couponItem.couponName !== row.couponName) {
                      couponsData.push(couponItem);
                    }
                  });
                  dispatch(
                    editParticularEventAction(event._id, { coupons: couponsData }, 'Deleted Coupon')
                  );
                }
              });
            }}
          />
        </div>
      )
    }
  ];

  return (
    <>
      <h5 className="fw-bolder">Coupon Management</h5>
      <Card className="my-1 p-2 border-2" style={{ border: '1px solid #e5e5e5' }}>
        <div>
          <div className="">
            This section allows you to add new coupons for this event. Coupons are per Member, not
            per Account.
          </div>

          <div className="d-flex justify-content-start align-items-center fw-bolder mt-1">
            <Input
              type="text"
              bsSize="sm"
              style={{ width: '300px' }}
              value={couponName}
              onChange={(e) => setCouponName(e.target.value)}
            />
            <span className="ms-1"> Coupon Name. Remember this will be case sensitive! </span>
          </div>
          <div className="d-flex justify-content-start align-items-center fw-bolder mt-1">
            <div className="d-flex" style={{ width: '300px' }}>
              <Input
                type="number"
                name="couponAmount"
                className="me-50"
                value={couponAmount}
                style={{ flex: '5' }}
                onChange={(e) => {
                  setCouponAmount(e.target.value ? parseInt(e.target.value) : null);
                }}
              />
              <Select
                id="couponType"
                className="react-select"
                classNamePrefix="select"
                isClearable={false}
                options={couponTypeOption}
                value={couponType}
                onChange={(data) => setCouponType(data)}
                bsSize="sm"
                style={{ flex: '1' }}
              />
            </div>
            <span className="ms-1">Coupon Amount</span>
          </div>
          <button
            type="button"
            disabled={
              couponAmount <= 0 ||
              (couponType.value === 'percent' && couponAmount > 100) ||
              !couponName ||
              event.coupons.filter((couponItem) => couponItem.couponName === couponName).length > 0
            }
            className="btn btn-primary mt-1"
            onClick={() => {
              let couponsData = [];
              event.coupons.map((couponItem) => {
                couponsData.push(couponItem);
              });
              couponsData.push({
                couponName,
                couponAmount,
                couponType: couponType.value
              });
              dispatch(
                editParticularEventAction(event._id, { coupons: couponsData }, 'Created New Coupon')
              );
              setCouponName('');
              setCouponAmount(0);
              setCouponType({ value: 'percent', label: ' %' });
            }}
          >
            Add Coupons{' '}
          </button>
        </div>
      </Card>
      <h5 className="fw-bolder">Coupons Already Added</h5>

      <Card className="my-1 p-2 border-2" style={{ border: '1px solid #e5e5e5' }}>
        <div className="react-dataTable">
          <DataTable
            noHeader
            responsive
            columns={columns}
            data={event?.coupons ? event.coupons : []}
            className="react-dataTable"
          />
        </div>
      </Card>
    </>
  );
};

export default CouponManagement;
