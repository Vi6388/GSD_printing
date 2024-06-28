import React, { useState } from 'react';
import { Col, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../../assets/styles/user-detail.scss';
import '../../assets/styles/user-detail.scss';
import ModalStepper from './ModalStepper';

export const AddNewMember = ({ stepperModal, setStepperModal }) => {
  const [valid, setValid] = useState(false);
  const [stepTwoValid, setStepTwoValid] = useState(false);
  const [stepOne, setStepOne] = useState('');
  const [stepTwo, setStepTwo] = useState('');
  const [stepFour, setStepThree] = useState('');
  const modelClose = () => {
    setStepOne('');
    setStepTwo('');
    setStepThree('');
    setStepperModal(!stepperModal);
  };
  return (
    <>
      <Modal
        isOpen={stepperModal}
        toggle={() => setStepperModal(!stepperModal)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader toggle={modelClose} className="he">
          New Member Information
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <ModalStepper
                valid={valid}
                setValid={setValid}
                setStepThree={setStepThree}
                setStepTwo={setStepTwo}
                setStepOne={setStepOne}
                stepFour={stepFour}
                stepTwo={stepTwo}
                stepOne={stepOne}
                stepTwoValid={stepTwoValid}
                setStepTwoValid={setStepTwoValid}
                setStepperModal={setStepperModal}
                stepperModal={stepperModal}
              />
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};
