import { lazy } from "react";

const MyGiftRoutes = [
  {
    path: "/mygift/allgifts",
    component: lazy(() => import("../../views/mygift/Index")),
  },
];

export default MyGiftRoutes;
