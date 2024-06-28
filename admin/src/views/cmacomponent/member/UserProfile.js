// ** React Imports
import { useState } from 'react';
import React, { Fragment } from 'react';
// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink, Col, Row, Card, CardBody } from 'reactstrap';
import BreadCrumbsPage from '@components/breadcrumbs';
import ProfileTab from '../tab/ProfileTab';
const UserProfile = () => {
  // ** State
  const [active, setActive] = useState('1');

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <Fragment>
      <BreadCrumbsPage
        breadCrumbTitle="Profile"
        breadCrumbParent="Manage Profile"
        breadCrumbActive="Profile"
      />
      <div className="nav-vertical">
        <Row>
          <Col md="3">
            <Card>
              <CardBody>
                <Nav tabs className="nav-left">
                  <NavItem>
                    <NavLink
                      active={active === '1'}
                      onClick={() => {
                        toggle('1');
                      }}
                    >
                      Profile
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={active === '2'}
                      onClick={() => {
                        toggle('2');
                      }}
                    >
                      Memberships
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={active === '3'}
                      onClick={() => {
                        toggle('3');
                      }}
                    >
                      USOPC Background Screenings
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      active={active === '4'}
                      onClick={() => {
                        toggle('4');
                      }}
                    >
                      Center for SafeSport Training
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      active={active === '5'}
                      onClick={() => {
                        toggle('5');
                      }}
                    >
                      Belts
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      active={active === '6'}
                      onClick={() => {
                        toggle('6');
                      }}
                    >
                      Competitions
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      active={active === '7'}
                      onClick={() => {
                        toggle('7');
                      }}
                    >
                      Verification Documentation
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      active={active === '8'}
                      onClick={() => {
                        toggle('8');
                      }}
                    >
                      Addresses
                    </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink
                      active={active === '9'}
                      onClick={() => {
                        toggle('9');
                      }}
                    >
                      Communication Preferences
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardBody>
            </Card>
          </Col>
          <Col md="9">
            <TabContent activeTab={active}>
              <TabPane tabId="1">
                <ProfileTab />
              </TabPane>
              <TabPane tabId="2">
                <p>
                  Sugar plum tootsie roll biscuit caramels. Liquorice brownie pastry cotton candy
                  oat cake fruitcake jelly chupa chups. Sweet fruitcake cheesecake biscuit cotton
                  candy. Cookie powder marshmallow donut. Pudding caramels pastry powder cake
                  soufflé wafer caramels. Jelly-o pie cupcake.
                </p>
              </TabPane>
              <TabPane tabId="3">
                <p>
                  Icing croissant powder jelly bonbon cake marzipan fruitcake. Tootsie roll marzipan
                  tart marshmallow pastry cupcake chupa chups cookie. Fruitcake dessert lollipop
                  pudding jelly. Cookie dragée jujubes croissant lemon drops cotton candy. Carrot
                  cake candy canes powder donut toffee cookie.
                </p>
              </TabPane>
              <TabPane tabId="4">
                <p>
                  Icing croissant powder jelly bonbon cake marzipan fruitcake. Tootsie roll marzipan
                  tart marshmallow pastry cupcake chupa chups cookie. Fruitcake dessert lollipop
                  pudding jelly. Cookie dragée jujubes croissant lemon drops cotton candy. Carrot
                  cake candy canes powder donut toffee cookie.
                </p>
              </TabPane>
              <TabPane tabId="5">
                <p>
                  Icing croissant powder jelly bonbon cake marzipan fruitcake. Tootsie roll marzipan
                  tart marshmallow pastry cupcake chupa chups cookie. Fruitcake dessert lollipop
                  pudding jelly. Cookie dragée jujubes croissant lemon drops cotton candy. Carrot
                  cake candy canes powder donut toffee cookie.
                </p>
              </TabPane>
              <TabPane tabId="6">
                <p>
                  Icing croissant powder jelly bonbon cake marzipan fruitcake. Tootsie roll marzipan
                  tart marshmallow pastry cupcake chupa chups cookie. Fruitcake dessert lollipop
                  pudding jelly. Cookie dragée jujubes croissant lemon drops cotton candy. Carrot
                  cake candy canes powder donut toffee cookie.
                </p>
              </TabPane>
              <TabPane tabId="7">
                <p>
                  Icing croissant powder jelly bonbon cake marzipan fruitcake. Tootsie roll marzipan
                  tart marshmallow pastry cupcake chupa chups cookie. Fruitcake dessert lollipop
                  pudding jelly. Cookie dragée jujubes croissant lemon drops cotton candy. Carrot
                  cake candy canes powder donut toffee cookie.
                </p>
              </TabPane>
              <TabPane tabId="8">
                <p>
                  Icing croissant powder jelly bonbon cake marzipan fruitcake. Tootsie roll marzipan
                  tart marshmallow pastry cupcake chupa chups cookie. Fruitcake dessert lollipop
                  pudding jelly. Cookie dragée jujubes croissant lemon drops cotton candy. Carrot
                  cake candy canes powder donut toffee cookie.
                </p>
              </TabPane>
              <TabPane tabId="9">
                <p>
                  Icing croissant powder jelly bonbon cake marzipan fruitcake. Tootsie roll marzipan
                  tart marshmallow pastry cupcake chupa chups cookie. Fruitcake dessert lollipop
                  pudding jelly. Cookie dragée jujubes croissant lemon drops cotton candy. Carrot
                  cake candy canes powder donut toffee cookie.
                </p>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};
export default UserProfile;
