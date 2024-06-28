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
} from "reactstrap";
import "../../../assets/styles/Yougift.scss";
import { BsPenFill } from "react-icons/bs";
const avatarGroupData1 = [
  {
    title: "Leslie",
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: "Quinn",
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: "Quinn",
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26,
  },
];

const avatarGroupData2 = [
  {
    title: "Felicia",
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: "Brent",
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: "Patricia",
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26,
  },
];

const avatarGroupData3 = [
  {
    title: "Breanna",
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: "Peter",
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: "Cherokee",
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26,
  },
];

const avatarGroupData4 = [
  {
    title: "Martina",
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: "Butcher",
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26,
  },
  {
    title: "Noel",
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26,
  },
];

const TableList = () => {
  return (
    <Table bordered responsive className="table-dashboard">
      <thead>
        <tr>
          <th>
            <input type="checkbox" style={{ marginRight: "4px" }} />
            Contact
          </th>
          <th>Account</th>
          <th>Events</th>
          <th>Events Date</th>
          <th>Reminder</th>
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
          <td>birthday</td>
          <td>01/02/2023</td>
          <td>01/02/2023</td>
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
          <td>birthday</td>
          <td>01/02/2023</td>
          <td>01/02/2023</td>
          <td>
            <Badge pill color="light-primary" className="me-1">
              InActive
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
          <td>birthday</td>
          <td>01/02/2023</td>
          <td>01/02/2023</td>
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
          <td>birthday</td>
          <td>01/02/2023</td>
          <td>01/02/2023</td>
          <td>
            <Badge pill color="light-primary" className="me-1">
              InActive
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
          <td>birthday</td>
          <td>01/02/2023</td>
          <td>01/02/2023</td>
          <td>
            <Badge pill color="light-warning" className="me-1">
              Pending
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
          <td>birthday</td>
          <td>01/02/2023</td>
          <td>01/02/2023</td>
          <td>
            <Badge pill color="light-info" className="me-1">
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
          <td>birthday</td>
          <td>01/02/2023</td>
          <td>01/02/2023</td>
          <td>
            <Badge pill color="light-primary" className="me-1">
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
  );
};

export default TableList;
