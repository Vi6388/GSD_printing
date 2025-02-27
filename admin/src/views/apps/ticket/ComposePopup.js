// ** React Imports
import { useState } from 'react';
import Flatpickr from 'react-flatpickr';

import { IoGitMergeOutline } from 'react-icons/io5';
import { ModalHeader, ModalFooter } from 'reactstrap';

// ** Custom Components
import Avatar from '@components/avatar';
import { Col, Row } from 'reactstrap';

// ** Third Party Components
import { Editor } from 'react-draft-wysiwyg';
import Select, { components } from 'react-select';
import { Minus, X, Maximize2, Paperclip, MoreVertical, Trash } from 'react-feather';

// ** Reactstrap Imports
import {
  Form,
  Modal,
  Button,
  ModalBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
  Label,
  Input,
  FormGroup
} from 'reactstrap';

// ** Utils
import { selectThemeColors } from '@utils';

// ** User Avatars
import img1 from '@src/assets/images/portrait/small/avatar-s-3.jpg';
import img2 from '@src/assets/images/portrait/small/avatar-s-1.jpg';
import img3 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
import img4 from '@src/assets/images/portrait/small/avatar-s-6.jpg';
import img5 from '@src/assets/images/portrait/small/avatar-s-2.jpg';
import img6 from '@src/assets/images/portrait/small/avatar-s-11.jpg';

// ** Styles
import '@styles/react/libs/editor/editor.scss';

import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

const ComposePopup = (props) => {
  // ** Props & Custom Hooks
  const { composeOpen, toggleCompose } = props;

  // ** States
  const [ccOpen, setCCOpen] = useState(false);
  const [bccOpen, setBCCOpen] = useState(false);
  const [startPicker, setStartPicker] = useState(new Date());
  const [allDay, setAllDay] = useState(false);

  // ** User Select Options & Components
  const selectOptions = [
    { value: 'pheobe', label: 'Pheobe Buffay', img: img1 },
    { value: 'chandler', label: 'Chandler Bing', img: img2 },
    { value: 'ross', label: 'Ross Geller', img: img3 },
    { value: 'monica', label: 'Monica Geller', img: img4 },
    { value: 'joey', label: 'Joey Tribbiani', img: img5 },
    { value: 'Rachel', label: 'Rachel Green', img: img6 }
  ];
  const toOptions = [
    { value: 'smart list', label: 'smart List' },
    { value: 'email', label: 'to email' }
  ];

  const SelectComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex flex-wrap align-items-center">
          <Avatar className="my-0 me-50" size="sm" img={data.img} />
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
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          {/* <ModalHeader toggle={toggle}>Modal title</ModalHeader> */}
          <ModalBody>dsfads</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
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
          <Form className="compose-form" onSubmit={(e) => e.preventDefault()}>
            {/* <div className="p-2"> 
          <button type="button" class="btn btn-primary ">Primary</button>
    <button type="button" class="btn btn-outline-primary " disabled>Primary button</button>
 
          </div> */}

            <div>
              <Row>
                <Col xl="12" className="p-2">
                  <button type="button" class="btn btn-primary rounded-0">
                    Basic
                  </button>
                  <button type="button" class="btn btn-outline-primary rounded-0" disabled>
                    Builder
                  </button>
                </Col>
                <Col xl="4">
                  {' '}
                  <div className="compose-mail-form-field">
                    <Label for="email-to" className="form-label">
                      From:
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
                        components={{ Option: SelectComponent }}
                      />
                    </div>
                  </div>
                </Col>
                <Col xl="4">
                  {' '}
                  <div className="compose-mail-form-field">
                    <Label for="email-to" className="form-label">
                      To:
                    </Label>
                    <div className="flex-grow-1">
                      <Select
                        id="email-to"
                        isClearable={false}
                        theme={selectThemeColors}
                        options={toOptions}
                        className="react-select select-borderless"
                        classNamePrefix="select"
                        components={{ Option: SelectComponent }}
                      />
                    </div>
                  </div>
                </Col>
                <Col xl="4">
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
                        components={{ Option: SelectComponent }}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            {/* {ccOpen === true ? (
            <div className='compose-mail-form-field cc-wrapper'>
              <Label for='email-cc' className='form-label'>
                Cc:
              </Label>
              <div className='flex-grow-1'>
                <Select
                  isMulti
                  id='email-cc'
                  isClearable={false}
                  theme={selectThemeColors}
                  options={selectOptions}
                  className='react-select select-borderless'
                  classNamePrefix='select'
                  components={{ Option: SelectComponent }}
                />
              </div>
              <div>
                <a href='/' className='toggle-cc text-body' onClick={toggleCC}>
                  <X size={14} />
                </a>
              </div>
            </div>
          ) : null} */}
            {/* {bccOpen === true ? (
            <div className='compose-mail-form-field cc-wrapper'>
              <Label for='email-bcc' className='form-label'>
                Bcc:
              </Label>
              <div className='flex-grow-1'>
                <Select
                  isMulti
                  id='email-bcc'
                  isClearable={false}
                  theme={selectThemeColors}
                  options={selectOptions}
                  className='react-select select-borderless'
                  classNamePrefix='select'
                  components={{ Option: SelectComponent }}
                />
              </div>
              <div>
                <a href='/' className='toggle-cc text-body' onClick={toggleBCC}>
                  <X size={14} />
                </a>
              </div>
            </div>
          ) : null} */}
            <div className="compose-mail-form-field">
              <Label for="email-subject" className="form-label">
                Subject:
              </Label>
              <Input id="email-subject" placeholder="Subject" />
            </div>
            <div className="p-2">
              <Row>
                <Col xl="2">
                  {' '}
                  <IoGitMergeOutline onClick={toggle} className="cursor-pointer" size={20} />
                </Col>
                <Col xl="1" className="mx-1">
                  <p class="fs-4 ">
                    {' '}
                    <Label className="form-label" for="startDate">
                      Scheduled
                    </Label>
                  </p>
                </Col>
                <Col xl="3">
                  <Flatpickr
                    required
                    id="startDate"
                    name="startDate"
                    className="form-control"
                    onChange={(date) => setStartPicker(date[0])}
                    value={startPicker}
                    options={{
                      enableTime: allDay === false,
                      dateFormat: 'Y-m-d H:i'
                    }}
                  />
                </Col>
              </Row>
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
              />
            </div>
            <div className="compose-footer-wrapper">
              <div className="btn-wrapper d-flex align-items-center">
                <UncontrolledButtonDropdown direction="up" className="me-1">
                  <Button color="primary" onClick={toggleCompose}>
                    Send
                  </Button>
                  <DropdownToggle
                    className="dropdown-toggle-split"
                    color="primary"
                    caret
                  ></DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem href="/" tag="a" onClick={togglePopUp}>
                      Schedule Send
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
                <div className="email-attachement">
                  <Label className="mb-0" for="attach-email-item">
                    <Paperclip className="cursor-pointer ms-50" size={18} />
                    <input type="file" name="attach-email-item" id="attach-email-item" hidden />
                  </Label>
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
    </>
  );
};

export default ComposePopup;
