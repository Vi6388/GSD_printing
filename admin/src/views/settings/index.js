// ** React Imports
import { Fragment, useState, useEffect } from "react";
// ** Reactstrap Imports
import {
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
// ** Icons Imports
import { GiRank2 } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { BsUiChecks } from "react-icons/bs";
import { BsListCheck } from "react-icons/bs";
import { MdOutlineNotifications } from "react-icons/md";
import axios from "axios";

// ** User Components
import Billing from "./tabs/billing";
import Account from "./tabs/account";
import Rolesandper from "./tabs/rolesandper";
import Security from "./tabs/security";
import Progressiontab from "./tabs/progressiontab";
import { CgPassword } from "react-icons/cg";
import { List } from "react-feather";
import { BiSolidDollarCircle } from "react-icons/bi";
import MembershipTabs from "./tabs/membership/Index";
import DepositList from "./tabs/DepositList";
import WithdrawList from "./tabs/WithdrawList";
import TransactionList from "./tabs/TransactionList";
import BreadCrumbs from '@components/breadcrumbs';

const UserTabs = () => {
  const [active, setActive] = useState("1");
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  useEffect(() => {
    const params1 = window.location.pathname.split("/setting/");
    if (params1[1] === "wallet") {
      setActive("8");
    }
  }, [""]);
  return (
    <>
    <BreadCrumbs
                breadCrumbTitle="Setting"
                breadCrumbParent="Dashboard"
                breadCrumbActive="Setting"
            />
      <Row>
        <Col xl="12" xs={{ order: 0 }} md={{ order: 1, size: 12 }}>
          <Fragment>
            <Nav pills className="mb-2">
              <NavItem>
                <NavLink
                  active={active === "1"}
                  onClick={() => toggleTab("1")}
                  style={{ padding: "5px" }}
                >
                  <FiSettings className="font-medium-1 me-50" />
                  <span style={{ fontSize: "13px" }}>Basic Info</span>
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink
                  active={active === "2"}
                  onClick={() => toggleTab("2")}
                  style={{ padding: "5px" }}
                >
                  <BsUiChecks className="font-medium-1 me-50" />
                  <span style={{ fontSize: "13px" }}>Membership</span>
                </NavLink>
              </NavItem> */}
              {/* <NavItem>
                <NavLink
                  active={active === "3"}
                  onClick={() => toggleTab("3")}
                  style={{ padding: "5px" }}
                >
                  <GiRank2 className="font-medium-1 me-50" />
                  <span style={{ fontSize: "13px" }}>Billing Info</span>
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink
                  active={active === "4"}
                  onClick={() => toggleTab("4")}
                  style={{ padding: "5px" }}
                >
                  <CgPassword className="font-medium-1 me-50" />
                  <span style={{ fontSize: "13px" }}>Change Password</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === "5"}
                  onClick={() => toggleTab("5")}
                  style={{ padding: "5px" }}
                >
                  <MdOutlineNotifications className="font-medium-1 me-50" />
                  <span style={{ fontSize: "13px" }}>Email Notification</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === "6"}
                  onClick={() => toggleTab("6")}
                  style={{ padding: "5px" }}
                >
                  <BiSolidDollarCircle className="font-medium-1 me-50" />
                  <span style={{ fontSize: "13px" }}>Withdrawal</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === "7"}
                  onClick={() => toggleTab("7")}
                  style={{ padding: "5px" }}
                >
                  <BiSolidDollarCircle className="font-medium-1 me-50" />
                  <span style={{ fontSize: "13px" }}>Deposit</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={active === "8"}
                  onClick={() => toggleTab("8")}
                  style={{ padding: "5px" }}
                >
                  <List className="font-medium-1 me-50" />
                  <span style={{ fontSize: "13px" }}>Transaction History</span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={active}>
              <TabPane tabId="1">
                <Account />
              </TabPane>
              {/* <TabPane tabId="2">
                <MembershipTabs />
              </TabPane>
              <TabPane tabId="3">
                <Billing />
              </TabPane> */}
              <TabPane tabId="4">
                <Security />
              </TabPane>
              <TabPane tabId="5">
                <h2>Email Notification</h2>
              </TabPane>
              <TabPane tabId="6">
                <WithdrawList />
              </TabPane>
              <TabPane tabId="7">
                <DepositList />
              </TabPane>
              <TabPane tabId="8">
                <TransactionList />
              </TabPane>
            </TabContent>
          </Fragment>
        </Col>
      </Row>
    </>
  );
};
export default UserTabs;
