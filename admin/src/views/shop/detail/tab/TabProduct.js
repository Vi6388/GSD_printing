import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import TabOne from "./TabOne";

function TabProduct() {
  // State for current active Tab
  const [currentActiveTab, setCurrentActiveTab] = useState("1");

  // Toggle active state for Tab
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  return (
    <div
      style={{
        display: "block",
      }}
    >
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({
              active: currentActiveTab === "1",
            })}
            onClick={() => {
              toggle("1");
            }}
          >
            Mens
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: currentActiveTab === "2",
            })}
            onClick={() => {
              toggle("2");
            }}
          >
            Womens
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: currentActiveTab === "3",
            })}
            onClick={() => {
              toggle("3");
            }}
          >
            Baby
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={currentActiveTab} className="mt-2">
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <TabOne />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <TabOne />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <TabOne />
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default TabProduct;
