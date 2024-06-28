import React, { Fragment, useEffect, useState } from 'react';
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
  Row
} from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Trash, CheckSquare } from 'react-feather';
import DisableDivisions from './DisableDivisions';
import ShowBeltOrder from './ShowBeltOrder';
import { useSelector } from 'react-redux';

const OptionsMain = ({ event }) => {
  const [active, setActive] = useState('1');
  const [divisions, setDivisions] = useState([]);

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  const progressionStore = useSelector((state) => state.progression);
  useEffect(() => {
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
          let rankData = progressionStore.progressionCategoriesRank.filter(
            (rankItem) =>
              rankItem.categoryId.toString() === division.categoryId.toString() &&
              division.rankFrom < rankItem.rankOrder + 1 &&
              division.rankTo > rankItem.rankOrder - 1
          );
          if (curCategory && curSport) {
            tmp.push({
              ...division,
              label: curSport + ' > ' + curCategory + ' > ' + division.divisionName,
              value: event.divisions.filter(
                (item) => item.divisionId.toString() === division._id.toString()
              )[0]._id,
              isDisabled: event.divisions.filter(
                (item) => item.divisionId.toString() === division._id.toString()
              )[0].isDisabled,
              rankData
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
            <b> View event Options {event?.eventName} </b>
          </Card>

          <div>
            <div className="my-1">
              <span>
                These options are not required for registration, but offer alternatives for the
                director.{' '}
              </span>
            </div>
            <Row>
              <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
                <Fragment>
                  <Nav tabs className="mb-2">
                    <NavItem>
                      <NavLink active={active === '1'} onClick={() => toggle('1')}>
                        <CheckSquare className="font-medium-1 me-50" />
                        <span className="fs-6"> Disable Divisions from Registration</span>
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink active={active === '2'} onClick={() => toggle('2')}>
                        <CheckSquare className="font-medium-1 me-50" />
                        <span className="fs-6"> Show Belt Order for Registration</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Fragment>
              </Col>
            </Row>
            <TabContent className="py-50" activeTab={active}>
              <TabPane tabId="1">
                <DisableDivisions event={event} divisions={divisions} />
              </TabPane>
              <TabPane tabId="2">
                <ShowBeltOrder divisions={divisions} />
              </TabPane>
            </TabContent>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};
export default OptionsMain;
