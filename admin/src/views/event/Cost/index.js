import { Fragment, useEffect, useState } from 'react';
import { Card, Col, Row } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { CheckSquare } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';

import BasicRegistrationCost from './BasicRegistrationCost';
import ForcedDivisionCost from './ForcedDivisionCost';
import SpectatorPass from './SpectatorPass';
import CouponManagement from './CouponManagement';

const Cost = (props) => {
  const { event } = props;
  const dispatch = useDispatch();
  const [active, setActive] = useState('1');
  const [divisions, setDivisions] = useState([]);
  const [eventFee, setEventFee] = useState([]);
  const [lateEventFee, setLateEventFee] = useState([]);
  const [lateOption, setLateOption] = useState(false);
  const [coachFee, setCoachFee] = useState(0);

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const progressionStore = useSelector((state) => state.progression);
  useEffect(() => {
    setEventFee(event?.eventFee);
    setLateEventFee(event?.lateEventFee?.length > 0 ? event.lateEventFee : []);
    setCoachFee(event?.coachFee);
    setLateOption(event?.lateEventFee?.length > 0 ? true : false);
    let tmp = [];
    progressionStore.progressionCategoriesDivision &&
      progressionStore.progressionCategoriesDivision.map((division, index) => {
        if (
          event?.divisions &&
          event.divisions.filter((item) => item.divisionId.toString() === division._id.toString())
            .length === 1
        ) {
          let curCategory = '',
            curSport = '';
          progressionStore.sportList.map((sport, index1) => {
            sport.categoryId.map((category, index2) => {
              if (category._id == division.categoryId) {
                curCategory = category.categoryName;
                curSport = sport.sportName;
              }
            });
          });
          if (curCategory && curSport) {
            tmp.push({
              ...division,
              label: curSport + ' > ' + curCategory + ' > ' + division.divisionName,
              divisionFee: event.divisions.filter(
                (item) => item.divisionId.toString() === division._id.toString()
              )[0].divisionFee,
              value: event.divisions.filter(
                (item) => item.divisionId.toString() === division._id.toString()
              )[0]._id
            });
          } else {
            tmp.push(division);
          }
        }
      });
    setDivisions(tmp);
  }, [progressionStore, event]);

  return (
    <Fragment>
      <Card className="p-1 mb-0">
        <div>
          <Card className="p-1 bg-primary text-white">
            <b> View event Cost for {event?.eventName} </b>
          </Card>

          <div>
            <div className="my-1">
              <span>
                Please do NOT put the dollar sign into the fields! Example: type in 20, NOT{' '}
                <span className="text-success"> $ 20 </span>.
              </span>
            </div>
            <Row>
              <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
                <Fragment>
                  <Nav tabs className="mb-2">
                    <NavItem>
                      <NavLink active={active === '1'} onClick={() => toggle('1')}>
                        <CheckSquare className="font-medium-1 me-50" />
                        <span className="fs-6">Basic Registration Costs</span>
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink active={active === '2'} onClick={() => toggle('2')}>
                        <CheckSquare className="font-medium-1 me-50" />
                        <span className="fs-6">Forced Cost for Divisions</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink active={active === '3'} onClick={() => toggle('3')}>
                        <CheckSquare className="font-medium-1 me-50" />
                        <span className="fs-6">Spectator Pass</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink active={active === '4'} onClick={() => toggle('4')}>
                        <CheckSquare className="font-medium-1 me-50" />
                        <span className="fs-6">Coupon Management</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Fragment>
              </Col>
            </Row>
            <TabContent className="py-50" activeTab={active}>
              <TabPane tabId="1">
                <BasicRegistrationCost
                  event={event}
                  eventFee={eventFee}
                  setEventFee={setEventFee}
                  lateEventFee={lateEventFee}
                  setLateEventFee={setLateEventFee}
                  coachFee={coachFee}
                  setCoachFee={setCoachFee}
                  lateOption={lateOption}
                  setLateOption={setLateOption}
                />
              </TabPane>
              <TabPane tabId="2">
                <ForcedDivisionCost event={event} divisions={divisions} />
              </TabPane>
              <TabPane tabId="3">
                <SpectatorPass event={event} />
              </TabPane>
              <TabPane tabId="4">
                <CouponManagement event={event} />
              </TabPane>
            </TabContent>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};
export default Cost;
