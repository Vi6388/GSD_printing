// ** Icons Import
import { Users, User } from 'react-feather';

export default [
  {
    id: 'tasks',
    title: 'Manage Users',
    icon: <Users size={20} />,
    action: 'read',
    resource: 'manage-users',
    children: [
      {
        id: 'users',
        title: 'Users',
        icon: <User size={20} />,
        navLink: '/users',
        action: 'read',
        resource: 'users'
      },
      {
        id: 'operators',
        title: 'Operators',
        icon: <User size={20} />,
        navLink: '/users/operators',
        action: 'read',
        resource: 'operators'
      },
      {
        id: 'admin',
        title: 'Admin',
        icon: <User size={20} />,
        navLink: '/users/admins',
        action: 'read',
        resource: 'admins'
      },
      {
        id: 'members',
        title: 'Members',
        icon: <User size={20} />,
        navLink: '/other/members',
        action: 'read',
        resource: 'members'
      }
    ]
  }
];
