import React from "react";
import { Col, NavLink, Row } from "reactstrap";

function StatisCard() {
  return (
    <div>
      <Row className="match-height">
        <Col lg="3" sm="6">
          <NavLink>
            <div
              style={{
                backgroundColor: "#2196f3",
                padding: "10px",
                borderRadius: "3px",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ color: "#fff", fontSize: "16px" }}>
                Total Contacts
                <span
                  style={{ color: "#fff", float: "right", fontSize: "25px" }}
                >
                  40
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
              <h3 style={{ color: "#fff", fontSize: "16px" }}>
                Active Contacts
                <span
                  style={{ color: "#fff", float: "right", fontSize: "25px" }}
                >
                  23
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
              <h3 style={{ color: "#fff", fontSize: "16px" }}>
                Inactive Contacts
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
                backgroundColor: "#f66955",
                padding: "10px",
                borderRadius: "3px",
                marginBottom: "10px",
              }}
            >
              <h3 style={{ color: "#fff", fontSize: "16px" }}>
                Former Contacts
                <span
                  style={{ color: "#fff", float: "right", fontSize: "25px" }}
                >
                  4
                </span>
              </h3>
            </div>
          </NavLink>
        </Col>
      </Row>
    </div>
  );
}

export default StatisCard;
