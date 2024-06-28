import React from 'react';
import EventView from './EventView';
import EventFilter from './EventFilter';

function index({
  toggle,
  eventData,
  isOpen,
  setSearchTermEvent,
  searchTermEvent,
  serchEventName,
  filterEventType
}) {
  return (
    <div>
      <EventFilter
        setSearchTermEvent={setSearchTermEvent}
        searchTermEvent={searchTermEvent}
        serchEventName={serchEventName}
        filterEventType={filterEventType}
      />
      <EventView toggle={toggle} eventData={eventData} isOpen={isOpen} />
    </div>
  );
}

export default index;
