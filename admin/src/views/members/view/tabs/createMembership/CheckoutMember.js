import React from 'react';
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  InputGroup,
  InputGroupText,
  Form,
  Button
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import '../../../../../assets/styles/user-detail.scss';
import { FaCcVisa } from 'react-icons/fa';
import { AiFillIdcard } from 'react-icons/ai';
import { addMemberShipToMember } from '../../../../../requests/memberships/membershipAPI';

export const CheckoutMember = ({ stepperModal, setStepperModal, payload, url }) => {
  const history = useHistory();
  const modelClose = () => {
    setStepperModal(!stepperModal);
  };
  const checkoutPayment = async () => {
    await addMemberShipToMember(payload, history, url);
    setStepperModal(!stepperModal);
  };
  return (
    <>
      <Modal
        isOpen={stepperModal}
        toggle={() => setStepperModal(!stepperModal)}
        className="modal-dialog-centered "
      >
        <ModalHeader toggle={modelClose} className="he">
          Pay Now
        </ModalHeader>
        <ModalBody>
          <Form>
            <Row>
              <Col md="11" className="mt-1">
                Price
              </Col>
              <Col md="1" className="mt-1">
                ${payload.cost.amount}
              </Col>
              <Col md="11" className="mt-2">
                Total
              </Col>
              <Col md="1" className="mt-2">
                ${payload.cost.amount}
              </Col>
              <Col md="12" className="mt-2">
                <label>Card number</label>
                <InputGroup>
                  <Input type="number" placeholder="1234 1234 1234 1234" />
                  <InputGroupText>
                    <FaCcVisa />
                  </InputGroupText>
                </InputGroup>
              </Col>
              <Col md="6" className="mt-2">
                <label>Expiration</label>
                <Input type="number" placeholder="MM/YY" />
              </Col>
              <Col md="6" className="mt-2">
                <label>CVC</label>
                <InputGroup>
                  <Input type="number" placeholder="CVC" />
                  <InputGroupText>
                    <AiFillIdcard />
                  </InputGroupText>
                </InputGroup>
              </Col>
              <Col md="12" className="mt-2">
                <label>Country</label>
                <Input type="select" placeholder="">
                  <option value="">Select country</option>
                </Input>
              </Col>
            </Row>
            <div className="d-flex justify-content-between">
              <Button
                onClick={checkoutPayment}
                className="mt-2"
                style={{ width: '100%' }}
                size="lg"
                color="primary"
              >
                Place Order
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
