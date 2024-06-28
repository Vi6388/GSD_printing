import { Fragment, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { Label, Row, Col, Form, Button, Input, FormFeedback } from 'reactstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

let schema = yup.object({
  memberCategory: yup.string().required()
});
const initialValues = {
  memberCategory: ''
};

const Host = ({ stepper, setClubData, setIsClubDisabled, selectedMembership, locationData }) => {
  const [defaultLocation, setDefaultLocation] = useState('');
  useEffect(() => {
    setDefaultLocation(locationData?.find((obj) => obj?._id === selectedMembership?.locationId));
  }, [locationData, selectedMembership, defaultLocation]);

  const textFields = [
    {
      type: 'select',
      label: 'Select Location',
      name: 'memberCategory',
      required: true,
      span: ` By selecting organisations below you will be providing them with access to your
      profile and associated data. You must also select your 'Primary Club' using the tick
      box provided.`,
      md: '9'
    }
  ];
  const {
    watch,
    control,
    getValues,
    formState: { errors, isValid },
    reset,
    handleSubmit
  } = useForm({
    mode: 'all',
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  });
  useEffect(() => {
    reset({
      memberCategory: defaultLocation?._id
    });
  }, [defaultLocation]);
  watch(() => {
    setClubData(getValues());
  });

  useEffect(() => {
    setIsClubDisabled(Object.keys(errors).length === 0 && isValid);
  }, [errors, isValid]);
  const onSubmit = () => stepper.next();

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Club</h5>
        <small>Enter Club Info.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-2">
          {textFields?.map((data, i) => {
            return (
              <Controller
                key={i}
                name={data.name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <>
                      <Col md="8">
                        <span className="mt-1">{data.span}</span>
                      </Col>
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
                          onChange={(event) => onChange(event)}
                          invalid={!!errors[data.name] && data.required}
                        >
                          <option
                            name="memberCategory"
                            value={defaultLocation ? defaultLocation?._id : ''}
                          >
                            {defaultLocation ? defaultLocation?.name : 'Please Select'}
                          </option>
                          {locationData?.map((option, i) => {
                            return (
                              <option name={data.name} key={i} value={option._id}>
                                {option.name}
                              </option>
                            );
                          })}
                        </Input>
                        <FormFeedback>
                          {errors[data.name] ? errors[data.name].message : null}
                        </FormFeedback>
                      </Col>
                    </>
                  );
                }}
              />
            );
          })}
        </Row>
        <div className="d-flex justify-content-between">
          <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
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

export default Host;
