import React, { useState } from 'react';
import Sidebar from '@components/sidebar';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, FormFeedback, Label } from 'reactstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addLocation } from '../../requests/location/LocationAPI';
import { fetchUsersdata } from '../../requests/users/UsersAPI';

let schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  country: yup.string().required(),
  zipCode: yup.string().required()
});
const initialValues = {
  name: '',
  email: '',
  phone: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  operator: ''
};

export const AddNewLocation = ({ locationPopup, setLocationPopup }) => {
  const { data } = fetchUsersdata();
  const toggleSidebar = () => setLocationPopup(!locationPopup);
  const [selectedOption, setSelectedOption] = useState('');
  const [formValue, setFormValue] = useState();
  const textFileds = [
    {
      type: 'text',
      label: 'Name',
      placeholder: 'John Doe',
      name: 'name',
      required: true
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      placeholder: 'john.doe@example.com',
      required: true
    },
    {
      label: 'Phone',
      type: 'number',
      name: 'phone',
      placeholder: '(379) 294-5153',
      required: true,
      md: '3'
    },
    {
      label: 'City',
      type: 'text',
      name: 'city',
      placeholder: 'city',
      required: true,
      md: '3'
    },
    {
      label: 'State',
      type: 'text',
      name: 'state',
      placeholder: 'state',
      required: true,
      md: '4'
    },
    {
      label: 'Country',
      type: 'text',
      name: 'country',
      placeholder: 'country',
      required: true,
      md: '3'
    },
    {
      label: 'ZipCode',
      type: 'text',
      name: 'zipCode',
      placeholder: 'zipCode',
      required: true,
      md: '4'
    }
  ];

  const {
    watch,
    control,
    getValues,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: 'all',
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  });
  watch(() => {
    setFormValue(getValues());
  });

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        state: data.state
      },
      phone: data.phone,
      email: data.email,
      mainOperatorId: selectedOption
    };
    await addLocation(payload);
    setLocationPopup(!locationPopup);
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <Sidebar
        size="lg"
        open={locationPopup}
        title="New Location"
        headerClassName="mb-1"
        contentClassName="pt-0"
        toggleSidebar={toggleSidebar}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          {textFileds?.map((textData, i) => {
            return (
              <Controller
                key={i}
                name={textData.name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <div className="mb-1">
                      <Label className="form-label" for="fullName">
                        {textData.label}
                        {textData.required && <span className="text-danger"> *</span>}
                      </Label>
                      <Input
                        type={textData.type}
                        name={textData.name}
                        placeholder={textData.placeholder}
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        invalid={!!errors[textData.name] && textData.required}
                      />
                      <FormFeedback>
                        {errors[textData.name] ? errors[textData.name].message : null}
                      </FormFeedback>
                    </div>
                  );
                }}
              />
            );
          })}
          <div className="mb-1">
            <Label className="form-label" for="fullName">
              Operator
            </Label>
            <Input type="select" name="select" value={selectedOption} onChange={handleSelectChange}>
              <option>Select...</option>
              {data?.map((item) =>
                item.locations.map((id) => (
                  <option value={id.mainOperatorId}>{item.firstName}</option>
                ))
              )}
            </Input>
          </div>
          <Button type="submit" className="me-1" color="primary">
            Submit
          </Button>
          <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
            Cancel
          </Button>
        </Form>
      </Sidebar>
    </>
  );
};
