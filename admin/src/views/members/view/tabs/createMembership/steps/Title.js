import React, { Fragment, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { Label, Row, Col, Input, Form, Button, FormFeedback } from 'reactstrap';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

let schema = yup.object({
  memberCategory: yup.string().required()
});
const initialValues = {
  memberCategory: '',
  cost: '',
  renewalDuration: '',
  renewalPeriod: ''
};

const Title = ({
  stepper,
  setMemberData,
  setIsDisabled,
  memberAPIData,
  setSelectedMembership,
  selectedMembership
}) => {
  const textFields = [
    {
      type: 'select',
      label: 'Select Member Category',
      name: 'memberCategory',
      required: true,
      span: `Additonal members can be added to a Family Membership. Just make sure you have selected a 'Family Primary Member' first and then add your additional members using this membership type.'`,
      md: '9'
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
    setMemberData(getValues());
  });

  useEffect(() => {
    setIsDisabled(Object.keys(errors).length === 0 && isValid);
  }, [errors, isValid]);
  const onSubmit = () => stepper.next();

  const handleMembershipChange = (event) => {
    const selectedId = event.target.value;
    const selected = memberAPIData.find((membership) => membership._id === selectedId);
    setSelectedMembership(selected);
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Membership Default</h5>
        <small>Add Membership Club Default.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6} className="mt-2">
            <Label>
              The available membership types may have been filtered to only show those available
              based on age. Select to see details and price.
            </Label>
            <a href="#">Click here for more information on the available Membership Type.</a>
          </Col>
        </Row>
        {textFields?.map((data, i) => {
          return (
            <Controller
              key={i}
              name={data.name}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <>
                    <Col md="6" className="mt-2">
                      <Label className="form-label" for="selectMember">
                        <h5 className="mb-0">{data.label}</h5>
                      </Label>
                      <Input
                        type={data.type}
                        name={data.name}
                        placeholder={data?.placeholder}
                        value={value}
                        onBlur={onBlur}
                        onChange={(event) => {
                          onChange(event);
                          handleMembershipChange(event);
                        }}
                        invalid={!!errors[data.name] && data.required}
                      >
                        <option name="title" key={i} value="">
                          Please Select Category
                        </option>
                        {memberAPIData?.map((option, i) => {
                          return (
                            <option name="title" key={i} value={option._id}>
                              {option.name}
                            </option>
                          );
                        })}
                      </Input>
                      <FormFeedback>
                        {errors[data.name] ? errors[data.name].message : null}
                      </FormFeedback>
                      <span className="mt-1">{data.span}</span>
                    </Col>
                  </>
                );
              }}
            />
          );
        })}
        <Row className="mt-2">
          <Col md={3}>
            <Label className="form-label" for="selectMember">
              <h5 className="mb-0">Cost</h5>
            </Label>
          </Col>
          <Col md={8}>
            <h5 style={{ marginLeft: '30px' }}>
              {selectedMembership?.cost?.amount} {selectedMembership?.cost?.currency || '-'}
            </h5>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={3}>
            <Label className="form-label" for="selectMember">
              <h5 className="mb-0">Renewal Period</h5>
            </Label>
          </Col>
          <Col md={3}>
            <h5 style={{ marginLeft: '30px' }}>
              {selectedMembership?.renewalPeriod?.duration}
              {selectedMembership?.renewalPeriod?.periodType || '-'}
            </h5>
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" type="submit">
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};
export default Title;
