import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

import NewProgressionWizard from './NewProgressionWizard';

const AddProgression = (props) => {
  const {
    openAddProgression,
    setOpenAddProgression,
    // categoryNames,
    // divisionNames,
    eventId,
    sportId,
    progressionSearchDataRefresh
  } = props;

  return (
    <Modal
      isOpen={openAddProgression}
      toggle={() => setOpenAddProgression(false)}
      className="modal-dialog-centered"
      size="lg"
      style={{ maxWidth: '1200px', width: '100%' }}
    >
      <ModalHeader toggle={() => setOpenAddProgression(false)}>Add Progression</ModalHeader>
      <ModalBody>
        <NewProgressionWizard
          setOpenAddProgression={setOpenAddProgression}
          eventId={eventId}
          sportId={sportId}
          progressionSearchDataRefresh={progressionSearchDataRefresh}
        />
      </ModalBody>
    </Modal>
  );
};
export default AddProgression;
