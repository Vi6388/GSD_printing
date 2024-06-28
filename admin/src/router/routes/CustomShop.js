import { lazy } from "react";

const CustomShopRoutes = [
  {
    path: "/customshop",
    component: lazy(() => import("../../views/customshop/index")),
  },
  {
    path: "/products",
    component: lazy(() => import("../../views/customshop/CustomProduct")),
  },
  {
    path: "/productdetail/index",
    component: lazy(() => import("../../views/customshop/productdetail/index")),
  },
  {
    path: "/productdetail/demoapp",
    component: lazy(() =>
      import("../../views/customshop/productdetail/DemoApp")
    ),
  },
];

export default CustomShopRoutes;
