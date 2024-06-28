// ** React Imports
import { useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { Form, Row, Col, Input, Button, Card, CardBody } from 'reactstrap';
import { Menu } from 'react-feather';
import { BsFillEyeFill } from 'react-icons/bs';

// ** Email App Component Imports

// ** Third Party Components
import classnames from 'classnames';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';

import PerfectScrollbar from 'react-perfect-scrollbar';
// ** Styles
import '@styles/react/apps/app-email.scss';
//Role
// import GoogleMapReact from ''

const Rolesandper = () => {
  // ** States
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);

  // ** Toggle Compose Function
  const toggleCompose = () => setComposeOpen(!composeOpen);

  // ** Store Variables
  const dispatch = useDispatch();
  const store = useSelector((state) => state.email);

  // ** Vars
  const params = useParams();

  // ** UseEffect: GET initial data on Mount

  return (
    <>
      <div className="overflow-hidden email-application">
        <div className="content-overlay"></div>
        <div className="content-area-wrapper container-xxl p-0 animate__animated animate__fadeIn">
          <Fragment>
            <div className="content-right-formBuilder">
              <div className="content-body">
                <div
                  className={classnames('body-content-overlay', {
                    show: sidebarOpen
                  })}
                  onClick={() => setSidebarOpen(false)}
                ></div>
                <div className="email-app-list">
                  <div className="app-fixed-search d-flex d-lg-none align-items-center"></div>
                  <div className="card p-2">
                    <Form>
                      <Row noGutters>
                        <Col md="6">
                          <Input
                            id="exampleEmail"
                            name="email"
                            placeholder="somting.cool"
                            type="text"
                          />
                        </Col>
                        <Col>
                          <Button color="primary">Submit</Button>
                        </Col>
                        <Col md="4" className="d-flex flex-row-reverse">
                          <Button color="primary">
                            <BsFillEyeFill />
                            View
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                  <Card
                    style={{ height: '100%', borderRadius: 10, marginTop: '1em' }}
                    className={`shadow`}
                  >
                    <CardBody>
                      <iframe
                        scrolling="no"
                        className="shadow-sm"
                        style={{
                          position: 'relative',
                          overflow: 'hidden',
                          width: '100%',
                          border: 'none',
                          height: '400px',
                          borderRadius: 10
                        }}
                        src={
                          'https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik'
                        }
                      />
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
    </>
  );
};

export default Rolesandper;
