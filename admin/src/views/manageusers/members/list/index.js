import { Fragment } from 'react';

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

// ** User List Component
import Table from './clientTable';

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather';

// ** Styles
import '@styles/react/apps/app-users.scss';

const Client = () => {
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Location"
        breadCrumbParent="Manage Others"
        breadCrumbActive="Location"
      />
      <div className="app-user-list">
        <Row className="">
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="Total Clients"
              icon={<User size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">2</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="Active Clients"
              icon={<UserPlus size={20} />}
              renderStats={<h3 className="fw-bolder mb-75"> 2</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="Past Due Clients"
              icon={<UserCheck size={20} />}
              renderStats={<h3 className="fw-bolder mb-75"> 2</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="Former Clients"
              icon={<UserX size={20} />}
              renderStats={<h3 className="fw-bolder mb-75"> 2</h3>}
            />
          </Col>
        </Row>
        <Table />
      </div>
    </Fragment>
  );
};

export default Client;
