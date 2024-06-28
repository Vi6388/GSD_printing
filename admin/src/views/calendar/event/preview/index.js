// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Components
import CardEventInfo from './CardEventInfo';
import CardHost from './CardHost';
import PreviewBody from './PreviewBody';

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { getEventInfo } from '../store';
import CardEvent from '../CardEvent';
import { useDispatch, useSelector } from 'react-redux';
const EventPreview = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const eventInfo = useSelector((state) => state.event.eventInfo);
  useEffect(() => {
    dispatch(getEventInfo(eventId));
  }, []);

  return (
    <Fragment>
      <Row>
        <Col md="4">
          <CardEvent
            eventInfo={{
              title: eventInfo.title,
              start: eventInfo.start,
              end: eventInfo.end,
              url: eventInfo.eventBanner,
              eventLocation: eventInfo.eventLocation,
              eventStreet: eventInfo.eventStreet,
              eventCity: eventInfo.eventCity,
              eventState: eventInfo.eventState
            }}
          />
          <CardHost
            hostInfo={{
              hostName: eventInfo.hostName,
              hostEmail: eventInfo.hostEmail,
              hostMobileNumber: eventInfo.hostMobileNumber
            }}
          />
        </Col>
        <Col md="8">
          <PreviewBody
            eventInfo={{
              title: eventInfo.title,
              url: eventInfo.eventBanner
            }}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default EventPreview;
