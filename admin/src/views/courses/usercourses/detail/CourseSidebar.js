// ** React Imports
import { Link } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';

// ** Third Party Components
import axios from 'axios';
import classnames from 'classnames';
import * as Icon from 'react-feather';

// ** Custom Components
import Avatar from '@components/avatar';
import { useDateFormatter } from '../../../../hooks/useDateFormatter';

const CourseSidebar = (props) => {
  // ** Props
  const { courseList } = props;

  // ** States
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/blog/list/data/sidebar').then((res) => setData(res.data));
  }, []);

  const CategoryColorsArr = {
    Quote: 'light-info',
    Fashion: 'light-primary',
    Gaming: 'light-danger',
    Video: 'light-warning',
    Food: 'light-success'
  };

  const renderRecentCourses = () => {
    return courseList.slice(0, 5).map((course, index) => {
      return (
        <div key={index} className="d-flex mb-2">
          <Link className="me-2" to={`/courses/course-detail/${course._id}`}>
            <img
              className="rounded"
              src={course.courseImage}
              alt={course.courseName}
              width="100"
              height="70"
            />
          </Link>
          <div>
            <h6 className="blog-recent-post-title">
              <Link className="text-body-heading" to={`/courses/course-detail/${course._id}`}>
                {course.courseName}
              </Link>
            </h6>
            <div className="text-muted mb-0">{useDateFormatter(course.createdAt)}</div>
          </div>
        </div>
      );
    });
  };

  const renderCategories = () => {
    return data.categories.map((item, index) => {
      const IconTag = Icon[item.icon];

      return (
        <div
          key={index}
          className={classnames('d-flex justify-content-start align-items-center', {
            'mb-75': index !== data.categories.length - 1
          })}
        >
          <a className="me-75" href="/" onClick={(e) => e.preventDefault()}>
            <Avatar
              className="rounded"
              color={CategoryColorsArr[item.category]}
              icon={<IconTag size={15} />}
            />
          </a>
          <a href="/" onClick={(e) => e.preventDefault()}>
            <div className="blog-category-title text-body">{item.category}</div>
          </a>
        </div>
      );
    });
  };

  return (
    <div className="sidebar-detached sidebar-right">
      <div className="sidebar">
        <div className="blog-sidebar right-sidebar my-2 my-lg-0">
          <div className="right-sidebar-content">
            {data !== null ? (
              <Fragment>
                <div className="blog-recent-posts mt-3">
                  <h6 className="section-label">Related Courses</h6>
                  <div className="mt-75">{renderRecentCourses()}</div>
                </div>
                <div className="blog-categories mt-3">
                  <h6 className="section-label">Categories</h6>
                  <div className="mt-1">{renderCategories()}</div>
                </div>
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;
