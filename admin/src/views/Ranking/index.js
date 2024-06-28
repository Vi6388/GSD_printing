import React, { Fragment } from 'react';
import { Card, Col, Input, Row } from 'reactstrap';
import RankSideBar from './RankSideBar/Index';
import RankTable from './RankTable';
import { fetchSearchRankingDataRQ } from '../../requests/ranking/ranking';
import { useQuery } from 'react-query';

const RankingMain = () => {
  const { data, refetch } = useQuery(['get-search-ranking-data'], fetchSearchRankingDataRQ);

  return (
    <Fragment>
      {/* <BreadCrumbs
                breadCrumbTitle="Social Connect"
                breadCrumbParent="Marketing"
                breadCrumbActive="Social Connect"
            /> */}
      <Row>
        <Col sm={3} lg={3} md={3}>
          <Card className="p-1" style={{ height: '760px' }}>
            <RankSideBar />
          </Card>
        </Col>
        <Col sm={9} lg={9} md={9}>
          <Card className="p-1" style={{ height: '760px' }}>
            <div>
              <div
                style={{
                  backgroundColor: '#c52f2f',
                  borderRadius: '6px',
                  color: '#fff'
                }}
                className="d-flex justify-content-center align-items-center mb-1"
              >
                <h4 className="mt-1" style={{ color: '#fff' }}>
                  CMA Official Black Belt Ranking
                </h4>
              </div>
              <div>
                <Row>
                  <Col sm={6} lg={6} md={6}>
                    <div className="d-flex align-items-center mb-1">
                      <span>Show</span>
                      <Input type="select" style={{ width: '70px' }}>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                      </Input>
                      <span>entries</span>
                    </div>
                  </Col>
                  <Col sm={6} lg={6} md={6}>
                    <div className="d-flex justify-content-end align-items-center mb-1">
                      <span>Search</span>
                      <Input type="text" style={{ width: '300px' }} />
                    </div>
                  </Col>
                </Row>
              </div>
              <RankTable data={data} />
            </div>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default RankingMain;
