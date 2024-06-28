import { useState } from 'react';

import {
  Button,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

const headerTxt = [
  '',
  'Reset CMA Event Point',
  `Edit My Event Point's Name`,
  'Delete My Event Point'
];

const bodyTxt = [
  '',
  'Really Reset Event Point?',
  'Really Edit Event Point?',
  'Really Delete Event Point?'
];

const confirmBtnTxt = ['', 'Reset', 'Edit', 'Delete'];

const NewModal = (props) => {
  const {
    data,
    dispatch,
    modalType,
    setModalType,
    eventPointTypeUpdateAction,
    selectPT,
    setSelectPT,
    eventPointTypeDefaultData
  } = props;

  const [createNewValidation, setCreateNewValidation] = useState(true);
  const [newTitle, setNewTitle] = useState(data && data[selectPT]?.name);

  const handleInputTitle = (e) => {
    e.preventDefault();
    const inputTxt = e.target.value;
    setNewTitle(inputTxt);
    data.filter((dataItem) => dataItem.name.toUpperCase() === inputTxt.toUpperCase()).length > 0
      ? setCreateNewValidation(false)
      : setCreateNewValidation(true);
  };

  const confirmBtnClicked = () => {
    let newData = [...data];
    switch (modalType) {
      case 1:
        newData[selectPT] = eventPointTypeDefaultData[selectPT];
        dispatch(eventPointTypeUpdateAction(newData));
        break;
      case 2:
        newData[selectPT] = { ...newData[selectPT], name: newTitle };
        dispatch(eventPointTypeUpdateAction(newData));
        setCreateNewValidation(false);
        break;
      case 3:
        newData.splice(selectPT, 1);
        dispatch(eventPointTypeUpdateAction(newData));
        setSelectPT(0);
        break;
      default:
        break;
    }
    setModalType(0);
  };

  const cancleBtnClicked = () => {
    setCreateNewValidation(true);
    setModalType(0);
  };

  return (
    <Modal
      isOpen={modalType > 0}
      toggle={() => cancleBtnClicked()}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={() => cancleBtnClicked()}>{headerTxt[modalType]}</ModalHeader>
      <ModalBody>
        <div>
          {modalType == 2 ? (
            <>
              <Label className="form-label" for="validState">
                {bodyTxt[modalType]}
              </Label>
              <Input
                type="text"
                id={`newModal`}
                name={`newModal`}
                value={newTitle}
                placeholder=""
                onChange={handleInputTitle}
                valid={createNewValidation}
                invalid={!createNewValidation}
              />
              <FormFeedback valid={createNewValidation}>
                {createNewValidation
                  ? 'Sweet! That name is available.'
                  : 'Oh no! Please input correct data.'}
              </FormFeedback>
            </>
          ) : (
            <div className="text-center">
              <h2>{bodyTxt[modalType]}</h2>
              <h4> Event Point Name: {data && data[selectPT]?.name}</h4>
            </div>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={confirmBtnClicked}
          disabled={modalType == 2 && (!createNewValidation || !newTitle)}
        >
          {confirmBtnTxt[modalType]}
        </Button>
        <Button color="secondary" onClick={cancleBtnClicked}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NewModal;
