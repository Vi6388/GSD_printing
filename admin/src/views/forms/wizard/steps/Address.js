// ** React Imports
import { Fragment } from 'react';

// ** Icons Imports
import { ArrowLeft, ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from 'reactstrap';

const Address = ({ stepper, type }) => {
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Address</h5>
        <small>Enter Your Address.</small>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`address-${type}`}>
              Address
            </Label>
            <Input
              type="text"
              id={`address-${type}`}
              name={`address-${type}`}
              placeholder="98  Borough bridge Road, Birmingham"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`landmark-${type}`}>
              Landmark
            </Label>
            <Input
              type="text"
              name={`landmark-${type}`}
              id={`landmark-${type}`}
              placeholder="Borough bridge"
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`pincode-${type}`}>
              Pincode
            </Label>
            <Input
              type="text"
              name={`pincode-${type}`}
              id={`pincode-${type}`}
              placeholder="658921"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`city-${type}`}>
              City
            </Label>
            <Input type="text" name={`city-${type}`} id={`city-${type}`} placeholder="Birmingham" />
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button color="primary" className="btn-prev" onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button>
          <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default Address;
