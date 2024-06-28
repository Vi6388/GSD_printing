import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, Input, Button } from 'reactstrap';

function EventFilter({ searchTermEvent, setSearchTermEvent, serchEventName, filterEventType }) {
  const filterByMonth = [
    { value: '', label: 'All' },
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  const filterByYear = [
    { value: '', label: 'All' },
    { value: '2018', label: '2018' },
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
    { value: '2027', label: '2027' },
    { value: '2028', label: '2028' },
    { value: '2029', label: '2029' },
    { value: '2030', label: '2030' },
    { value: '2031', label: '2031' },
    { value: '2032', label: '2032' },
    { value: '2033', label: '2033' }
  ];

  const filterTypes = [
    { value: '', label: 'All' },
    { value: 'past', label: 'Past' },
    { value: 'active', label: 'Active' }
  ];

  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
                <div className="me-1">
                  <Input
                    id="search-invoice"
                    placeholder="Search "
                    className="w-100"
                    type="text"
                    value={searchTermEvent}
                    onChange={(e) => setSearchTermEvent(e.target.value)}
                    onKeyPress={serchEventName}
                  />
                </div>
                <div className="me-1">
                  <Input
                    type="select"
                    name="month"
                    id="monthInSearch"
                    style={{ width: '10em' }}
                    onChange={filterEventType}
                  >
                    {filterByMonth?.map((item, key) => {
                      return (
                        <option key={key} value={item.value}>
                          {' '}
                          &nbsp; {item.label}
                        </option>
                      );
                    })}
                  </Input>
                </div>
                <div className="me-1">
                  <Input
                    type="select"
                    name="year"
                    id="yearInSearch"
                    style={{ width: '10em' }}
                    onChange={filterEventType}
                  >
                    {filterByYear?.map((item, key) => {
                      return (
                        <option key={key} value={item.value}>
                          {' '}
                          &nbsp; {item.label}
                        </option>
                      );
                    })}
                  </Input>
                </div>

                <div className="me-1">
                  <Input
                    type="select"
                    name="status"
                    id="statusInSearch"
                    style={{ width: '10em' }}
                    onChange={filterEventType}
                  >
                    {filterTypes?.map((item, key) => {
                      return (
                        <option key={key} value={item.value}>
                          {' '}
                          &nbsp; {item.label}
                        </option>
                      );
                    })}
                  </Input>
                </div>
              </div>
              <div>
                <Link to="/add-event">
                  <Button color="primary">Add New Event</Button>
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default EventFilter;
