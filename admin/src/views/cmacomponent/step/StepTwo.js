import React, { useEffect } from 'react';
import { Form, Input, Row, Col, Button, FormFeedback } from 'reactstrap';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import '../../../assets/styles/user-detail.scss';

let schema = yup.object({
  email: yup.string().required(),
  primaryNumber: yup.string().required(),
  street: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  country: yup.string().required(),
  zipCode: yup.string().required()
});
const initialValues = {
  email: '',
  primaryNumber: '',
  secondaryNumber: '',
  street: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  communicationType: 'email'
};

export default function StepTwo({ stepper, setStepTwo, setPersonDisabled }) {
  const textFileds = [
    {
      type: 'text',
      label: 'Email',
      placeholder: 'Email',
      name: 'email',
      required: true,
      md: '7'
    },
    {
      type: 'number',
      label: 'Primary Number',
      placeholder: 'Primary Number',
      name: 'primaryNumber',
      required: true,
      md: '7'
    },
    {
      type: 'number',
      label: 'Secondary Number',
      name: 'secondaryNumber',
      placeholder: 'Secondary Number',
      required: false,
      md: '7'
    },
    {
      label: 'Street',
      type: 'text',
      name: 'street',
      placeholder: 'Street',
      required: true,
      md: '7'
    },
    {
      label: 'Address',
      type: 'text',
      name: 'city',
      placeholder: 'City',
      required: true,
      md: '3'
    },
    {
      type: 'text',
      name: 'state',
      placeholder: 'State',
      required: true,
      md: '4'
    },
    {
      marginLeft: '310px',
      type: 'select',
      name: 'country',
      placeholder: 'Country',
      required: true,
      md: '3',
      options: [
        { label: 'Select Country', value: '' },
        { label: 'USA', value: 'usa' },
        { label: 'India', value: 'india' },
        { label: 'Maxico', value: 'maxico' }
      ]
    },
    {
      type: 'text',
      name: 'zipCode',
      placeholder: 'ZipCode',
      required: true,
      md: '4'
    },
    {
      type: 'radio',
      label: 'Communication Type',
      name: 'communicationType',
      required: false,
      md: '7',
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
    watch,
    control,
    getValues,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({
    mode: 'all',
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  });
  watch(() => {
    setStepTwo(getValues());
  });
  useEffect(() => {
    setPersonDisabled(Object.keys(errors).length === 0 && isValid);
  }, [errors, isValid]);
  const onSubmit = () => {
    stepper.next();
  };

  const handlePrev = () => {
    stepper.previous();
  };
  return (
    <>
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
                          <Col md="5" className="mb-1">
                            <label>{data.label}:</label>
                          </Col>
                        ) : null}
                        {data.type === 'radio' ? (
                          data?.options.map((data, i) => (
                            <Col
                              md={data.md}
                              className="mb-1"
                              style={{ marginLeft: data.marginLeft }}
                            >
                              <label check>{data.label}</label>
                              <Input
                                type="radio"
                                defaultValue={data.defaultValue}
                                name="communicationType"
                                value={data.value}
                                onChange={(event) => onChange(event)}
                                checked={value === data.value}
                              />
                            </Col>
                          ))
                        ) : (
                          <Col
                            md={data.md}
                            className="mb-1"
                            style={{ marginLeft: data.marginLeft }}
                          >
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
                                  <option name="country" key={i} value={option.value}>
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
              <span className="align-middle d-sm-inline-block d-none">Next</span>
              <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
