/* eslint-disable no-unused-vars */
import { Sun, User } from 'react-feather';
import img5 from '@src/assets/images/portrait/small/avatar-s-4.jpg';
import AddEmpolye from './AddEmpolye';
import { Row, Col, Badge } from 'reactstrap';
import DayBottomToolBar from './DayBottomToolBar';

const days = [
  '7am',
  '8am',
  '9am',
  '10am',
  '11am',
  '12pm',
  '1pm',
  '2pm',
  '3pm',
  '4pm',
  '5pm',
  '6pm',
  '7pm',
  '8pm',
  '9pm',
  '10pm',
  '11pm',
  '12am',
  '1am'
];
function DayCalendar() {
  return (
    <div className="w-100 shadow p-3 mb-5 bg-white rounded">
      <Row>
        <Col sm="12" md="12" lg="12">
          <table
            align="center"
            className="bordered-table"
            style={{
              height: '60vh',
              overflow: 'scroll'
            }}
          >
            <tbody>
              <tr>
                <td className="cursor-pointer">
                  <div className="d-flex">
                    <AddEmpolye />
                    <div className="d-flex m-1">
                      <Sun size={18} />
                      <span>30 F</span>
                      <span>66</span>
                    </div>
                  </div>
                </td>
                {days.map((item, i) => {
                  return (
                    <td
                      key={i}
                      align="end"
                      height="100"
                      width="100"
                      className="cursor-pointer font-size font-small-2"
                    >
                      {item}
                      <div>
                        <User size={18} />
                        <span>12</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="p-1">Events</td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
              </tr>
              <tr>
                <td className="p-1">Open Shift</td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
                <td className="cursor-pointer"></td>
              </tr>
              {data.map((item, i) => (
                <tr key={i}>
                  <td className="cursor-pointer" id="sub">
                    <div className="d-flex p-1">
                      <img
                        src={img5}
                        className="rounded-circle me-2"
                        alt="Generic placeholder image"
                        height="50"
                        width="50"
                      />
                      <div className="ml-1">
                        <h5 className="font-weight-bold">Antanio S</h5>
                        <span>0.00 - $0.00</span>
                      </div>
                    </div>
                  </td>
                  <td className="cursor-pointer">
                    <div draggable="true">
                      <div>
                        <div style={{ backgroundColor: 'rgb(150, 89, 169)' }}>L</div>
                        <div className="base-shift__details">
                          <div className="base-shift__time">10am - 6pm</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                  <td className="cursor-pointer"></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr
                style={{
                  position: 'sticky',
                  bottom: '0px'
                }}
              >
                <td className="cursor-pointer font-small-2" align="center">
                  <div className="d-flex justify-content-between p-1 align-items-center">
                    <div>
                      <Badge>1</Badge>
                    </div>
                    <div className="row">
                      <span className="col-12 fw-bolder">4 Hrs</span>
                      <span className="col-12 fw-bolder">$298</span>
                    </div>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
                <td align="end" width="100" className="cursor-pointer font-small-2">
                  <div className="row">
                    <span className="col-12 fw-bolder">4 Hrs</span>
                    <span className="col-12 fw-bolder">$298</span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </Col>
      </Row>
    </div>
  );
}
export default DayCalendar;

const data = [
  {
    id: 1,
    first_name: 'Sancho',
    last_name: 'Vautin',
    email: 'svautin0@yahoo.com',
    gender: 'Male',
    ip_address: '89.254.178.128'
  },
  {
    id: 2,
    first_name: 'Moshe',
    last_name: 'Haggar',
    email: 'mhaggar1@rakuten.co.jp',
    gender: 'Male',
    ip_address: '163.226.116.140'
  },
  {
    id: 3,
    first_name: 'Linus',
    last_name: 'McGiven',
    email: 'lmcgiven2@yahoo.com',
    gender: 'Male',
    ip_address: '43.48.178.43'
  },
  {
    id: 4,
    first_name: 'Sherie',
    last_name: 'Chasson',
    email: 'schasson3@parallels.com',
    gender: 'Female',
    ip_address: '220.61.179.138'
  },
  {
    id: 5,
    first_name: 'Dud',
    last_name: 'Monk',
    email: 'dmonk4@tripadvisor.com',
    gender: 'Male',
    ip_address: '166.52.51.7'
  },
  {
    id: 6,
    first_name: 'Dud',
    last_name: 'Monk',
    email: 'dmonk4@tripadvisor.com',
    gender: 'Male',
    ip_address: '166.52.51.7'
  }
];
