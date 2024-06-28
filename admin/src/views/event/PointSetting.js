import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  Col,
  Input,
  Label,
  CardHeader,
  ListGroup,
  ListGroupItem,
  CardTitle,
  CardText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Trash, CheckSquare } from 'react-feather';
import { eventPointTypeDefaultData } from '../../utility/Utils';
import { editParticularEventAction } from './store/actions';

const PointSetting = ({ event }) => {
  const dispatch = useDispatch();

  const [pointType, setPointType] = useState('Local');
  const [data, setData] = useState([]);
  const state = useSelector((state) => state.eventMain.eventPointType);

  useEffect(() => {
    if (state)
      setData([
        { name: 'None', points: [] },
        ...state.data.filter((dataItem) => dataItem.points.length > 0)
      ]);
    else setData([{ name: 'None', points: [] }, ...eventPointTypeDefaultData]);
  }, [state]);

  useEffect(() => {
    if (event) setPointType(event.pointType);
  }, [event]);

  return (
    <Fragment>
      <Card className="p-1 mb-0">
        <div>
          <Card className="p-1 bg-primary text-white">
            <b> View event Point {event?.eventName} </b>
          </Card>

          <div>
            <div className="my-1">
              <span>
                These options are not required for registration, but offer alternatives for the
                director.{' '}
              </span>
            </div>
            <>
              <Card className="my-1 p-2 border-2" style={{ border: '1px solid #e5e5e5' }}>
                <Row>
                  <Col md={2}>
                    <h5 className="mb-2">Point Type</h5>
                    <div className="d-flex flex-column">
                      {data &&
                        data.map((dataItem, index) => (
                          <div className="form-check mb-2">
                            {/* <div> */}
                            <Input
                              type="radio"
                              id={`${index}-active`}
                              name="pointType"
                              value={dataItem.name}
                              checked={pointType === dataItem.name}
                              onChange={(e) => setPointType(e.target.value)}
                            />
                            <Label className="form-check-label" for={`${index}-active`}>
                              {dataItem.name}
                            </Label>
                          </div>
                        ))}
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="d-flex flex-column">
                      <Button
                        color="primary"
                        className="mb-2"
                        disabled={event.pointType === pointType}
                        onClick={() =>
                          dispatch(
                            editParticularEventAction(
                              event?._id,
                              { pointType: pointType },
                              'Change Point Type'
                            )
                          )
                        }
                      >
                        {' '}
                        Set Event Point Type{' '}
                      </Button>
                      {data &&
                        data.filter((dataItem) => dataItem.name === pointType).length > 0 &&
                        data
                          .filter((dataItem) => dataItem.name === pointType)[0]
                          .points?.map((pointItem, pointIndex) => (
                            <div className="mb-1 d-flex flex-row justify-content-between">
                              <h3>
                                {pointIndex + 1}{' '}
                                {pointIndex === 0
                                  ? 'st'
                                  : pointIndex === 1
                                  ? 'nd'
                                  : pointIndex === 2
                                  ? 'rd'
                                  : 'th'}{' '}
                                place:
                              </h3>
                              <h3>{pointItem} points</h3>
                            </div>
                          ))}
                    </div>
                  </Col>
                </Row>
              </Card>
            </>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};
export default PointSetting;
