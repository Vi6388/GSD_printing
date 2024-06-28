// ** React Imports
import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ** Shop Components
import Sidebar from './Sidebar';
import CoursesPage from './Courses';

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';

import { courseFetchAction, courseCategoriesFetchAction } from './store/actions';

// ** Styles
import '@styles/react/apps/app-ecommerce.scss';

const Courses = () => {
  // ** Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.course);
  // ** States
  const [activeView, setActiveView] = useState('grid');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [category, setCategory] = useState('all');
  const [subCategory, setSubCategory] = useState('all');

  useEffect(() => {
    dispatch(courseFetchAction());
    dispatch(courseCategoriesFetchAction());
  }, []);

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Courses"
        breadCrumbParent={<Link to="/courses/usercourses">My Courses</Link>}
        breadCrumbActive="Courses"
      />
      {store.courseList.length ? (
        <CoursesPage
          store={store}
          dispatch={dispatch}
          category={category}
          subCategory={subCategory}
          activeView={activeView}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setActiveView={setActiveView}
          courseFetchAction={courseFetchAction}
        />
      ) : (
        ''
      )}

      <Sidebar
        sidebarOpen={sidebarOpen}
        category={category}
        setCategory={setCategory}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        store={store}
      />
    </Fragment>
  );
};
export default Courses;
