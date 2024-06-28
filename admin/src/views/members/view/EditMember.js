import React, { useEffect, useState } from 'react';
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
import { fetchMemberById, updateMember } from '../../../requests/member/GetMembers';
import Avatar from '@components/avatar';
import { fetchLocationdata } from '../../../requests/location/LocationAPI';

let schema = yup.object({});
const initialValues = {
  title: '',
  name: '',
  last: '',
  middle: '',
  location: ''
};
export const EditMember = ({ show, setShow, id }) => {
  const { data: client } = fetchMemberById(id);
  const locationOption = fetchLocationdata()?.data?.map((dataItem) => {
    return { value: dataItem._id, label: dataItem.name };
  });
  const [previewImage, setPreviewImage] = useState(client?.profilePhoto);
  const textFileds = [
    {
      type: 'select',
      label: 'Title',
      name: 'title',
      required: true,
      options: [
        { label: 'Select Title', value: '', disabled: true },
        { label: 'Mr.', value: 'mr' },
        { label: 'Mrs', value: 'mrs' },
        { label: 'Miss', value: 'miss' },
        { label: 'Ms.', value: 'ms' }
      ]
    },
    {
      type: 'text',
      label: 'First Name',
      placeholder: 'First name',
      name: 'name',
      required: true
    },
    {
      type: 'text',
      label: 'Middle Name',
      name: 'middle',
      placeholder: 'Middle name',
      required: false
    },
    {
      type: 'text',
      label: 'Last Name',
      name: 'last',
      placeholder: 'Last name',
      required: true
    },
    ,
    {
      type: 'select',
      label: 'Location',
      name: 'location',
      required: true,
      options: [
        { label: 'Select Location', value: '', disabled: true },
        ...(locationOption ? locationOption : [])
      ]
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
      label: 'Primary Number',
      placeholder: 'Primary Number',
      name: 'primaryNumber',
      required: true
    },
    {
      type: 'number',
      label: 'Secondary Number',
      name: 'secondaryNumber',
      placeholder: 'Secondary Number',
      required: false
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
    },

    {
      type: 'date',
      label: 'Date Of Birth',
      name: 'dob',
      required: true
    },
    {
      type: 'select',
      label: 'Nationality',
      name: 'nationality',
      required: true,
      options: [
        { label: 'Select Country', value: '' },
        { label: 'India', value: 'india' },
        { label: 'USA', value: 'usa' }
      ]
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
      md: 4,
      label: 'Height Value',
      type: 'number',
      name: 'heightValue',
      placeholder: 'Height Value',
      required: true
    },
    {
      md: 2,
      type: 'select',
      label: 'Type',
      name: 'heightUnit',
      required: true,
      options: [
        { label: 'Cm.', value: 'centimeters' },
        { label: 'Feet', value: 'feet' }
      ]
    },
    {
      md: 4,
      label: 'Weight Value',
      type: 'number',
      name: 'weightValue',
      placeholder: 'Weight Value',
      required: true
    },
    {
      md: 2,
      type: 'select',
      label: 'Type',
      name: 'weightUnit',
      required: true,
      options: [
        { label: 'lbs.', value: 'pounds' },
        { label: 'kg.', value: 'kilograms' }
      ]
    },

    {
      type: 'radio',
      label: 'Differently Abled',
      name: 'differentlyAbled',
      required: true,
      options: [
        {
          md: 3,
          type: 'radio',
          name: 'differentlyAbled',
          label: 'Yes',
          checked: 'yes',
          value: 'yes'
        },
        {
          md: 3,
          type: 'radio',
          name: 'differentlyAbled',
          label: 'No',
          checked: 'no',
          value: 'no'
        },
        {
          md: 6,
          type: 'radio',
          name: 'differentlyAbled',
          label: 'Rather not say',
          checked: 'rather_not_say',
          value: 'rather_not_say'
        }
      ]
    },

    {
      type: 'radio',
      label: 'Medical Details',
      name: 'medicalCondition',
      required: true,
      options: [
        {
          type: 'radio',
          name: 'medicalCondition',
          label: 'Yes',
          checked: 'yes',
          value: 'yes'
        },
        {
          type: 'radio',
          name: 'medicalCondition',
          label: 'No',
          checked: 'no',
          value: 'no'
        },
        {
          type: 'radio',
          name: 'medicalCondition',
          label: 'Rather not say',
          checked: 'rather_not_say',
          value: 'rather_not_say'
        }
      ]
    },
    {
      type: 'radio',
      label: 'Share Disability',
      name: 'shareDisability',
      required: true,
      options: [
        {
          type: 'radio',
          name: 'shareDisability',
          label: 'Yes',
          checked: 'yes',
          value: 'yes'
        },
        {
          type: 'radio',
          name: 'shareDisability',
          label: 'No',
          checked: 'no',
          value: 'no',
          marginLeft: '1px'
        }
      ]
    },
    {
      type: 'radio',
      label: 'Dominant Hand',
      name: 'dominantHand',
      required: true,
      options: [
        {
          type: 'radio',
          name: 'dominantHand',
          label: 'Left',
          checked: 'left',
          value: 'left'
        },
        {
          type: 'radio',
          name: 'dominantHand',
          label: 'Right',
          checked: 'right',
          value: 'right',
          marginLeft: '1px'
        }
      ]
    },
    {
      type: 'radio',
      label: 'Special Diet',
      name: 'specialDiet',
      required: true,
      options: [
        {
          type: 'radio',
          name: 'specialDiet',
          label: 'Yes',
          checked: 'yes',
          value: 'yes'
        },
        {
          type: 'radio',
          name: 'specialDiet',
          label: 'No',
          checked: 'no',
          value: 'no'
        },
        {
          type: 'radio',
          name: 'specialDiet',
          label: 'Rather not say',
          checked: 'rather_not_say',
          value: 'rather_not_say'
        }
      ]
    },
    {
      type: 'radio',
      label: 'Communication Type',
      name: 'communicationType',
      required: false,
      defaultValue: 'email',
      options: [
        {
          type: 'radio',
          name: 'communicationType',
          required: false,
          label: 'Call',
          checked: 'call',
          value: 'call'
        },
        {
          type: 'radio',
          name: 'communicationType',
          required: false,
          label: 'SMS',
          checked: 'sms',
          value: 'sms'
        },
        {
          type: 'radio',
          name: 'communicationType',
          required: false,
          label: 'Email',
          checked: 'email',
          value: 'email'
        }
      ]
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
      title: client?.title,
      name: client?.firstName,
      middle: client?.middleName,
      last: client?.lastName,
      location: client?.locationId,
      primaryNumber: client?.contact?.primary,
      secondaryNumber: client?.contact?.secondary,
      email: client?.contact?.email,
      street: client?.address?.street,
      city: client?.address?.city,
      state: client?.address?.state,
      country: client?.address?.country,
      zipCode: client?.address?.zipCode,
      communicationType: client?.communicationType,

      dob: client?.dateOfBirth,
      nationality: client?.nationality,
      gender: client?.gender,
      differentlyAbled: client?.differentlyAbled,
      medicalCondition: client?.medicalCondition,
      shareDisability: client?.shareDisability === false ? 'no' : 'yes',
      dominantHand: client?.dominantHand,
      specialDiet:
        client?.specialDiet === false
          ? 'no'
          : client?.specialDiet === true
          ? 'yes'
          : 'rather_not_say',
      heightUnit: client?.height?.unit,
      heightValue: client?.height?.value,
      weightUnit: client?.weight?.unit,
      weightValue: client?.weight?.value
    });
  }, [client]);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };
  const onSubmit = async (data) => {
    const payload = {
      title: data.title,
      firstName: data.name,
      middleName: data.middle,
      lastName: data.last,
      locationId: data.location,
      profilePhoto: previewImage,
      contact: {
        primary: data.primaryNumber,
        secondary: data.secondaryNumber,
        email: data.email
      },
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode
      },
      communicationType: data.communicationType,

      dateOfBirth: data.dob,
      nationality: data.nationality,
      gender: data.gender,
      differentlyAbled: data.differentlyAbled,
      medicalCondition: data.medicalCondition,
      shareDisability: data.shareDisability,
      dominantHand: data.dominantHand,
      specialDiet: data.specialDiet,
      height: {
        unit: data.heightUnit,
        value: data.heightValue
      },
      weight: {
        unit: data.weightUnit,
        value: data.weightValue
      }
    };
    await updateMember(id, payload);
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
            <Col md={12} xs={12} className="mb-2 ">
              <Label className="form-label" for="fullname">
                Picture
              </Label>
              <Col xs={12} className="mb-2 d-flex ">
                {previewImage && <Avatar img={previewImage} imgHeight="40" imgWidth="40" />}
                <Input
                  type="file"
                  accept="image/*"
                  style={{ marginLeft: '8px' }}
                  onChange={handleImageSelect}
                />
              </Col>
            </Col>

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
                                    <option
                                      name={data.name}
                                      disabled={option.disabled || false}
                                      key={i}
                                      value={option.value}
                                    >
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
