// ** React Imports
import { useContext, useEffect, useState } from "react";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  NavLink,
} from "reactstrap";
// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import TableList from "./TableList";
import Listbox from "./Listbox";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { User, UserPlus, UserCheck, UserX, Lock } from "react-feather";
import { BiCategory, BiDollarCircle, BiLogoProductHunt } from "react-icons/bi";
import { FcTemplate } from "react-icons/fc";
import { GoListOrdered } from "react-icons/go";

import { getDashboardData } from "../../../requests/admin/dashboardAPI";

const AnalyticsDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors);
  const [info, setInfo] = useState({ 
    totalProductCount: 0,
    totalCategoryCount: 0,
    newCategoryCount: 0,
    lockProductsCount: 0,
    totalProductTemplateCount: 0,
    totalActiveUsersCount: 0,
    totalInActiveUsersCount: 0,
    totalTransaction: 0
  });

  useEffect(async () => {
    const info = await getDashboardData();
    setInfo(info);
  }, [])

  return (
    <div id="dashboard-analytics">
      <Col lg="12">
        <Breadcrumb>
          <BreadcrumbItem>
            <h2 style={{ marginBottom: "10px" }}><strong>Welcome <span style={{color:'#ec008c'}}>GSDPrinting </span> Admin</strong></h2>
          </BreadcrumbItem>
        </Breadcrumb>
      </Col>
      <Row className="match-height">
      <Col lg="3" sm="6">
            <StatsHorizontal
              color="info"
              statTitle="Total Products"
              icon={<BiLogoProductHunt size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{ info.totalProductCount }</h3>}
            />
          </Col>
        
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="Total Category"
              icon={<BiCategory size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{ info.totalCategoryCount }</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="New Category"
              icon={<BiCategory size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{ info.newCategoryCount }</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="Lock Products"
              icon={<Lock size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{ info.lockProductsCount }</h3>}
            />
          </Col>
         
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="Products Templates"
              icon={<FcTemplate size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{ info.totalProductTemplateCount }</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="Order Status"
              icon={<GoListOrdered size={20} />}
              renderStats={<h3 className="fw-bolder mb-75"> 3 K</h3>}
            />
          </Col>
        
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="Active Users"
              icon={<UserPlus size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{ info.totalActiveUsersCount }</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="Inactive Users"
              icon={<UserCheck size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{ info.totalInActiveUsersCount }</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="New Users"
              icon={<UserX size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">4 K</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="Total Tansaction"
              icon={<BiDollarCircle size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">${ info.totalTransaction }</h3>}
            />
          </Col>
         
        {/* <Col lg="3" sm="6">
          <NavLink>
            <div
              style={{
                backgroundColor: "#2196f3",
                padding: "10px",
                borderRadius: "3px",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ color: "#fff", fontSize: "18px" }}>
                Total Contacts
                <span
                  style={{ color: "#fff", float: "right", fontSize: "25px" }}
                >
                  4
                </span>
              </h3>
            </div>
          </NavLink>
        </Col>
        <Col lg="3" sm="6">
          <NavLink>
            <div
              style={{
                backgroundColor: "#02a75b",
                padding: "10px",
                borderRadius: "3px",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ color: "#fff", fontSize: "18px" }}>
                Total My Gifts
                <span
                  style={{ color: "#fff", float: "right", fontSize: "25px" }}
                >
                  7
                </span>
              </h3>
            </div>
          </NavLink>
        </Col>
        <Col lg="3" sm="6">
          <NavLink>
            <div
              style={{
                backgroundColor: "#f29c13",
                padding: "10px",
                borderRadius: "3px",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ color: "#fff", fontSize: "18px" }}>
                Total Gift Sent
                <span
                  style={{ color: "#fff", float: "right", fontSize: "25px" }}
                >
                  1
                </span>
              </h3>
            </div>
          </NavLink>
        </Col>
        <Col lg="3" sm="6">
          <NavLink>
            <div
              style={{
                backgroundColor: "#f66955",
                padding: "10px",
                borderRadius: "3px",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ color: "#fff", fontSize: "18px" }}>
                Upcoming Gifts
                <span
                  style={{ color: "#fff", float: "right", fontSize: "25px" }}
                >
                  4
                </span>
              </h3>
            </div>
          </NavLink>
        </Col> */}
      </Row>
      <Row>
        {/* <Col lg="12">
          <div>
            <h4
              style={{
                backgroundColor: "#fff",
                borderRadius: "4px",
                padding: "10px 10px",
              }}
            >
              Upcoming Gifts
              <span style={{ marginLeft: "10px" }}>
                <button
                  className="btn btn-primary round"
                  style={{ padding: "6px 8px", fontSize: "12px" }}
                >
                  Pay all
                </button>
              </span>
            </h4>
          </div>
        </Col> */}
      </Row>
      <br />
      <Row>
        {/* <Col lg="8" md="8">
          <TableList />
        </Col>
        <Col lg="4" md="4">
          <Listbox />
        </Col> */}
      </Row>
    </div>
  );
};

export default AnalyticsDashboard;
