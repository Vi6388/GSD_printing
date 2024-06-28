import React, { useState } from 'react';
import EventStatTable from './EventStatTable';
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';
import { Card, Col, Row } from 'reactstrap';
import { User, UserCheck, UserPlus, UserX } from 'react-feather';
import athleteImg from '@src/assets/images/icons/registrant/athlete.png';
import coachImg from '@src/assets/images/icons/registrant/coach.png';
import refereeImg from '@src/assets/images/icons/registrant/referee.png';
import { BiMap } from 'react-icons/bi';

const BreakdownRegistrant = (props) => {
  const { event, registrantData, refetchRegistrantData } = props;

  const [active, setActive] = useState(1);
  const [tableData, setTableData] = useState([]);

  const handleClickCard = (index) => {
    setActive(index);
    switch (index) {
      case 1:
        setTableData(
          [...new Set(registrantData?.map((registrantItem) => registrantItem.location[0]._id))].map(
            (item) =>
              registrantData.filter((registrantItem) => registrantItem.location[0]._id === item)
          )
        );
        break;
      case 2:
        setTableData(
          [...new Set(registrantData?.map((registrantItem) => registrantItem.location[0]._id))]
            .map((item) =>
              registrantData.filter(
                (registrantItem) =>
                  registrantItem.location[0]._id === item &&
                  registrantItem.registrantType === 'Athlete'
              )
            )
            .filter((item) => item.length > 0)
        );
        break;
      case 3:
        setTableData(
          [...new Set(registrantData?.map((registrantItem) => registrantItem.location[0]._id))]
            .map((item) =>
              registrantData.filter(
                (registrantItem) =>
                  registrantItem.location[0]._id === item &&
                  registrantItem.registrantType === 'Coach'
              )
            )
            .filter((item) => item.length > 0)
        );
        break;
      case 4:
        setTableData(
          [...new Set(registrantData?.map((registrantItem) => registrantItem.location[0]._id))]
            .map((item) =>
              registrantData.filter(
                (registrantItem) =>
                  registrantItem.location[0]._id === item &&
                  registrantItem.registrantType === 'Referee'
              )
            )
            .filter((item) => item.length > 0)
        );
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <div style={{ backgroundColor: '#f9f4d9', padding: '5px' }}>
        <span>
          <b>Further breakdown of Registrants</b>
        </span>
      </div>
      <Row className="mt-1 mb-2">
        <Col lg="3" sm="6">
          <Card
            className={`border mb-0 ${active === 1 ? 'border border-primary' : ''}`}
            onClick={() => handleClickCard(1)}
          >
            <StatsHorizontal
              color="success"
              statTitle="By Location"
              icon={<BiMap size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {
                    [
                      ...new Set(
                        registrantData?.map((registrantItem) => registrantItem.location[0]._id)
                      )
                    ].length
                  }
                </h3>
              }
            />
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card
            className={`border mb-0 ${active === 2 ? 'border border-primary' : ''}`}
            onClick={() => handleClickCard(2)}
          >
            <StatsHorizontal
              color="danger"
              statTitle="Total Athlete"
              icon={<img src={athleteImg} width={32} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {
                    registrantData?.filter(
                      (registrantItem) => registrantItem.registrantType === 'Athlete'
                    ).length
                  }
                </h3>
              }
            />
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card
            className={`border mb-0 ${active === 3 ? 'border border-primary' : ''}`}
            onClick={() => handleClickCard(3)}
          >
            <StatsHorizontal
              color="primary"
              statTitle="Total Coach"
              icon={<img src={coachImg} width={32} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {
                    registrantData?.filter(
                      (registrantItem) => registrantItem.registrantType === 'Coach'
                    ).length
                  }
                </h3>
              }
            />
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card
            className={`border mb-0 ${active === 4 ? 'border border-primary' : ''}`}
            onClick={() => handleClickCard(4)}
          >
            <StatsHorizontal
              color="secondary"
              statTitle="Total Referee"
              icon={<img src={refereeImg} width={32} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {
                    registrantData?.filter(
                      (registrantItem) => registrantItem.registrantType === 'Referee'
                    ).length
                  }
                </h3>
              }
            />
          </Card>
        </Col>
      </Row>
      <Card className="border mb-0">
        <EventStatTable tableData={tableData} active={active} />
      </Card>
    </div>
  );
};

export default BreakdownRegistrant;
