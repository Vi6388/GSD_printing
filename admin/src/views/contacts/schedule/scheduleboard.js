import React, { Fragment, useRef, useState } from 'react';
import WeekCalender from './WeekCalender';
import DayCalendar from './DayCalendar';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  TabContent,
  TabPane,
  Card
} from 'reactstrap';
import { ArrowLeftCircle, ArrowRightCircle } from 'react-feather';
import Breadcrumbs from '@components/breadcrumbs';

const EmployeeCalender = () => {
  const [showText, setShowText] = useState(false);
  const [inputList, setInputList] = React.useState([]);
  const [inputWeekList, setInputWeekList] = useState([]);
  const [employeeAddList, setEmployeeAddList] = useState([]);
  const [active, setActive] = useState('day');

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const colors = ['purple', 'yellow', 'orange', 'brown', 'black', 'red', 'green', 'pink'];

  const addEmployeeFiledInCalendar = (e) => {
    setEmployeeAddList(
      employeeAddList.concat(
        <tr>
          <td id="sub">
            <div className="d-flex p-1">
              <Avatar src="/static/images/avatar/1.jpg" />
              <div className="ml-1">
                <h5 className="font-weight-bold">Antanio S</h5>
                <span>0.00 - $0.00</span>
              </div>
            </div>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      )
    );
  };

  const onAddBtnClick = (event) => {
    setInputWeekList(
      inputWeekList.concat(
        <tr
          style={{ background: colors[inputWeekList.length % colors.length] }}
          className="jobs_column"
        >
          <td className="ml-1" style={{ border: 'none' }}>
            Open
          </td>
          <td style={{ border: 'none' }}></td>
          <td style={{ border: 'none' }}></td>
          <td style={{ border: 'none' }}></td>
          <td style={{ border: 'none' }}></td>
          <td style={{ border: 'none' }}></td>
          <td style={{ border: 'none' }}></td>
          <td style={{ border: 'none' }}></td>
        </tr>
      )
    );
  };

  return (
    <Card>
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-around w-25 align-items-center">
          <Button className="btn-icon" type="text" color="primary" outline>
            <ArrowLeftCircle />
          </Button>
          <span>
            <b>January</b>
          </span>
          <Button className="btn-icon" type="text" color="primary" outline>
            <ArrowRightCircle />
          </Button>
        </div>
        <div className="btn-group m-2" role="group" aria-label="Basic example">
          <button
            active={active === 'day'}
            onClick={() => {
              toggle('day');
            }}
            type="button"
            className="btn btn-primary"
          >
            Day
          </button>
          <button
            active={active === 'day'}
            onClick={() => {
              toggle('week');
            }}
            type="button"
            className="btn btn-primary"
          >
            week
          </button>

          <Dropdown
            isOpen={showText}
            toggle={() => {
              setShowText(!showText);
            }}
            direction="right"
            className="text-start"
          >
            <button
              className="btn btn-primary dropdown-toggle h-100 rounded-0 rounded-right"
              type="button"
              onClick={() => {
                setShowText(!showText);
              }}
            >
              Setting
            </button>
            <DropdownMenu direction="left" className="m-1">
              <DropdownItem className="border-bottom">Set Color</DropdownItem>
              <DropdownItem className="border-bottom">Name of shift</DropdownItem>
              <DropdownItem className="border-bottom">Time of shift</DropdownItem>
              <DropdownItem className="border-bottom">End time of shift</DropdownItem>
              <DropdownItem className="border-bottom">Add additional shift</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div>
        <div className="col-md-12 calenders">
          <TabContent className="py-50" activeTab={active}>
            <TabPane tabId="day">
              <DayCalendar
                inputList={inputList}
                inputWeekList={inputWeekList}
                employeeAddList={employeeAddList}
                addEmployeeFiledInCalendar={addEmployeeFiledInCalendar}
              />
            </TabPane>
            <TabPane tabId="week">
              <WeekCalender
                employeeAddList={employeeAddList}
                onAddBtnClick={onAddBtnClick}
                inputWeekList={inputWeekList}
                addEmployeeFiledInCalendar={addEmployeeFiledInCalendar}
              />
            </TabPane>
          </TabContent>
        </div>
      </div>
    </Card>
  );
};

export default EmployeeCalender;
