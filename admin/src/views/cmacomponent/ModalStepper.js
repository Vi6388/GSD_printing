import { useRef, useState } from 'react';
import Wizard from '@components/wizard';
import { getUserData } from '../../utility/Utils';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BiLocationPlus } from 'react-icons/bi';
import { MdOutlinePersonalInjury } from 'react-icons/md';
import { StepOne } from './step/StepOne';
import '../../assets/styles/user-detail.scss';
import StepTwo from './step/StepTwo';
import { StepThree } from './step/StepThree';

const ModalStepper = ({
  stepOne,
  setStepOne,
  setStepTwo,
  stepTwo,
  setStepThree,
  stepFour,
  stepTwoValid,
  setStepTwoValid,
  setStepperModal,
  stepperModal
}) => {
  const ref = useRef(null);
  const [stepper, setStepper] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [personDisabled, setPersonDisabled] = useState(true);
  const [imageBase64, setImageBase64] = useState('');
  const eventForm = new FormData();
  eventForm.append('userId', getUserData().id);
  const steps = [
    {
      id: 'event-name',
      title: 'Genral',
      subtitle: 'Give A Title',
      icon: <AiOutlineUserAdd size={18} />,
      content: (
        <StepOne
          setStepOne={setStepOne}
          setImagePath={setImageBase64}
          stepper={stepper}
          type="modern-horizental"
          setIsDisabled={setIsDisabled}
          setStepperModal={setStepperModal}
          stepperModal={stepperModal}
        />
      )
    },
    {
      id: 'event-address',
      title: 'Contact',
      subtitle: 'Give A Title',
      disabled: !isDisabled,
      icon: <BiLocationPlus size={18} />,
      content: (
        <StepTwo
          setStepTwo={setStepTwo}
          stepTwoValid={stepTwoValid}
          setStepTwoValid={setStepTwoValid}
          stepper={stepper}
          type="modern-horizental"
          setPersonDisabled={setPersonDisabled}
        />
      )
    },
    {
      id: 'event-personal',
      title: 'Personal',
      subtitle: 'Give A Title',
      disabled: !personDisabled,
      icon: <MdOutlinePersonalInjury size={18} />,
      content: (
        <StepThree
          stepOne={stepOne}
          imagePath={imageBase64}
          stepTwo={stepTwo}
          stepFour={stepFour}
          setStepThree={setStepThree}
          stepper={stepper}
          type="modern-horizental"
          setStepperModal={setStepperModal}
          stepperModal={stepperModal}
        />
      )
    }
  ];
  return (
    <div className="modern-horizental-wizard">
      <Wizard
        type="modern-horizental"
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

export default ModalStepper;
