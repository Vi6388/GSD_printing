// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import "../../../../assets/styles/Yougift.scss";
import MonthlyPlan from "./MonthlyPlan";
import AnnualPlan from "./AnnualPlan";
const MembershipTabs = () => {
  // ** State
  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <Fragment>
      <div>
        <Row>
          <Col lg="12">
            <div className="text-center mt=20">
              <h2
                style={{ fontWeight: "700", fontSize: "25px", color: "#000" }}
              >
                Try a You Gift Membership
              </h2>
              <p style={{ fontSize: "12px", fontWeight: "600", color: "#000" }}>
                Browse your plan to find one thats right for you{" "}
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <Nav className="justify-content-center mt-1" tabs>
        <NavItem className="member-plan-1">
          <NavLink
            className="member-plan-2"
            active={active === "1"}
            onClick={() => {
              toggle("1");
            }}
          >
            Monthly plan
          </NavLink>
        </NavItem>
        <NavItem className="member-plan-1">
          <NavLink
            className="member-plan-2"
            active={active === "2"}
            onClick={() => {
              toggle("2");
            }}
          >
            Annual Plan
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          <MonthlyPlan />
        </TabPane>
        <TabPane tabId="2">
          <AnnualPlan />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default MembershipTabs;
