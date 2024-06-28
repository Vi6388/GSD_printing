import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ChevronDown } from 'react-feather';
import { Card, CardBody, CardHeader, Col, Modal, ModalHeader, Row } from 'reactstrap';
import useColumns from './useColumn';
import { useSelector } from 'react-redux';

const mockData = [
  {
    id: 1,
    gender: 'Male',
    divisionName: 'Little Tigers No Belt',
    round: 3,
    ring: 5,
    total: 12
  },
  {
    id: 2,
    gender: 'Male',
    divisionName: 'Little Tigers White Belt',
    round: 3,
    ring: 5,
    total: 12
  },
  {
    id: 3,
    gender: 'Male',
    divisionName: 'Little Tigers White Gree Belt',
    round: 3,
    ring: 5,
    total: 12
  },
  {
    id: 4,
    gender: 'Male',
    divisionName: 'Little Tigers White Blue Belt',
    round: 3,
    ring: 5,
    total: 12
  },
  {
    id: 5,
    gender: 'Male',
    divisionName: 'Little Tigers White Red Belt',
    round: 3,
    ring: 5,
    total: 12
  },
  {
    id: 6,
    gender: 'Male',
    divisionName: 'Little Tigers White Black Belt',
    round: 3,
    ring: 5,
    total: 12
  },
  {
    id: 7,
    gender: 'Male',
    divisionName: 'Little Tigers White Green Tip Belt',
    round: 3,
    ring: 5,
    total: 12
  }
];
const StatsSetting = (props) => {
  const { event, registrantData, refetchRegistrantData } = props;
  const [tableData, setTableData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [eventStatModal, setEventStatModal] = useState(false);
  const [beltRound, setBeltRound] = useState('');
  const [beltRing, setBeltRing] = useState('');
  const [data, setData] = useState([]);
  const [selectDivision, setSelectDivision] = useState({});
  const eventStatToggle = () => setEventStatModal(!eventStatModal);
  const { eventTiger } = useColumns({ setBeltRound, mockData, setBeltRing, setData });

  const progressionStore = useSelector((state) => state.progression);
  useEffect(() => {
    let tmp = [];
    progressionStore.sportList.map((sport) => {
      sport.categoryId.map((category) => {
        let divisionData = progressionStore.progressionCategoriesDivision.map((division) => {
          if (
            division.categoryId === category._id &&
            event?.divisions?.filter(
              (item) =>
                item.divisionId.toString() === division._id.toString() && item.isDisabled === false
            )?.length === 1
          ) {
            let registrantDataBydivision = registrantData?.filter(
              (registrantItem) =>
                registrantItem.registrantType === 'Athlete' &&
                registrantItem.divisions.filter(
                  (registrantDivisionItem) =>
                    registrantDivisionItem.toString() === division._id.toString()
                ).length > 0
            );
            let newDivision = { ...division };
            newDivision.registrant = registrantDataBydivision;
            return newDivision;
          }
        });
        if (divisionData.filter((item) => item !== undefined).length > 0)
          tmp.push({
            categoryName: category.categoryName,
            division: divisionData.filter((item) => item !== undefined)
          });
      });
    });

    setTableData(tmp);
  }, [progressionStore, event, registrantData]);

  const handleEventStat = (data) => {
    setSelectDivision(data);
    eventStatToggle();
  };
  return (
    <div>
      <div style={{ backgroundColor: '#f9f4d9', padding: '5px' }}>
        <span>
          <b>Event Stats Setting</b>
        </span>
      </div>
      <div>
        <h5 className="text-center">
          Total Register Registrants is: (
          <span className="text-primary">{registrantData?.length}</span>) Check/Export
        </h5>
        <div>
          <Row className="mt-1">
            {tableData?.map((item) => (
              <Col sm={3} lg={3} md={3}>
                <Card style={{ height: '200px' }}>
                  <CardHeader
                    className="d-flex justify-content-center"
                    style={{ backgroundColor: '#f1f2f7', padding: '5px' }}
                  >
                    <span>
                      <b>{item.categoryName}</b>
                    </span>
                  </CardHeader>
                  <CardBody className="mt-1">
                    {item.division?.map((divisionItem) => {
                      return (
                        <div
                          className="cursor-pointer"
                          onClick={() => handleEventStat(divisionItem)}
                        >
                          <span className="textcolor">
                            {divisionItem.divisionName} [
                            {divisionItem.gender === 'male' ? 'M' : 'F'}] (
                            {divisionItem.registrant?.length})
                          </span>
                        </div>
                      );
                    })}
                  </CardBody>
                </Card>
              </Col>
            ))}
            {/* <Col sm={3} lg={3} md={3}>
              <Card>
                <CardHeader
                  className="d-flex justify-content-center"
                  style={{ backgroundColor: '#f1f2f7', padding: '5px' }}
                >
                  <span>
                    <b>Forms</b>
                  </span>
                </CardHeader>
                <CardBody className="mt-1">
                  <div className="cursor-pointer" onClick={() => setShowDetails(true)}>
                    <span className="textcolor">Little Tigers Forms [M] (10)</span>
                  </div>
                  <div className="cursor-pointer" onClick={eventStatToggle}>
                    <span className="textcolor">Little Tigers Forms [F] (40)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Team Forms [M] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Team Forms [F] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Color Belt Traditional Forms [M] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Color Belt Traditional Forms [F] (0)</span>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col sm={3} lg={3} md={3}>
              <Card>
                <CardHeader
                  className="d-flex justify-content-center"
                  style={{ backgroundColor: '#f1f2f7', padding: '5px' }}
                >
                  <span>
                    <b>Sparring</b>
                  </span>
                </CardHeader>
                <CardBody className="mt-1">
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Little Tigers Sparring [M] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Little Tigers Sparring [F] (0)</span>
                  </div>

                  <div className="cursor-pointer" onClick={() => setShowDetails(true)}>
                    <span className="textcolor">Color Belt Sparring [M] (1)</span>
                  </div>

                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Color Belt Sparring [F] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Color Belt Olympic Sparring [M] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Color Belt Olympic Sparring [F] (0)</span>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col sm={3} lg={3} md={3}>
              <Card>
                <CardHeader
                  className="d-flex justify-content-center"
                  style={{ backgroundColor: '#f1f2f7', padding: '5px' }}
                >
                  <span>
                    <b>Black Belt</b>
                  </span>
                </CardHeader>
                <CardBody className="mt-1">
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Black Belt Grassroots Sparring [M] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Black Belt Grassroots Sparring [F] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Black Belt World Class Sparring [M] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Black Belt World Class Sparring [F] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Black Belt Traditional Forms [M] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Black Belt Traditional Forms [F] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Black Belt Weapons [M] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Black Belt Weapons [F] (0)</span>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col sm={3} lg={3} md={3}>
              <Card>
                <CardHeader
                  className="d-flex justify-content-center"
                  style={{ backgroundColor: '#f1f2f7', padding: '5px' }}
                >
                  <span>
                    <b>Black Belt</b>
                  </span>
                </CardHeader>
                <CardBody className="mt-1">
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Black Belt Creative Form [M] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Black Belt Creative Form [F] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Black Belt Team Forms [M] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Black Belt Team Forms [F] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Black Belt Breaking [M] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Black Belt Breaking [F] (0)</span>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col sm={3} lg={3} md={3}>
              <Card>
                <CardHeader
                  className="d-flex justify-content-center"
                  style={{ backgroundColor: '#f1f2f7', padding: '5px' }}
                >
                  <span>
                    <b>Breaking</b>
                  </span>
                </CardHeader>
                <CardBody className="mt-1">
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Little Tigers Breaking [M] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Little Tigers Breaking [F] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Color Belt Breaking [M] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Color Belt Breaking [F] (0)</span>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col sm={3} lg={3} md={3}>
              <Card>
                <CardHeader
                  className="d-flex justify-content-center"
                  style={{ backgroundColor: '#f1f2f7', padding: '5px' }}
                >
                  <span>
                    <b>Weapons</b>
                  </span>
                </CardHeader>
                <CardBody className="mt-1">
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Little Tigers Weapons [M] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Little Tigers Weapons [F] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Color Belt Weapons [M] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Color Belt Weapons [F] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Weapons [M] (0)</span>
                  </div>
                  <div className="cursor-pointer" onClick={() => true}>
                    <span className="textcolor">Weapons [F] (0)</span>
                  </div>
                </CardBody>
              </Card>
            </Col> */}
          </Row>
        </div>
      </div>

      <Modal isOpen={eventStatModal} toggle={eventStatToggle} size={'lg'} style={{ color: '#000' }}>
        <ModalHeader toggle={eventStatToggle}>
          <h4 style={{ color: '#000' }}> {selectDivision?.divisionName}</h4>
        </ModalHeader>
        <div className="react-dataTable">
          <DataTable
            noHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={eventTiger}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            // paginationComponent={CustomPagination}
            data={mockData}
          />
        </div>
      </Modal>
    </div>
  );
};

export default StatsSetting;
