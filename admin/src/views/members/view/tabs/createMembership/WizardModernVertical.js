import { useRef, useState } from 'react';
import Wizard from '@components/wizard';
import Title from './steps/Title';
import Club from './steps/Club';
import AditionInfo from './steps/AdditionalInfo';
import Certification from './steps/Certification';
import { FileText, User, Tool, Info } from 'react-feather';
import { getMemberShip } from '../../../../../requests/memberships/membershipAPI';
import { fetchLocationdata } from '../../../../../requests/location/LocationAPI';

const WizardModernVertical = ({ memberId, url }) => {
  const ref = useRef(null);
  const memberAPIData = getMemberShip().data;
  const locationData = fetchLocationdata().data;
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [stepper, setStepper] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isClubDisabled, setIsClubDisabled] = useState(true);
  const [isAddInfoDisabled, setIsAddInfoDisabled] = useState(true);
  const [memberData, setMemberData] = useState('');
  const [clubData, setClubData] = useState('');
  const [addInfoData, setAddInfoData] = useState('');
  const [certificationData, setCertificationData] = useState('');

  const steps = [
    {
      id: 'membershipdetail',
      title: 'Membership Details',
      subtitle: 'Give The Membership Detail',
      icon: <FileText size={18} />,
      content: (
        <Title
          selectedMembership={selectedMembership}
          memberAPIData={memberAPIData}
          setSelectedMembership={setSelectedMembership}
          setIsDisabled={setIsDisabled}
          stepper={stepper}
          setMemberData={setMemberData}
        />
      )
    },
    {
      id: 'clubinfo',
      title: 'Club Info',
      subtitle: 'Add Club Info',
      disabled: !isDisabled,
      icon: <User size={18} />,
      content: (
        <Club
          selectedMembership={selectedMembership}
          setIsClubDisabled={setIsClubDisabled}
          stepper={stepper}
          setClubData={setClubData}
          locationData={locationData}
        />
      )
    },
    // {
    //   id: 'personal-detail',
    //   title: 'Personal Details',
    //   subtitle: 'Add Personal Details',
    //   icon: <BiDetail size={18} />,
    //   content: <PersonalDetail eventForm={eventForm} stepper={stepper} type="modern-vertical" />
    // },
    // {
    //   id: 'address',
    //   title: 'Address',
    //   subtitle: 'Add Address',
    //   icon: <MapPin size={18} />,
    //   content: <Venue eventForm={eventForm} stepper={stepper} type="modern-vertical" />
    // },
    {
      id: 'aditional-info',
      title: 'Additional Information',
      subtitle: 'Add Additional Information',
      disabled: !isClubDisabled,
      icon: <Info size={18} />,
      content: (
        <AditionInfo
          setAddInfoData={setAddInfoData}
          setIsAddInfoDisabled={setIsAddInfoDisabled}
          stepper={stepper}
        />
      )
    },
    // {
    //   id: 'disablity',
    //   title: 'Disability & Medical Information',
    //   subtitle: 'Add Disability Information',
    //   icon: <Tool size={18} />,
    //   content: <Tickets eventForm={eventForm} stepper={stepper} type="modern-vertical" />
    // },
    {
      id: 'certification',
      title: 'Certification',
      subtitle: 'Add Certification',
      disabled: !isAddInfoDisabled,
      icon: <Tool size={18} />,
      content: (
        <Certification
          stepper={stepper}
          selectedMembership={selectedMembership}
          setCertificationData={setCertificationData}
          memberData={memberData}
          clubData={clubData}
          addInfoData={addInfoData}
          certificationData={certificationData}
          memberId={memberId}
          url={url}
        />
      )
    }
    // {
    //   id: 'tickets',
    //   title: 'Tickets',
    //   subtitle: 'Lets Create Tickets',
    //   icon: <Tool size={18} />,
    //   content: <Tickets eventForm={eventForm} stepper={stepper} type="modern-vertical" />
    // }
  ];

  return (
    <div className="modern-vertical-wizard">
      <Wizard
        type="modern-vertical"
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

export default WizardModernVertical;
