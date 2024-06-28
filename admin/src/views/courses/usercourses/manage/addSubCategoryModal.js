// ** React Imports
import { useState } from 'react';

// ** Third Party Components
import Select from 'react-select';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Reactstrap imports
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const AddProductModal = (props) => {
  // ** Props
  const { subCatModal, setSubCatModal, store, dispatch, courseSubCategoriesAddAction } = props;

  const [courseSubCategoryData, setCourseSubCategoryData] = useState({ subCategoryName: '' });
  const [currentCategory, setCurrentCategory] = useState({
    value: '',
    label: 'Select A Category'
  });

  const categoryOptions = [];

  store.courseCategories.map((item) =>
    categoryOptions.push({ value: item._id, label: item.categoryName })
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(courseSubCategoriesAddAction(currentCategory.value, courseSubCategoryData));
    setCourseSubCategoryData('');
    setCurrentCategory({
      value: '',
      label: 'Select A Category'
    });
    setSubCatModal(!subCatModal);
  };

  return (
    <>
      <Modal
        isOpen={subCatModal}
        toggle={() => setSubCatModal(!subCatModal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setSubCatModal(!subCatModal)}>Add New Sub-Category</ModalHeader>
        <ModalBody>
          <div className="mb-1">
            <Label className="form-label" for="nameMulti">
              Select Category
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={categoryOptions}
              value={currentCategory}
              onChange={(data) => {
                setCurrentCategory(data);
              }}
            />
          </div>

          <div>
            <Label className="form-label" for="nameMulti">
              Sub Category Name
            </Label>
            <Input
              type="text"
              name="name"
              id="nameMulti"
              placeholder="Course Category Name"
              onChange={(e) => setCourseSubCategoryData({ subCategoryName: e.target.value })}
              value={courseSubCategoryData.subCategoryName}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button color="danger" outline onClick={() => setSubCatModal(!subCatModal)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddProductModal;
