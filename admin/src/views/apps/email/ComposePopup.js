// ** React Imports
import { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import { TbArrowMerge } from 'react-icons/tb';
import { ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';
// ** Custom Components
import Avatar from '@components/avatar';
import { Col, Row } from 'reactstrap';
// ** Third Party Components
import { Editor } from 'react-draft-wysiwyg';
import Select, { components } from 'react-select';
import { toast } from 'react-toastify';
import { Minus, X, Maximize2, Paperclip, MoreVertical, Trash } from 'react-feather';
// ** Reactstrap Imports
import {
  Form,
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
  Label,
  Input,
  FormGroup
} from 'reactstrap';
import { EditorState, convertToRaw, ContentState, getCurrentBlock, Modifier } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useComposeMarketingEmail } from '../../../requests/contacts/marketing-emails';
import { useUploadDocument } from '../../../requests/documents/create-doc';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Styles
import '@styles/react/libs/editor/editor.scss';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

const formGroupStyleOverrides = {
  display: 'flex',
  alignItems: 'center',
  //  margin bottom 0 and important to override default
  marginBottom: '0px',
  gap: '0.25rem'
};

// ** Merge Codes
const mergeCodes = [
  'fullName',
  'email',
  'phone',
  'photo',
  'gender',
  'status',
  'note',
  'tags',
  'companyPhone',
  'companyEmail',
  'type',
  'company',
  'position',
  'isFormer',
  'isDelete',
  'socialLinks',
  'ranks',
  'files',
  'others',
  'paymentMethods'
];

const ComposePopup = (props) => {
  // ** Props & Custom Hooks
  const { composeOpen, toggleCompose, metadata, contactsStore } = props;

  // ** States
  const [ccOpen, setCCOpen] = useState(false);
  const [bccOpen, setBCCOpen] = useState(false);
  const [startPicker, setStartPicker] = useState(new Date());
  const [allDay, setAllDay] = useState(false);
  const [showtoinput, setShowtoinput] = useState(false);
  const [showflatpicker, setShowflatpicker] = useState(false);
  const [sendtext, setSendtext] = useState('Send');
  const handleSchedule = () => {
    showflatpicker
      ? setShowflatpicker(false) & setSendtext('Send')
      : setShowflatpicker(true) & setSendtext('Scheduled Send');
  };
  const handleToSelectEmployee = (e) => {
    setFrom(e.target.value);
  };
  const handleToSelect = (e) => {
    if (e.target.value === 'email') {
      setShowtoinput(false);
      setToType('email');
    } else {
      setShowtoinput(true);
      setToType('smart list');
    }
  };

  // ** User Select Options & Components
  const selectOptions = contactsStore.clientContacts.list?.map((client) => {
    return {
      value: client.email,
      label: client.fullName
    };
  });
  const SelectComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex flex-wrap align-items-center">
          {data.img && <Avatar className="my-0 me-50" size="sm" img={data.img} />}
          {data.label}
        </div>
      </components.Option>
    );
  };

  // ** CC Toggle Function
  const toggleCC = (e) => {
    e.preventDefault();
    setCCOpen(!ccOpen);
  };

  // ** BCC Toggle Function
  const toggleBCC = (e) => {
    e.preventDefault();
    setBCCOpen(!bccOpen);
  };

  // ** Toggles Compose POPUP
  const togglePopUp = (e) => {
    e.preventDefault();
    toggleCompose();
  };

  // ** Toggles Sub Modal
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);

  // ** Toggles Full Screen
  const toggleFullScreen = (e) => {
    e.preventDefault();
    setFullScreen(!fullScreen);
  };
  const [fullScreen, setFullScreen] = useState(false);

  // ** Switch To Options
  const switchToOption = (e) => setToType(e.value);
  const [toType, setToType] = useState('email');

  // ** Handle merge code
  const handleMergeCode = (code) => {
    const htmlContent = draftToHtml(convertToRaw(content.getCurrentContent()));
    const newBlock = htmlToDraft(`${htmlContent}<span> {${code}} </span>`);
    const newContent = ContentState.createFromBlockArray(newBlock.contentBlocks);

    setContent(EditorState.push(content, newContent, 'insert-characters'));
  };

  // ** Handle smartlist
  const handleSmartlist = (e) => {
    setValue(Array.isArray(e) ? e.map((x) => x.value) : '');
  };

  // ** Multi-select text input
  const createOption = (label) => ({
    label,
    value: label
  });
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState('');
  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue('');
        event.preventDefault();
    }
  };

  const initialContent = `
  <p></p>
  `;

  const contentBlock = htmlToDraft(initialContent);
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  const editorState = EditorState.createWithContent(contentState);

  const [from, setFrom] = useState('');
  const [content, setContent] = useState(editorState);
  const { mutate } = useComposeMarketingEmail();
  const [subject, setSubject] = useState('');

  useEffect(() => {
    if (metadata) {
      setValue(metadata.to);
      setFrom(metadata.from);
      setSubject(metadata.subject);
      setContent(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(htmlToDraft(metadata.message).contentBlocks)
        )
      );
      setAttachments(metadata.attachments || []);
    } else {
      setValue('');
      setFrom('');
      setSubject('');
      setContent(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(htmlToDraft(initialContent).contentBlocks)
        )
      );
    }
  }, [metadata]);

  const onSubmit = async (e, emailType) => {
    e.preventDefault();
    toggleCompose('fetchData');

    if (emailType !== 'draft') {
      if (toType === 'smart list') {
        toast.error('please select email address');
        return;
      }

      if (!value) {
        toast.error('please enter an email address');
        return;
      }

      if (!from) {
        toast.error('please enter from email address');
        return;
      }

      if (!subject) {
        toast.error('please enter subject');
        return;
      }
    }

    const payload = {
      toType,
      to: value,
      from: from,
      subject: subject,
      timestamp: new Date(startPicker).getTime(),
      scheduled: showflatpicker,
      content: draftToHtml(convertToRaw(content.getCurrentContent())),
      emailType,
      mailId: metadata?._id,
      attachments
    };
    mutate(payload);
  };

  const [isAttachmentsOpen, setIsAttachmentsOpen] = useState(false);
  const toggleAttachments = () => setIsAttachmentsOpen((prev) => !prev);
  const [attachments, setAttachments] = useState([]);

  const handleAttachment = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'general');
      useUploadDocument(formData).then((res) => {
        if (res?.success) {
          setAttachments((prev) => [...prev, res.uploadedDocuments]);
        }
      });
    };
  };

  return (
    <>
      <div className="relative">
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalBody>
              <ListGroup as="ol" flush numbered>
                {mergeCodes.map((code) => {
                  return (
                    <ListGroupItem onClick={() => handleMergeCode(code)}>{code}</ListGroupItem>
                  );
                })}
              </ListGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={isAttachmentsOpen} toggle={toggleAttachments}>
            <ModalHeader toggle={toggleAttachments}>Attch files</ModalHeader>
            <ModalBody>
              <div className="email-attachement">
                <input
                  type="file"
                  name="attach-email-item"
                  id="attach-email-item"
                  onChange={handleAttachment}
                />
              </div>
              <div className="email-attachement-list mt-1">
                {attachments.map((attachment, index) => (
                  <Row key={index}>
                    <div className="align-items-center d-flex justify-content-between">
                      <h5>{attachment.name}</h5>
                      <div className="email-attachement-actions">
                        <Trash
                          size={14}
                          onClick={() => {
                            setAttachments(
                              attachments.filter((item) => item.name !== attachment.name)
                            );
                          }}
                        />
                      </div>
                    </div>
                  </Row>
                ))}
              </div>
            </ModalBody>
            {/* <ModalFooter>
                            <Button color="secondary" onClick={toggle}>
                                Cancel
                            </Button>
                        </ModalFooter> */}
          </Modal>
        </div>

        <Modal
          scrollable
          fade={false}
          keyboard={false}
          backdrop={false}
          id="compose-mail"
          container=".content-body"
          className="modal-lg"
          isOpen={composeOpen}
          contentClassName="p-0"
          toggle={toggleCompose}
          modalClassName="modal-sticky"
        >
          <div className="modal-header">
            <h5 className="modal-title">Compose Mail</h5>
            <div className="modal-actions">
              <a href="/" className="text-body me-75" onClick={togglePopUp}>
                <Minus size={14} />
              </a>
              <a href="/" className="text-body me-75" onClick={(e) => e.preventDefault()}>
                <Maximize2 size={14} />
              </a>
              <a href="/" className="text-body" onClick={togglePopUp}>
                <X size={14} />
              </a>
            </div>
          </div>
          <ModalBody className="flex-grow-1 p-0">
            <Form className="compose-form" onSubmit={onSubmit}>
              <div>
                <Row>
                  <div className="d-flex justify-content-between">
                    <Col xl="4" className="p-2">
                      <button type="button" className="btn btn-primary rounded-0">
                        Basic
                      </button>
                      <button type="button" className="btn btn-outline-primary rounded-0" disabled>
                        Builder
                      </button>
                    </Col>
                    <Col xl="3">
                      <Flatpickr
                        required
                        id="startDate"
                        name="startDate"
                        className={`form-control m-1 ${!showflatpicker && 'd-none'}`}
                        onChange={(date) => setStartPicker(date[0])}
                        value={startPicker}
                        options={{
                          enableTime: allDay === false,
                          dateFormat: 'Y-m-d h:i K'
                        }}
                      />
                    </Col>
                    <Col
                      xl="3"
                      className="py-2 px-2"
                      style={{
                        width: 'fit-content'
                      }}
                    >
                      <FormGroup switch>
                        <Label check>Scheduled</Label>
                        <Input type="switch" checked={showflatpicker} onChange={handleSchedule} />
                      </FormGroup>
                    </Col>
                  </div>
                </Row>
                <Row className="px-1 mb-1">
                  <Col xl="4">
                    <div style={formGroupStyleOverrides}>
                      <Label for="exampleEmail" sm={2}>
                        From:
                      </Label>
                      <Col sm={10}>
                        <Input
                          id="exampleEmail"
                          name="email"
                          type="select"
                          placeholder="Select email"
                          onChange={handleToSelectEmployee}
                          value={from}
                        >
                          {contactsStore.relationshipContacts.list?.map((employee) => {
                            return (
                              <option value={employee.email.toLowerCase()}>
                                {employee.email.toLowerCase()}
                              </option>
                            );
                          })}
                        </Input>
                      </Col>
                    </div>
                  </Col>
                  <Col xl="3">
                    <Input
                      id="to-type"
                      name="select"
                      type="select"
                      onChange={handleToSelect}
                      value={toType}
                    >
                      <option value="smart list">Smart List</option>
                      <option value="email">Email</option>
                    </Input>
                  </Col>
                  <Col xl="4" className={`${showtoinput && 'd-none'}`}>
                    <div style={formGroupStyleOverrides}>
                      <Label for="exampleEmail" sm={3}>
                        To Email
                      </Label>
                      <Col sm={11}>
                        <Input
                          id="exampleEmail"
                          name="email"
                          placeholder="Recipient's email"
                          type="email"
                          onChange={(e) => setValue(e.target.value)}
                        />
                      </Col>
                    </div>
                  </Col>
                  <Col xl="4" className={`${!showtoinput && 'd-none'}`}>
                    <div className="compose-mail-form-field">
                      <Label for="email-to" className="form-label">
                        Smartlist:
                      </Label>
                      <div className="flex-grow-1">
                        <Select
                          isMulti
                          id="email-to"
                          isClearable={false}
                          theme={selectThemeColors}
                          options={selectOptions}
                          className="react-select select-borderless"
                          classNamePrefix="select"
                          components={{
                            Option: SelectComponent
                          }}
                          onChange={handleSmartlist}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="compose-mail-form-field">
                <Label for="subject" className="form-label">
                  Subject:
                </Label>
                <Input
                  id="subject"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div id="message-editor">
                <Editor
                  placeholder="Message"
                  toolbarClassName="rounded-0"
                  wrapperClassName="toolbar-bottom"
                  editorClassName="rounded-0 border-0"
                  toolbar={{
                    options: ['inline', 'textAlign'],
                    inline: {
                      inDropdown: false,
                      options: ['bold', 'italic', 'underline', 'strikethrough']
                    }
                  }}
                  onEditorStateChange={(data) => setContent(data)}
                  editorState={content}
                />
              </div>
              <div className="compose-footer-wrapper">
                <div className="btn-wrapper d-flex align-items-center">
                  <UncontrolledButtonDropdown direction="up" className="me-1">
                    <Button color="primary" type="submit">
                      Send
                    </Button>
                    <DropdownToggle
                      className="dropdown-toggle-split"
                      color="primary"
                      caret
                    ></DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem
                        href="/"
                        tag="button"
                        onClick={(e) => {
                          onSubmit(e, 'draft');
                        }}
                        name="save-draft"
                      >
                        Save Draft
                      </DropdownItem>
                      <DropdownItem href="/" tag="a" onClick={togglePopUp}>
                        Save Template
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                  <div className="email-attachement">
                    {/* <Label
                                            className="mb-0"
                                            for="attach-email-item"
                                        > */}
                    <Paperclip
                      className="cursor-pointer ms-50"
                      size={18}
                      onClick={toggleAttachments}
                    />
                    {/* <input
                                                type="file"
                                                name="attach-email-item"
                                                id="attach-email-item"
                                                hidden
                                                onChange={handleAttachment}
                                            /> */}
                    {/* </Label> */}
                  </div>
                  <div>
                    <TbArrowMerge className="cursor-pointer ms-50" onClick={toggle} size={18} />
                  </div>
                </div>
                <div className="footer-action d-flex align-items-center">
                  <UncontrolledDropdown className="me-50" direction="up">
                    <DropdownToggle tag="span">
                      <MoreVertical className="cursor-pointer" size={18} />
                    </DropdownToggle>
                    <DropdownMenu end>
                      <DropdownItem href="/" tag="a" onClick={(e) => e.preventDefault()}>
                        Add Label
                      </DropdownItem>
                      <DropdownItem href="/" tag="a" onClick={(e) => e.preventDefault()}>
                        Plain text mode
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem href="/" tag="a" onClick={(e) => e.preventDefault()}>
                        Print
                      </DropdownItem>
                      <DropdownItem href="/" tag="a" onClick={(e) => e.preventDefault()}>
                        Check Spelling
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <Trash className="cursor-pointer" size={18} onClick={toggleCompose} />
                </div>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default ComposePopup;
