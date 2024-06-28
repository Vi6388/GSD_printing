import React from "react";
import {
  Col,
  Container,
  Row,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
} from "reactstrap";
import ProductImage from "./ProductImage";
import TabIndex from "./TabIndex";
import CounterInput from "react-counter-input";

function index() {
  return (
    <div>
      <Row>
        <Col lg="12">
          <Breadcrumb>
            <BreadcrumbItem>
              <h4 style={{ marginBottom: "10px" }}>Custom Product detail</h4>
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Card>
        <CardBody>
          <Row>
            <Col lg="6">
              <ProductImage />
            </Col>
            <Col lg="6">
              <div style={{ border: "1px solid rgb(204 204 204 / 25%)" }}>
                <TabIndex />
              </div>
              <div
                className=""
                style={{
                  display: "inline-block",
                  width: "100%",
                  marginTop: "25px",
                }}
              >
                <div style={{ float: "left" }}>
                  <CounterInput
                    min={0}
                    max={10}
                    onCountChange={(count) => console.log(count)}
                  />
                </div>
                <div style={{ float: "right" }}>
                  <h2
                    style={{
                      fontWeight: "bold",
                      fontSize: "25px",
                      color: "#e60c0a",
                    }}
                  >
                    $21.59
                  </h2>
                </div>
              </div>
              <hr />
              <div style={{ marginTop: "20px" }}>
                <button className="btn btn-primary">Add to Gift List</button>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default index;
