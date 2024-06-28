import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  CardTitle,
  FormGroup,
  CardText,
  Table,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';

function BlackbeltCreativeForm() {
  return (
    <>
      <div className=" border-dark border-1 m-1">
        <div className="border-dark border-1     p-1">
          <span className="fw-bolder text-black">
            Black Belt Creative Form ( 2023 CMA BROOKLYN REGIONAL CHAMPIONSHIPS )
          </span>
        </div>
        <div className="border-dark border-1">
          <Row>
            <Col sm={5} md={5} lg={5}>
              <div style={{ marginLeft: '10px', marginTop: '14px' }}>
                <span className=" text-black  ">Division:</span>
              </div>
            </Col>
            <Col sm={4} md={7} lg={7}>
              <div className="d-flex justify-content-between m-1">
                <span className=" text-black ">Gender: </span>
                <span className=" text-black  ">Age:</span>
                <span className=" text-black ">Rank: </span>
                <span className=" text-black "> Weight: </span>
              </div>
            </Col>
          </Row>
        </div>

        <div className="border-dark border-1">
          <Row>
            <Table bordered>
              <tbody>
                <tr>
                  <th scope="row" colspan="3">
                    (ID) Member
                  </th>
                  <td>Judge 1</td>
                  <td>Judge 2</td>
                  <td>Judge 3</td>
                  <td>Judge 4</td>
                  <td>Judge 5</td>
                  <td>Score</td>
                  <td>Score + Low</td>
                  <td>Score + High</td>
                </tr>
                <tr>
                  <th scope="row" colspan="3"></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th scope="row" colspan="3"></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </div>
      </div>
      <div className=" border-dark border-1 mt-4 m-1">
        <div className="border-dark border-1     p-1">
          <span className="fw-bolder text-black d-flex justify-content-center">Results</span>
        </div>

        <div className="border-dark border-1">
          <Row>
            <Table bordered>
              <tbody>
                <tr>
                  <td scope="row" colspan="6">
                    1st Place
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td scope="row" colspan="6">
                    2nd Place
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td scope="row" colspan="6">
                    3rd Place
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td scope="row" colspan="6">
                    4th Place
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td scope="row" colspan="6">
                    5th Place
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td scope="row" colspan="6">
                    6th Place
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td scope="row" colspan="6">
                    7th Place
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td scope="row" colspan="6">
                    8th Place
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </div>
      </div>
      <div className="mt-3 text-center">[Page Number ]</div>
    </>
  );
}

export default BlackbeltCreativeForm;
