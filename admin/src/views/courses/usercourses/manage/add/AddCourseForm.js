// ** React Imports
import { useRef, useState } from 'react';

// ** Custom Components
import Wizard from '@components/wizard';

// ** Steps
import CourseInfo from './courseFormSteps/CourseInfo';

const AddCourseForm = (props) => {
  const { centeredModal, setCenteredModal, store } = props;
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: 'deatils',
      title: 'Course Details',
      subtitle: 'Enter Course Details.',
      content: (
        <CourseInfo
          setCenteredModal={setCenteredModal}
          centeredModal={centeredModal}
          stepper={stepper}
          store={store}
        />
      )
    }
  ];
  return (
    <>
      <div className="horizontal-wizard">
        <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
      </div>
    </>
  );
};

export default AddCourseForm;
