// ** React Imports
import { useEffect, Fragment, useState } from "react";
import { useParams } from "react-router-dom";

// ** Product detail components
import ItemFeatures from "./ItemFeatures";
import ProductDetails from "./ProductDetails";
import RelatedProducts from "./RelatedProducts";
import {getProductByID, BASE_PATH } from '../../../requests/admin/productAPI.js';

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs';

// ** Reactstrap Imports
import { Card, CardBody, Col } from "reactstrap";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  deleteWishlistItem,
  addToWishlist,
  addToCart,
} from "../store";

import "@styles/base/pages/app-ecommerce-details.scss";
const Details = () => {

  // ** Vars
  const params = useParams().product;
  const productId = params.substring(params.lastIndexOf("-") + 1);
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.products);
  const [loading, setLoading] = useState(true);
  const [productInfo, setProducts] = useState([]);
  // ** ComponentDidMount : Get product

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Product Details"
        breadCrumbParent="Shop"
        breadCrumbActive="Product Details"
      />
     
      <div className="app-ecommerce-details">
        {<ProductDetails/>}
      </div>
    </Fragment>
  );


  // return (
  //   <Fragment>
  //     <BreadCrumbs
  //       breadCrumbTitle="Product Details"
  //       breadCrumbParent="Shop"
  //       breadCrumbActive="Product Details"
  //     />
     
  //     <div className="app-ecommerce-details">
  //       {Object.keys(store.productDetail).length ? (
  //         <Card>
  //           <CardBody>
  //             <ProductDetails
  //               dispatch={dispatch}
  //               addToCart={addToCart}
  //               productId={productId}
  //               getProduct={getProduct}
  //               data={store.productDetail}
  //               addToWishlist={addToWishlist}
  //               deleteWishlistItem={deleteWishlistItem}
  //             />
  //           </CardBody>
  //           {/* <ItemFeatures />
  //           <CardBody>
  //             <RelatedProducts />
  //           </CardBody> */}
  //         </Card>
  //       ) : null}
  //     </div>
  //   </Fragment>
  // );
};

export default Details;
