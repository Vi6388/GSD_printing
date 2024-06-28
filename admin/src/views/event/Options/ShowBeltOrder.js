import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Card, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import Select, { components } from 'react-select';
import AvatarGroup from '@components/avatar-group';

const ShowBeltOrder = (props) => {
  const { divisions } = props;
  let data = divisions.filter((divisionItem) => divisionItem.isDisabled === false);
  return (
    <>
      <h5>Show Belt Colors for event</h5>
      <Card
        className="my-1 p-2 border-2"
        style={{
          border: '1px solid #e5e5e5',
          backgroundColor: 'lightgray'
        }}
      >
        <div className="m-1">
          <span>
            <b> This section displays the current ranks offered by the event.</b>
          </span>
        </div>
        <div className="bg-white ">
          <Row className="mx-2">
            <Col sm={6} lg={6} md={6}>
              <div className="m-1">
                <span>
                  <b> Champions Defaults in Registration </b>
                </span>
              </div>
              {data.map((dataItem) => {
                return (
                  <div
                    className="d-flex flex-row justify-content-between"
                    style={{ height: '33px' }}
                  >
                    {dataItem.label}{' '}
                    {dataItem.rankData && dataItem.rankData.length > 0 ? (
                      <AvatarGroup
                        data={dataItem.rankData.map((rankItem, index) => {
                          return {
                            _id: rankItem._id,
                            title: (rankItem.rankName + '    ' + rankItem.rankOrder).toString(),
                            placement: 'bottom',
                            img: rankItem.rankImage,
                            imgHeight: 33,
                            imgWidth: 33
                          };
                        })}
                      />
                    ) : (
                      <h6> Not Rank</h6>
                    )}{' '}
                  </div>
                );
              })}
            </Col>
            <Col sm={6} lg={6} md={6} className=" justify-content-end">
              <div className="my-1">
                <span>
                  <b> Champions Defaults in Registration </b>
                </span>
              </div>
              {data.map((dataItem) => {
                return (
                  <div
                    className="d-flex flex-row justify-content-between"
                    style={{ height: '33px' }}
                  >
                    {dataItem.label} {'( ' + dataItem.ageFrom + ' - ' + dataItem.ageTo + ' )'}
                  </div>
                );
              })}
            </Col>
          </Row>
        </div>
      </Card>
    </>
  );
};

export default ShowBeltOrder;
