import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Table,
  Form,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';

import { toast } from 'react-toastify';
import WizardModernHorizontal from './WizardModernHorizontal';

const EntryFormModal = ({
  entryModal,
  setEntryModal,
  toggleEntryModal,
  selectMemberData,
  registrantType,
  refetchRegistrantData
}) => {
  // ** States
  const [active, setActive] = useState('1');

  // ** Redux Store
  const event = useSelector((state) => state.eventMain.eventListingDataById);

  // ** Handlers
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form>
      <Modal isOpen={entryModal} toggle={toggleEntryModal} size="lg" centered>
        <ModalHeader toggle={toggleEntryModal}>Entry Form</ModalHeader>
        <ModalBody>
          <h2 className="text-center font-medium-4 bg-primary p-50 text-white rounded-3">
            {event?.eventName}
          </h2>
          <WizardModernHorizontal
            toggle={toggleEntryModal}
            event={event}
            selectMemberData={selectMemberData}
            registrantType={registrantType}
            refetchRegistrantData={refetchRegistrantData}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleEntryModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </form>
  );
};

export default EntryFormModal;
