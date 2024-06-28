// ** React Imports
import { useRef, useState } from 'react';

// ** Custom Components
import Wizard from '@components/wizard';

// ** Steps
// import Template from './steps/Template'
// import GoalInfo from './steps/GoalInfo'

// ** Icons Imports
// import { FileText, Folder } from 'react-feather'
import ProgressionTemplate from './ProgressionTemplate';
import RankTable from './RankTable';
import CandidateTable from './CandidateTable';
import { useRTL } from '../../../utility/hooks/useRTL';
import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchEvents,
//   selectEvent,
//   updateEvent,
//   updateFilter,
//   updateAllFilters,
//   addEvent,
//   removeEvent
// } from '../../../calendar/store';

import EventCalendar from './EventCalendar';
import FinalStepperStatus from './FinalStepperStatus';
import { FileText } from 'react-feather';
const calendarsColor = {
  Business: 'primary',
  Holiday: 'success',
  Personal: 'danger',
  Family: 'warning',
  ETC: 'info'
};

const NewProgressionWizard = (props) => {
  const { selectCustomerData, setSelectCustomerData, setOpenAddProgression } = props;
  const dispatch = useDispatch();
  // const [rSelected, setRSelected] = useState(null);
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
      id: 'rank',
      title: 'Set Rank',
      subtitle: `Setting Member's Rank`,
      // icon: <FileText size={18} />,
      content: (
        <RankTable
          stepper={stepper}
          type="wizard-modern"
          selectCustomerData={selectCustomerData}
          setSelectCustomerData={setSelectCustomerData}
          setOpenAddProgression={setOpenAddProgression}
        />
      )
    },
    {
      id: 'promote',
      title: 'Show Promote',
      subtitle: `Show Member's promote`,
      // icon: <FileText size={18} />,
      content: (
        <FinalStepperStatus
          stepper={stepper}
          selectCustomerData={selectCustomerData}
          setSelectCustomerData={setSelectCustomerData}
          setOpenAddProgression={setOpenAddProgression}
          type="wizard-modern"
        />
      )
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
