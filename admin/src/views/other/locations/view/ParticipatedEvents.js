// ** React Imports
import { Fragment } from 'react';

// ** Reactstrap Imports
import { Card, Row, Col } from 'reactstrap';

const ParticipatedEvents = ({ eventData }) => {
  if (eventData !== undefined) {
    return (
      <Fragment>
        {eventData?.map((event, index) => (
          <Card key={index}>
            <Row>
              <Col md={8} className="event-wrapper1" onClick={() => toggle(index)}>
                <div className="d-flex flex-row mt-1">
                  <div
                    style={{ width: '130px' }}
                    className="d-flex flex-row justify-content-center m-1"
                  >
                    <img
                      alt={event?.eventImage}
                      src={event?.eventImage}
                      style={{ height: '49px', width: 'auto', borderRadius: '10%' }}
                      className="event-img"
                    />
                  </div>

                  <div>
                    <div className="mb-1">
                      <strong>Name:</strong> <span>{event?.eventName}</span>
                    </div>
                    <div className="mb-1">
                      <strong>Location:</strong>{' '}
                      <span>{`${event?.street}, ${event?.city}, ${event?.state}`}</span>
                    </div>
                    <div className="mb-1">
                      <strong>Date:</strong>{' '}
                      <span>
                        {new Date(event?.startTime).toLocaleDateString()} -{' '}
                        {new Date(event?.endTime).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mb-1">
                      <strong>Waive:</strong> <span>{event?.eventWaive}</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="mb-1 mt-1">
                  <strong>Type:</strong> <span>{event?.eventType}</span>
                </div>
                <div className="mb-1">
                  <strong>Point Type:</strong> <span>{event?.pointType}</span>
                </div>
                <div className="mb-1">
                  <strong>Host Name:</strong> <span>{event?.hostName}</span>
                </div>
                <div className="mb-1">
                  <strong>Host Phone:</strong> <span>{event?.hostMobileNumber}</span>
                </div>
              </Col>
            </Row>
          </Card>
        ))}
      </Fragment>
    );
  }
};

export default ParticipatedEvents;
