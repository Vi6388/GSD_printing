import React, { useRef, useState } from 'react';
import Wizard from '@components/wizard';
import SelectingMember from './SelectingMember';
import Pay from './Pay';
import Division from './Division';
import { fetchMemberdata } from '../../../../requests/member/GetMembers';

const WizardModernHorizontal = ({
  toggle,
  event,
  selectMemberData,
  registrantType,
  refetchRegistrantData
}) => {
  // ** State
  const [stepper, setStepper] = useState(null);
  const [payload, setPayload] = useState({
    memberId: selectMemberData?.memberId,
    registrantType: registrantType,
    eventId: event._id
  });

  const { data: memberData } = fetchMemberdata();
  // ** Ref
  const ref = useRef(null);

  let steps = [
    {
      id: 'selectingMember',
      title: 'Select Member',
      content: (
        <SelectingMember
          stepper={stepper}
          type="modern-horizantal"
          event={event}
          payload={payload}
          setPayload={setPayload}
          registrantType={registrantType}
          selectMemberData={selectMemberData}
        />
      )
    },
    {
      id: 'selectingDivision',
      title: 'Select Division',
      content: (
        <Division
          stepper={stepper}
          type="modern-horizantal"
          event={event}
          payload={payload}
          setPayload={setPayload}
          selectMemberData={selectMemberData}
        />
      )
    },
    {
      id: 'pay',
      title: 'Pay',
      content: (
        <Pay
          stepper={stepper}
          type="modern-horizantal"
          event={event}
          toggle={toggle}
          payload={payload}
          selectMemberData={selectMemberData}
          setPayload={setPayload}
          refetchRegistrantData={refetchRegistrantData}
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
        // options={{
        //   linear: false
        // }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default WizardModernHorizontal;
