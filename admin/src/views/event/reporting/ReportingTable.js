import React, { Fragment, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import useColumns from './useColumn';
import { ChevronDown } from 'react-feather';
import { FaChevronDown, FaChevronUp, FaMedal } from 'react-icons/fa';
import {
  Button,
  Card,
  Col,
  Collapse,
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
import { MdCancel } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { fetchReportingListData } from '../../../requests/event/manage-reporting';
import {
  calculateMedalCounts,
  convertUnit,
  eventPointTypeDefaultData,
  medalCountTypeDefaultData
} from '../../../utility/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { eventPointTypeFetchAction, reportingUpdateAction } from '../store/actions';

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';
import ReactPaginate from 'react-paginate';
const genderOption = [
  { value: 'all', label: 'Male & Female' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' }
];

function ReportingTable(props) {
  const { event } = props;
  const dispatch = useDispatch();

  const { data: reportingData, refetch } = useQuery(
    ['get-Reporting-data', event?._id],
    fetchReportingListData
  );
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [points, setPoints] = useState([]);
  const [resultMedalCount, setResultMedalCount] = useState({
    gold: 0,
    silver: 0,
    bronze: 0,
    participation: 0
  });
  const [pointData, setPointData] = useState([]);
  const [divisionOption, setDivisionOption] = useState([]);
  const [selectDivision, setSelectDivision] = useState({ value: 'all', label: 'All Division' });
  const [selectGender, setSelectGender] = useState({ value: 'all', label: 'Male & Female' });
  const [selectAgeFrom, setSelectAgeFrom] = useState('');
  const [selectAgeTo, setSelectAgeTo] = useState('');
  const [selectRankFrom, setSelectRankFrom] = useState('');
  const [selectRankTo, setSelectRankTo] = useState('');

  // ** Store
  const progressionStore = useSelector((state) => state.progression);
  const store = useSelector((state) => state.eventMain.eventPointType);

  useEffect(() => dispatch(eventPointTypeFetchAction()), []);
  useEffect(() => {
    if (event?.pointType) {
      if (event.pointType === 'None') {
        setPointData([]);
      } else if (store?.data) {
        setPointData(store.data.filter((item) => item.name === event.pointType)[0].points);
      } else {
        setPointData(
          eventPointTypeDefaultData.filter((item) => item.name === event.pointType)[0].points
        );
      }
    }
  }, [store, event]);
  useEffect(() => {
    let goldResult = 0,
      silverResult = 0,
      bronzeResult = 0,
      participationResult = 0,
      data = [];
    if (reportingData && reportingData.length > 0) {
      reportingData.map((reportingItem) => {
        let { gold, silver, bronze, participation } = calculateMedalCounts(
          reportingItem?.registrantData?.length,
          'friendly'
        );
        goldResult += gold;
        silverResult += silver;
        bronzeResult += bronze;
        participationResult += participation;
        setDivisionOption([
          { value: 'all', label: 'All Division' },
          ...reportingData.map((item) => {
            return { value: item.divisionData._id, label: item.divisionData.divisionName };
          })
        ]);
      });
      let newReportingData = [];
      reportingData.map((reportingItem) => {
        let newReportingItem = { ...reportingItem };
        progressionStore.sportList?.map((sportItem) =>
          sportItem?.categoryId?.filter(
            (categoryItem) =>
              categoryItem._id === reportingItem?.divisionData.categoryId &&
              (newReportingItem.categoryData = categoryItem)
          )
        );
        newReportingData.push(newReportingItem);
      });

      data = newReportingData;
      if (selectDivision.value !== 'all') {
        data =
          data &&
          data.filter(
            (item) => item.divisionData._id.toString() === selectDivision.value.toString()
          );
      }
      if (selectGender.value !== 'all') {
        data =
          data && data.filter((item) => item.divisionData.gender === selectGender.value.toString());
      }
      if (selectAgeFrom !== '') {
        data = data && data.filter((item) => item.divisionData.ageTo > parseInt(selectAgeFrom) - 1);
      }
      if (selectAgeTo !== '') {
        data = data && data.filter((item) => item.divisionData.ageFrom < parseInt(selectAgeTo) + 1);
      }
      if (selectRankFrom !== '') {
        data =
          data && data.filter((item) => item.divisionData.rankTo > parseInt(selectRankFrom) - 1);
      }
      if (selectRankTo !== '') {
        data =
          data && data.filter((item) => item.divisionData.rankFrom < parseInt(selectRankTo) + 1);
      }
      setTableData(data);
    }
    setResultMedalCount({
      gold: goldResult,
      silver: silverResult,
      bronze: bronzeResult,
      participation: participationResult
    });
  }, [
    reportingData,
    selectDivision,
    selectGender,
    selectAgeFrom,
    selectAgeTo,
    selectRankFrom,
    selectRankTo
  ]);

  const toggleDivision = (row) => {
    let newPoints = row?.registrantData?.map((item) => {
      return { memberId: item.memberData._id, point: item.point };
    });
    setPoints(newPoints);
    setSelectedRow(row);
    setOpen(!open);
  };

  const { columns } = useColumns({ toggleDivision, event });
  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={1}
        activeClassName="active"
        forcePage={0}
        // onPageChange={(page) => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    );
  };
  // const handleRowSelected = ({}) => {};
  return (
    <Fragment>
      <div className="app-user-list">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="Total Gold Medal"
              icon={<FaMedal size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{resultMedalCount.gold}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="secondary"
              statTitle="Total Silver Medal"
              icon={<FaMedal size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{resultMedalCount.silver}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="Total Bronze Medal"
              icon={<FaMedal size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{resultMedalCount.bronze}</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="Total Participation Medal"
              icon={<FaMedal size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">{resultMedalCount.participation}</h3>}
            />
          </Col>
        </Row>

        <Card className="p-1">
          <div className="d-flex justify-content-between">
            <h4 className="text-secondary" style={{ marginTop: '5px' }}>
              Filters
            </h4>
          </div>
          <Row style={{ paddingBottom: '10px' }}>
            <Col md="3">
              <Label for="role-select">Division</Label>
              <Select
                options={divisionOption}
                value={selectDivision}
                onChange={(e) => {
                  setSelectDivision(e);
                }}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
              />
            </Col>
            <Col className="my-md-0 my-1" md="3">
              <Label for="plan-select">Gender</Label>
              <Select
                options={genderOption}
                value={selectGender}
                onChange={(e) => {
                  setSelectGender(e);
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
                  value={selectAgeFrom}
                  onChange={(e) => setSelectAgeFrom(e.target.value)}
                ></Input>
                <InputGroupText> To </InputGroupText>
                <Input
                  type="number"
                  value={selectAgeTo}
                  onChange={(e) => setSelectAgeTo(e.target.value)}
                ></Input>
              </InputGroup>
            </Col>
            <Col md="3">
              <Label for="status-select">Rank</Label>
              <InputGroup>
                <InputGroupText> From </InputGroupText>
                <Input
                  type="number"
                  value={selectRankFrom}
                  onChange={(e) => setSelectRankFrom(e.target.value)}
                ></Input>
                <InputGroupText> To </InputGroupText>
                <Input
                  type="number"
                  value={selectRankTo}
                  onChange={(e) => setSelectRankTo(e.target.value)}
                ></Input>
              </InputGroup>
            </Col>
          </Row>
        </Card>
        <Card>
          <div className="react-dataTable m-1 mt-3">
            <DataTable
              noHeader
              sortServer
              pagination
              responsive
              paginationServer
              columns={columns}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationComponent={CustomPagination}
              data={tableData}
              // onSelectedRowsChange={handleRowSelected}
              // selectableRows
            />
          </div>
        </Card>
      </div>
      <Modal isOpen={open} toggle={toggleDivision} size="xl">
        <button
          style={{
            border: '2px solid #fff',
            position: 'absolute',
            right: '-15px',
            top: '-15px',
            background: '#fff',
            padding: '5px',
            borderRadius: '5px'
          }}
          onClick={toggleDivision}
        >
          <AiOutlineClose size={18} />
        </button>{' '}
        {selectedRow && (
          <div className=" border border-2 m-1" style={{ zIndex: '9999' }}>
            <div className="border border-2">
              <Row>
                <Col sm={5} md={5} lg={5}>
                  <div style={{ marginLeft: '10px', marginTop: '14px' }}>
                    <span className="fw-bolder text-black">{event.eventName}</span>
                  </div>
                </Col>
                <Col sm={4} md={7} lg={7}>
                  <Row className="d-flex justify-content-between m-1">
                    <Col md={3}>
                      <span className=" text-black ">
                        Gold:{' '}
                        <b>
                          {
                            calculateMedalCounts(selectedRow?.registrantData?.length, 'friendly')
                              .gold
                          }
                        </b>
                      </span>
                    </Col>
                    <Col md={3}>
                      <span className=" text-black  ">
                        Silver:
                        <b>
                          {' '}
                          {
                            calculateMedalCounts(selectedRow?.registrantData?.length, 'friendly')
                              .silver
                          }
                        </b>
                      </span>
                    </Col>
                    <Col md={3}>
                      <span className=" text-black ">
                        Bronze:{' '}
                        <b>
                          {
                            calculateMedalCounts(selectedRow?.registrantData?.length, 'friendly')
                              .bronze
                          }
                        </b>
                      </span>
                    </Col>
                    <Col md={3}>
                      <span className=" text-black ">
                        Participation:{' '}
                        <b>
                          {
                            calculateMedalCounts(selectedRow?.registrantData?.length, 'friendly')
                              .participation
                          }
                        </b>
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className="border border-2">
              <Row>
                <Col sm={5} md={5} lg={5}>
                  <div style={{ marginLeft: '10px', marginTop: '14px' }}>
                    <span className=" text-black  ">
                      Division:<b> {selectedRow?.divisionData?.divisionName}</b>
                    </span>
                  </div>
                </Col>
                <Col sm={4} md={7} lg={7}>
                  <Row className="d-flex justify-content-between m-1">
                    <Col md={3}>
                      <span className=" text-black ">
                        Gender: <b>{convertUnit(selectedRow?.divisionData?.gender)}</b>
                      </span>
                    </Col>
                    <Col md={3}>
                      <span className=" text-black  ">
                        Age:
                        <b>
                          {' '}
                          {selectedRow?.divisionData?.rankFrom +
                            ' - ' +
                            selectedRow?.divisionData?.rankTo}
                        </b>
                      </span>
                    </Col>
                    <Col md={3}>
                      <span className=" text-black ">
                        Rank:{' '}
                        <b>
                          {selectedRow?.divisionData?.rankFrom +
                            ' - ' +
                            selectedRow?.divisionData?.rankTo}
                        </b>
                      </span>
                    </Col>
                    <Col md={3}>
                      <span className=" text-black ">
                        Weight:{' '}
                        <b>
                          {selectedRow?.divisionData?.weightFrom +
                            ' - ' +
                            selectedRow?.divisionData?.weightTo +
                            ' ' +
                            convertUnit(selectedRow?.divisionData?.weightUnit)}
                        </b>
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className="border border-2">
              {selectedRow?.registrantData?.length > 0 && (
                <>
                  <Row className="py-1  ms-0 border-bottom " style={{ width: '100%' }}>
                    <Col sm={6} md={3} lg={3} />
                    <Col sm={6} md={9} lg={9}>
                      <Row>
                        {pointData.map((pointItem, pointIndex) => {
                          return (
                            <Col md={1} className="me-2">
                              {pointItem} points
                            </Col>
                          );
                        })}
                        <Col md={1} className="me-2">
                          0 points
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  {selectedRow.registrantData.map((item, index) => {
                    return (
                      <Row className="py-1 ms-0" style={{ width: '100%' }}>
                        <Col sm={6} md={3} lg={3}>
                          <div
                            className="d-flex justify-content-between"
                            style={{ marginLeft: '10px' }}
                          >
                            <div className=" text-black">
                              {/* <h5>(ID) Member</h5> */}
                              <div>
                                <h5 style={{ fontWeight: 'bold' }}>
                                  ({item.memberData._id.substr(-5)}){' '}
                                  {item?.memberData?.firstName +
                                    ' ' +
                                    item?.memberData?.middleName +
                                    ' ' +
                                    item?.memberData?.lastName}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col sm={6} md={9} lg={9}>
                          <Row>
                            {pointData.map((pointItem, pointIndex) => {
                              return (
                                <Col lg={1} md={1} sm={2} className="form-check me-2">
                                  <Input
                                    type="radio"
                                    id={`${item?.memberData?._id}-${pointIndex + 1}-active`}
                                    onChange={() => {
                                      let newPoints = points;
                                      newPoints[index].point = pointIndex + 1;
                                      setPoints(newPoints);
                                      refetch();
                                    }}
                                    checked={points[index].point === pointIndex + 1}
                                  />
                                  <Label
                                    className="form-check-label"
                                    for={`${item?.memberData?._id}-${pointIndex + 1}-active`}
                                  >
                                    {pointIndex + 1}
                                    {pointIndex === 0
                                      ? 'st'
                                      : pointIndex === 1
                                      ? 'nd'
                                      : pointIndex === 2
                                      ? 'rd'
                                      : 'th'}{' '}
                                    Place
                                  </Label>
                                </Col>
                              );
                            })}
                            <Col md={1} sm={6} className="form-check me-2">
                              <Input
                                type="radio"
                                id={`${item?.memberData?._id}-0-active`}
                                onChange={() => {
                                  let newPoints = points;
                                  newPoints[index].point = 0;
                                  setPoints(newPoints);
                                  refetch();
                                }}
                                checked={points[index].point === 0}
                              />
                              <Label
                                className="form-check-label"
                                for={`${item?.memberData?._id}-0-active`}
                              >
                                not result
                              </Label>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    );
                  })}
                </>
              )}
            </div>
            <div className="border border-2">
              <Button
                className="btn btn-sm m-1"
                color="primary"
                onClick={() => {
                  dispatch(
                    reportingUpdateAction(
                      {
                        eventId: event?._id,
                        divisionId: selectedRow.divisionData._id,
                        points,
                        pointType: event?.pointType
                      },
                      refetch
                    )
                  );
                  setOpen(!open);
                }}
              >
                Update Division Result
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </Fragment>
  );
}

export default ReportingTable;
