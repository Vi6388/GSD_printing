/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Edit } from 'react-feather';
import { FormGroup, Label, Input, Button, Form } from 'reactstrap';
import Sidebar from '@components/sidebar';
import Select from 'react-select';
import { selectThemeColors } from '../../../../utility/Utils';

const roleOptions = [
  { value: 'Debit Card', label: 'Debit Card' },
  { value: 'Credit Card', label: 'Credit Card' },
  { value: 'Paypal', label: 'Paypal' },
  { value: 'Internet Banking', label: 'Internet Banking' },
  { value: 'UPI Transfer', label: 'UPI Transfer' }
];
export const Edituser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <Button className="mb-75" onClick={handleIsOpen} color="primary" block outline>
        Edit settings
      </Button>
      <Sidebar
        size="lg"
        open={isOpen}
        title="Edit"
        headerClassName="mb-1"
        contentClassName="p-0"
        toggleSidebar={handleIsOpen}
      >
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label className="fw-bold">logo</Label>
            <Input placeholder="image" name="logo" type="file" />
          </FormGroup>
          <FormGroup>
            <Label className="fw-bold">Address</Label>
            <Input name="address" placeholder="Address" type="text" />
          </FormGroup>
          <FormGroup>
            <Label className="fw-bold">Phone</Label>
            <Input name="phone" placeholder='"Number' type="number" />
          </FormGroup>
          <div className="border-bottom" />
          <div className="p-1">
            <h5>Edit Payment Details</h5>
          </div>
          <div className="border-bottom mb-1" />
          <FormGroup>
            <Label className="fw-bold">Select Payment Details</Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              className="react-select"
              classNamePrefix="select"
              options={roleOptions}
              onChange={(data) => {}}
            />
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button className="m-1" color="primary">
              Save
            </Button>
            <Button className="m-1" outline>
              Cancel
            </Button>
          </div>
        </Form>
      </Sidebar>
    </div>
  );
};
