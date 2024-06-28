// ** React Imports
import { useEffect, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';

// ** Course detail components
import CourseDetails from './CourseDetails';

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs';

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { courseFetchAction, activeCourseFetchAction } from '../store/actions';

import '@styles/base/pages/app-ecommerce-details.scss';

const Details = () => {
  // ** Vars
  const params = useParams();
  const courseId = params.id;

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.course);

  // ** ComponentDidMount : Get course
  useEffect(() => {
    dispatch(courseFetchAction());
    dispatch(activeCourseFetchAction(courseId));
  }, []);

  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Course Details"
        breadCrumbParent={<Link to="/courses/usercourses">My Courses</Link>}
        breadCrumbActive="Details"
      />
      <div className="app-ecommerce-details">
        {Object.keys(store.courseList).length ? (
          <Card>
            <CardBody>
              <CourseDetails
                dispatch={dispatch}
                courseId={courseId}
                getCourse={courseFetchAction}
                courseList={store.courseList}
                activeCourse={store.activeCourse}
              />
            </CardBody>
          </Card>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Details;
