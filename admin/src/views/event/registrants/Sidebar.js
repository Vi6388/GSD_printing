// ** React Import
import { useMemo, useState, useEffect } from 'react';

// ** Custom Components
import Sidebar from '@components/sidebar';

import EntryFormModal from '../EventEnter/members/EntryFormModal';
import RegisterEvent from './RegisterEvent';
import { Button } from 'reactstrap';

const SidebarNewUsers = ({ open, toggleSidebar, event, registrantData, refetchRegistrantData }) => {
  // ** State
  const [entryModal, setEntryModal] = useState(false);
  const [registrantType, setRegistrantType] = useState('');
  // ** handlers
  const toggle = () => {
    setEntryModal(!entryModal);
  };
  return (
    <Sidebar
      size="lg"
      open={open}
      title="New Registrant"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <RegisterEvent
        event={event}
        registrantData={registrantData}
        setRegistrantType={setRegistrantType}
        toggle={toggle}
      />
      <EntryFormModal
        entryModal={entryModal}
        registrantType={registrantType}
        setEntryModal={setEntryModal}
        toggleEntryModal={toggle}
        event={event}
        refetchRegistrantData={refetchRegistrantData}
      />
      <Button style={{ width: '100%' }} color="secondary" outline onClick={toggleSidebar}>
        Cancel
      </Button>
    </Sidebar>
  );
};

export default SidebarNewUsers;
