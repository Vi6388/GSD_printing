// ** React Imports
import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const CoursesRoutes = [
  {
    path: '/manage-usercourses',
    exact: true,
    component: lazy(() => import('../../views/courses/usercourses/manage'))
  },
  {
    path: '/courses/usercourses',
    className: 'ecommerce-application',
    exact: true,
    component: lazy(() => import('../../views/courses/usercourses'))
  },
  {
    path: '/mycma/myaccount',
    component: lazy(() => import('../../views/blank_page'))
  },

  {
    path: '/courses/course-detail',
    exact: true,
    className: 'ecommerce-application',
    component: () => <Redirect to="/courses/course-detail/apple-i-phone-11-64-gb-black-26" />
  },
  {
    path: '/courses/course-detail/:id',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/courses/usercourses/detail')),
    meta: {
      navLink: '/courses/course-detail'
    }
  }
];

export default CoursesRoutes;
