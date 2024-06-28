import React from 'react';
import { Paperclip } from 'react-feather';

import { Modal, ModalBody, ModalFooter, ModalHeader, Table, Button } from 'reactstrap';

export default function AttachmentModal({ toggle, open, files, handleFileUpload }) {
  return (
    <Modal isOpen={open} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Uploaded Files</ModalHeader>
      <ModalBody>
        <Table>
          <tbody>
            {files &&
              files.map((file) => {
                return (
                  <tr>
                    <td>
                      {['png', 'jpg', 'jpeg'].includes(
                        file.split('.')[file.split('.').length - 1]
                      ) ? (
                        <img src={file} width="100" />
                      ) : (
                        <Paperclip />
                      )}
                    </td>
                    <td>
                      <a href={file} target="_blank">
                        {file.split('-')[file.split('-').length - 1]}
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-start">
          <Button color="primary" className=" me-2" onClick={handleFileUpload}>
            <span className="align-middle d-sm-inline-block d-none">Upload New Files</span>
          </Button>
          <Button color="primary" outline onClick={toggle}>
            <span className="align-middle d-sm-inline-block d-none">Close</span>
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
