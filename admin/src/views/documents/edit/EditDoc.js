import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ModalBody, Button, ModalFooter, Row, Col } from 'reactstrap';
import PdfViewer from './PdfViewer';
import SideMenu from './SideMenu';
import { Modal } from 'reactstrap';
import { X } from 'react-feather';
import PageTitle from './PageTitle';
import { putSendEmail } from '../../../requests/documents/create-doc';
import { DocumentContext } from '../../../utility/context/Document';

export default function EditDoc({ open, toggle }) {
  const {
    url,
    board,
    recipients,
    docMessage,
    setBoard,
    setBoardCurrent,
    setOpenProps,
    setSelectedItem,
    setRecipients,
    setUrl,
    setDocumentFiles,
    setDocMessage,
    setCurrentPage,
    setScale,
    setOffset,
    setIsOnlySigner,
    setHashcode,
    setUndoList,
    setRedoList
  } = useContext(DocumentContext);

  const history = useHistory();
  const handleSaveDoc = () => {
    //update db with data
    let boardPayload = [];
    board.map((b) => {
      boardPayload.push({ ...b, icon: null });
    });

    //generate code for doc

    const id = url.id;
    putSendEmail(
      id,
      {
        documentUrl: url.url,
        mymanagerUrl: `https://mymanager.com/document/preview/`,
        recipients: recipients,
        properties: boardPayload,
        docMessage: docMessage,
        isSent: true
      },
      true
    );
  };
  const handleSendEmail = () => {
    //save doc & send
    handleSaveDoc();

    toggle();
    //redirect to documents
    //clear board
    setBoard([]);
    setUndoList([]);
    setRedoList([]);
    setBoardCurrent([]);
    setOpenProps(false);
    setSelectedItem({});
    setRecipients([]);
    setUrl({});
    setDocumentFiles([]);
    setDocMessage({ subject: '', message: '' });
    setCurrentPage(1);
    setScale(1);
    setOffset(0);
    setIsOnlySigner(false);
    setHashcode('');

    //redirect to document page

    history.push('/documents');
  };

  return (
    <>
      <Modal isOpen={open} toggle={toggle} fullscreen scrollable style={{ overflowX: 'hidden' }}>
        <div className="bg-light" id="modalHeader">
          <Row className="w-100 mx-0">
            <Col xs="1" style={{ maxWidth: '40px' }} className="my-auto">
              <Button onClick={toggle} color="link" className="p-0">
                <X />
              </Button>
            </Col>
            <Col>
              <PageTitle />
            </Col>
          </Row>
        </div>
        <ModalBody className="bg-light-secondary">
          <div>
            <Row>
              <Col md="2" className="mx-0 px-0">
                <SideMenu />
              </Col>
              <Col md="10">
                <PdfViewer />
              </Col>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter id="modalFooter">
          <Button color="secondary" onClick={toggle}>
            Back
          </Button>
          <Button color="primary" onClick={handleSendEmail}>
            Send
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
