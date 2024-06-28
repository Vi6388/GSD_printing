import { Fragment, useEffect, useState } from 'react';
import { ArrowLeft } from 'react-feather';
import { Label, Row, Col, Input, Form, Button, FormFeedback } from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';
import { FaShoppingCart } from 'react-icons/fa';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckoutMember } from '../CheckoutMember';
import { addTimeToDate } from '../../../../../../utility/Utils';

let schema = yup.object({
  event: yup.string().required()
});
const initialValues = {
  event: ''
};

const Certification = ({
  setCertificationData,
  memberData,
  memberId,
  url,
  clubData,
  certificationData,
  selectedMembership,
  stepper
}) => {
  const [stepperModal, setStepperModal] = useState(false);

  const textFields = [
    {
      label: 'Yes',
      type: 'checkbox',
      name: 'event',
      required: true,
      span: `I have read and agree to abide by the USA Taekwondo Code of Conduct and terms
      described above for medical treatment and liability.`,
      md: '9'
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
    setCertificationData(getValues());
  });

  useEffect(() => {
    console.log(certificationData);
  }, []);

  const onSubmit = async () => {
    setStepperModal(true);
  };
  const payload = {
    locationId: clubData?.memberCategory
      ? clubData?.memberCategory
      : selectedMembership?.locationId,
    memberId: memberId,
    membershipType: memberData?.memberCategory,
    cost: {
      currency: 'USD',
      amount: selectedMembership?.cost?.amount
    },
    renewalPeriod: {
      duration: selectedMembership?.renewalPeriod?.duration,
      periodType: selectedMembership?.renewalPeriod?.periodType
    },
    paymentMethod: selectedMembership?.cost?.amount,
    startDate: new Date(),
    endDate: addTimeToDate(
      new Date(),
      selectedMembership?.renewalPeriod?.duration,
      selectedMembership?.renewalPeriod?.periodType
    )
  };
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Certification</h5>
        <small>Enter Your Address.</small>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-2">
          <a className="mt-2" href="#">
            Code of Conduct
          </a>
          {textFields?.map((data, i) => {
            return (
              <Controller
                key={i}
                name={data.name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => {
                  return (
                    <>
                      <Col md="6">
                        <p className="mt-2">{data.span}</p>
                        <div className="form-check me-2">
                          <Label className="form-check-label" for="ex1-active">
                            {data.label}
                          </Label>
                          <Input
                            type={data.type}
                            name={data.name}
                            placeholder={data?.placeholder}
                            value={value}
                            onBlur={onBlur}
                            onChange={(event) => onChange(event)}
                            invalid={!!errors[data.name] && data.required}
                          />
                        </div>
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
          <div>
            <Button color="primary" className="btn-next" type="submit">
              <FaShoppingCart size={14} />
              <span className="align-middle d-sm-inline-block d-none ms-sm-25 ms-0">Checkout</span>
            </Button>
          </div>
        </div>
      </Form>
      {stepperModal && (
        <CheckoutMember
          stepperModal={stepperModal}
          setStepperModal={setStepperModal}
          payload={payload}
          url={url}
        />
      )}
    </Fragment>
  );
};

export default Certification;
