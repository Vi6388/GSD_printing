// ** React Imports
import { useState, Fragment } from 'react';

// ** Reactstrap Imports
import {
  ModalHeader,
  ModalBody,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  Card,
  Form,
  Row,
  Col
} from 'reactstrap';

// ** Third Party Components
import withReactContent from 'sweetalert2-react-content';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import Swal from 'sweetalert2';

// ** Icons
import { HiOutlineUsers } from 'react-icons/hi';
import { GrUserAdmin } from 'react-icons/gr';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';

const LocationInfoCard = ({
  locationOperators,
  selectedLocation,
  updateLocation,
  operatorsData,
  locationID
}) => {
  // ** State
  const [show, setShow] = useState(false);

  // ** Hook
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: selectedLocation.name,
      phone: selectedLocation.phone,
      email: selectedLocation.email,
      city: selectedLocation.address.city,
      state: selectedLocation.address.state,
      street: selectedLocation.address.street,
      country: selectedLocation.address.country,
      zipCode: selectedLocation.address.zipCode,
      operator: selectedLocation?.mainOperatorId?.firstName
    }
  });

  const operatorOptions = [];
  operatorsData?.map((item) =>
    operatorOptions.push({
      value: item._id,
      label: `${item.firstName} ${item.lastName}`
    })
  );

  // ** render user img
  const renderLocationImg = () => {
    if (selectedLocation !== null && selectedLocation?.avatar?.length) {
      return (
        <img
          height="110"
          width="110"
          alt="user-avatar"
          src={selectedLocation?.avatar}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = [
          'light-success',
          'light-danger',
          'light-warning',
          'light-info',
          'light-primary',
          'light-secondary'
        ],
        color = states[stateNum];
      const shortName = selectedLocation.name
        .trim()
        .split(' ')
        .slice(0, 2)
        .join()
        .replace(',', ' ');

      return (
        <Avatar
          initials
          color={color}
          className="rounded mt-3 mb-2"
          content={shortName}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '110px'
          }}
        />
      );
    }
  };

  const onSubmit = (data) => {
    const formData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      mainOperatorId: data.operator.value,
      address: {
        country: data.country,
        zipCode: data.zipCode,
        street: data.street,
        state: data.state,
        city: data.city
      }
    };
    updateLocation({ locationID, formData });
    setShow(false);
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderLocationImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>{selectedLocation !== null ? selectedLocation.name : 'Location Name'}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <GrUserAdmin className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">
                  {locationOperators !== undefined ? locationOperators?.length : 0}
                </h4>
                <small>Operators</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <HiOutlineUsers className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedLocation.users.length}</h4>
                <small>Users</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">Details</h4>
          <div className="info-container">
            {selectedLocation !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">Main Operator: </span>
                  <span>
                    {selectedLocation?.mainOperatorId !== undefined
                      ? `${selectedLocation?.mainOperatorId?.firstName} ${selectedLocation?.mainOperatorId?.lastName}`
                      : 'Not Assigned Yet'}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Phone: </span>
                  <span>{selectedLocation.phone}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">ZIP Code: </span>
                  <span>{selectedLocation.address.zipCode}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Street: </span>
                  <span>{selectedLocation.address.street}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">City: </span>
                  <span className="text-capitalize">{selectedLocation.address.city}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">State: </span>
                  <span>{selectedLocation.address.state}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Country: </span>
                  <span>{selectedLocation.address.country}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              Edit
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className="modal-dialog-centered modal-lg">
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Edit Location Information</h1>
            <p>Keep the information of your Location updated!</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={12} xs={12}>
                <Label className="form-label" for="name">
                  Location Name
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="name"
                  name="name"
                  render={({ field }) => (
                    <Input {...field} id="name" invalid={errors.name && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="email">
                  Email
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="email"
                  name="email"
                  render={({ field }) => (
                    <Input {...field} id="email" invalid={errors.email && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="phone">
                  Phone
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="phone"
                  name="phone"
                  render={({ field }) => (
                    <Input {...field} id="phone" invalid={errors.phone && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="city">
                  City
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="city"
                  name="city"
                  render={({ field }) => (
                    <Input {...field} id="city" invalid={errors.city && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="street">
                  Street
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="street"
                  name="street"
                  render={({ field }) => (
                    <Input {...field} id="street" invalid={errors.street && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="state">
                  State
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="state"
                  name="state"
                  render={({ field }) => (
                    <Input {...field} id="state" invalid={errors.state && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="country">
                  Country
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="country"
                  name="country"
                  render={({ field }) => (
                    <Input {...field} id="country" invalid={errors.country && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="zipCode">
                  ZIP Code
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="zipCode"
                  name="zipCode"
                  render={({ field }) => (
                    <Input {...field} id="zipCode" invalid={errors.zipCode && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="status">
                  Operator:
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="operator"
                  name="operator"
                  render={({ field }) => (
                    <Select
                      {...field}
                      id="operator"
                      isClearable={false}
                      className="react-select"
                      classNamePrefix="select"
                      options={operatorOptions}
                      theme={selectThemeColors}
                    />
                  )}
                />
              </Col>

              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
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
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default LocationInfoCard;
