import React from 'react';
import { Card, Col, Input, Row } from 'reactstrap';
import BeltOne from '@src/assets/images/belt/1cd12b2e-f284-4696-9a45-50aabe0cc1cb-orange.png';
import BeltTwo from '@src/assets/images/belt/6dae77be-a414-40b2-89fb-51964f6143ec-black-white.png';
import BeltThree from '@src/assets/images/belt/53eca07a-b288-46ab-9f79-3fc46d6fba60-white-orange.png';
import BeltFour from '@src/assets/images/belt/60bee390-e740-49fb-b851-804f11e5529e-yellow.png';
import BeltFive from '@src/assets/images/belt/321eaa19-7803-453e-bca7-80a9a8498d77-purple.png';
import BeltSix from '@src/assets/images/belt/3466366c-194d-4ad9-8564-e261136a9e2a-blue-black.png';
import BeltSeven from '@src/assets/images/belt/cda63793-61a7-4a9d-8430-f0f25422536f-green-black.png';
import BeltEight from '@src/assets/images/belt/cfe3c5ea-3baa-4ecc-b2a5-bbc32f752ce5-white.png';

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const belts = {
  BeltOne: BeltOne,
  BeltTwo: BeltTwo,
  BeltThree: BeltThree,
  BeltFour: BeltFour,
  BeltFive: BeltFive,
  BeltSix: BeltSix,
  BeltSeven: BeltSeven,
  BeltEight: BeltEight
};

const RenderBelt = ({ payload }) => {
  const beltImg = belts[payload.value];
  return <img src={beltImg} height="50px" width="50px" />;
};
const Chart = () => {
  const data = [
    { key: 1, name: 'BeltOne', uv: 100, pv: 100, amt: 100 },
    { key: 2, name: 'BeltTwo', uv: 180, pv: 180, amt: 180 },
    { key: 3, name: 'BeltThree', uv: 110, pv: 110, amt: 100 },
    { key: 4, name: 'BeltFour', uv: 110, pv: 110, amt: 100 },
    { key: 5, name: 'BeltFive', uv: 110, pv: 110, amt: 100 },
    { key: 6, name: 'BeltSix', uv: 110, pv: 110, amt: 100 },
    { key: 7, name: 'BeltSeven', uv: 110, pv: 110, amt: 100 },
    { key: 8, name: 'BeltEight', uv: 110, pv: 110, amt: 100 }
  ];

  return (
    <Card className="p-1">
      <BarChart width={1000} height={400} data={data}>
        <XAxis dataKey="name" stroke="#8884d8" tick={<RenderBelt />} />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="uv" fill="#8884d8" barSize={30} />
      </BarChart>

      <Row className="d-flex align-item-center p-1 mt-1">
        <Col md={2}>
          <Input id="exampleSelect" name="select" type="select">
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </Input>
        </Col>
        <Col md={2}>
          <Input id="exampleSelect" name="select" type="select">
            <option>2010</option>
            <option>2011</option>
            <option>2012</option>
            <option>2013</option>
            <option>2014</option>
            <option>2015</option>
            <option>2016</option>
            <option>2017</option>
            <option>2018</option>
            <option>2019</option>
            <option>2020</option>
            <option>2021</option>
          </Input>
        </Col>
      </Row>
    </Card>
  );
};

export default Chart;
