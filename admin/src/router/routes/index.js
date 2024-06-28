// ** Routes Imports
import DashboardRoutes from "./Dashboards";
import ContactRoutes from "./Contacts";
import AppRoutes from "./Apps";
import TaskRoutes from "./Task";
import CalendarRoutes from "./Calendar";
import BusinessRoutes from "./Business";
import ShopRoutes from "./Shop";
import DocumentRoutes from "./Documents";
import Members from "./Members";
import FormRoutes from "./Forms";
import PagesRoutes from "./Pages";
import TablesRoutes from "./Tables";
import ChartsRoutes from "./Charts";
import UiElementRoutes from "./UiElements";
import ExtensionsRoutes from "./Extensions";
import PageLayoutsRoutes from "./PageLayouts";
import Myforms from "./myforms";
import SettingRoute from "./Setting";
import FileManagerRoutes from "./FileManager";
import CoursesRoutes from "./Courses";
import Location from "./Location";
import FormBuilderRoutes from "./formBuilder";
import MyGiftRoutes from "./MyGift";
import CustomShopRoutes from "./CustomShop";
import AffiliateRoutes from "./Affliliate";

// ** Document title
const TemplateTitle = "MyCMA ADMIN";

// ** Default Route
const DefaultRoute = "/dashboard/analytics";

// ** Merge Routess
const Routes = [
  ...DashboardRoutes,
  ...ContactRoutes,
  ...MyGiftRoutes,
  ...CustomShopRoutes,
  ...AffiliateRoutes,
  ...AppRoutes,
  ...Members,
  ...TaskRoutes,
  ...TablesRoutes,
  ...CalendarRoutes,
  ...BusinessRoutes,
  ...ShopRoutes,
  ...DocumentRoutes,
  ...Myforms,
  ...FormBuilderRoutes,

  ...PagesRoutes,
  ...UiElementRoutes,
  ...ExtensionsRoutes,
  ...PageLayoutsRoutes,
  ...FormRoutes,
  ...TablesRoutes,
  ...ChartsRoutes,
  ...SettingRoute,
  ...FileManagerRoutes,
  ...CoursesRoutes,
  ...Location,
];

export { DefaultRoute, TemplateTitle, Routes };
