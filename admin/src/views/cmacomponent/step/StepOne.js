import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Form, Input, Row, Col, Button, FormFeedback } from 'reactstrap';
import '../../../assets/styles/user-detail.scss';
import { ArrowLeft, ArrowRight } from 'react-feather';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchLocationdata } from '../../../requests/location/LocationAPI';

let schema = yup.object({
  name: yup.string().required(),
  last: yup.string().required(),
  location: yup.string().required()
});
const initialValues = {
  title: '',
  name: '',
  last: '',
  middle: '',
  location: ''
};
export const StepOne = ({
  stepper,
  setStepOne,
  setImagePath,
  setIsDisabled,
  stepperModal,
  setStepperModal
}) => {
  const locationOption = fetchLocationdata()?.data?.map((dataItem) => {
    return { value: dataItem._id, label: dataItem.name };
  });
  const textFileds = [
    {
      type: 'select',
      label: 'Title',
      name: 'title',
      required: true,
      md: '9',
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
      label: 'Name',
      placeholder: 'First name',
      name: 'name',
      required: true,
      md: '3'
    },
    {
      type: 'text',
      name: 'middle',
      placeholder: 'Middle name',
      required: false,
      md: '3'
    },
    {
      type: 'text',
      name: 'last',
      placeholder: 'Last name',
      required: true,
      md: '3'
    },
    {
      type: 'file',
      label: 'Profile Picture',
      name: 'image',
      text: 'Please note this profile picture upload will be publicly viewable.',
      required: false,
      md: '9'
    },
    {
      type: 'select',
      label: 'Location',
      name: 'location',
      required: true,
      md: '9',
      options: [
        { label: 'Select Location', value: '', disabled: true },
        ...(locationOption ? locationOption : [])
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
    setStepOne(getValues());
  });
  useEffect(() => {
    setIsDisabled(Object.keys(errors).length === 0 && isValid);
  }, [errors, isValid]);
  const onSubmit = () => stepper.next();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePath(reader.result);
    };
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
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <>
                      {data.label ? (
                        <Col md="3" className="mb-1">
                          <label>{data.label}:</label>
                        </Col>
                      ) : null}
                      {data.type === 'file' ? (
                        <Col md={data.md} className="mb-1">
                          <small>{data?.text}</small>
                          <Input
                            type={data.type}
                            accept="image/*"
                            name={data.name}
                            onChange={handleFileChange}
                          />
                        </Col>
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
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => setStepperModal(!stepperModal)}
          >
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Cancel</span>
          </Button>
          <Button color="primary" className="btn-next" type="submit">
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
    </div>
  );
};
