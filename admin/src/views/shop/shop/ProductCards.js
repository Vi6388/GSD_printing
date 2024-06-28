// ** React Imports
import { Link } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import { Star, ShoppingCart, Heart } from "react-feather";
import Img1 from "../../../assets/images/gsdprint/sp-1.jpg"
import Img2 from "../../../assets/images/gsdprint/sp-rond.jpg"
import Img3 from "../../../assets/images/gsdprint/sp-dark.jpg"

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge, Row, Col } from "reactstrap";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BASE_PATH, getProductsByShapeData } from "../../../requests/admin/shopAPI";
const ProductCards = (props) => {
  // ** Props
  const {
    store,
    type,
    products,
    dispatch,
    addToCart,
    activeView,
    getProducts,
    getCartItems,
    addToWishlist,
    deleteWishlistItem,
  } = props;

  const [productsByShape, setProductsByShape] = useState([]);

  useEffect(() => {
    getProductsByShapeList();
  }, [])

  const getProductsByShapeList = async() => {
    const response = await getProductsByShapeData();
    if(response?.status) {
      setProductsByShape(response?.productsByPaperType);
    }
  }

  // ** Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    if (val === false) {
      dispatch(addToCart(id));
    }
    dispatch(getCartItems());
    dispatch(getProducts(store.params));
  };

  // ** Handle Wishlist item toggle
  const handleWishlistClick = (id, val) => {
    if (val) {
      dispatch(deleteWishlistItem(id));
    } else {
      dispatch(addToWishlist(id));
    }
    dispatch(getProducts(store.params));
  };

  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      return store.items.map((item) => {
        const CartBtnTag = item.isInCart ? Link : "button";

        return (
          <div className="ecommerce-card mt-2" key={item.title}>
            {/* <Card style={{ marginBottom: "3px" }}>
              <div className="item-img text-center mx-auto">
                <Link to={`/ecommerce/product-detail/${item.id}`}>
                  <img
                    className="img-fluid card-img-top"
                    src={item.image}
                    alt={item.name}
                  />
                </Link>
              </div>
            </Card>
            <div style={{ padding: "10px" }}>
              <h6 className="item-name">
                <Link
                  className="text-body"
                  to={`/ecommerce/product-detail/${item.slug}`}
                >
                  {item.title}
                </Link>
              </h6>
              <h6 className="item-price">${item?.price}</h6>
            </div>
            <div className="item-options text-left">
              <button
                className="btn btn-primary round"
                style={{ fontSize: "12px", padding: "6px 12px" }}
              >
                Add to My Gift
              </button>
            </div> */}
            <Card>
              <div className="product-item">
                <a href="/productdetail">
                  <div className="offer-bx">
                    <span>
                      <Badge variant="success">hg</Badge>
                    </span>
                    <span style={{ float: 'right' }}><Badge variant="danger">hghg</Badge>
                    </span>
                  </div>
                  <img src={product.productImage} alt={product.name} width='100%'  height="420px"/>
                  <div className="p-3">
                    <h5>ghghg</h5>
                    <p>
                      jjjhjhhjh
                    </p>
                    <div className="rating">
                      <i style={{ color: '#ff9800', marginRight: '3px' }} className="fa fa-star" aria-hidden="true"></i>
                      <i style={{ color: '#ff9800', marginRight: '3px' }} className="fa fa-star" aria-hidden="true"></i>
                      <i style={{ color: '#ff9800', marginRight: '3px' }} className="fa fa-star" aria-hidden="true"></i>
                      <i style={{ color: '#ff9800', marginRight: '3px' }} className="fa fa-star" aria-hidden="true"></i>
                      <i style={{ color: '#ff9800', marginRight: '3px' }} className="fa fa-star" aria-hidden="true"></i>
                      <span style={{ fontSize: '14px' }}>4.5(90295)</span>
                    </div>
                    <div className="mt-2" style={{ backgroundColor: '#e7f3f0', padding: '5px' }}>
                      <span>
                        ghghg
                      </span>
                      |
                      <span style={{ fontSize: '14px' }}>
                        Code: 4343434
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </Card>
          </div>
        );
      });
    }
  };

  return (
    <div
    // className={classnames({
    //   "grid-view": activeView === "grid",
    //   "list-view": activeView === "list",
    // })}
    >
      {/* {renderProducts()} */}
      <Row>
        {productsByShape?.map((item) => {
          return item?.products?.map((product) => {
            return (
              <Col md='4' className="">
                <Card className="mb-1">
                  <div className="product-item">
                    <a href={"/ecommerce/product-detail/" + product._id}>
                      <div className="offer-bx" style={{ position: 'absolute', width: '100%', padding: '5px' }}>
                        <span>
                          <Badge color="success">Best Seller</Badge>
                        </span>
                        <span style={{ float: 'right' }}><Badge color="danger">Upto 10% off</Badge>
                        </span>
                      </div>
                      <img src={BASE_PATH  + product.productImage} alt='' width='100%'  height="380px"/>
                      <div className="p-1">
                        <h5>{product.productName}</h5>
                        <p className="" style={{ color: 'darkgrey' }}>
                          Rectangular dimensions give you a recognizable look.
                        </p>
                        <div className="rating">
                          <FaStar size={18} store='#ff9800' fill="#ff9800" />
                          <FaStar size={18} store='#ff9800' fill="#ff9800" />
                          <FaStar size={18} store='#ff9800' fill="#ff9800" />
                          <FaStar size={18} store='#ff9800' fill="#ff9800" />
                          <FaStar size={18} store='#ff9800' fill="#ff9800" />
                          <span className="ms-1" style={{ fontSize: '14px' }}>4.5(90295)</span>
                        </div>
                        <div className="mt-2" style={{ backgroundColor: '#e7f3f0', padding: '5px' }}>
                          <span >
                            ${product.price}
                          </span>
  
                          |
  
                          <span style={{ fontSize: '14px' }}>
                            Code: 4343434
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                </Card>
              </Col>
            )
          })
        })}
      </Row>

    </div>
  );
};

export default ProductCards;
