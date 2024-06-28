import React, { memo } from 'react';

import { FaAlignJustify } from 'react-icons/fa';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import CreateOrEditFolder from './Sidebar/CreateOrEditFolder';

function TextTemplate() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button
        // outline
        color="link"
        size="sm"
        className="btn-icon"
        onClick={() => handleClose()}
      >
        <FaAlignJustify size={16} />
      </Button>
      <div
      // style={{
      //     maxWidth: '1000px',
      //     width: '1000px',
      //     height: '1000px'
      // }}
      >
        <Modal
          isOpen={open}
          // toggle={() => handleClose()}
          // className={this.props.className}

          size="md"
          fullscreen
        >
          <ModalHeader toggle={() => handleClose()}>Modal title</ModalHeader>
          <ModalBody>
            <Row>
              <Col md={6}>
                <CreateOrEditFolder />
              </Col>
              <Col md={6}></Col>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default memo(TextTemplate);
