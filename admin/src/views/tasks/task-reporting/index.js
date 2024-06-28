// ** React Imports
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, Button } from 'reactstrap';

// ** Icons Import
import { MoreVertical } from 'react-feather';

// ** Components
import ListTabs from './ListTabs';
import BasicTimeline from './BasicTimeline';
import { useSelector } from 'react-redux';

const Tasks = (props) => {
  const [selectedWorkingCheckList, setSelectedWorkingCheckList] = useState(null);

  const [taskTab, setTaskTab] = useState('today');

  const buildProps = {
    ...props,
    selectedWorkingCheckList,
    setSelectedWorkingCheckList,
    setTaskTab,
    taskTab
  };

  const { userData } = useSelector((state) => state.auth);

  return (
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col lg="4" md="4" sm="12">
              {userData?.userType !== 'employee' && (
                <div className="mb-2 d-flex justify-content-between align-items-center">
                  <Link to="/manage-task">
                    <Button color="primary">Manage Tasks</Button>
                  </Link>
                  <MoreVertical className="cursor-pointer" size={16} />
                </div>
              )}
              <div>
                <ListTabs {...buildProps} />
              </div>
            </Col>
            <Col lg="8" md="8" sm="12">
              <div className="ms-2">
                <BasicTimeline {...buildProps} />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default Tasks;
