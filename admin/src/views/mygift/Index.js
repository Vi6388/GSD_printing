// ** React Imports
import { useContext } from "react";

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
import FolderList from "./FolderList";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

import GiftList from "./GiftList";

const Index = () => {
  // ** Context
  const { colors } = useContext(ThemeColors);
  return (
    <div id="dashboard-analytics">
      <Row>
        <Col lg="12">
          <Breadcrumb>
            <BreadcrumbItem>
              <h4 style={{ marginBottom: "10px" }}>MyGifts</h4>
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
        <Col lg="12">
          <Card>
            <CardBody>
              <FolderList />
            </CardBody>
          </Card>
        </Col>
        <Col lg="12">
          <GiftList />
        </Col>
      </Row>
    </div>
  );
};

export default Index;
