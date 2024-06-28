import React from 'react';
import { Col, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import moment from 'moment';
import Avatar from '@components/avatar';

export const DetailsMember = ({ centeredModal, setCenteredModal, data, selectedUser }) => {
  const textFileds = [
    {
      data: `${selectedUser?.title}  ${selectedUser?.firstName} ${selectedUser?.middleName} ${selectedUser?.lastName}`,
      secoundaryData: `${selectedUser?.contact?.email}`
    },
    {
      data: `${selectedUser?.contact?.primary} ${selectedUser?.contact?.secondary}`,
      label: 'Phone Number :-'
    },
    {
      data: `${selectedUser?.address?.street} ${selectedUser?.address?.city} ${selectedUser?.address?.state} ${selectedUser?.address?.country} ${selectedUser?.address?.zipCode} `,
      label: 'Address :-'
    },
    {
      data: moment(selectedUser?.dateOfBirth).format('L'),
      label: 'Date Of Birth :-'
    },
    {
      data: selectedUser?.nationality,
      label: 'Nationality :-'
    },
    {
      data: selectedUser?.gender,
      label: 'Gender :-'
    },
    {
      data: `${selectedUser?.height?.value}  ${selectedUser?.height?.unit}`,
      label: 'Height :-'
    },

    {
      data: `${selectedUser?.weight?.value}  ${selectedUser?.weight?.unit}`,
      label: 'Weight Value :-'
    },

    {
      data: selectedUser?.differentlyAbled,
      label: 'Differently Abled :-'
    },
    {
      data: selectedUser?.medicalCondition,
      label: 'Medical Details :-'
    },
    {
      data: selectedUser?.shareDisability === false ? 'No' : 'Yes',
      label: 'Share Disability :-'
    },
    {
      data: selectedUser?.dominantHand,
      label: 'Dominant Hand :-'
    },
    {
      data:
        selectedUser?.specialDiet === false
          ? 'No'
          : selectedUser?.specialDiet === true
          ? 'Yes'
          : 'Rather not say',
      label: 'Special Diet :-'
    },
    {
      data: selectedUser?.communicationType,
      label: 'Communication Type :-'
    }
  ];
  return (
    <div className="vertically-centered-modal">
      <Modal
        isOpen={centeredModal}
        toggle={() => setCenteredModal(!centeredModal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
          Client Information
        </ModalHeader>
        <ModalBody>
          <div>
            <Row>
              <h4 className="fw-bolder border-bottom pb-50 mb-1">User Info</h4>
              <Col className="mb-2 d-flex ">
                <Avatar img={selectedUser?.profilePhoto} imgHeight="40" imgWidth="40" />
              </Col>
              {textFileds.map((data) => (
                <>
                  {data.label ? (
                    <Col md="5" className="mb-1">
                      <Label className="form-label mr-3" for="StaticInput">
                        {data.label}
                      </Label>
                    </Col>
                  ) : null}
                  <Col md="7" className="mb-1">
                    <Label className="form-label" for="StaticInput">
                      {data.data}
                    </Label>
                    {data.secoundaryData ? (
                      <>
                        <br />
                        {data?.secoundaryData}
                      </>
                    ) : null}
                  </Col>
                </>
              ))}
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
