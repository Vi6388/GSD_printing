// ** Icons Import
import { RiContactsBookLine, RiContactsLine } from 'react-icons/ri';

export default [
  {
    id: 'business',
    title: 'Business',
    icon: <RiContactsBookLine size={20} />,
    children: [
      {
        id: 'birthday',
        title: 'Birthday',
        icon: <RiContactsLine size={20} />,
        navLink: '/business/birthday/'
      },

      {
        id: 'certification',
        title: 'Certification',
        icon: <RiContactsLine size={20} />,
        navLink: '/business/certification/'
      },
      {
        id: 'expired',
        title: 'Expired',
        icon: <RiContactsLine size={20} />,
        navLink: '/business/expire/'
      },
      {
        id: 'statistics',
        title: 'Statistics',
        icon: <RiContactsLine size={20} />,
        navLink: '/business/statistics/'
      }
    ]
  }
];
