// ** React Imports
import { Fragment } from 'react';

// ** Icons Imports
import { ArrowRight } from 'react-feather';

// ** Reactstrap Imports
import { Row, Col, Form, Button, Label, Input } from 'reactstrap';

// ** Components
import FileUploaderMultiple from './FileUpload';

// ** Styles
import '@styles/react/libs/file-uploader/file-uploader.scss';

const UploadDoc = ({ stepper, type }) => {
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Add Documents</h5>
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col sm="6">
            <Label className="form-label" for="title">
              Title
            </Label>
            <Input type="text" />
          </Col>
          <Col sm="10">
            <Label className="form-label" for="des">
              Description
            </Label>
            <Input id="exampleText" name="text" type="textarea" placeholder="Write your notes..." />
          </Col>
          <Col sm="12" className="mt-1">
            <FileUploaderMultiple />
          </Col>
        </Row>

        <div className="float-end">
          <Button color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">Upload</span>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default UploadDoc;
