import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Edit, Menu, Save } from 'react-feather';
import { Button, Card, Col, Input, InputGroup, InputGroupText, Row } from 'reactstrap';
import classNames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import pointImg from '@src/assets/images/medal/points.png';

import { eventPointTypeUpdateAction } from '../store/actions';
const PointTypeBody = (props) => {
  const { sidebarOpen, setSidebarOpen, data, setData, selectPT, editState, setEditState } = props;
  const dispatch = useDispatch();
  const [addPointState, setAddPointState] = useState(false);
  const [addPoint, setAddPoint] = useState(1);

  return (
    <div className="content-right">
      <div className="content-body">
        <div
          className={classNames('body-content-overlay', {
            show: sidebarOpen
          })}
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="email-app-list">
          <div className="app-fixed-search d-flex d-lg-none align-items-center">
            <div
              className="sidebar-toggle d-block d-lg-none ms-1"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size="21" />
            </div>
          </div>
          <Row className="bg-white h-100 ">
            <Col md={5} style={{ height: '100%' }} className="p-2 border-end">
              <div
                style={{
                  backgroundColor: '#c52f2f',
                  borderRadius: '6px',
                  color: '#fff'
                }}
                className="d-flex justify-content-center align-items-center mb-1"
              >
                <h4 className="mt-1" style={{ color: '#fff' }}>
                  {data && data[selectPT]?.name}
                </h4>
              </div>
              <div className="d-flex flex-row justify-content-between align-items-center mb-1">
                <Button
                  className="p-1 ms-1 float-start"
                  color="primary"
                  onClick={() => {
                    setEditState(!editState);
                  }}
                >
                  <Edit size={16} /> Edit
                </Button>

                <Button
                  className="p-1 me-1 float-end"
                  color="primary"
                  disabled={!editState}
                  onClick={() => {
                    dispatch(eventPointTypeUpdateAction(data));
                    setEditState(!editState);
                  }}
                >
                  <Save size={16} /> Save
                </Button>
              </div>
              <PerfectScrollbar style={{ height: 'calc(100% - 60px)' }}>
                <div className="p-2">
                  {data && data[selectPT]?.points.length > 0
                    ? data[selectPT]?.points.map((pointItem, pointIndex) => (
                        <InputGroup className="mb-1">
                          <InputGroupText style={{ width: '32%' }}>
                            {pointIndex + 1}{' '}
                            {pointIndex === 0
                              ? 'st'
                              : pointIndex === 1
                              ? 'nd'
                              : pointIndex === 2
                              ? 'rd'
                              : 'th'}{' '}
                            place
                          </InputGroupText>
                          <Input
                            type="number"
                            value={pointItem}
                            disabled={!editState}
                            onChange={(e) => {
                              let newData = data.map((item, i) => {
                                if (i === selectPT) {
                                  let newPoints = [...item.points];
                                  newPoints.splice(pointIndex, 1, e.target.value);
                                  return { ...item, points: newPoints };
                                }
                                return item;
                              });
                              setData(newData);
                            }}
                            style={{ width: '25%' }}
                          />
                          <InputGroupText style={{ width: '30%' }}>points</InputGroupText>
                          {pointIndex > 2 && editState && (
                            <InputGroupText
                              className="cursor-pointer"
                              style={{ width: '13%' }}
                              onClick={() => {
                                let newData = data.map((item, i) => {
                                  if (i === selectPT) {
                                    let newPoints = [...item.points];
                                    newPoints.splice(pointIndex, 1);
                                    return { ...item, points: newPoints };
                                  }
                                  return item;
                                });
                                setData(newData);
                              }}
                            >
                              X
                            </InputGroupText>
                          )}
                        </InputGroup>
                      ))
                    : !editState && (
                        <div className="text-center">
                          <h1>there are no point</h1>
                        </div>
                      )}

                  {addPointState && editState && (
                    <Card className="my-1 p-2" style={{ border: '3px dashed #e5e5e5' }}>
                      <div className="d-flex flex-column" style={{ width: '100%' }}>
                        <InputGroup p style={{ width: '100%' }} className="my-2">
                          <InputGroupText style={{ width: '40%' }}>
                            {data[selectPT]?.points?.length
                              ? data[selectPT]?.points?.length + 1
                              : 1}{' '}
                            {data[selectPT]?.points?.length === 0
                              ? 'st'
                              : data[selectPT]?.points?.length === 1
                              ? 'nd'
                              : data[selectPT]?.points?.length === 2
                              ? 'rd'
                              : 'th'}{' '}
                            place
                          </InputGroupText>
                          <Input
                            type="number"
                            value={addPoint}
                            onChange={(e) => setAddPoint(e.target.value)}
                            style={{ width: '30%' }}
                          />
                          <InputGroupText style={{ width: '30%' }}>points</InputGroupText>
                        </InputGroup>
                        <div className="d-flex flex-row justify-content-between">
                          <Button
                            color="primary"
                            style={{ width: '45%' }}
                            className="mt-1 float-start"
                            disabled={!addPoint}
                            onClick={() => {
                              let newData = data.map((item, i) => {
                                if (i === selectPT) {
                                  let newPoints = [...item.points];
                                  newPoints.push(addPoint);
                                  return { ...item, points: newPoints };
                                }
                                return item;
                              });

                              setData(newData);
                              setAddPoint(1);
                              setAddPointState(false);
                            }}
                          >
                            Add Place
                          </Button>
                          <Button
                            color="primary"
                            outline
                            style={{ width: '45%' }}
                            className="mt-1 float-end"
                            onClick={() => {
                              setAddPoint(1);
                              setAddPointState(false);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )}

                  {!addPointState && editState && (
                    <Button
                      color="primary"
                      outline
                      style={{ width: '100%' }}
                      onClick={() => setAddPointState(true)}
                    >
                      + Add Place
                    </Button>
                  )}
                </div>
              </PerfectScrollbar>
            </Col>
            <Col md={7}>
              {' '}
              <div className="belt-list">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mt-1">
                      <img src={pointImg} width="100%" />
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              Here, it is a function to set the point value corresponding to each event See the
              defaults next to to determine your own point rules.
              <br />
              <br />
              Here, it is a function to set the point value corresponding to each event See the
              defaults next to to determine your own point rules.
              <br />
              <br />
              Here, it is a function to set the point value corresponding to each event See the
              defaults next to to determine your own point rules.
              <br />
              <br />
              Here, it is a function to set the point value corresponding to each event See the
              defaults next to to determine your own point rules.
              <br />
              <br />
              Here, it is a function to set the point value corresponding to each event See the
              defaults next to to determine your own point rules.
              <br />
              <br />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default PointTypeBody;
