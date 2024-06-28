import React from 'react';
import { FaUser } from 'react-icons/fa';

function RegisterEvent(props) {
  const { event, setRegistrantType, toggle, registrantData } = props;
  return (
    <div>
      <h4 style={{ color: 'rgba(0,0,0,.87)', fontWeight: 'bold' }}>Event Entry Stages</h4>
      <p className="mt-2">ENTRY STAGES</p>

      <div className="">
        {event?.registrationType?.length > 0
          ? event.registrationType.map((item) => (
              <>
                <div className="event-view-verticle-line"></div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div className="event-view-cricle"></div>
                    <div style={{ marginLeft: '20px' }}>
                      <h6 style={{ color: 'rgba(0,0,0,.87)' }}>{item}</h6>
                      <div className="d-flex">
                        <FaUser size={14} style={{ marginTop: '2px' }} />
                        <span style={{ marginLeft: '5px' }}>
                          {
                            registrantData?.filter(
                              (registrantItem) => registrantItem.registrantType === item
                            ).length
                          }{' '}
                          Complete Entries
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <span>
                      Stage closed <br />{' '}
                      {new Date(event?.endRegistrationDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      disabled={new Date(event?.endRegistrationDate) < new Date()}
                      onClick={() => {
                        setRegistrantType(item);
                        toggle();
                      }}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </>
            ))
          : null}
      </div>
    </div>
  );
}

export default RegisterEvent;
