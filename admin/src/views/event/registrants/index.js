import { Fragment } from 'react';

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

// ** User List Component
import Table from './RegistrantsTable';

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather';

// ** Styles
import '@styles/react/apps/app-users.scss';

import athleteImg from '@src/assets/images/icons/registrant/athlete.png';
import coachImg from '@src/assets/images/icons/registrant/coach.png';
import refereeImg from '@src/assets/images/icons/registrant/referee.png';

const Client = (props) => {
  const { event, registrantData, refetchRegistrantData } = props;

  return (
    <Fragment>
      <div className="app-user-list">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="Total Registrants"
              icon={<User size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{registrantData?.length}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="Total Athletes"
              icon={<img src={athleteImg} height={32} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {registrantData?.filter((item) => item.registrantType === 'Athlete').length}
                </h3>
              }
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="Total Coaches"
              icon={<img src={coachImg} height={32} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {' '}
                  {registrantData?.filter((item) => item.registrantType === 'Coach').length}
                </h3>
              }
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="secondary"
              statTitle="Total Referees"
              icon={<img src={refereeImg} height={32} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {' '}
                  {registrantData?.filter((item) => item.registrantType === 'Referee').length}
                </h3>
              }
            />
          </Col>
        </Row>
        <Table
          event={event}
          registrantData={registrantData}
          refetchRegistrantData={refetchRegistrantData}
        />
      </div>
    </Fragment>
  );
};

export default Client;
