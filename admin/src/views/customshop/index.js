// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import MyShop from "./MyShop";

const index = () => {
  // ** State
  // const [active, setActive] = useState('1')

  // const toggle = tab => {
  //   if (active !== tab) {
  //     setActive(tab)
  //   }
  // }
  return (
    <Fragment>
      <Row>
        <Col lg="12">
          <Breadcrumb>
            <BreadcrumbItem>
              <h4 style={{ marginBottom: "10px" }}>Custom Shop</h4>
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        {/* <Col lg="12">
         <Nav tabs >
        <NavItem>
          <NavLink
            active={active === '1'}
            onClick={() => {
              toggle('1')
            }}
          >
            My Shop
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '3'}
            onClick={() => {
              toggle('3')
            }}
          >
            Products
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className='py-50' activeTab={active}>
        <TabPane tabId='1'>
             tyyytyty
        </TabPane>
        <TabPane tabId='2'>
          <p>
            Dragée jujubes caramels tootsie roll gummies gummies icing bonbon. Candy jujubes cake cotton candy. Jelly-o
            lollipop oat cake marshmallow fruitcake candy canes toffee. Jelly oat cake pudding jelly beans brownie lemon
            drops ice cream halvah muffin. Brownie candy tiramisu macaroon tootsie roll danish.
          </p>
          <p>
            Croissant pie cheesecake sweet roll. Gummi bears cotton candy tart jelly-o caramels apple pie jelly danish
            marshmallow. Icing caramels lollipop topping. Bear claw powder sesame snaps.
          </p>
        </TabPane>
        <TabPane tabId='3'>
          <p>
            Gingerbread cake cheesecake lollipop topping bonbon chocolate sesame snaps. Dessert macaroon bonbon carrot
            cake biscuit. Lollipop lemon drops cake gingerbread liquorice. Sweet gummies dragée. Donut bear claw pie
            halvah oat cake cotton candy sweet roll. Cotton candy sweet roll donut ice cream.
          </p>
          <p>
            Halvah bonbon topping halvah ice cream cake candy. Wafer gummi bears chocolate cake topping powder. Sweet
            marzipan cheesecake jelly-o powder wafer lemon drops lollipop cotton candy.
          </p>
        </TabPane>
      </TabContent>
         </Col> */}
        <MyShop />
      </Row>
    </Fragment>
  );
};
export default index;
