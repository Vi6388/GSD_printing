// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Product components
import CourseCards from './CourseCards';
import CoursesHeader from './CoursesHeader';

// ** Images
import illustration from '@src/assets/images/illustration/no_data.svg';

// ** Third Party Components
import classnames from 'classnames';

const CoursesPage = (props) => {
  // ** Props
  const { store, dispatch, activeView, setActiveView, sidebarOpen, setSidebarOpen, subCategory } =
    props;

  const [filteredCourses, setFilteredCourses] = useState(store?.courseList);

  useEffect(() => {
    if (subCategory !== 'all') {
      setFilteredCourses(
        store?.courseList.filter((item) => item.courseSubCategory._id == subCategory)
      );
    }
  }, [store, subCategory]);

  return (
    <div className="content-detached content-right">
      <div className="content-body">
        <CoursesHeader
          dispatch={dispatch}
          activeView={activeView}
          setActiveView={setActiveView}
          setSidebarOpen={setSidebarOpen}
          filteredCourses={filteredCourses}
        />
        <div
          className={classnames('body-content-overlay', {
            show: sidebarOpen
          })}
          onClick={() => setSidebarOpen(false)}
        ></div>

        {filteredCourses?.length ? (
          <Fragment>
            <CourseCards
              dispatch={dispatch}
              activeView={activeView}
              filteredCourses={filteredCourses}
            />
          </Fragment>
        ) : (
          <div className="d-flex justify-content-center mt-2">
            <div className="d-flex flex-column justify-content-center">
              <img src={illustration} height="150" className="mb-3" />
              <h4>Oops! No Course Found. Try another Sub-Category.</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
