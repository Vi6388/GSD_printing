// ** Components
import AddCourseForm from './AddCourseForm';

import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const AddCourseModal = (props) => {
  // ** Props
  const { centeredModal, setCenteredModal, store } = props;

  return (
    <>
      <Modal
        isOpen={centeredModal}
        toggle={() => setCenteredModal(!centeredModal)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Add New Course</ModalHeader>
        <ModalBody>
          <AddCourseForm
            store={store}
            centeredModal={centeredModal}
            setCenteredModal={setCenteredModal}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddCourseModal;
