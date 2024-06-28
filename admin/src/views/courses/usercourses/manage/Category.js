// ** React Imports
import { Fragment, useState } from 'react';

// ** Components
import AddCategoryModal from './addCategoryModal';
import AddSubCategoryModal from './addSubCategoryModal';

// ** Third Party Components
import classnames from 'classnames';
import { Trash2, Grid } from 'react-feather';

// ** Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import {
  courseCategoriesAddAction,
  courseCategoriesDeleteAction,
  courseSubCategoriesAddAction,
  courseSubCategoryDeleteAction
} from '../store/actions';

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Button,
  CardBody,
  ListGroup,
  ListGroupItem,
  TabContent,
  TabPane,
  Table
} from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

const Category = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.course);

  // ** States
  const [centeredModal, setCenteredModal] = useState(false);
  const [subCatModal, setSubCatModal] = useState(false);
  const [activeList, setActiveLIst] = useState(store?.courseCategories[0]?._id);

  const toggleList = (list) => {
    if (activeList !== list) {
      setActiveLIst(list);
    }
  };

  const renderCourseCount = (id) => {
    return store?.courseList?.filter((item) => item?.courseSubCategory?._id == id)?.length;
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <Row>
            <Col md="6">
              <h3>Manage Course Categories</h3>
            </Col>
            <Col md="6" className="d-flex justify-content-end">
              <Button
                className="btn-icon me-1"
                color="primary"
                onClick={() => setCenteredModal(!centeredModal)}
              >
                Add Category
              </Button>
              <Button
                className="btn-icon"
                color="primary"
                onClick={() => setSubCatModal(!subCatModal)}
              >
                Add Sub-Category
              </Button>
              <AddCategoryModal
                centeredModal={centeredModal}
                setCenteredModal={setCenteredModal}
                store={store}
                dispatch={dispatch}
                courseCategoriesAddAction={courseCategoriesAddAction}
              />
              <AddSubCategoryModal
                subCatModal={subCatModal}
                setSubCatModal={setSubCatModal}
                store={store}
                dispatch={dispatch}
                courseSubCategoriesAddAction={courseSubCategoriesAddAction}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Row>
        <Col md="4" sm="12">
          <ListGroup tag="div">
            {store?.courseCategories?.map((item) => (
              <ListGroupItem
                className={classnames('cursor-pointer', {
                  active: activeList === item._id
                })}
                onClick={() => toggleList(item._id)}
                action
                key={item._id}
              >
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div className="me-1">
                      <Grid size={16} />
                    </div>
                    <span>{item.categoryName}</span>
                  </div>
                  <div onClick={() => dispatch(courseCategoriesDeleteAction(item))}>
                    <Trash2 size={16} />
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        <Col md="8" sm="12">
          <TabContent activeTab={activeList}>
            {store?.courseCategories?.map((item) => (
              <TabPane tabId={item._id} key={item._id}>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Sub-Category Title</th>
                      <th>Courses</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item?.subCategories?.map((row) => (
                      <tr key={row._id}>
                        <td>{row.subCatName}</td>
                        <td>{renderCourseCount(row._id)}</td>
                        <td>
                          <div
                            className="cursor-pointer"
                            onClick={() => dispatch(courseSubCategoryDeleteAction(item, row))}
                          >
                            <Trash2 className="me-50" size={15} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TabPane>
            ))}
          </TabContent>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Category;
