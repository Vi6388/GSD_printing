// ** Icons Import
// import { Home } from 'react-feather';
import { Gift } from "react-feather";

export default [
  {
    id: "mygift",
    title: "My Gift",
    icon: <Gift size={20} />,
    badge: "light-warning",
    navLink: "/mygift/allgifts",
    action: "read",
    resource: "home",
  },
];
