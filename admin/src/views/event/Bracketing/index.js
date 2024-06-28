// ** React
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// ** ReactStrap Component
import {
  Button,
  Card,
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from 'reactstrap';
import Select from 'react-select';

// ** Component
import BracketOne from './BracketForm/BracketOne';
import BracketTwo from './BracketForm/BracketTwo';
import BracketFour from './BracketForm/BracketFour';
import BracketEight from './BracketForm/BracketEight';
import BracketSixteen from './BracketForm/BracketSixteen';
import BracketThirtyTwo from './BracketForm/BracketThirtyTwo';

// ** Utils
import { selectThemeColors } from '@utils';
import { calculateWeight } from '../../../utility/Utils';

const genderOption = [
  { value: 'all', label: 'Male & Female' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
];

const BracketingMain = (props) => {
  // ** react dom
  const history = useHistory();

  // ** Props
  const { event, registrantData } = props;

  // ** Store
  const progressionStore = useSelector((state) => state.progression);

  // ** State + Option Data
  let sortTypeOption = [
    { value: 'location', label: 'Location' },
    { value: 'weight', label: 'Weight' },
    { value: 'random', label: 'Random' }
  ];

  let bracketFormCountOption = [
    { value: 32, label: '32' },
    { value: 16, label: '16' },
    { value: 8, label: '8' },
    { value: 4, label: '4' }
  ];
  const [selectSortType, setSelectSortType] = useState({ value: 'location', label: 'Location' });
  const [divisionOption, setDivisionOption] = useState([
    {
      value: 'all',
      label: 'None'
    }
  ]);
  const [blankDivisionOption, setBlankDivisionOption] = useState([
    {
      value: 'all',
      label: 'None'
    }
  ]);

  const [selectSortDivision, setSelectSortDivision] = useState({
    value: 'all',
    label: 'None'
  });

  const [printData, setPrintData] = useState([]);
  const [selectPrintDivision, setSelectPrintDivision] = useState({
    value: 'all',
    label: 'None'
  });
  const [selectPrintGender, setSelectPrintGender] = useState({
    value: 'all',
    label: 'Male & Female'
  });
  const [selectPrintAgeFrom, setSelectPrintAgeFrom] = useState('');
  const [selectPrintAgeTo, setSelectPrintAgeTo] = useState('');
  const [selectPrintRankFrom, setSelectPrintRankFrom] = useState('');
  const [selectPrintRankTo, setSelectPrintRankTo] = useState('');
  const [selectPrintBracketFormCount, setSelectPrintBracketFormCount] = useState({
    value: 16,
    label: '16'
  });

  const [blankData, setBlankData] = useState([]);
  const [selectBlankDivision, setSelectBlankDivision] = useState({
    value: 'all',
    label: 'None'
  });
  const [selectBlankGender, setSelectBlankGender] = useState({
    value: 'all',
    label: 'Male & Female'
  });
  const [selectBlankAgeFrom, setSelectBlankAgeFrom] = useState('');
  const [selectBlankAgeTo, setSelectBlankAgeTo] = useState('');
  const [selectBlankRankFrom, setSelectBlankRankFrom] = useState('');
  const [selectBlankRankTo, setSelectBlankRankTo] = useState('');
  const [selectBlankBracketFormCount, setSelectBlankBracketFormCount] = useState({
    value: 16,
    label: '16'
  });

  const [openChangeBracketForm, setOpenChangeBracketForm] = useState(false);
  const toggleChangeBracketForm = () => setOpenChangeBracketForm(!openChangeBracketForm);

  // ** UseEffect
  useEffect(() => {
    let newDivisionOption = [];
    let newBlankDivisionOption = [];
    progressionStore.progressionCategoriesDivision &&
      event &&
      event.divisions &&
      event.divisions.map((item) => {
        let divisionData = progressionStore.progressionCategoriesDivision.filter(
          (divisionItem) => divisionItem._id === item.divisionId
        )[0];
        if (divisionData) {
          let divisionRegistrantData = registrantData?.filter(
            (registrantItem) => registrantItem.divisions.indexOf(divisionData._id) > -1
          );
          let sportData, categoryData;
          progressionStore.sportList?.map((sportItem) =>
            sportItem?.categoryId?.filter(
              (categoryItem) =>
                categoryItem._id === divisionData.categoryId &&
                ((categoryData = categoryItem), (sportData = sportItem))
            )
          );

          if (divisionRegistrantData?.length > 0) {
            let divisionRegistrantDataWithPoint = [];
            switch (selectSortType.value) {
              case 'location':
                divisionRegistrantData = divisionRegistrantData.slice().sort(function (a, b) {
                  return a.location[0]._id.toString() > b.location[0]._id.toString()
                    ? 1
                    : a.location[0]._id.toString() < b.location[0]._id.toString()
                    ? -1
                    : 0;
                });
                divisionRegistrantData.map((divisionRegistrantItem, index) => {
                  let newDivisionRegistrantItem = { ...divisionRegistrantItem };
                  newDivisionRegistrantItem.position = index;
                  divisionRegistrantDataWithPoint.push(newDivisionRegistrantItem);
                });
                break;
              case 'weight':
                divisionRegistrantData = divisionRegistrantData.slice().sort(function (a, b) {
                  return calculateWeight(a.member[0].weight) > calculateWeight(b.member[0].weight)
                    ? 1
                    : calculateWeight(a.member[0].weight) < calculateWeight(b.member[0].weight)
                    ? -1
                    : 0;
                });
                divisionRegistrantData.map((divisionRegistrantItem, index) => {
                  let newDivisionRegistrantItem = { ...divisionRegistrantItem };
                  newDivisionRegistrantItem.position =
                    index <
                    Math.pow(2, Math.ceil(Math.log2(divisionRegistrantData?.length))) -
                      divisionRegistrantData?.length
                      ? index
                      : (index -
                          Math.ceil(
                            Math.pow(2, Math.ceil(Math.log2(divisionRegistrantData?.length))) -
                              divisionRegistrantData?.length / 2
                          )) %
                          2 ===
                        0
                      ? Math.floor(
                          (Math.pow(2, Math.ceil(Math.log2(divisionRegistrantData?.length))) +
                            index -
                            divisionRegistrantData?.length) /
                            2
                        )
                      : Math.floor(
                          (Math.pow(2, Math.ceil(Math.log2(divisionRegistrantData?.length))) -
                            index +
                            divisionRegistrantData?.length +
                            1) /
                            2 -
                            1
                        );
                  divisionRegistrantDataWithPoint.push(newDivisionRegistrantItem);
                });
                divisionRegistrantDataWithPoint = divisionRegistrantDataWithPoint
                  .slice()
                  .sort(function (a, b) {
                    return a.position > b.position ? 1 : a.position < b.position ? -1 : 0;
                  });
                break;
              case 'random':
                divisionRegistrantData.sort(function (a, b) {
                  return 0.5 - Math.random();
                });
                divisionRegistrantData.map((divisionRegistrantItem, index) => {
                  let newDivisionRegistrantItem = { ...divisionRegistrantItem };
                  newDivisionRegistrantItem.position = index;
                  divisionRegistrantDataWithPoint.push(newDivisionRegistrantItem);
                });
                break;
              default:
                break;
            }
            newDivisionOption.push({
              value: item.divisionId,
              label: divisionData.divisionName,
              sportData: sportData,
              categoryData: categoryData,
              divisionData: divisionData,
              registrant: divisionRegistrantDataWithPoint
            });
          } else
            newBlankDivisionOption.push({
              value: item.divisionId,
              label: divisionData.divisionName,
              sportData: sportData,
              categoryData: categoryData,
              divisionData: divisionData
            });
        }
      });
    setDivisionOption([
      {
        value: '',
        label: 'None'
      },
      ...newDivisionOption
    ]);
    setBlankDivisionOption([
      {
        value: '',
        label: 'None'
      },
      ...newBlankDivisionOption
    ]);

    let data = newDivisionOption;
    if (selectPrintDivision.value !== 'all') {
      data =
        data &&
        data.filter(
          (item) => item.divisionData._id.toString() === selectPrintDivision.value.toString()
        );
    }
    if (selectPrintGender.value !== 'all') {
      data =
        data &&
        data.filter((item) => item.divisionData.gender === selectPrintGender.value.toString());
    }
    if (selectPrintAgeFrom !== '') {
      data =
        data && data.filter((item) => item.divisionData.ageTo > parseInt(selectPrintAgeFrom) - 1);
    }
    if (selectPrintAgeTo !== '') {
      data =
        data && data.filter((item) => item.divisionData.ageFrom < parseInt(selectPrintAgeTo) + 1);
    }
    if (selectPrintRankFrom !== '') {
      data =
        data && data.filter((item) => item.divisionData.rankTo > parseInt(selectPrintRankFrom) - 1);
    }
    if (selectPrintRankTo !== '') {
      data =
        data && data.filter((item) => item.divisionData.rankFrom < parseInt(selectPrintRankTo) + 1);
    }
    setPrintData(data);

    let newBlankData = newBlankDivisionOption;
    if (selectBlankDivision.value !== 'all') {
      newBlankData =
        newBlankData &&
        newBlankData.filter(
          (item) => item.divisionData._id.toString() === selectBlankDivision.value.toString()
        );
    }
    if (selectBlankGender.value !== 'all') {
      newBlankData =
        newBlankData &&
        newBlankData.filter(
          (item) => item.divisionData.gender === selectBlankGender.value.toString()
        );
    }
    if (selectBlankAgeFrom !== '') {
      newBlankData =
        newBlankData &&
        newBlankData.filter((item) => item.divisionData.ageTo > parseInt(selectBlankAgeFrom) - 1);
    }
    if (selectBlankAgeTo !== '') {
      newBlankData =
        newBlankData &&
        newBlankData.filter((item) => item.divisionData.ageFrom < parseInt(selectBlankAgeTo) + 1);
    }
    if (selectBlankRankFrom !== '') {
      newBlankData =
        newBlankData &&
        newBlankData.filter((item) => item.divisionData.rankTo > parseInt(selectBlankRankFrom) - 1);
    }
    if (selectBlankRankTo !== '') {
      newBlankData =
        newBlankData &&
        newBlankData.filter((item) => item.divisionData.rankFrom < parseInt(selectBlankRankTo) + 1);
    }
    setBlankData(newBlankData);
  }, [
    progressionStore,
    event,
    registrantData,
    selectSortType,
    selectPrintDivision,
    selectPrintGender,
    selectPrintAgeFrom,
    selectPrintAgeTo,
    selectPrintRankFrom,
    selectPrintRankTo,
    selectBlankDivision
  ]);

  return (
    <Fragment>
      <Card className="p-1">
        <div>
          <div
            className="p-1"
            style={{
              backgroundColor: '#c52f2f',
              color: '#fff',
              borderRadius: '6px 6px 6px 6px'
            }}
          >
            <span>
              <b>{event?.eventName}</b>
            </span>
          </div>
          <div>
            <div className="my-1">
              <span style={{ color: 'blue', marginRight: '3px' }}>
                <b>MASTER RESET: Emergency use only!</b>
              </span>
              <span>Re-sort Members into Divisions. Overwrites ALL division changes!:</span>
              <Button className="ms-1" color="primary">
                Reset Division
              </Button>
            </div>
            <h4>Step 1: Sort Members</h4>
            <div style={{ borderTop: '1px solid #e5e5e5' }}>
              <div className="mt-1">
                <span>
                  Weight, Location, or Random. Weight tries to place Members together by closest
                  weight, location places people so they won't compete against Members from the same
                  location. Random means random placements. Most of the time you will choose
                  Location. Tourneyreg now Auto Sorts so you don't need to remember to. If you
                  manually sort a division you will need to lock it, or the auto sort will override
                  the manual sort!
                </span>
              </div>
              <Row className="my-1">
                <Col xxl={4} xl={5} lg={6} md={12} sm={12}>
                  <div>
                    <span>Current Auto Sort Method:</span>
                    <span style={{ color: 'green' }}>
                      <b>Location</b>
                    </span>
                  </div>
                  <div className="d-flex">
                    <Col md={6}>
                      <Select
                        menuPortalTarget={document.querySelector('body')}
                        id="sort-type"
                        className="react-select"
                        classNamePrefix="select"
                        isClearable={false}
                        options={sortTypeOption}
                        value={selectSortType}
                        onChange={(data) => setSelectSortType(data)}
                        bsSize="sm"
                        theme={selectThemeColors}
                      />
                    </Col>
                    <Col md={6}>
                      {/* <Button className="ms-1" color="primary">
                        Select Sort Type
                      </Button> */}
                    </Col>
                  </div>
                </Col>
                <Col xxl={4} xl={6} lg={6} md={12} sm={12}>
                  <div>
                    <span>Manually Sort This Division</span>
                  </div>
                  <Row className="d-flex">
                    <Col md={6}>
                      <Select
                        menuPortalTarget={document.querySelector('body')}
                        id="division"
                        className="react-select"
                        classNamePrefix="select"
                        isClearable={false}
                        options={divisionOption}
                        value={selectSortDivision}
                        onChange={(data) => setSelectSortDivision(data)}
                        bsSize="sm"
                        theme={selectThemeColors}
                      />
                    </Col>
                    <Col md={6}>
                      <Button
                        color="primary"
                        disabled={!selectSortDivision.value}
                        onClick={() => {
                          toggleChangeBracketForm();
                        }}
                      >
                        Change Bracket Form
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <h4>Step 2: Print Brackets</h4>
            <div style={{ borderTop: '1px solid #e5e5e5' }}>
              <div className="mt-2">
                <Row style={{ paddingBottom: '10px' }}>
                  <Col md="3">
                    <Label for="role-select">Division</Label>
                    <Select
                      menuPortalTarget={document.querySelector('body')}
                      id="division"
                      className="react-select"
                      classNamePrefix="select"
                      isClearable={false}
                      options={divisionOption}
                      value={selectPrintDivision}
                      onChange={(data) => setSelectPrintDivision(data)}
                      bsSize="sm"
                      theme={selectThemeColors}
                    />
                  </Col>
                  <Col md="3">
                    <Label for="plan-select">Gender</Label>
                    <Select
                      options={genderOption}
                      value={selectPrintGender}
                      onChange={(e) => {
                        setSelectPrintGender(e);
                      }}
                      isClearable={false}
                      className="react-select"
                      classNamePrefix="select"
                    />
                  </Col>
                  <Col md="3">
                    <Label for="status-select">Age</Label>
                    <InputGroup>
                      <InputGroupText> From </InputGroupText>
                      <Input
                        type="number"
                        value={selectPrintAgeFrom}
                        onChange={(e) => setSelectPrintAgeFrom(e.target.value)}
                      ></Input>
                      <InputGroupText> To </InputGroupText>
                      <Input
                        type="number"
                        value={selectPrintAgeTo}
                        onChange={(e) => setSelectPrintAgeTo(e.target.value)}
                      ></Input>
                    </InputGroup>
                  </Col>
                  <Col md="3">
                    <Label for="status-select">Rank</Label>
                    <InputGroup>
                      <InputGroupText> From </InputGroupText>
                      <Input
                        type="number"
                        value={selectPrintRankFrom}
                        onChange={(e) => setSelectPrintRankFrom(e.target.value)}
                      ></Input>
                      <InputGroupText> To </InputGroupText>
                      <Input
                        type="number"
                        value={selectPrintRankTo}
                        onChange={(e) => setSelectPrintRankTo(e.target.value)}
                      ></Input>
                    </InputGroup>
                  </Col>
                </Row>
                <span style={{ color: 'red' }}>
                  *new: to split divisions by age type in the age you want (div is 6-7: just want 6
                  type 6 into both upper and lower age limits). Works with single div too!
                </span>
                <div className="d-flex align-items-center">
                  <span>or one div</span>
                  <Input type="number" style={{ width: '70px' }} />
                </div>
                <div className="mt-2">
                  <div>
                    <Input type="radio" />
                    <span className="ms-1">print as a list</span>
                  </div>
                  <div>
                    <Input type="radio" defaultChecked />
                    <span className="ms-1">print as bracketed</span>
                  </div>
                  <div>
                    <Input type="radio" />
                    <span className="ms-1">print Vertical bracketing?</span>
                  </div>
                  <div>
                    <Input type="radio" defaultChecked />
                    <span className="ms-1">print Landscape bracketing?</span>
                  </div>
                  <div>
                    <Input type="checkbox" />
                    <span className="ms-1">print double elimination? (12 or less competitors)</span>
                  </div>
                  <div>
                    <Input type="checkbox" />
                    <span className="ms-1">
                      print Brazilian Repechage bracketing? (16 or less competitors/bracket)
                    </span>
                  </div>
                </div>
                <div className="mt-1 d-flex flex-column">
                  <div style={{ width: '100px' }}>
                    <Select
                      menuPortalTarget={document.querySelector('body')}
                      id="bracketFormCount"
                      className="react-select"
                      classNamePrefix="select"
                      isClearable={false}
                      options={bracketFormCountOption}
                      value={selectPrintBracketFormCount}
                      onChange={(data) => setSelectPrintBracketFormCount(data)}
                      bsSize="sm"
                      theme={selectThemeColors}
                    />
                  </div>
                  <span>
                    Limit to N competitors (ie, no more than 4 in a division before it breaks into
                    subdivisions)
                  </span>
                  <Button
                    onClick={() => {
                      history.push({
                        state: {
                          data: printData,
                          event: event,
                          bracketFormCount: selectPrintBracketFormCount,
                          url: window.location.pathname
                        },
                        pathname: '/divisionsheet'
                      });
                    }}
                    color="primary"
                    className="mt-1"
                    style={{ width: 'fit-content' }}
                  >
                    Open Division Sheet
                  </Button>
                </div>
              </div>
            </div>
            {/* <div className="mt-1">
              <h4>Step 3: Report Results</h4>
              <div style={{ borderTop: '1px solid #e5e5e5' }}>
                <div className="mt-1">
                  <Row>
                    <Col sm={6} lg={6} md={6}>
                      <div className="d-flex justify-content-end align-items-center">
                        <span style={{ color: '#999' }}>
                          Report Division Placement - Type in Division ID here:
                        </span>
                        <Input type="text" style={{ width: '70px' }} />
                      </div>
                    </Col>
                    <Col sm={6} lg={6} md={6}>
                      <div className="d-flex justify-content-center">
                        <Button href="/newPage" color="primary">
                          Open Division Sheet
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="mt-1">
                  <center>
                    <span style={{ color: 'red' }}>{'[Export Placements Only]'}</span>
                    <span>OR</span>
                    <span style={{ color: 'red' }}>{'[Export Everyone]'}</span>
                    <span>OR</span>
                    <span style={{ color: 'red' }}>
                      {'[Export AAU Report] [Export AAU Olympic Report]'}
                    </span>
                  </center>
                </div>
              </div>
            </div> */}
            <div className="mt-1">
              <h4>Print Blank Division Sheets</h4>
              <div style={{ borderTop: '1px solid #e5e5e5' }}>
                <div className="mt-1">
                  <Row>
                    <Col md={3}>
                      <Label for="role-select">Division</Label>
                      <Select
                        id="division"
                        menuPortalTarget={document.querySelector('body')}
                        className="react-select"
                        classNamePrefix="select"
                        isClearable={false}
                        options={blankDivisionOption}
                        value={selectBlankDivision}
                        onChange={(data) => setSelectBlankDivision(data)}
                        bsSize="sm"
                        theme={selectThemeColors}
                      />
                    </Col>

                    <Col md="3">
                      <Label for="plan-select">Gender</Label>
                      <Select
                        options={genderOption}
                        value={selectBlankGender}
                        onChange={(e) => {
                          setSelectBlankGender(e);
                        }}
                        isClearable={false}
                        className="react-select"
                        classNamePrefix="select"
                      />
                    </Col>
                    <Col md="3">
                      <Label for="status-select">Age</Label>
                      <InputGroup>
                        <InputGroupText> From </InputGroupText>
                        <Input
                          type="number"
                          value={selectBlankAgeFrom}
                          onChange={(e) => setSelectBlankAgeFrom(e.target.value)}
                        ></Input>
                        <InputGroupText> To </InputGroupText>
                        <Input
                          type="number"
                          value={selectBlankAgeTo}
                          onChange={(e) => setSelectBlankAgeTo(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </Col>
                    <Col md="3">
                      <Label for="status-select">Rank</Label>
                      <InputGroup>
                        <InputGroupText> From </InputGroupText>
                        <Input
                          type="number"
                          value={selectBlankRankFrom}
                          onChange={(e) => setSelectBlankRankFrom(e.target.value)}
                        ></Input>
                        <InputGroupText> To </InputGroupText>
                        <Input
                          type="number"
                          value={selectBlankRankTo}
                          onChange={(e) => setSelectBlankRankTo(e.target.value)}
                        ></Input>
                      </InputGroup>
                    </Col>
                  </Row>
                </div>
                <div className="mt-2">
                  <div>
                    <Input type="radio" />
                    <span className="ms-1">print as a list</span>
                  </div>
                  <div>
                    <Input type="radio" defaultChecked />
                    <span className="ms-1">print as bracketed</span>
                  </div>
                  <div>
                    <Input type="radio" />
                    <span className="ms-1">print Vertical bracketing?</span>
                  </div>
                  <div>
                    <Input type="radio" defaultChecked />
                    <span className="ms-1">print Landscape bracketing?</span>
                  </div>
                  <div>
                    <Input type="checkbox" />
                    <span className="ms-1">print double elimination? (12 or less competitors)</span>
                  </div>
                  <div>
                    <Input type="checkbox" />
                    <span className="ms-1">
                      print Brazilian Repechage bracketing? (16 or less competitors/bracket)
                    </span>
                  </div>
                </div>
                <div className="mt-1  d-flex flex-column">
                  <div style={{ width: '100px' }}>
                    <Select
                      menuPortalTarget={document.querySelector('body')}
                      id="bracketFormCount"
                      className="react-select"
                      classNamePrefix="select"
                      isClearable={false}
                      options={bracketFormCountOption}
                      value={selectBlankBracketFormCount}
                      onChange={(data) => setSelectBlankBracketFormCount(data)}
                      bsSize="sm"
                      theme={selectThemeColors}
                    />
                  </div>
                  <span> Number of Members in Brackets</span>
                  <Button
                    onClick={() => {
                      history.push({
                        state: {
                          data: blankData,
                          event: event,
                          bracketFormCount: selectBlankBracketFormCount,
                          url: window.location.pathname
                        },
                        pathname: '/divisionsheet'
                      });
                    }}
                    color="primary"
                    className="mt-1"
                    style={{ width: 'fit-content' }}
                  >
                    Create Blank Sheet
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Modal
        toggle={toggleChangeBracketForm}
        className="modal-dialog-centered"
        isOpen={openChangeBracketForm}
        size="xl"
      >
        <ModalHeader toggle={toggleChangeBracketForm}>
          {selectSortDivision?.divisionData?.divisionName}
        </ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div>
            {selectSortDivision?.registrant?.length > 16 ? (
              <BracketThirtyTwo data={selectSortDivision} />
            ) : selectSortDivision?.registrant?.length > 8 ? (
              <BracketSixteen data={selectSortDivision} />
            ) : selectSortDivision?.registrant?.length > 4 ? (
              <BracketEight data={selectSortDivision} />
            ) : selectSortDivision?.registrant?.length > 2 ? (
              <BracketFour data={selectSortDivision} />
            ) : selectSortDivision?.registrant?.length > 1 ? (
              <BracketTwo data={selectSortDivision} />
            ) : selectSortDivision?.registrant?.length > 0 ? (
              <BracketOne data={selectSortDivision} />
            ) : (
              <>No registrant Member</>
            )}
          </div>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between ">
          <Button className="mt-1 me-3" outline onClick={toggleChangeBracketForm}>
            Cancel
          </Button>
          <Button className="mt-1" color="primary">
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};
export default BracketingMain;
