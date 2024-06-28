import React, { Fragment, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';
import IndexMain from '../managepayment/IndexMain';

const ManagePaymentsMain = () => {
  const [active, setActive] = useState('1');
  const [open, setOpen] = useState(false);

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <Fragment>
      <Card className="p-1">
        {/* <div>
          <h4>2023 CMA BROOKLYN REGIONAL CHAMPIONSHIPS</h4>
        </div> */}
        <div>
          <div
            style={{
              backgroundColor: '#c52f2f',
              borderRadius: '6px',
              color: '#fff'
            }}
            className="d-flex align-items-center"
          >
            <h4 className="mt-1" style={{ color: '#fff', marginLeft: '20px' }}>
              Manage Payments/Coupons
            </h4>
          </div>
          {/* <div>
            <div className="my-1">
              <center style={{ color: '#8f8b98', fontSize: '15px' }}>
                As you receive payment please check off the Member/coach in the Not Paid List. You
                may also mark people who have Paid as Unpaid. If you want to send a verification
                email, make sure to check the "Send Verification Email" checkbox when you mark the
                Member/coach as paid! Remember, they can check their paid status on their MyAccount
                page, so be prompt with this function!
              </center>
              <div>
                <span style={{ color: 'red' }}>
                  <b>{'[Manage Payments]'}</b>
                </span>
                <div className="d-flex">
                  <span style={{ color: 'red', marginRight: '2px' }}>0 </span>
                  <span>Coaches have NOT paid. Total coaches owe: $0. Total coaches paid: $0</span>
                </div>
                <div className="d-flex">
                  <span style={{ color: 'red', marginRight: '2px' }}>0</span>
                  <span>Members have NOT paid. Total Members owe: $0. Total Members paid: $0</span>
                </div>
              </div>
            </div>
            <div className="mt-1">
              <span>Event total is $0; that includes what you are still owed: $0.</span>
              <div>
                <span style={{ color: 'blue' }}>mycma.org fees for 0 Members and 0 coaches: 0</span>
              </div>
            </div>
            <div>
              <center style={{ color: '#8f8b98' }}>
                mycma.org charges $2.00 for each Member. Registered coaches are an extra $1.00 if
                you are charging coaches.
              </center>
              <center style={{ color: 'red' }}>{'[Export payment report]'}</center>
            </div>
          </div> */}
        </div>
      </Card>
      <div className="">
        <IndexMain />
      </div>

      {/* <Modal toggle={() => setOpen(false)} className="modal-dialog-centered" isOpen={open}>
        <ModalHeader className="bg-transparent" toggle={() => setOpen((p) => !p)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div>
            <h3 className="text-center mb-1">Set Rounds And Rings</h3>
            <Row>
              <Col sm={6} lg={6} md={6}>
                <Label>Rounds</Label>
                <Input type="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </Input>
              </Col>
              <Col sm={6} lg={6} md={6}>
                <Label>Rings</Label>
                <Input type="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                  <option>15</option>
                  <option>16</option>
                  <option>17</option>
                  <option>18</option>
                  <option>19</option>
                  <option>20</option>
                  <option>21</option>
                  <option>22</option>
                  <option>23</option>
                  <option>24</option>
                </Input>
              </Col>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between ">
          <Button className="mt-1 me-3" outline onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="mt-1" color="primary">
            Confirm
          </Button>
        </ModalFooter>
      </Modal> */}
    </Fragment>
  );
};
export default ManagePaymentsMain;
