// ** Custom Components
import AvatarGroup from "@components/avatar-group";

// ** Images
import react from "@src/assets/images/icons/react.svg";
import vuejs from "@src/assets/images/icons/vuejs.svg";
import angular from "@src/assets/images/icons/angular.svg";
import bootstrap from "@src/assets/images/icons/bootstrap.svg";
import avatar1 from "@src/assets/images/portrait/small/avatar-s-5.jpg";
import avatar2 from "@src/assets/images/portrait/small/avatar-s-6.jpg";
import avatar3 from "@src/assets/images/portrait/small/avatar-s-7.jpg";

// ** Icons Imports
import { MoreVertical, Edit, Trash, Edit2, Delete } from "react-feather";
import { BiEdit } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
// ** Reactstrap Imports
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  NavLink,
  Card,
} from "reactstrap";
import "../../../assets/styles/Yougift.scss";
import { BsPenFill } from "react-icons/bs";

const DepositList = () => {
  return (
    <div className="mt-2">
      <Card>
        <Table bordered responsive className="table-dashboard">
          <thead>
            <tr>
              <th>
                <input type="checkbox" style={{ marginRight: "4px" }} />
                name
              </th>
              <th>Account Type</th>
              <th>Deposit amount</th>
              <th>Deposit Date</th>
              <th>Tatal Amount</th>
              <th>Status</th>
              <th>Eidt Order</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" style={{ marginRight: "4px" }} />
                <span className="align-middle fw-bold">Ramil</span>
              </td>
              <td>
                <Button className="btn btn-secondary" size="sm">
                  Family
                </Button>
              </td>
              <td>$400</td>
              <td>01/02/2023</td>
              <td>$800</td>
              <td>
                <Badge pill color="light-success" className="me-1">
                  Active
                </Badge>
              </td>
              <td>
                <div className="d-flex">
                  <NavLink>
                    <BiEdit size="18" color="#000" />
                  </NavLink>
                  <NavLink>
                    <BsTrash size="18" color="#000" />
                  </NavLink>
                  <button
                    className="btn btn-primary"
                    size="sm"
                    style={{ padding: "5px", fontSize: "12px" }}
                  >
                    Pay Now
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" style={{ marginRight: "4px" }} />
                <span className="align-middle fw-bold">Ramil</span>
              </td>
              <td>
                <Button className="btn btn-secondary" size="sm">
                  Family
                </Button>
              </td>
              <td>$400</td>
              <td>01/02/2023</td>
              <td>$800</td>
              <td>
                <Badge pill color="light-success" className="me-1">
                  Active
                </Badge>
              </td>
              <td>
                <div className="d-flex">
                  <NavLink>
                    <BiEdit size="18" color="#000" />
                  </NavLink>
                  <NavLink>
                    <BsTrash size="18" color="#000" />
                  </NavLink>
                  <button
                    className="btn btn-primary"
                    size="sm"
                    style={{ padding: "5px", fontSize: "12px" }}
                  >
                    Pay Now
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" style={{ marginRight: "4px" }} />
                <span className="align-middle fw-bold">Ramil</span>
              </td>
              <td>
                <Button className="btn btn-secondary" size="sm">
                  Family
                </Button>
              </td>
              <td>$400</td>
              <td>01/02/2023</td>
              <td>$800</td>
              <td>
                <Badge pill color="light-success" className="me-1">
                  Active
                </Badge>
              </td>
              <td>
                <div className="d-flex">
                  <NavLink>
                    <BiEdit size="18" color="#000" />
                  </NavLink>
                  <NavLink>
                    <BsTrash size="18" color="#000" />
                  </NavLink>
                  <button
                    className="btn btn-primary"
                    size="sm"
                    style={{ padding: "5px", fontSize: "12px" }}
                  >
                    Pay Now
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" style={{ marginRight: "4px" }} />
                <span className="align-middle fw-bold">Ramil</span>
              </td>
              <td>
                <Button className="btn btn-secondary" size="sm">
                  Family
                </Button>
              </td>
              <td>$400</td>
              <td>01/02/2023</td>
              <td>$800</td>
              <td>
                <Badge pill color="light-success" className="me-1">
                  Active
                </Badge>
              </td>
              <td>
                <div className="d-flex">
                  <NavLink>
                    <BiEdit size="18" color="#000" />
                  </NavLink>
                  <NavLink>
                    <BsTrash size="18" color="#000" />
                  </NavLink>
                  <button
                    className="btn btn-primary"
                    size="sm"
                    style={{ padding: "5px", fontSize: "12px" }}
                  >
                    Pay Now
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" style={{ marginRight: "4px" }} />
                <span className="align-middle fw-bold">Ramil</span>
              </td>
              <td>
                <Button className="btn btn-secondary" size="sm">
                  Family
                </Button>
              </td>
              <td>$400</td>
              <td>01/02/2023</td>
              <td>$800</td>
              <td>
                <Badge pill color="light-success" className="me-1">
                  Active
                </Badge>
              </td>
              <td>
                <div className="d-flex">
                  <NavLink>
                    <BiEdit size="18" color="#000" />
                  </NavLink>
                  <NavLink>
                    <BsTrash size="18" color="#000" />
                  </NavLink>
                  <button
                    className="btn btn-primary"
                    size="sm"
                    style={{ padding: "5px", fontSize: "12px" }}
                  >
                    Pay Now
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" style={{ marginRight: "4px" }} />
                <span className="align-middle fw-bold">Ramil</span>
              </td>
              <td>
                <Button className="btn btn-secondary" size="sm">
                  Family
                </Button>
              </td>
              <td>$400</td>
              <td>01/02/2023</td>
              <td>$800</td>
              <td>
                <Badge pill color="light-success" className="me-1">
                  Active
                </Badge>
              </td>
              <td>
                <div className="d-flex">
                  <NavLink>
                    <BiEdit size="18" color="#000" />
                  </NavLink>
                  <NavLink>
                    <BsTrash size="18" color="#000" />
                  </NavLink>
                  <button
                    className="btn btn-primary"
                    size="sm"
                    style={{ padding: "5px", fontSize: "12px" }}
                  >
                    Pay Now
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" style={{ marginRight: "4px" }} />
                <span className="align-middle fw-bold">Ramil</span>
              </td>
              <td>
                <Button className="btn btn-secondary" size="sm">
                  Family
                </Button>
              </td>
              <td>$400</td>
              <td>01/02/2023</td>
              <td>$800</td>
              <td>
                <Badge pill color="light-success" className="me-1">
                  Active
                </Badge>
              </td>
              <td>
                <div className="d-flex">
                  <NavLink>
                    <BiEdit size="18" color="#000" />
                  </NavLink>
                  <NavLink>
                    <BsTrash size="18" color="#000" />
                  </NavLink>
                  <button
                    className="btn btn-primary"
                    size="sm"
                    style={{ padding: "5px", fontSize: "12px" }}
                  >
                    Pay Now
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" style={{ marginRight: "4px" }} />
                <span className="align-middle fw-bold">Ramil</span>
              </td>
              <td>
                <Button className="btn btn-secondary" size="sm">
                  Family
                </Button>
              </td>
              <td>$400</td>
              <td>01/02/2023</td>
              <td>$800</td>
              <td>
                <Badge pill color="light-success" className="me-1">
                  Active
                </Badge>
              </td>
              <td>
                <div className="d-flex">
                  <NavLink>
                    <BiEdit size="18" color="#000" />
                  </NavLink>
                  <NavLink>
                    <BsTrash size="18" color="#000" />
                  </NavLink>
                  <button
                    className="btn btn-primary"
                    size="sm"
                    style={{ padding: "5px", fontSize: "12px" }}
                  >
                    Pay Now
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default DepositList;
