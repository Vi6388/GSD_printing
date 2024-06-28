// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';

// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Input, Button, Label } from 'reactstrap';

// ** Styles
import '@styles/react/libs/noui-slider/noui-slider.scss';

const Sidebar = (props) => {
  // ** Props
  const { sidebarOpen, category, setCategory, setSubCategory, store } = props;

  const selectedCategory = store.courseCategories.filter((cat) => cat._id == category)[0];

  return (
    <div className="sidebar-detached sidebar-left">
      <div className="sidebar">
        <div
          className={classnames('sidebar-shop', {
            show: sidebarOpen
          })}
        >
          <Row>
            <Col sm="12">
              <h6 className="filter-heading d-none d-lg-block">Filters</h6>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <Link to="/manage-usercourses">
                <Button color="primary" block>
                  Manage Courses
                </Button>
              </Link>

              <div id="product-categories">
                <h6 className="filter-title">Categories</h6>
                <ul className="list-unstyled categories-list">
                  {store?.courseCategories?.map((category) => {
                    return (
                      <li key={category._id}>
                        <div className="form-check" onChange={(e) => setCategory(e.target.value)}>
                          <Input
                            type="radio"
                            id={category._id}
                            value={category._id}
                            name="category-radio"
                            onChec={(e) => setCategory(category._id)}
                          />
                          <Label className="form-check-label" for={category._id}>
                            {category.categoryName}
                          </Label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div id="product-categories">
                <h6 className="filter-title">Sub Categories</h6>
                <ul className="list-unstyled categories-list">
                  {selectedCategory?.subCategories?.map((item) => {
                    return (
                      <li key={item._id}>
                        <div
                          className="form-check"
                          onChange={(e) => setSubCategory(e.target.value)}
                        >
                          <Input
                            type="radio"
                            id={item._id}
                            value={item._id}
                            name="category-radio"
                            onChec={(e) => setSubCategory(category._id)}
                          />
                          <Label className="form-check-label" for={item._id}>
                            {item.subCatName}
                          </Label>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
