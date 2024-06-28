import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { Form, Input, Row, Col, Button, FormFeedback } from 'reactstrap';
import '../../../assets/styles/user-detail.scss';
import { addMember } from '../../../requests/member/GetMembers';
import { ArrowLeft } from 'react-feather';
import { useDispatch } from 'react-redux';

let schema = yup.object({
  dob: yup.string().required(),
  heightValue: yup.string().required(),
  weightValue: yup.string().required()
});
const initialValues = {
  dob: '',
  nationality: 'usa',
  gender: 'male',
  differentlyAbled: 'no',
  medicalCondition: 'no',
  shareDisability: 'no',
  dominantHand: 'right',
  specialDiet: 'no',
  heightUnit: 'feet',
  heightValue: '',
  weightUnit: 'pounds',
  weightValue: ''
};

export const StepThree = ({
  stepOne,
  stepTwo,
  stepFour,
  setStepThree,
  setStepperModal,
  stepperModal,
  imagePath,
  stepper
}) => {
  const dispatch = useDispatch();
  const textFileds = [
    {
      type: 'date',
      label: 'Date Of Birth',
      name: 'dob',
      required: true,
      md: '9'
    },
    {
      type: 'select',
      label: 'Nationality',
      name: 'nationality',
      required: true,
      md: '9',
      options: [
        { label: 'Select Country', value: '' },
        { label: 'India', value: 'india' },
        { label: 'USA', value: 'usa' }
      ]
    },
    {
      type: 'radio',
      label: 'Gender',
      name: 'gender',
      required: true,
      md: '3',
      options: [
        {
          type: 'radio',
          name: 'gender',
          label: 'Male',
          checked: 'male',
          value: 'male'
        },
        {
          type: 'radio',
          name: 'gender',
          label: 'Female',
          checked: 'female',
          value: 'female'
        },
        {
          type: 'radio',
          name: 'gender',
          label: 'Other',
          checked: 'other',
          value: 'other'
        }
      ]
    },
    {
      type: 'radio',
      label: 'Differently Abled',
      name: 'differentlyAbled',
      required: true,
      md: '3',
      options: [
        {
          type: 'radio',
          name: 'differentlyAbled',
          label: 'Yes',
          checked: 'yes',
          value: 'yes'
        },
        {
          type: 'radio',
          name: 'differentlyAbled',
          label: 'No',
          checked: 'no',
          value: 'no'
        },
        {
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
      md: '3',
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
      md: '3',
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
      md: '3',
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
      md: '3',
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
      type: 'select',
      label: 'Height',
      name: 'heightUnit',
      required: true,
      md: '3',
      options: [
        { label: 'Cm.', value: 'centimeters' },
        { label: 'Feet', value: 'feet' }
      ]
    },
    {
      type: 'number',
      name: 'heightValue',
      placeholder: 'Height Value',
      required: true,
      md: '6'
    },
    {
      type: 'select',
      label: 'Weight',
      name: 'weightUnit',
      required: true,
      md: '3',
      options: [
        { label: 'lbs.', value: 'pounds' },
        { label: 'kg.', value: 'kilograms' }
      ]
    },
    {
      type: 'number',
      name: 'weightValue',
      placeholder: 'Weight Value',
      required: true,
      md: '6'
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
    setStepThree(getValues());
  });
  const onSubmit = () => {
    const payload = {
      title: stepOne.title,
      firstName: stepOne.name,
      middleName: stepOne.middle,
      lastName: stepOne.last,
      profilePhoto: imagePath,
      locationId: stepOne.location,

      contact: {
        primary: stepTwo.primaryNumber,
        secondary: stepTwo.secondaryNumber,
        email: stepTwo.email
      },
      address: {
        street: stepTwo.street,
        city: stepTwo.city,
        state: stepTwo.state,
        country: stepTwo.country,
        zipCode: stepTwo.zipCode
      },
      communicationType: stepTwo.communicationType,

      dateOfBirth: stepFour.dob,
      nationality: stepFour.nationality,
      gender: stepFour.gender,
      differentlyAbled: stepFour.differentlyAbled,
      medicalCondition: stepFour.medicalCondition,
      shareDisability: stepFour.shareDisability,
      dominantHand: stepFour.dominantHand,
      specialDiet: stepFour.specialDiet,
      height: {
        unit: stepFour.heightUnit,
        value: stepFour.heightValue
      },
      weight: {
        unit: stepFour.weightUnit,
        value: stepFour.weightValue
      }
    };
    dispatch(addMember(payload));
    setStepperModal(!stepperModal);
  };
  const dateValid = new Date().toISOString().slice(0, 10);

  const handlePrev = () => {
    stepper.previous();
  };

  return (
    <div className="stp-1">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {textFileds?.map((data, i) => {
            return (
              <Controller
                key={i}
                name={data.name}
                control={control}
                defaultValue={data.defaultValue}
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <>
                      {data.label ? (
                        <Col md="3" className="mb-1">
                          <label>{data.label}:</label>
                        </Col>
                      ) : null}
                      {data.type === 'radio' ? (
                        data?.options.map((option, i) => (
                          <Col
                            md={data.md}
                            className="mb-1"
                            style={{ marginLeft: option.marginLeft }}
                          >
                            <Input
                              type="radio"
                              defaultValue={option.defaultValue}
                              name={option.name}
                              value={option.value}
                              onChange={(event) => onChange(event)}
                              checked={value === option.value}
                            />
                            <label check>{option.label}</label>
                          </Col>
                        ))
                      ) : (
                        <Col md={data.md} className="mb-1">
                          <Input
                            type={data.type}
                            name={data.name}
                            placeholder={data?.placeholder}
                            value={value}
                            onBlur={onBlur}
                            onChange={(event) => onChange(event)}
                            invalid={!!errors[data.name] && data.required}
                            max={data.type === 'date' ? dateValid : ''}
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
                        </Col>
                      )}
                    </>
                  );
                }}
              />
            );
          })}
        </Row>
        <div className="d-flex justify-content-between str-1">
          <Button color="primary" className="btn-prev" onClick={handlePrev}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" type="submit">
            <span className="align-middle d-sm-inline-block d-none">Submit</span>
          </Button>
        </div>
      </Form>
    </div>
  );
};
