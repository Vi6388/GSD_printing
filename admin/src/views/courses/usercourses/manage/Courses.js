// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Components
import AddCourseModal from './add/AddCourseModal';
import EditCourse from './EditCourse';

// ** Third Party Components
import Select from 'react-select';
import DataTable from 'react-data-table-component';
import { Trash2, Edit } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Reactstrap Imports
import { Row, Col, Card, Button, CardBody } from 'reactstrap';

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';

// ** Global States
import { courseFetchAction, courseDeleteAction } from '../store/actions';

const Courses = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({ show: false, details: {} });
  const store = useSelector((state) => state.course);
  const [centeredModal, setCenteredModal] = useState(false);
  const [tableData, setTableData] = useState();
  const [currentCategory, setCurrentCategory] = useState({
    value: '',
    label: 'Filter By Category'
  });
  const [currentSubCategory, setCurrentSubCategory] = useState({
    value: '',
    label: 'Filter By Sub Category'
  });

  const categoryOptions = [];
  const subCategoryOptions = [];

  store.courseCategories.map((item) =>
    categoryOptions.push({ value: item._id, label: item.categoryName })
  );
  const selectedCategory = store.courseCategories.filter(
    (cat) => cat._id == currentCategory.value
  )[0];
  selectedCategory?.subCategories?.map((item) =>
    subCategoryOptions.push({ value: item._id, label: item.subCatName })
  );

  useEffect(() => {
    if (currentCategory.value === '') {
      setTableData(store?.courseList);
    } else {
      if (currentSubCategory.value == '') {
        setTableData(
          store?.courseList.filter((item) => item.courseCategory._id == currentCategory.value)
        );
      } else {
        setTableData(
          store?.courseList.filter((item) => item.courseSubCategory._id == currentSubCategory.value)
        );
      }
    }
  }, [currentCategory, currentSubCategory]);

  const columnsdata = [
    {
      name: 'Course Name',
      sortable: true,
      sortField: 'name',
      selector: (row) => row.courseName
    },
    {
      name: 'Course Image',
      sortable: true,
      sortField: 'name',
      selector: (row) => row.courseImage,
      cell: (row) => <img height="40" width="40" src={row.courseImage} />
    },
    {
      name: 'Course Type',
      sortable: true,
      sortField: 'type',
      selector: (row) => row.courseType
    },
    {
      name: 'Category',
      sortable: true,
      sortField: 'category',
      selector: (row) => row.courseCategory.name
    },
    {
      name: 'Sub Category',
      sortable: true,
      sortField: 'subcategory',
      selector: (row) => row.courseSubCategory.subCatName
    },
    {
      name: 'Instructor',
      sortable: true,
      sortField: 'instructor',
      selector: (row) => row.instructor
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="column-action">
          <Trash2
            size={20}
            onClick={() => dispatch(courseDeleteAction(row._id))}
            className="me-1 cursor-pointer"
          />
          <Edit
            size={20}
            className="cursor-pointer"
            onClick={() => setDetails({ show: !details.show, details: row })}
          />
        </div>
      )
    }
  ];

  useEffect(() => {
    dispatch(courseFetchAction());
  }, []);

  return !details?.show ? (
    <Fragment>
      <Card Card>
        <CardBody>
          <Row>
            <Col md="3">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={categoryOptions}
                value={currentCategory}
                onChange={(data) => {
                  setCurrentCategory(data);
                }}
              />
            </Col>
            <Col md="3">
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={subCategoryOptions}
                value={currentSubCategory}
                onChange={(data) => {
                  setCurrentSubCategory(data);
                }}
              />
            </Col>
            <Col md="6" className="d-flex justify-content-end">
              <Button
                className="btn-icon"
                color="primary"
                onClick={() => setCenteredModal(!centeredModal)}
              >
                Add Course
              </Button>
              <AddCourseModal
                store={store}
                centeredModal={centeredModal}
                setCenteredModal={setCenteredModal}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <Col>
          <DataTable columns={columnsdata} data={tableData} pagination />
        </Col>
      </Card>
    </Fragment>
  ) : (
    <EditCourse setCourseDetails={setDetails} courseDetails={details} />
  );
};

export default Courses;
