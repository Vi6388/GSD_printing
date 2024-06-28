// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Shop Components
import Sidebar from "./Sidebar";
import Products from "./Products";

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';
// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getProducts,
  getCartItems,
  addToWishlist,
  deleteCartItem,
  deleteWishlistItem,
  getCategories,
  getproductsById,
  getMainCategories,
} from "../store";

// ** Styles
import "@styles/react/apps/app-ecommerce.scss";
import { Col, Row } from "reactstrap";
import ShopCategory from "./ShopCategory";

const Shop = () => {
  // ** States
  const [activeView, setActiveView] = useState("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [type, setType] = useState("membership");

  const url = new URL(window.location.href);

  // Access and get query parameters
  const activeTab = url.searchParams.get("category");
  const c_id = url.searchParams.get("id");
  console.log(activeTab);
  // ** Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.products);

  // ** Get products
  useEffect(() => {
    dispatch(
      getProducts({
        q: "",
        sortBy: "featured",
        perPage: 9,
        page: 1,
      })
    );
    dispatch(
      getCategories({
        q: "",
        sortBy: "featured",
        perPage: 9,
        category: activeTab,
        page: 1,
      })
    );
    dispatch(getMainCategories());
    dispatch(
      getproductsById({
        q: "",
        sortBy: "featured",
        perPage: 9,
        category: activeTab,
        page: 1,
        id: c_id,
      })
    );
  }, [dispatch, activeTab, c_id]);

  useEffect(() => {}, [c_id]);
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Shop"
        breadCrumbParent="Dashboard"
        breadCrumbActive="Shop"
      />
      <Row>
        <Col lg="12">
         
        </Col>
        <Col lg="12">
          <ShopCategory store={store} />
        </Col>
      </Row>
      <Products
        store={store}
        dispatch={dispatch}
        type={type}
        addToCart={addToCart}
        activeView={activeView}
        getProducts={getProducts}
        sidebarOpen={sidebarOpen}
        getCartItems={getCartItems}
        setActiveView={setActiveView}
        addToWishlist={addToWishlist}
        setSidebarOpen={setSidebarOpen}
        deleteCartItem={deleteCartItem}
        deleteWishlistItem={deleteWishlistItem}
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        type={type}
        setType={setType}
        store={store}
      />
    </Fragment>
  );
};
export default Shop;
