import { Fragment, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { Label, Row, Col, Input, Form, Button, FormFeedback } from 'reactstrap';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

let schema = yup.object({
  armed: yup.string().required()
});
const initialValues = {
  armed: ''
};

const Address = ({ stepper, setAddInfoData, setIsAddInfoDisabled }) => {
  const textFields = [
    {
      type: 'radio',
      span: `Have you ever served in the `,
      afterBrSpan: 'US Armed Forces?',
      name: 'armed',
      required: true,
      md: '3',
      options: [
        {
          type: 'radio',
          name: 'Armed',
          label: 'Yes',
          checked: 'yes',
          value: 'yes'
        },
        {
          type: 'radio',
          name: 'Armed',
          label: 'No',
          checked: 'no',
          value: 'no',
          marginLeft: '1px'
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
    setAddInfoData(getValues());
  });
  useEffect(() => {
    setIsAddInfoDisabled(Object.keys(errors).length === 0 && isValid);
  }, [errors, isValid]);
  const onSubmit = () => stepper.next();

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Additional Information</h5>
        <small>Enter Your Address.</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {textFields?.map((data, i) => {
            return (
              <Controller
                key={i}
                name={data.name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <>
                      {data.span ? (
                        <Col md="12" className="mb-1">
                          <Label className="form-label" for="date-time-picker">
                            {data.span}
                            <br /> {data.afterBrSpan}
                          </Label>
                        </Col>
                      ) : null}
                      {data?.options.map((option, i) => (
                        <>
                          <Col md={'1'} className="mb-2">
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
                          <FormFeedback>
                            {errors[data.name] ? errors[data.name].message : null}
                          </FormFeedback>
                        </>
                      ))}
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

export default Address;
