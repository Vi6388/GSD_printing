import { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';
import '@styles/react/apps/app-users.scss';

export const ClientStatus = ({ statsData }) => {
  return (
    <Fragment>
      <div className="app-user-list">
        <Row>
          {statsData?.map((item, i) => {
            return (
              <Col lg="3" sm="6" key={item.key}>
                <StatsHorizontal
                  color={item.color}
                  statTitle={item.title}
                  icon={item.icon}
                  renderStats={<h3 className="fw-bolder mb-75">{item.value ? item.value : '0'}</h3>}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </Fragment>
  );
};
