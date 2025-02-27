// ** React Imports
import { useRef, useState } from 'react';

// ** Custom Components
import Wizard from '@components/wizard';
// ** Icons Imports
import ProgressionTemplate from './ProgressionTemplate';
import RankTable from './RankTable';
import CandidateTable from './CandidateTable';
import { useRTL } from '../../../../utility/hooks/useRTL';
import { useDispatch, useSelector } from 'react-redux';
import FinalStepperStatus from './FinalStepperStatus';
const calendarsColor = {
  Business: 'primary',
  Holiday: 'success',
  Personal: 'danger',
  Family: 'warning',
  ETC: 'info'
};

const NewProgressionWizard = () => {
  const dispatch = useDispatch();
  const [rSelected, setRSelected] = useState(null);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [addSidebarOpen, setAddSidebarOpen] = useState(false);
  const [calendarApi, setCalendarApi] = useState(null);
  const [isRtl] = useRTL();
  const store = useSelector((state) => state.calendar);
  const toggleSidebar = (val) => setLeftSidebarOpen(val);
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen);

  const blankEvent = {
    title: '',
    start: '',
    end: '',
    allDay: false,
    url: '',
    extendedProps: {
      calendar: '',
      guests: [],
      location: '',
      description: ''
    }
  };

  // ** Ref
  const ref = useRef(null);
  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: 'tction',
      title: 'Action',
      subtitle: 'Choose and Action',
      // icon: <Folder size={18} />,
      content: (
        <ProgressionTemplate
          rSelected={rSelected}
          setRSelected={setRSelected}
          stepper={stepper}
          type="wizard-modern"
        />
      )
    },
    {
      id: 'next',
      title: 'Next Step',
      subtitle: 'Complete the next task',
      // icon: <FileText size={18} />,
      content:
        rSelected === 1 ? (
          <RankTable stepper={stepper} type="wizard-modern" />
        ) : rSelected === 2 ? (
          <CandidateTable stepper={stepper} type="wizard-modern" />
        ) : (
          ''
        )
    },
    {
      id: 'status',
      title: 'Status',
      subtitle: 'Report of Action Completed',
      content: <FinalStepperStatus stepper={stepper} type="wizard-modern" />
    }
  ];

  return (
    <div className="modern-horizontal-wizard">
      <Wizard
        type="modern-horizontal"
        ref={ref}
        steps={steps}
        options={{
          linear: false
        }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default NewProgressionWizard;
