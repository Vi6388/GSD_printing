import React from 'react';
import { CardBody } from 'reactstrap';
import BtnLine from './drags/line/BtnLine';

export default function PrefillTools() {
  return (
    <CardBody className="px-1">
      <h5 className="text-start">Prefill Tools</h5>
      <BtnLine />
    </CardBody>
  );
}
