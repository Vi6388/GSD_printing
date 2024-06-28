import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eventPointTypeFetchAction, eventPointTypeUpdateAction } from '../store/actions';
import PointTypeSidebar from './sidebar';
import PointTypeBody from './body';
import '@styles/react/apps/app-email.scss';
import { eventPointTypeDefaultData } from '../../../utility/Utils';

function EventPointType(props) {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [selectPT, setSelectPT] = useState(1);

  const [editState, setEditState] = useState(false);
  const state = useSelector((state) => state.eventMain.eventPointType);
  useEffect(() => dispatch(eventPointTypeFetchAction()), []);
  useEffect(() => {
    if (state) setData(state.data);
    else setData(eventPointTypeDefaultData);
  }, [state]);

  return (
    <div className="overflow-hidden email-application">
      <div className="content-overlay"></div>
      <div
        className="content-area-wrapper  animate__animated animate__fadeIn"
        style={{ height: '710px' }}
      >
        <Fragment>
          <PointTypeSidebar
            sidebarOpen={sidebarOpen}
            data={data}
            selectPT={selectPT}
            setSelectPT={setSelectPT}
            setEditState={setEditState}
            eventPointTypeDefaultData={eventPointTypeDefaultData}
            eventPointTypeUpdateAction={eventPointTypeUpdateAction}
          />
          <PointTypeBody
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            data={data}
            setData={setData}
            selectPT={selectPT}
            editState={editState}
            setEditState={setEditState}
          />
        </Fragment>
      </div>
    </div>
  );
}

export default EventPointType;
