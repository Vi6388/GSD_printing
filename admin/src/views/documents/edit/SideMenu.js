import React, { useRef, useState } from 'react';
import { Edit2, Edit3, Square, Tool } from 'react-feather';
import { Button, Card, Col, Row } from 'reactstrap';
import Recipients from './Recipients';
import StandardFields from './StandardFields';
import CustomFields from './CustomFields';
import PrefillTools from './PrefillTools';
import Wizard from '@components/wizard';

export default function SideMenu() {
  // ** Ref
  const ref = useRef(null);
  // ** States
  const [stepper, setStepper] = useState(null);
  const steps = [
    {
      id: 'standard',
      title: '',
      icon: <Square />,
      content: <StandardFields />
    },
    {
      id: 'custom',
      title: '',
      icon: <Tool />,
      content: <CustomFields />
    },
    {
      id: 'prefill',
      title: '',
      icon: <Edit2 />,
      content: <PrefillTools />
    }
  ];

  return (
    <div className="modern-vertical-wizard">
      <Recipients />
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
}
