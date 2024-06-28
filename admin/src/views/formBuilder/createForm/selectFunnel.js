// React component
import React from 'react';
import { Button, Card, CardBody, Row, Col, Container } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

// custom import
import { getUserData } from '../../../utility/Utils';

// icon import
import { TbPlus } from 'react-icons/tb';

// store import
import { createForm } from '../store';

const SelectFunnel = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { stepper, name, memberType, automateEntry, smartList, subCategory, formType } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = dispatch(
      createForm({
        userId: getUserData().id,
        name,
        memberType,
        automateEntry,
        smartList,
        subCategory,
        formType
      })
    );

    if (data) {
      toast.success('Ticket created successfully');
      history.push('/formBuilder/createDetail/123');
    } else {
      toast.error('Ticket creation failed');
    }
  };

  return (
    <div style={{ 'margin-left': '25%' }}>
      <div className="card p-2 bg-primary">
        <h3 className="text-light">Optin Template</h3>
      </div>
      <Container>
        <Row>
          <Col item sm={12} md={3} lg={3}>
            <Card
              className="templates_card d-flex aligin-items-center justify-content-center flex-column active"
              style={{ 'min-height': '150px' }}
            >
              <div className="w-100 d-flex justify-content-center">
                <TbPlus size={50} />
              </div>
              <span className="create_title">Create new</span>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-row-reverse">
            <Button color="primary" onClick={handleSubmit}>
              PUBLISH
            </Button>
            <Button className="px-1 me-1" onClick={() => stepper.previous()}>
              BACK
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SelectFunnel;
