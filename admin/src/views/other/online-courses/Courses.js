// ** React Imports
import { Fragment } from 'react';

// ** Product components
import CourseCards from './CourseCards';
import CoursesHeader from './CoursesHeader';
import CoursesSearchbar from './CoursesSearchbar';

// ** Third Party Components
import classnames from 'classnames';

// ** Reactstrap Imports
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const CoursesPage = (props) => {
  // ** Props
  const {
    store,
    type,
    dispatch,
    addToCart,
    activeView,
    sidebarOpen,
    getProducts,
    getCartItems,
    addToWishlist,
    setActiveView,
    deleteCartItem,
    setSidebarOpen,
    deleteWishlistItem
  } = props;

  // ** Handles pagination
  const handlePageChange = (val) => {
    if (val === 'next') {
      dispatch(getProducts({ ...store.params, page: store.params.page + 1 }));
    } else if (val === 'prev') {
      dispatch(getProducts({ ...store.params, page: store.params.page - 1 }));
    } else {
      dispatch(getProducts({ ...store.params, page: val }));
    }
  };

  // ** Render pages
  const renderPageItems = () => {
    const arrLength =
      store.data.totalProducts !== 0 && store.data.products.length !== 0
        ? Number(store.data.totalProducts) / store.data.products.length
        : 3;

    return new Array(Math.trunc(arrLength)).fill().map((item, index) => {
      return (
        <PaginationItem
          key={index}
          active={store.params.page === index + 1}
          onClick={() => handlePageChange(index + 1)}
        >
          <PaginationLink href="/" onClick={(e) => e.preventDefault()}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  // ** handle next page click
  const handleNext = () => {
    if (store.params.page !== Number(store.totalProducts) / store.products.length) {
      handlePageChange('next');
    }
  };

  return (
    <div className="content-detached content-right">
      <div className="content-body">
        <CoursesHeader
          store={store.data}
          dispatch={dispatch}
          activeView={activeView}
          getProducts={getProducts}
          setActiveView={setActiveView}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          className={classnames('body-content-overlay', {
            show: sidebarOpen
          })}
          onClick={() => setSidebarOpen(false)}
        ></div>
        <CoursesSearchbar dispatch={dispatch} getProducts={getProducts} store={store.data} />
        {store.data.products.length ? (
          <Fragment>
            <CourseCards
              store={store}
              type={type}
              dispatch={dispatch}
              addToCart={addToCart}
              activeView={activeView}
              products={store.data.products}
              getProducts={getProducts}
              getCartItems={getCartItems}
              addToWishlist={addToWishlist}
              deleteCartItem={deleteCartItem}
              deleteWishlistItem={deleteWishlistItem}
            />
            <Pagination className="d-flex justify-content-center ecommerce-shop-pagination mt-2">
              <PaginationItem
                disabled={store.params.page === 1}
                className="prev-item"
                onClick={() => (store.params.page !== 1 ? handlePageChange('prev') : null)}
              >
                <PaginationLink href="/" onClick={(e) => e.preventDefault()}></PaginationLink>
              </PaginationItem>
              {renderPageItems()}
              <PaginationItem
                className="next-item"
                onClick={() => handleNext()}
                disabled={
                  store.params.page ===
                  Number(store.data.totalProducts) / store.data.products.length
                }
              >
                <PaginationLink href="/" onClick={(e) => e.preventDefault()}></PaginationLink>
              </PaginationItem>
            </Pagination>
          </Fragment>
        ) : (
          <div className="d-flex justify-content-center mt-2">
            <p>No Results</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
