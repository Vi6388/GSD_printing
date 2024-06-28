// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Label,
  Input,
  Button,
  CardBody,
  CardTitle,
  CardHeader
} from "reactstrap";

const ContactForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Contact Form</CardTitle>
      </CardHeader>

      <CardBody>
        <Form>
          <Row>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="nameVertical">
                First Name
              </Label>
              <Input
                type="text"
                name="name"
                id="nameVertical"
                placeholder="First Name"
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="nameVertical">
                Last Name
              </Label>
              <Input
                type="text"
                name="name"
                id="nameVertical"
                placeholder="Last Name"
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="nameVertical">
                Date of Birth
              </Label>
              <Input
                type="text"
                name="name"
                id="nameVertical"
                placeholder="Date of Birth"
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="EmailVertical">
                Email
              </Label>
              <Input
                type="email"
                name="Email"
                id="EmailVertical"
                placeholder="Email"
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="mobileVertical">
                Phone
              </Label>
              <Input
                type="number"
                name="number"
                id="mobileVertical"
                placeholder="number"
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="mobileVertical">
                Secondary Phone
              </Label>
              <Input
                type="number"
                name="number"
                id="mobileVertical"
                placeholder="Secondary Phone"
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="nameVertical">
                Company Details
              </Label>
              <Input
                type="text"
                name="name"
                id="nameVertical"
                placeholder="Company Details"
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="nameVertical">
                Address
              </Label>
              <Input
                type="text"
                name="name"
                id="nameVertical"
                placeholder="Address"
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="nameVertical">
                Delivery Address
              </Label>
              <Input
                type="text"
                name="name"
                id="nameVertical"
                placeholder="Delivery Address"
              />
            </Col>
            <Col sm="6" className="mb-1">
              <Label className="form-label" for="nameVertical">
                Billing Address
              </Label>
              <Input
                type="text"
                name="name"
                id="nameVertical"
                placeholder="Billing Address"
              />
            </Col>
            <Col sm="6" className="mb-1">
              <div className="form-check">
                <Input
                  type="checkbox"
                  id="remember-me-vertical"
                  defaultChecked={false}
                />
                <Label className="form-check-label" for="remember-me-vertical">
                  Remember Me
                </Label>
              </div>
            </Col>
            <Col sm="12">
              <div className="d-flex">
                <Button
                  className="me-1"
                  color="primary"
                  type="submit"
                  onClick={(e) => e.preventDefault()}
                >
                  Submit
                </Button>
                <Button outline color="secondary" type="reset">
                  Reset
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
export default ContactForm;
