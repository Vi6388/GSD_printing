import React, { useEffect, useState } from 'react';
import Sidebar from '@components/sidebar';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, FormFeedback, Label, Col, Row } from 'reactstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addMemberShip,
  editMemberShip,
  memberShipById
} from '../../requests/memberships/membershipAPI';
import { fetchLocationdata } from '../../requests/location/LocationAPI';

let schema = yup.object({
  name: yup.string().required()
});
const initialValues = {
  name: '',
  location: '',
  cost: '',
  renewaltype: '',
  renewalduration: '',
  ageFrom: '',
  ageTo: '',
  heightUnit: '',
  heightFrom: '',
  heightTo: '',
  weightUnit: '',
  weightFrom: '',
  weightTo: '',
  rankFrom: '',
  rankTo: '',
  gender: ''
};
export const AddNewMemberShip = ({
  membershipPopup,
  setMembershipPopup,
  selectedId,
  showModal,
  setShowModal,
  setShowMembershipData
}) => {
  const { data } = fetchLocationdata();
  const toggleSidebar = () => {
    membershipPopup === undefined ? setShowModal(!showModal) : setMembershipPopup(!membershipPopup);
  };
  const { data: datamember } = memberShipById(selectedId);

  const [gender, setGender] = useState('male');
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
      label: 'Location',
      type: 'select',
      name: 'location'
    },
    {
      label: 'Cost',
      type: 'number',
      name: 'cost',
      placeholder: '$1',
      required: true,
      md: '12'
    },
    {
      label: 'Plan Name',
      type: 'text',
      name: 'planname',
      placeholder: 'Plan Name',
      required: true,
      md: '12'
    },
    {
      label: 'Length Of Time',
      type: 'select',
      name: 'lengthoftime',
      required: true,
      options: [
        { label: '1 year', value: 'oneyear' },
        { label: '2 year', value: 'twoyear' },
        { label: '3 year', value: 'threeyear' },
        { label: '4 year', value: 'fouryear' },
        { label: '5 year', value: 'fiveyear' },
        { label: 'Life time', value: 'lifetime' }
      ]
    },
    {
      label: 'Renewal Period',
      type: 'select',
      name: 'renewaltype',
      md: '6',
      options: [
        { label: 'Days', value: 'days' },
        { label: 'Weeks', value: 'weeks' },
        { label: 'Months', value: 'months' },
        { label: 'years', value: 'years' }
      ]
    },
    {
      type: 'text',
      name: 'renewalduration',
      placeholder: 'Renewal Duration',
      required: true,
      md: '6'
    },

    {
      label: 'Age',
      type: 'text',
      name: 'ageFrom',
      placeholder: 'Age From',
      md: '6'
    },
    {
      type: 'text',
      name: 'ageTo',
      placeholder: 'Age To',
      md: '6'
    },
    {
      type: 'select',
      label: 'Height',
      name: 'heightUnit',
      md: '4',
      options: [
        { label: 'Cm.', value: 'centimeters' },
        { label: 'Feet', value: 'feet' }
      ]
    },

    {
      type: 'text',
      name: 'heightFrom',
      placeholder: 'Height From',
      md: '4'
    },
    {
      type: 'text',
      name: 'heightTo',
      placeholder: 'Height To',
      md: '4'
    },
    {
      type: 'select',
      label: 'Weight',
      name: 'weightUnit',
      md: '4',
      options: [
        { label: 'lbs.', value: 'pounds' },
        { label: 'kg.', value: 'kilograms' }
      ]
    },
    {
      type: 'text',
      name: 'weightFrom',
      placeholder: 'Weight From',
      md: '4'
    },
    {
      type: 'text',
      name: 'weightTo',
      placeholder: 'Weight To',
      md: '4'
    },
    {
      label: 'Rank',
      type: 'number',
      name: 'rankFrom',
      placeholder: 'Rank From',
      md: '6'
    },
    {
      type: 'number',
      name: 'rankTo',
      placeholder: 'RankTo',
      md: '6'
    }
  ];
  const genderValue = [
    {
      name: 'gender',
      label: 'Male',
      checked: 'male',
      value: 'male'
    },
    {
      name: 'gender',
      label: 'Female',
      checked: 'female',
      value: 'female'
    },
    {
      name: 'gender',
      label: 'Other',
      checked: 'other',
      value: 'other'
    }
  ];

  const handleSelectChange = (event) => {
    setGender(event.target.value);
  };
  const {
    watch,
    control,
    getValues,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm({
    mode: 'all',
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  });
  watch(() => {
    setFormValue(getValues());
  });

  useEffect(() => {
    reset({
      name: datamember && datamember[0]?.name,
      location: datamember && datamember[0]?.locationId,
      cost: datamember && datamember[0]?.cost?.amount,
      renewaltype: datamember && datamember[0]?.renewalPeriod?.periodType,
      renewalduration: datamember && datamember[0]?.renewalPeriod?.duration,
      ageFrom: datamember && datamember[0]?.ageFrom?.value,
      ageTo: datamember && datamember[0]?.ageTo?.value,
      heightUnit: datamember && datamember[0]?.heightFrom?.unit,
      heightFrom: datamember && datamember[0]?.heightFrom?.value,
      heightTo: datamember && datamember[0]?.heightTo?.value,
      weightUnit: datamember && datamember[0]?.weightFrom?.unit,
      weightFrom: datamember && datamember[0]?.weightFrom?.value,
      weightTo: datamember && datamember[0]?.weightTo?.value,
      rankFrom: datamember && datamember[0]?.rankFrom,
      rankTo: datamember && datamember[0]?.rankTo,
      gender: datamember && datamember[0]?.gender
    });
  }, [datamember]);

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      locationId: data.location,
      cost: { currency: 'USD', amount: data.cost ? data.cost : 0 },
      renewalPeriod: { periodType: data.renewaltype, duration: data.renewalduration },
      ageFrom: { value: data.ageFrom, unit: 'centimeters' },
      ageTo: { value: data.ageTo, unit: 'centimeters' },
      heightFrom: { value: data.heightFrom, unit: data.heightUnit },
      heightTo: { value: data.heightTo, unit: data.heightUnit },
      weightFrom: { value: data.weightFrom, unit: data.weightUnit },
      weightTo: { value: data.weightTO, unit: data.weightUnit },
      rankFrom: data.rankFrom,
      rankTo: data.rankTo,
      gender: gender
    };
    if (datamember !== undefined) {
      await editMemberShip(selectedId, payload);
      setShowModal(!showModal);
    } else {
      await addMemberShip(payload);
      setMembershipPopup(!membershipPopup);
    }
    setShowMembershipData(true);
  };

  return (
    <>
      <Sidebar
        size="lg"
        open={membershipPopup ? membershipPopup : showModal}
        title="Add New Membership"
        headerClassName="mb-1"
        contentClassName="pt-0"
        toggleSidebar={toggleSidebar}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            {textFileds?.map((textData, i) => {
              return (
                <Controller
                  key={i}
                  name={textData.name}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <>
                        {textData.label ? (
                          <Col md="12" className="mb-1">
                            <label for="fullName">
                              {textData.label}
                              {textData.required && <span className="text-danger"> *</span>}
                            </label>
                          </Col>
                        ) : null}
                        {textData?.name === 'location' ? (
                          <Col md={textData.md} className="mb-1">
                            <Input
                              type={textData.type}
                              name={textData.name}
                              value={value}
                              onBlur={onBlur}
                              onChange={onChange}
                              invalid={!!errors[textData.name] && textData.required}
                            >
                              {data?.map((option, i) => {
                                return (
                                  <option name="title" key={i} value={option?._id}>
                                    {option?.name}
                                  </option>
                                );
                              })}
                            </Input>
                          </Col>
                        ) : (
                          <Col md={textData.md} className="mb-1">
                            <Input
                              type={textData.type}
                              name={textData.name}
                              placeholder={textData.placeholder}
                              value={value}
                              onBlur={onBlur}
                              onChange={onChange}
                              invalid={!!errors[textData.name] && textData.required}
                            >
                              {textData?.options?.map((option, i) => {
                                return (
                                  <option name="title" key={i} value={option.value}>
                                    {option.label}
                                  </option>
                                );
                              })}
                            </Input>
                            <FormFeedback>
                              {errors[textData.name] ? errors[textData.name].message : null}
                            </FormFeedback>
                          </Col>
                        )}
                      </>
                    );
                  }}
                />
              );
            })}
            <Col md="12" className="mb-1">
              <label for="fullName">Gender</label>
            </Col>
            {genderValue.map((option, i) => (
              <Col md={4} className="mb-1">
                <Input
                  type="radio"
                  name={option.name}
                  value={option.value}
                  onChange={handleSelectChange}
                  checked={gender === option.value}
                />
                <label check>{option.label}</label>
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-between str-1">
            <Button type="submit" className="me-1" color="primary">
              Submit
            </Button>
            <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
              Cancel
            </Button>
          </div>
        </Form>
      </Sidebar>
    </>
  );
};
