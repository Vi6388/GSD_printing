import { lazy } from "react";

const DashboardRoutes = [
  // Dashboards
  // {
  //   path: '/dashboard/analytics',
  //   component: lazy(() => import('../../views/dashboard/analytics'))
  // },
  {
    path: "/dashboard/analytics",
    component: lazy(() => import("../../views/dashboard/analytics")),
  },

  {
    path: "/createproduct",
    component: lazy(() => import("../../views/gsdprint/createproduct/CreateProductIndex")),
  },
  {
    path: "/category",
    component: lazy(() => import("../../views/gsdprint/category/CreateProductIndex")),
  },
  {
    path: "/papertype",
    component: lazy(() => import("../../views/gsdprint/papertype/PaperIndex")),
  },
  {
    path: "/lockproduct",
    component: lazy(() => import("../../views/gsdprint/lockproductarea/LockProductArea")),
  },
  {
    path: "/orderstatus",
    component: lazy(() => import("../../views/gsdprint/orderstatus/OrderIndex")),
  },
  {
    path: "/users",
    component: lazy(() => import("../../views/gsdprint/users/UserList")),
  },
  {
    path: "/template",
    component: lazy(() => import("../../views/gsdprint/producttemplate/ProductTemplate")),
  },
  {
    path: "/transaction",
    component: lazy(() => import("../../views/gsdprint/transaction/TransactionList")),
  },
  {
    path: "/builder",
    layout: 'BlankLayout',
    component: lazy(() => import("../../views/gsdprint/cardbuilder/cardbuilder")),
  },
  {
    path: "/dashboard/ecommerce",
    component: lazy(() => import("../../views/dashboard/ecommerce")),
    exact: true,
  },

  // invoice

  {
    path: '/invoice/list',
    component: lazy(() => import('../../views/gsdprint/invoice/list'))

  },
  {
    path: '/invoice/preview/:id',
    component: lazy(() => import('../../views/gsdprint/invoice/preview')),
    meta: {
      navLink: '/apps/invoice/preview'
    }
  },
  {
    path: 'invoice/preview',
    exact: true,
    component: () => <Redirect to="/gsdprint/invoice/preview/4987" />
  },
  {
    path: '/invoice/edit/:id',
    component: lazy(() => import('../../views/gsdprint/invoice/edit')),
    meta: {
      navLink: '/apps/invoice/edit'
    }
  },
  {
    path: '/invoice/edit',
    exact: true,
    component: () => <Redirect to="/gsdprint/invoice/edit/4987" />
  },
  {
    path: '/invoice/add',
    component: lazy(() => import('../../views/gsdprint/invoice/add'))

  },
  {
    path: '/invoice/print',
    layout: 'BlankLayout',
    component: lazy(() => import('../../views/gsdprint/invoice/print'))
  },
];

export default DashboardRoutes;
