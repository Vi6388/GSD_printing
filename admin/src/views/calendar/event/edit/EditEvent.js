// ** React Imports
import { Fragment, useEffect } from 'react';

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs';

// ** Components
import WizardModernVertical from './WizardModernVertical';
// import {
//   fetchEventAction,
//   deleteEventAction
//  } from '../../../../client/src/views/event/store/actions';
import {
  fetchEventAction,
  deleteEventAction,
  fetchParticularEventAction
} from '../../../../../src/views/event/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const EditEvent = () => {
  const location = useLocation();
  // console.log('props in edit event',location.state.message);
  const dispatch = useDispatch();

  // const store = useSelector((state) => state.eventMain?.eventListingDataById);
  // const editEventData = store ? store : null;
  console.log('editEventData', location?.state?.message);
  // useEffect(() => {
  //   dispatch(fetchParticularEventAction(location?.state?.message));
  // }, []);
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Event"
        breadCrumbParent="Calendar"
        breadCrumbActive="Edit Event"
      />
      <WizardModernVertical editEventData={location?.state?.message} />
    </Fragment>
  );
};

export default EditEvent;
