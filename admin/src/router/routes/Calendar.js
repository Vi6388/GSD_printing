import { lazy } from 'react';

const CalendarRoutes = [
  // Calendar
  {
    path: '/calendar',
    component: lazy(() => import('../../views/calendar')),
    exact: true
  },
  // Calendar
  {
    path: '/book',
    component: lazy(() => import('../../views/calendar/book')),
    exact: true
  },
  // Calendar
  {
    path: '/book/booking-type',
    component: lazy(() => import('../../views/calendar/book/booking-type')),
    exact: true
  },
  {
    path: '/book/add/:typeLink',
    component: lazy(() => import('../../views/calendar/book/add')),
    exact: true
  },
  {
    path: '/add-event',
    component: lazy(() => import('../../views/event/add/AddEvent')),
    exact: true
  },
  {
    path: '/event-table-view',
    component: lazy(() => import('../../views/event/showevents/EventViewTable')),
    exact: true
  },
  {
    path: '/event-view-list/:eventId',
    // component: lazy(() => import('../../views/event/showevents/EventViewListTab')),
    component: lazy(() => import('../../views/event/EventDetails.js')),

    exact: true
  },
  {
    path: '/event-states-print',
    // component: lazy(() => import('../../views/event/showevents/EventViewListTab')),
    component: lazy(() => import('../../views/event/EventStats/EventStatesPrint')),

    exact: true
  },
  {
    path: '/update-event',
    component: lazy(() => import('../../views/calendar/event/edit/EditEvent.js')),
    // src/views/calendar/event/edit/EditEvent.js
    exact: true
  },
  {
    path: '/edit-event/:eventId',
    component: lazy(() => import('../../views/calendar/event/edit/EditEvent')),
    exact: true
  },
  {
    path: '/events',
    component: lazy(() => import('../../views/calendar/event')),
    exact: true
  },
  {
    path: '/event-details/:eventId',
    component: lazy(() => import('../../views/calendar/event/EventDetails')),
    exact: true
  },
  {
    path: '/add-guest/:eventId',
    component: lazy(() => import('../../views/calendar/event/guests/AddGuest')),
    exact: true
  },
  {
    path: '/event-preview/:eventId',
    component: lazy(() => import('../../views/calendar/event/preview')),
    exact: true
  }
];

export default CalendarRoutes;
