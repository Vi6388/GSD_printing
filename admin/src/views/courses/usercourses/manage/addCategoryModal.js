// ** React Imports
import { useState } from 'react';

// ** Reactstrap imports
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const AddProductModal = (props) => {
  // ** Props
  const { centeredModal, setCenteredModal, store, dispatch, courseCategoriesAddAction } = props;

  const [courseCategoryData, setCourseCategoryData] = useState({ categoryName: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(courseCategoriesAddAction(courseCategoryData));
    setCourseCategoryData('');
    setCenteredModal(!centeredModal);
  };

  return (
    <>
      <Modal
        isOpen={centeredModal}
        toggle={() => setCenteredModal(!centeredModal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>Add New Category</ModalHeader>
        <ModalBody>
          <div>
            <Label className="form-label" for="nameMulti">
              Category Name
            </Label>
            <Input
              type="text"
              name="name"
              id="nameMulti"
              placeholder="Course Category Name"
              onChange={(e) => setCourseCategoryData({ categoryName: e.target.value })}
              value={courseCategoryData.categoryName}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button color="danger" outline onClick={() => setCenteredModal(!centeredModal)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddProductModal;
