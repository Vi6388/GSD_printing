import React from 'react';
import { useState } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import ModalStepper from './ModalStepper';
export default function AddUserModal() {
  const [stepperModal, setStepperModal] = useState(false);
  return (
    <div>
      <div className="basic-modal">
        {/* <Button color="primary" outline onClick={() => setStepperModal(!stepperModal)}>
          Basic Modal
        </Button> */}

        <div className="add-mem">
          <a
            href="#"
            onClick={() => {
              setStepperModal(!stepperModal);
            }}
          >
            Add New
          </a>
        </div>
        <Modal
          isOpen={stepperModal}
          toggle={() => setStepperModal(!stepperModal)}
          className="modal-dialog-centered modal-xl"
        >
          <ModalHeader toggle={() => setStepperModal(!stepperModal)}>Basic Modal</ModalHeader>
          <ModalBody>
            <ModalStepper />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => setBasicModal(!stepperModal)}>
              Accept
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}
