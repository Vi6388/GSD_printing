// ** React Imports
import { Fragment, useState } from 'react';

// ** Third Party Components
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Editor } from 'react-draft-wysiwyg';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from 'reactstrap';

// ** Utils
import { selectThemeColors } from '@utils';
import { courseAddAction } from '../../../store/actions';
// import { progressionFetchAction } from '../../../../../settings/tabs/progressiontab/store/actions';
import { useDispatch, useSelector } from 'react-redux';

// ** Styles
import '@styles/react/libs/editor/editor.scss';

const CourseInfo = ({ stepper, type, centeredModal, setCenteredModal, store }) => {
  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();
  const progression = useSelector((state) => state.progression.progressionList);

  // ** State
  const [courseData, setCourseData] = useState({ courseType: 'Online Exam' });
  const [progressionList, setProgressionList] = useState([]);
  const [progressionItem, setProgressionItem] = useState({ categoryName: 'All', rankUpto: 'All' });
  const [progressionCategories, setProgressionCategories] = useState([]);
  const [showAccessibility, setShowAccessibility] = useState(false);

  const generateProgressionCategories = (item) => {
    const filteredCategory = progression?.filter((category) => category.progressionName === item);
    const categories = filteredCategory[0]?.categoryId;
    setProgressionCategories(categories);
  };

  const categoryOptions = [];
  const subCategoryOptions = [];

  store.courseCategories.map((item) =>
    categoryOptions.push({ value: item._id, label: item.categoryName })
  );
  const selectedCategory = store.courseCategories.filter(
    (cat) => cat._id == courseData.courseCategory
  )[0];
  selectedCategory?.subCategories?.map((item) =>
    subCategoryOptions.push({ value: item._id, label: item.subCatName })
  );

  const handleFormInput = (e) => {
    if (e.target.name != 'image') {
      setCourseData({ ...courseData, [e.target.name]: e.target.value });
    }
    if (e.target.name === 'image') {
      setCourseData({ ...courseData, file: e.target.files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('courseName', courseData?.courseName);
    formData.append('courseType', courseData?.courseType);
    formData.append('courseCategory', courseData?.courseCategory);
    formData.append('courseSubCategory', courseData?.courseSubCategory);
    formData.append('instructor', courseData?.instructor);
    formData.append('duration', courseData?.duration);
    formData.append('file', courseData.file);
    formData.append('description', courseData?.description);
    for (let i = 0; i < progressionList.length; i++) {
      formData.append('courseAccessibility', progressionList[i]);
    }

    dispatch(courseAddAction(formData));
    setCenteredModal(!centeredModal);
  };

  const handleAddProgresson = () => {
    setProgressionList([...progressionList, progressionItem]);
  };

  const handleDelete = (item) => {
    let a = progressionList;
    a.splice(item, 1);
    setProgressionList([...a]);
  };

  // useEffect(() => {
  //   dispatch(progressionFetchAction())
  // }, []);

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="nameMulti">
              Course Title
            </Label>
            <Input
              onChange={handleFormInput}
              type="text"
              name="courseName"
              id="nameMulti"
              placeholder="Course Title"
              required
              value={courseData?.courseName}
            />
          </Col>
          <Col md="6" sm="12" className="mb-1">
            <Label for="exampleSelect">Course Type</Label>
            <Input
              type="select"
              name="courseType"
              id="exampleSelect"
              onChange={(e) => {
                e.target.value === 'Included'
                  ? setShowAccessibility(true)
                  : e.target.value === 'Purchased'
                  ? setShowAccessibility(false)
                  : setShowAccessibility(false),
                  setCourseData({ ...courseData, courseType: e.target.value });
              }}
            >
              <option>Select</option>
              <option>Included</option>
              <option>Purchased</option>
            </Input>
          </Col>
        </Row>
        <Row className="mb-1">
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="mtype">
              Category
            </Label>
            <Select
              name="courseCategory"
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              defaultValue={categoryOptions[0]}
              options={categoryOptions}
              isClearable={false}
              onChange={(e) => setCourseData({ ...courseData, courseCategory: e.value })}
            />
          </Col>

          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="mtype">
              Sub Category
            </Label>
            <Select
              name="courseSubCategory"
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              // defaultValue={subCategoryOptions[0]}
              options={subCategoryOptions}
              isClearable={false}
              onChange={(e) => setCourseData({ ...courseData, courseSubCategory: e.value })}
            />
          </Col>
        </Row>
        {showAccessibility ? (
          <div className="bg-light-warning p-1 mb-1">
            <Row>
              <Col xl="12" className="fw-bold">
                Accessibility
              </Col>
              <Col xl="6">
                <Label for="progression">Progression Name</Label>
                <Input
                  type="select"
                  name="progressionName"
                  id="exampleSelect"
                  onChange={(e) => {
                    generateProgressionCategories(e.target.value),
                      setProgressionItem({ ...progressionItem, [e.target.name]: e.target.value });
                  }}
                >
                  <option>Select</option>
                  {progression?.map((item) => (
                    <option key={item._id}>{item?.progressionName}</option>
                  ))}
                </Input>
              </Col>
              <Col xl="6">
                <Label for="category">Progression Category</Label>
                <Input
                  type="select"
                  name="categoryName"
                  id="exampleSelect"
                  onChange={(e) =>
                    setProgressionItem({ ...progressionItem, [e.target.name]: e.target.value })
                  }
                >
                  <option value="All">Select</option>
                  {progressionCategories?.map((item) => (
                    <option key={item._id}>{item?.categoryName}</option>
                  ))}
                </Input>
              </Col>
              <Col xl="10">
                <Label for="Rank">Accessible to Rank </Label>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={[
                    { value: 'Rank1', label: 'Rank1' },
                    { value: 'Rank2', label: 'Rank2' },
                    { value: 'Rank3', label: 'Rank3' }
                  ]}
                />
              </Col>
              <Col xl="2">
                <Button className="mt-2 " onClick={handleAddProgresson} color="primary">
                  {' '}
                  Add{' '}
                </Button>
              </Col>
            </Row>
            {progressionList.length > 0 ? (
              <Row className=" text-secondary bg-light-secondary">
                <Col className="text-black fs-5" xl="2">
                  Sr.
                </Col>
                <Col className="text-black fs-5" xl="3">
                  Progression
                </Col>
                <Col className="text-black fs-5" xl="3">
                  Category
                </Col>
                <Col className="text-black fs-5" xl="3">
                  Rank
                </Col>

                {progressionList?.map((item, index) => (
                  <>
                    <Col xl="2" key={index}>
                      {index + 1}
                    </Col>
                    <Col xl="3" key={index}>
                      {item?.progressionName}
                    </Col>
                    <Col xl="3" key={index}>
                      {item?.categoryName}
                    </Col>
                    <Col xl="3" key={index}>
                      {item?.rankUpto}
                    </Col>
                    <Col
                      xl="1"
                      key={index}
                      onClick={() => handleDelete(index)}
                      className="cursor-pointer text-danger"
                    >
                      X
                    </Col>
                  </>
                ))}
              </Row>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
        <Row>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="instructor">
              Instructor Name
            </Label>
            <Input
              onChange={handleFormInput}
              type="text"
              name="instructor"
              id="instructor"
              placeholder="Instructor Name"
              required
              value={courseData?.instructor}
            />
          </Col>
          <Col md="6" sm="12" className="mb-1">
            <Label className="form-label" for="duration">
              Duration
            </Label>
            <Input
              onChange={handleFormInput}
              type="text"
              name="duration"
              id="duration"
              placeholder="hh:mm"
              value={courseData?.duration}
            />
          </Col>
        </Row>

        <Row>
          <Col md="12" sm="12" className="mb-1">
            <Label className="form-label" for="image">
              Course Cover
            </Label>
            <Input type="file" id="image" onChange={handleFormInput} name="image" required />
          </Col>
        </Row>
        <Col md="12" sm="12" className="mb-1">
          <Label className="form-label" for="description">
            Description
          </Label>
          <Editor
            onContentStateChange={(contentState) =>
              setCourseData({ ...courseData, description: contentState?.blocks[0]?.text })
            }
            name="description"
          />
        </Col>
        <div className="d-flex justify-content-between">
          {/* <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">Previous</span>
          </Button> */}
          <Button
            color="primary"
            onClick={() => setCenteredModal(!centeredModal)}
            className="btn-next"
          >
            <span className="align-middle d-sm-inline-block d-none">Cancel</span>
            {/* <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight> */}
          </Button>
          <Button color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">Create</span>
          </Button>
          {/* <Button color="primary" className="btn-next" onClick={() => stepper.next()}>
            <span className="align-middle d-sm-inline-block d-none">Submit</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button> */}
        </div>
      </Form>
    </Fragment>
  );
};

export default CourseInfo;
