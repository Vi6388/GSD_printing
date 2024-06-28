import React, { memo, useState } from 'react';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Input,
  InputGroup
} from 'reactstrap';
import { FaRegFolder, FaEllipsisV } from 'react-icons/fa';
import { Mail, Send, Edit2, Folder, Trash, Plus } from 'react-feather';

function CreateFolderModalForm() {
  const [open, setOpen] = React.useState(false);
  const [folderName, setFolderName] = React.useState('');
  const [folderList, setFolderList] = React.useState([1, 2, 3, 4, 5]);
  // console.log('folderName ==> ', folderName)
  const handleClose = () => {
    setOpen(!open);
  };
  //   console.log('folderName ==> ', folderName)
  const handleSave = () => {
    setFolderList([...folderList, folderName]);
    // handleClose()
  };

  // add new code
  const [addFolderHide, setAddFolderHide] = useState(false);
  const handleNewFolderAdd = () => {
    setAddFolderHide(!addFolderHide);
  };

  return (
    <div>
      <div className="mt-3 px-2 d-flex justify-content-between">
        <h6 className="section-label mb-1">Folders</h6>
        <Plus
          className="cursor-pointer"
          size={14}
          onClick={() => setAddFolderHide(!addFolderHide)}
        />
      </div>
      {addFolderHide ? (
        <div className="m-2">
          <InputGroup>
            <Input placeholder="Folder Name" />
            <Button color="primary" outline onClick={handleNewFolderAdd}>
              Add
            </Button>
          </InputGroup>
        </div>
      ) : null}
      {/* <Button onClick={() => handleClose()} color="primary">
                Add Folder
            </Button>

            <Modal isOpen={open}>
                <ModalHeader toggle={() => handleClose()}>
                    Modal title
                </ModalHeader>
                <ModalBody>
                    <Input
                        type="text"
                        placeholder="Folder Name"
                        onChange={(e) => setFolderName(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => handleSave()}>
                        save
                    </Button>{' '}
                    <Button color="secondary" onClick={() => handleClose()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <div style={{ marginTop: '5%', width: 250 }}>
                {folderList.map((item, index) => (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '5%'
                        }}
                    >
                        <div
                            key={index}
                            style={{
                                display: 'flex',

                                alignItems: 'center'
                            }}
                        >
                            <span>
                                <FaRegFolder size={25} color="#7367F0" />
                            </span>
                            <span style={{ marginLeft: 10 }}> {item}</span>
                        </div>
                        <div>
                            <FaEllipsisV size={15} color="#7367F0" />
                        </div>
                    </div>
                ))}
            </div> */}
    </div>
  );
}
export default memo(CreateFolderModalForm);
