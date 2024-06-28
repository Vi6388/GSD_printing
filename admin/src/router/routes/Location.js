import { lazy } from 'react';

const Location = [
  {
    path: '/other/locations',
    component: lazy(() => import('../../views/other/locations/list'))
  },
  {
    path: '/location/view/:id',
    component: lazy(() => import('../../views/other/locations/view'))
  }
];

export default Location;
