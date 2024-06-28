import React from 'react';
import { Col, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { fetchUserById } from '../../../requests/users/UsersAPI';

export const UsersDetails = ({ centeredModal, setCenteredModal, id }) => {
  const { data: users } = fetchUserById(id);

  const textFileds = [
    {
      label: 'Name',
      data: ` ${users?.firstName} ${users?.lastName}`
    },
    {
      data: `${users?.login?.email}`,
      label: 'Email :-'
    },
    {
      data: `${users?.position}`,
      label: 'Position :-'
    },

    {
      data: `${users?.login?.phone}`,
      label: 'Phone Number :-'
    },
    {
      data: `${users?.address?.street} ${users?.address?.city} ${users?.address?.state} ${users?.address?.country} ${users?.address?.zipCode} `,
      label: 'Address :-'
    },
    {
      data: `${users?.company}`,
      label: 'Company :-'
    },
    {
      data: `${users?.currency}`,
      label: 'Currency :-'
    },
    {
      data: `${users?.language}`,
      label: 'Language :-'
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
