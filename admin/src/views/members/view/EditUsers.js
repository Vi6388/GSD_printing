import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import {
  Button,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from 'reactstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchUserById, updateUser } from '../../../requests/users/UsersAPI';

let schema = yup.object({});
const initialValues = {
  title: '',
  name: '',
  last: '',
  middle: ''
};
export const EditUsers = ({ show, setShow, id }) => {
  const { data: client } = fetchUserById(id);

  const textFileds = [
    {
      type: 'text',
      label: 'First Name',
      placeholder: 'First name',
      name: 'firstName',
      required: true
    },

    {
      type: 'text',
      label: 'Last Name',
      name: 'lastName',
      placeholder: 'Last name',
      required: true
    },
    {
      type: 'text',
      label: 'Email',
      placeholder: 'Email',
      name: 'email',
      required: true
    },
    {
      type: 'number',
      label: 'Phone Number',
      placeholder: 'Phone Number',
      name: 'PhoneNumber',
      required: true
    },
    {
      type: 'text',
      label: 'Position',
      name: 'position',
      placeholder: 'Position',
      required: true
    },

    {
      type: 'text',
      label: 'Company',
      name: 'company',
      placeholder: 'Company',
      required: true
    },
    {
      type: 'text',
      label: 'Currency',
      name: 'currency',
      placeholder: 'Currency',
      required: true
    },
    {
      type: 'text',
      label: 'Language',
      name: 'language',
      placeholder: 'Language',
      required: true
    },

    {
      type: 'select',
      label: 'Gender',
      name: 'gender',
      required: true,
      options: [
        {
          label: 'Male',
          value: 'male'
        },
        {
          label: 'Female',
          value: 'female'
        },
        {
          label: 'Other',
          value: 'other'
        }
      ]
    },

    {
      label: 'Street',
      type: 'text',
      name: 'street',
      placeholder: 'Street',
      required: true
    },
    {
      label: 'City',
      type: 'text',
      name: 'city',
      placeholder: 'City',
      required: true
    },
    {
      label: 'State',
      type: 'text',
      name: 'state',
      placeholder: 'State',
      required: true
    },
    {
      label: 'Country',
      marginLeft: '310px',
      type: 'select',
      name: 'country',
      placeholder: 'Country',
      required: true,
      options: [
        { label: 'Select Country', value: '' },
        { label: 'USA', value: 'usa' },
        { label: 'India', value: 'india' },
        { label: 'Maxico', value: 'maxico' }
      ]
    },
    {
      label: 'Zip Code',
      type: 'text',
      name: 'zipCode',
      placeholder: 'ZipCode',
      required: true
    }
  ];

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm({
    mode: 'all',
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    reset({
      firstName: client?.firstName,
      lastName: client?.lastName,
      phoneNumber: client?.login?.phone,
      position: client?.position,
      email: client?.login?.email,
      street: client?.address?.street,
      city: client?.address?.city,
      state: client?.address?.state,
      country: client?.address?.country,
      zipCode: client?.address?.zipCode,
      company: client?.company,
      currency: client?.currency,
      language: client?.language
    });
  }, [client]);

  const onSubmit = async (data) => {
    const payload = {
      firstName: data.name,
      lastName: data.last,
      login: {
        phone: data.phoneNumber,
        email: data.email
      },
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode
      },
      gender: data.gender,
      company: data.company,
      currency: data.currency,
      language: data.language
    };
    await updateUser(id, payload);
    setShow(false);
  };

  return (
    <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg">
      <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}></ModalHeader>
      <ModalBody className="px-sm-5 pt-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">Edit Client Information</h1>
          <p>Updating client details will receive a privacy audit.</p>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <h4 className="fw-bolder border-bottom pb-50 mb-1">User Info</h4>

            {textFileds?.map((data, i) => {
              return (
                <Controller
                  key={i}
                  name={data.name}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <>
                        <Col md={data?.md ? data?.md : 6} xs={12} className="mb-2">
                          {data.label ? (
                            <Label className="form-label" for="fullname">
                              {data.label}
                            </Label>
                          ) : null}
                          {data.type === 'radio' ? (
                            data?.options.map((data, i) => (
                              <div>
                                <Col style={{ float: 'left' }}>
                                  <Input
                                    type="radio"
                                    defaultValue={data.defaultValue}
                                    name={data.name}
                                    value={data.value}
                                    onChange={(event) => onChange(event)}
                                    checked={value === data.value}
                                  />
                                  <Label
                                    style={{
                                      paddingLeft: '5px',
                                      paddingRight: '35px'
                                    }}
                                    className="form-label"
                                    for="fullname"
                                    check
                                  >
                                    {data.label}
                                  </Label>
                                </Col>
                              </div>
                            ))
                          ) : (
                            <>
                              <Input
                                type={data.type}
                                name={data.name}
                                placeholder={data?.placeholder}
                                value={value}
                                onBlur={onBlur}
                                onChange={(event) => onChange(event)}
                                invalid={!!errors[data.name] && data.required}
                              >
                                {data?.options?.map((option, i) => {
                                  return (
                                    <option name="title" key={i} value={option.value}>
                                      {option.label}
                                    </option>
                                  );
                                })}
                              </Input>
                              <FormFeedback>
                                {errors[data.name] ? errors[data.name].message : null}
                              </FormFeedback>
                            </>
                          )}
                        </Col>
                      </>
                    );
                  }}
                />
              );
            })}
          </Row>
          <Col xs={12} className="text-center mt-2 pt-50">
            <Button className="me-1" color="primary" type="submit">
              Submit
            </Button>
            <Button
              type="reset"
              color="secondary"
              outline
              onClick={() => {
                setShow(false);
              }}
            >
              Discard
            </Button>
          </Col>
        </Form>
      </ModalBody>
    </Modal>
  );
};
