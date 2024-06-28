import React from "react";
import { Card, CardBody, CardText, Col, Container, Row } from "reactstrap";
// ** Related products images
function AnnualPlan() {
  // ** Related Plan
  const plans = [
    {
      planname: "Basic",
      price: "Free",
      status: "Current Plan",
    },
    {
      planname: "Gold",
      price: "$10/mo.",
      status: "Upgrade",
    },
    {
      planname: "Corporate",
      price: "$30/mo.",
      status: "Upgrade",
    },
    {
      planname: "Corporate VIP",
      price: "Custom",
      status: "Contact Us",
    },
  ];

  return (
    <div>
      <Row>
        {plans.map((plan) => {
          return (
            <Col md="3" sm="2" className="mt-2">
              <a href="/" onClick={(e) => e.preventDefault()}>
                <h4
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "800",
                    color: "#000",
                    backgroundColor: "#c3c3c3",
                    marginBottom: "0px",
                    padding: "8px",
                  }}
                >
                  {plan.planname}
                </h4>
                <Card className="text-center">
                  <CardBody>
                    <h2
                      style={{
                        textAlign: "center",
                        fontSize: "28px",
                        fontWeight: "800",
                        color: "#000",
                      }}
                    >
                      {plan.price}
                    </h2>
                    <button
                      className="btn"
                      style={{
                        backgroundColor: "#0a7ce6",
                        padding: "8px 40px",
                        color: "#fff",
                      }}
                    >
                      {plan.status}
                    </button>
                    <hr />
                    <ul
                      style={{
                        listStyle: "none",
                        textDecoration: "none",
                        padding: "0px",
                      }}
                    >
                      <li
                        style={{
                          lineHeight: "20px",
                          color: "#000",
                          fontSize: "12px",
                          fontWeight: "400",
                        }}
                      >
                        1 Event Per Contact
                      </li>
                      <li
                        style={{
                          lineHeight: "30px",
                          fontSize: "12px",
                          fontWeight: "400",
                          color: "#000",
                        }}
                      >
                        Add up to 1 gift per Event
                      </li>
                      <li
                        style={{
                          lineHeight: "30px",
                          fontSize: "12px",
                          color: "#000",
                          fontWeight: "400",
                        }}
                      >
                        Free Account for Life
                      </li>
                      <li
                        style={{
                          lineHeight: "30px",
                          fontSize: "12px",
                          color: "#000",
                          fontWeight: "400",
                        }}
                      >
                        Add up to 100 Contact
                      </li>
                      <li
                        style={{
                          lineHeight: "30px",
                          fontSize: "12px",
                          color: "#000",
                          fontWeight: "400",
                        }}
                      >
                        Customize upoto Two Gift
                      </li>
                      <li
                        style={{
                          lineHeight: "30px",
                          fontSize: "12px",
                          color: "#000",
                          fontWeight: "400",
                        }}
                      >
                        Email Customer Support
                      </li>
                    </ul>
                  </CardBody>
                </Card>
              </a>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default AnnualPlan;
