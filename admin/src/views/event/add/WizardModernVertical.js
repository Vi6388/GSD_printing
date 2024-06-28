// ** React Imports
import { useRef, useState } from 'react';
// ** Custom Components
import Wizard from '@components/wizard';

// ** Steps
import Title from './steps/Title';
import Banner from './steps/Banner';
import Waive from './steps/Waive';
import Host from './steps/Host';
import Venue from './steps/Venue';
import Tickets from './steps/Tickets';
import { getUserData } from '../../../utility/Utils';

// ** Styles
import '@src/assets/styles/event.scss';
// ** Icons Imports
import { FileText, AlertCircle, MapPin, Image, Tool, User } from 'react-feather';

const WizardModernVertical = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const eventForm = new FormData();
  eventForm.append('userId', getUserData().id);

  const steps = [
    {
      id: 'event-title',
      title: 'Event Title',
      subtitle: 'Give A Title',
      icon: <FileText size={18} />,
      content: <Title eventForm={eventForm} stepper={stepper} type="modern-vertical" />
    },
    {
      id: 'Banner',
      title: 'Event Banner',
      subtitle: 'Upload An Event Banner',
      icon: <Image size={18} />,
      content: <Banner eventForm={eventForm} stepper={stepper} type="modern-vertical" />
    },
    {
      id: 'host',
      title: 'Host',
      subtitle: 'Add Event Host',
      icon: <User size={18} />,
      content: <Host eventForm={eventForm} stepper={stepper} type="modern-vertical" />
    },
    {
      id: 'venue',
      title: 'Venue',
      subtitle: 'Add Address',
      icon: <MapPin size={18} />,
      content: <Venue eventForm={eventForm} stepper={stepper} type="modern-vertical" />
    },
    {
      id: 'waive',
      title: 'Waive',
      subtitle: 'Add Waive',
      icon: <AlertCircle size={18} />,
      content: <Waive eventForm={eventForm} stepper={stepper} type="modern-vertical" />
    },
    {
      id: 'tickets',
      title: 'Event Details',
      subtitle: 'Lets Know Event Details',
      icon: <Tool size={18} />,
      content: <Tickets eventForm={eventForm} stepper={stepper} type="modern-vertical" />
    }
  ];

  return (
    <div className="modern-vertical-wizard">
      <Wizard type="modern-vertical" ref={ref} steps={steps} instance={(el) => setStepper(el)} />
    </div>
  );
};

export default WizardModernVertical;
