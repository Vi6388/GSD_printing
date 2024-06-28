// ** React Imports
import { Fragment } from 'react';

// ** Reactstrap Imports
import { Row, Col, Card, Badge, CardBody, CardTitle, CardHeader } from 'reactstrap';

const MainOperatorInfo = ({ selectedLocation, locationOperators }) => {
  // Main Operator Data
  const op = locationOperators?.filter(
    (operator) => operator._id == selectedLocation?.mainOperatorId._id
  )[0];

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Main Operator Details</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="12">
              <div className="mb-2 pb-50 d-flex justify-content-between">
                <h5>First Name:</h5>
                <h5>{op?.firstName}</h5>
              </div>
              <div className="mb-2 pb-50 d-flex justify-content-between">
                <h5>Last Name:</h5>
                <h5>{op?.lastName}</h5>
              </div>
              <div className="mb-2 pb-50 d-flex justify-content-between">
                <h5>Phone:</h5>
                <h5>{op?.auth.phone}</h5>
              </div>
              <div className="mb-2 pb-50 d-flex justify-content-between">
                <h5>Email:</h5>
                <h5>{op?.auth.email}</h5>
              </div>
              <div className="mb-2 pb-50 d-flex justify-content-between">
                <h5>Account Type:</h5>
                <h5>{op?.accType}</h5>
              </div>
              <div className="mb-2 pb-50 d-flex justify-content-between">
                <h5>Gender:</h5>
                <h5>{op?.gender}</h5>
              </div>
              <div className="mb-2 pb-50 d-flex justify-content-between">
                <h5>Status:</h5>
                <h5>
                  <Badge color={op?.isActive ? 'success' : 'light-primary'} className="ms-50">
                    {op?.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </h5>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default MainOperatorInfo;
