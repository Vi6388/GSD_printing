// ** React Imports
import { Fragment, useContext, useEffect, useState } from 'react';

// ** Mail Components Imports
import DocsCard from './DocsCard';

// ** Utils
import { formatDateToMonthShort } from '@utils';

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Menu, Search, Trash } from 'react-feather';
// ** Reactstrap Imports
import { Input, Label, InputGroup, InputGroupText, Button } from 'reactstrap';
import { deleteDocs } from './store';
import { DocumentContext } from '../../utility/context/Document';
import PreviewModal from './preview/PreviewModal';
import EditDoc from './edit/EditDoc';
import { resendDocs } from '../../requests/documents/create-doc';
const Docs = (props) => {
  // ** Props
  const {
    query,
    store,
    setQuery,
    dispatch,
    selectDoc,
    //paginateMail,
    selectAllMail,
    setSidebarOpen,
    resetSelectedMail
    //selectCurrentMail
  } = props;

  //selectedMail
  const { docs, selectedDocs, params } = store;

  // ** contexts
  const { setUrl, setRecipients, setBoard, setScale } = useContext(DocumentContext);

  // ** States
  const [openEditDoc, setOpenEditDoc] = useState(false);
  const [openPreviewDoc, setOpenPreviewDoc] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  // ** Variables
  const labelColors = {
    completed: 'success',
    viewed: 'primary',
    waiting: 'warning',
    voided: 'danger'
  };

  const toggleOpenEditDoc = () => {
    setOpenEditDoc(!openEditDoc);
  };
  const toggleOpenPreviewDoc = () => {
    setOpenPreviewDoc(!openPreviewDoc);
  };
  // ** Handles Update Functions
  const handleDocClick = (id) => {
    const doc = docs.find((x) => x.documentId === id);
    const folder = params.folder || 'inbox';
    if (folder === 'inbox') {
      const user = JSON.parse(localStorage.getItem('userData'));
      window.open(doc.recipients.find((x) => x.email === user.email).url, '_blank');
    } else if (folder === 'sent') {
      setUrl({ url: doc.documentUrl, id: doc.documentId });
      setRecipients(doc.recipients);
      setBoard(doc.properties);
      setScale(1);
      toggleOpenPreviewDoc();
    } else if (folder === 'draft') {
      setUrl({ url: doc.documentUrl, id: doc.documentId });
      setRecipients(doc.recipients);
      setBoard(doc.properties);
      setScale(1);
      toggleOpenEditDoc();
    }
  };

  // ** Handles SelectAll
  const handleSelectAll = (e) => {
    dispatch(selectAllMail(e.target.checked));
  };

  // ** Handles Move to Trash
  const handleDeleteDoc = (docs) => {
    dispatch(deleteDocs({ ids: docs }));
    dispatch(resetSelectedMail());
  };

  // ** Renders Mail
  const renderDocs = () => {
    if (docs.length) {
      return docs.map((doc, index) => {
        return (
          <DocsCard
            doc={doc}
            key={index}
            dispatch={dispatch}
            selectDoc={selectDoc}
            //updateMails={updateMails}
            labelColors={labelColors}
            selectedDocs={selectedDocs}
            handleDocClick={handleDocClick}
            //handleMailReadUpdate={handleMailReadUpdate}
            formatDateToMonthShort={formatDateToMonthShort}
          />
        );
      });
    }
  };

  const handleResend = async (docs) => {
    await resendDocs({ ids: docs });
  };

  useEffect(() => {
    if (store) {
      if (store.params.folder === 'inbox') {
        setIsResendDisabled(true);
      } else {
        setIsResendDisabled(false);
      }
    }
  }, [store]);

  return (
    <Fragment>
      <div className="email-app-list">
        <div className="app-fixed-search d-flex align-items-center">
          <div
            className="sidebar-toggle d-block d-lg-none ms-1"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size="21" />
          </div>
          <div className="d-flex align-content-center justify-content-between w-100">
            <InputGroup className="input-group-merge">
              <InputGroupText>
                <Search className="text-muted" size={14} />
              </InputGroupText>
              <Input
                id="email-search"
                placeholder="Search documents"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>
        <div className="app-action">
          <div className="action-left form-check">
            <Input
              type="checkbox"
              id="select-all"
              onChange={handleSelectAll}
              checked={selectedDocs.length && selectedDocs.length === docs.length}
            />
            <Label className="form-check-label fw-bolder ps-25 mb-0" for="select-all">
              Select All
            </Label>
          </div>
          {selectedDocs.length ? (
            <div className="action-right">
              <ul className="list-inline m-0">
                <li className="list-inline-item">
                  <Button
                    color="link"
                    className="p-0"
                    onClick={() => handleResend(selectedDocs)}
                    disabled={isResendDisabled}
                  >
                    RESEND
                  </Button>
                </li>
                <li className="list-inline-item">
                  <span className="action-icon " onClick={() => handleDeleteDoc(selectedDocs)}>
                    <Trash size={18} />
                  </span>
                </li>
              </ul>
            </div>
          ) : null}
        </div>

        <PerfectScrollbar className="email-user-list" options={{ wheelPropagation: false }}>
          {docs.length ? (
            <ul className="email-media-list">{renderDocs()}</ul>
          ) : (
            <div className="no-results d-flex justify-content-center align-items-center">
              <div style={{ textAlign: 'center' }}>
                <img style={{ width: '100px', height: '100px' }} src="/empty.svg" alt="" />
                <br />
                <br />
                <span style={{ paddingLeft: 15 }}>Alas! It's Empty.</span>
              </div>
            </div>
          )}
        </PerfectScrollbar>
      </div>

      <EditDoc open={openEditDoc} toggle={toggleOpenEditDoc} />
      <PreviewModal open={openPreviewDoc} toggle={toggleOpenPreviewDoc} />
    </Fragment>
  );
};

export default Docs;
