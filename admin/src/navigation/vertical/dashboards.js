// ** Icons Import
// import { Home } from 'react-feather';
import { DollarSign, File, Lock, Paperclip, Settings, Users } from "react-feather";
import { BiCategory, BiStore } from "react-icons/bi";
import { BsSpeedometer } from "react-icons/bs";
import { FaProductHunt } from "react-icons/fa";
import { FcTemplate } from "react-icons/fc";
import { GoListOrdered } from "react-icons/go";
import { GrProductHunt } from "react-icons/gr";

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <BsSpeedometer size={20} />,
    badge: "light-warning",
    navLink: "/dashboard/analytics",
    action: "read",
    resource: "home",
  },

  {
    id: "shop",
    title: "Shop",
    icon: <BiStore size={20} />,
    badge: "light-warning",
    navLink: "/shop",
    action: "read",
    resource: "home",
  },


  {
    id: "product",
    title: " Create Products",
    icon: <GrProductHunt size={20} />,
    badge: "light-warning",
    navLink: "/createproduct",
    action: "read",
    resource: "home",
  },

  {
    id: "category",
    title: "Category",
    icon: <BiCategory size={20} />,
    badge: "light-warning",
    navLink: "/category",
    action: "read",
    resource: "home",
  },

  {
    id: "paper",
    title: "Paper Type",
    icon: <Paperclip size={20} />,
    badge: "light-warning",
    navLink: "/papertype",
    action: "read",
    resource: "home",
  },

  {
    id: "lock",
    title: "Lock Product Area",
    icon: <Lock size={20} />,
    badge: "light-warning",
    navLink: "/lockproduct",
    action: "read",
    resource: "home",
  },

  {
    id: "order",
    title: "Order Status",
    icon: <GoListOrdered size={20} />,
    badge: "light-warning",
    navLink: "/orderstatus",
    action: "read",
    resource: "home",
  },

  {
    id: "user",
    title: "Users",
    icon: <Users size={20} />,
    badge: "light-warning",
    navLink: "/users",
    action: "read",
    resource: "home",
  },

  
  {
    id: "products templates",
    title: "Products Templates",
    icon: <FcTemplate size={20} />,
    badge: "light-warning",
    navLink: "/template",
    action: "read",
    resource: "home",
  },

  {
    id: "transaction",
    title: "Transaction List",
    icon: <DollarSign size={20} />,
    badge: "light-warning",
    navLink: "/transaction",
    action: "read",
    resource: "home",
  },

  {
    id: "invoice",
    title: "Invoice",
    icon: <File size={20} />,
    badge: "light-warning",
    navLink: "/invoice/list",
    action: "read",
    resource: "home",
  },

  {
    id: "settings",
    title: "Settings",
    icon: <Settings size={20} />,
    badge: "light-warning",
    navLink: "/setting",
    action: "read",
    resource: "home",
  },
];
