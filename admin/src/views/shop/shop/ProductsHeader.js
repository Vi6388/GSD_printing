// ** Third Party Components
import classnames from "classnames";
import { useEffect, useState } from "react";

// ** Icons import
import { Menu, Grid, List } from "react-feather";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";
import { getProductsByShapeData } from "../../../requests/admin/shopAPI";

const ProductsHeader = (props) => {
  // ** Props
  const {
    activeView,
    setActiveView,
    dispatch,
    getProducts,
    store,
    setSidebarOpen,
  } = props;

  // ** Sorting obj
  const sortToggleText = {
    "price-desc": "Highest",
    "price-asc": "Lowest",
    featured: "Featured",
  };

  const [productsLength, setProductsLength] = useState(0);

  useEffect(() => {
    getProductsByShapeList();
  }, [])

  const getProductsByShapeList = async() => {
    const response = await getProductsByShapeData();
    if(response?.status) {
      const list = response?.productsByPaperType;
      let length = 0;
      list?.map((item) => {
        length += item?.products?.length;
      })
      setProductsLength(length)
    }
  }



  return (
    <div className="ecommerce-header">
      <Row>
        <Col sm="12">
          <div className="ecommerce-header-items">
            <div className="result-toggler">
              <button
                className="navbar-toggler shop-sidebar-toggler"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="navbar-toggler-icon d-block d-lg-none">
                  <Menu size={14} />
                </span>
              </button>
              <span className="search-results mt-1 mb-1">
                 <h4> <b>Products by shape:</b>({productsLength})</h4> 
              </span>
            </div>
            {/* <div className="view-options d-flex">
              <UncontrolledButtonDropdown className="dropdown-sort">
                <DropdownToggle className="text-capitalize me-1" color="primary" outline caret>
                  {sortToggleText[store.params.sortBy]}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    className="w-100"
                    onClick={() =>
                      dispatch(
                        getProducts({
                          ...store.params,
                          sortBy: 'featured'
                        })
                      )
                    }
                  >
                    Featured
                  </DropdownItem>
                  <DropdownItem
                    className="w-100"
                    onClick={() =>
                      dispatch(
                        getProducts({
                          ...store.params,
                          sortBy: 'price-asc'
                        })
                      )
                    }
                  >
                    Lowest
                  </DropdownItem>
                  <DropdownItem
                    className="w-100"
                    onClick={() =>
                      dispatch(
                        getProducts({
                          ...store.params,
                          sortBy: 'price-desc'
                        })
                      )
                    }
                  >
                    Highest
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <ButtonGroup>
                <Button
                  tag="label"
                  className={classnames('btn-icon view-btn grid-view-btn', {
                    active: activeView === 'grid'
                  })}
                  color="primary"
                  outline
                  onClick={() => setActiveView('grid')}
                >
                  <Grid size={18} />
                </Button>
                <Button
                  tag="label"
                  className={classnames('btn-icon view-btn list-view-btn', {
                    active: activeView === 'list'
                  })}
                  color="primary"
                  outline
                  onClick={() => setActiveView('list')}
                >
                  <List size={18} />
                </Button>
              </ButtonGroup>
            </div> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsHeader;
