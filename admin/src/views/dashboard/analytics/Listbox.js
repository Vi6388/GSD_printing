import React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

function Listbox() {
  return (
    <div>
      <Card>
        <CardHeader
          style={{
            padding: "10px",
            justifyContent: "center",
            backgroundColor: "rgb(230, 12, 10)",
          }}
        >
          <CardTitle
            className="text-center"
            style={{ color: "#fff", fontSize: "16px" }}
          >
            Start Gifting in Easy 5 Steps
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div className="step-list">
            <ul style={{ listStyle: "none", padding: "0px" }}>
              <li>
                <div className="d-flex">
                  <div className="sm-box">
                    <p>
                      Step
                      <h2>01</h2>
                    </p>
                  </div>
                  <div>
                    <h4>
                      Upload Your Contacts
                      <p>
                        To see how
                        <span>click here</span>
                      </p>
                    </h4>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <div className="sm-box">
                    <p>
                      Step
                      <h2>02</h2>
                    </p>
                  </div>
                  <div>
                    <h4>
                      Upload Your Contacts
                      <p>
                        To see how
                        <span>click here</span>
                      </p>
                    </h4>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <div className="sm-box">
                    <p>
                      Step
                      <h2>03</h2>
                    </p>
                  </div>
                  <div>
                    <h4>
                      Upload Your Contacts
                      <p>
                        To see how
                        <span>click here</span>
                      </p>
                    </h4>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <div className="sm-box">
                    <p>
                      Step
                      <h2>04</h2>
                    </p>
                  </div>
                  <div>
                    <h4>
                      Upload Your Contacts
                      <p>
                        To see how
                        <span>click here</span>
                      </p>
                    </h4>
                  </div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <div className="sm-box">
                    <p>
                      Step
                      <h2>05</h2>
                    </p>
                  </div>
                  <div>
                    <h4>
                      Upload Your Contacts
                      <p>
                        To see how
                        <span>click here</span>
                      </p>
                    </h4>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Listbox;
