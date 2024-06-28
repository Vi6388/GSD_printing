// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Form,
  Input,
} from "reactstrap";
import { BsQuestionCircle } from "react-icons/bs";
import FaqContent from "./FaqContent";

const FaqModal = () => {
  // ** States
  const [basicModal, setBasicModal] = useState(false);
  return (
    <div className="demo-inline-spacing">
      <div
        className="basic-modal"
        style={{ marginRight: "0", marginTop: "0px" }}
      >
        <BsQuestionCircle
          size={25}
          onClick={() => setBasicModal(!basicModal)}
        />
        <Modal
          isOpen={basicModal}
          toggle={() => setBasicModal(!basicModal)}
          className="modal-lg"
        >
          <ModalHeader toggle={() => setBasicModal(!basicModal)}>
            Need Help?
          </ModalHeader>
          <ModalBody>
            <FaqContent />
          </ModalBody>
          <ModalFooter>
            {/* <Button
                            color="primary"
                            onClick={() => setBasicModal(!basicModal)}
                        >
                            Accept
                        </Button> */}
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};
export default FaqModal;
