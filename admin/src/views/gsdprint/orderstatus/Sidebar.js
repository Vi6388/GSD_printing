// ** React Import
import { useState } from "react";
// ** Custom Components
import Sidebar from "@components/sidebar";
import classnames from "classnames";
// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, Row, Col } from "reactstrap";
import { } from "jspdf-autotable";
const SidebarCreateProduct = ({
   open,
   toggleSidebar,
}) => {

   const handleSidebarClosed = () => {
   };
   return (
      <Sidebar
         size="lg"
         open={open}
         title="Add Paper Type"
         headerClassName="mb-1"
         contentClassName="pt-0"
         toggleSidebar={toggleSidebar}
         onClosed={handleSidebarClosed}
      >
         <Form>
            <Row>
               <Col md="12">
                  <div className="mb-1">
                     <Label>
                        Paper Image
                     </Label>
                     <Input type="File" />
                  </div>
               </Col>
               <Col md="12">
                  <div className="mb-1">
                     <Label>
                       Paper Name
                     </Label>
                     <Input type="text" placeholder="name" />
                  </div>
               </Col>
              
               <Col md="12">
                  <div className="mb-1">
                     <Label>
                        Paper Type
                     </Label>
                       <Input type="text" placeholder=" Paper Type" />
                  </div>
               </Col>
              
               <Col md="12">
                  <div className="mb-2">
                     <Button color="primary">Add paper</Button>
                  </div>
               </Col>
            </Row>
         </Form>
      </Sidebar>
   );
};

export default SidebarCreateProduct;
