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

const AddFolder = () => {
  // ** States
  const [centeredModal, setCenteredModal] = useState(false);
  return (
    <div className="demo-inline-spacing">
      <div className="vertically-centered-modal">
        <button
          className="btn  round"
          style={{ backgroundColor: "#0b7def", color: "#fff" }}
          onClick={() => setCenteredModal(!centeredModal)}
        >
          Create New Folder
        </button>
        <Modal
          isOpen={centeredModal}
          toggle={() => setCenteredModal(!centeredModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
            Add New Folder
          </ModalHeader>
          <ModalBody>
            <Form>
              <Input type="text" placeholder="folder name.." />
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => setCenteredModal(!centeredModal)}
            >
              Submit
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};
export default AddFolder;
