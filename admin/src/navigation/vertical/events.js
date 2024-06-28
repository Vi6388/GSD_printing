// ** Icons Import
import { Calendar, User } from 'react-feather';
import { MdOutlineEmojiEvents } from 'react-icons/md';
import { RiContactsBookLine, RiContactsLine } from 'react-icons/ri';

export default [
  {
    id: 'events',
    title: 'Events',
    icon: <MdOutlineEmojiEvents size={20} />,
    navLink: '/eventsmanagement',
    action: 'read',
    resource: 'events'
  }
  // {
  //   id: 'events',
  //   title: 'Events',
  //   icon: <Calendar size={20} />,
  //   children: [
  //     {
  //       id: 'tournament',
  //       title: 'Tournament',
  //       icon: <User size={20} />,
  //       navLink: '/eventsmanagement',
  //       action: 'read',
  //       resource: 'events/tournament'
  //     },
  //     {
  //       id: 'testing',
  //       title: 'Testing',
  //       icon: <User size={20} />,
  //       navLink: '/events/testing',
  //       action: 'read',
  //       resource: 'events/testing'
  //     },
  //     {
  //       id: 'instructor-college',
  //       title: 'Instructor ',
  //       icon: <User size={20} />,
  //       navLink: '/events/instructor-college',
  //       action: 'read',
  //       resource: 'events/instructor'
  //     },
  //     {
  //       id: 'seminars',
  //       title: 'Seminars',
  //       icon: <User size={20} />,
  //       navLink: '/events/seminars',
  //       action: 'read',
  //       resource: 'events/seminars'
  //     },
  //     {
  //       id: 'others',
  //       title: 'Other Events',
  //       icon: <User size={20} />,
  //       navLink: '/events/others',
  //       action: 'read',
  //       resource: 'events/others'
  //     }
  //   ]
  // }
];
