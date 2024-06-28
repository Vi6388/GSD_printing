import { lazy } from 'react';

const Member = [
  {
    path: '/other/members',
    component: lazy(() => import('../../views/members/list'))
  },
  {
    path: '/other/membership/view/:id',
    component: lazy(() => import('../../views/members/view'))
  }
];

export default Member;
