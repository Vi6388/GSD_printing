import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  FormGroup,
  Row,
  Col
} from 'reactstrap';

import { toast } from 'react-toastify';
import Select from 'react-select';
// ** Actions
import { saveModuleAction } from './store/action';

const AddModuleModal = ({ modalOpen, setModalOpen, toggle }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [selectableLinks, setSelectableLinks] = useState([]);
  const links = useSelector((state) => state.permission?.links);

  useEffect(() => {
    let tmp = [];
    links &&
      links.map((link, index) => {
        if (link.elementParent == null) {
          tmp.push({ label: link.elementTitle, value: link.id });
        }
      });
    setSelectableLinks(tmp);
  }, [links]);

  const handleSaveModule = () => {
    dispatch(saveModuleAction(data));
    setModalOpen(false);
  };
  return (
    <form>
      <Modal isOpen={modalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Modal</ModalHeader>
        <ModalBody>
          <div className="mb-1">
            <Row className="mt-1 mb-50">
              <Label for="title" sm={2}>
                Title:
              </Label>
              <Col sm={10}>
                <Input
                  id="title"
                  name="title"
                  placeholder="Module title"
                  type="text"
                  onChange={(e) => setData((p) => ({ ...data, title: e.target.value }))}
                />
              </Col>
            </Row>
            <Row className="mb-50">
              <Label for="link" sm={2}>
                Link:
              </Label>
              <Col sm={10}>
                <Input
                  id="link"
                  name="link"
                  placeholder="Module Link"
                  type="text"
                  onChange={(e) => setData((p) => ({ ...data, link: e.target.value }))}
                />
              </Col>
            </Row>
            <Row className="mb-1">
              <Label for="exampleEmail" sm={2}>
                Upper:
              </Label>
              <Col sm={10}>
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={selectableLinks[0]}
                  options={selectableLinks}
                  isClearable={false}
                  onChange={({ value }) => setData((p) => ({ ...data, elementParent: value }))}
                />
              </Col>
            </Row>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button className="mt-2" color="primary" onClick={(e) => handleSaveModule()}>
            Save
          </Button>
          <Button className="mt-2" color="secondary" onClick={(e) => toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </form>
  );
};

export default AddModuleModal;
