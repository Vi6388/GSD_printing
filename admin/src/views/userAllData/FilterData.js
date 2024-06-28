import React from 'react';
import { Card, CardBody, CardHeader, CardTitle, Row, Col, Label } from 'reactstrap';
import Select from 'react-select';
import { selectThemeColors } from '@utils';

export const FilterData = ({ filterData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Filters</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          {filterData?.map((item) => {
            return (
              <Col md="3" key={item.key}>
                <Label for="role-select">{item?.lable}</Label>
                <Select
                  isClearable={false}
                  //   value={currentRole}
                  options={item?.option}
                  className="react-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  //   onChange={(data) => {
                  //     setCurrentRole(data);
                  //   }}
                />
              </Col>
            );
          })}
        </Row>
      </CardBody>
    </Card>
  );
};
