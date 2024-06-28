// // ** React Imports
// import { Fragment, useState } from "react";
// import { Camera } from "react-feather";
// import { MdOutlineTextFields } from "react-icons/md";
// import { FaTshirt } from "react-icons/fa";

// // ** Reactstrap Imports
// import {
//   TabContent,
//   TabPane,
//   Nav,
//   NavItem,
//   NavLink,
//   Row,
//   Col,
// } from "reactstrap";
// import TabProduct from "../../shop/detail/tab/TabProduct";
// import TabItem from "./TabItem";
// import { TabAddImage } from "./TabAddImage";
// import AddText from "./AddText";

// const TabIndex = () => {
//   // ** State
//   const [active, setActive] = useState("1");

//   const toggle = (tab) => {
//     if (active !== tab) {
//       setActive(tab);
//     }
//   };
//   return (
//     <Fragment>
//       <div className="p-1">
//         <Nav tabs className="justify-content-center">
//           <NavItem>
//             <NavLink
//               active={active === "1"}
//               onClick={() => {
//                 toggle("1");
//               }}
//             >
//               <FaTshirt size={25} />
//               Products
//             </NavLink>
//           </NavItem>
//           <NavItem>
//             <NavLink
//               active={active === "2"}
//               onClick={() => {
//                 toggle("2");
//               }}
//             >
//               <Camera size={25} />
//               Add Image
//             </NavLink>
//           </NavItem>
//           <NavItem>
//             <NavLink
//               active={active === "3"}
//               onClick={() => {
//                 toggle("3");
//               }}
//             >
//               <MdOutlineTextFields size={25} />
//               Add Text
//             </NavLink>
//           </NavItem>
//         </Nav>
//         <TabContent className="py-50" activeTab={active}>
//           <TabPane tabId="1">
//             <TabItem />
//           </TabPane>
//           <TabPane tabId="2">
//             <TabAddImage />
//           </TabPane>
//           <TabPane tabId="3">
//             <AddText />
//           </TabPane>
//         </TabContent>
//       </div>
//     </Fragment>
//   );
// };
// export default TabIndex;
