import React, { Fragment, useState } from 'react';
import { Col, Input, InputGroup, InputGroupText, Row } from 'reactstrap';
import Select from 'react-select';
import { selectThemeColors } from '@utils';
import { FaMedal } from 'react-icons/fa';
import rankimg from '../../../assets/images/medal/rankingpoints.png';

const genderOptions = [
  { value: 'all', label: 'Male & Female' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
];
const rankOptions = [
  { value: 'all', label: 'All' },
  { value: '1', label: 'CMA 1 st Dan' },
  { value: '2', label: 'CMA 2 nd Dan' },
  { value: '3', label: 'CMA 3 rd Dan' },
  { value: '4', label: 'CMA 4 th Dan' },
  { value: '5', label: 'CMA 5 th Dan' },
  { value: '6', label: 'CMA 6 th Dan' }
];
const RankSideBar = () => {
  const [divisionOptions, setDivisionOptions] = useState([{ value: 'all', label: 'All' }]);
  const [schoolOptions, setSchoolOptions] = useState([{ value: 'all', label: 'All' }]);
  const [yearOptions, setYearOptions] = useState([{ value: 'all', label: 'All' }]);
  const [selectDivision, setSelectDivision] = useState({ value: 'all', label: 'All' });
  const [selectSchool, setSelectSchool] = useState({ value: 'all', label: 'All' });
  const [selectGender, setSelectGender] = useState({ value: 'all', label: 'Male & Female' });
  const [selectYear, setSelectYear] = useState({ value: 'all', label: 'All' });
  const [selectCMAId, setSelectCMAId] = useState('');
  const [selectAgeFrom, setSelectAgeFrom] = useState('');
  const [selectAgeTo, setSelectAgeTo] = useState('');
  const [selectRank, setSelectRank] = useState({ value: 'all', label: 'All' });
  return (
    <Fragment>
      <div>
        <div
          style={{
            backgroundColor: '#c52f2f',
            borderRadius: '6px',
            color: '#fff'
          }}
          className="d-flex justify-content-center align-items-center mb-1"
        >
          <h4 className="mt-1" style={{ color: '#fff' }}>
            Find Member
          </h4>
        </div>
        <div className="mt-1">
          <div className="row">
            <div className="col-md-12 mt-1">
              <label>Select Division</label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                value={selectDivision}
                options={divisionOptions}
                onChange={(e) => setSelectDivision(e)}
                isClearable={false}
              />
            </div>
            <div className="col-md-12 mt-1">
              <label>School</label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                value={selectSchool}
                options={schoolOptions}
                onChange={(e) => setSelectSchool(e)}
                isClearable={false}
              />
            </div>
            <div className="col-md-12 mt-1">
              <label>Gender</label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                value={selectGender}
                options={genderOptions}
                onChange={(e) => setSelectGender(e)}
                isClearable={false}
              />
            </div>
            <div className="col-md-6 mt-1">
              <label>CMA ID#</label>
              <Input
                // type="number"
                placeholder="Enter CMA ID"
                value={selectCMAId}
                onChange={(e) => setSelectCMAId(e.target.value)}
              ></Input>
            </div>
            <div className="col-md-6 mt-1">
              <label>Year</label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                value={selectYear}
                options={yearOptions}
                onChange={(e) => setSelectYear(e)}
                isClearable={false}
              />
            </div>
            <div className="col-md-6 mt-1">
              <label>Age</label>
              <InputGroup>
                <Input
                  type="number"
                  placeholder="from"
                  value={selectAgeFrom}
                  onChange={(e) => setSelectAgeFrom(e.target.value)}
                ></Input>
                <InputGroupText>-</InputGroupText>
                <Input
                  type="number"
                  placeholder="to"
                  value={selectAgeTo}
                  onChange={(e) => setSelectAgeTo(e.target.value)}
                ></Input>
              </InputGroup>
            </div>
            <div className="col-md-6 mt-1">
              <label>Rank</label>
              <Select
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                value={selectRank}
                options={rankOptions}
                onChange={(e) => setSelectRank(e)}
                isClearable={false}
              />
            </div>
            <div className="col-md-12 mt-2">
              <button className="btn btn-outline-primary">Reset</button>
              {/* </div>
            <div className="col-md-6 mt-2"> */}
              <button className="btn btn-primary float-end">Search</button>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="belt-list">
          <div className="row">
            <div className="col-md-12">
              <div className="mt-1">
                <img src={rankimg} width="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default RankSideBar;
