// ** React Imports
import { Fragment } from 'react';

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs';

// ** Components
import WizardModernVertical from './WizardModernVertical';

const AddEvent = () => {
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Event"
        breadCrumbParent="Calendar"
        breadCrumbActive="Add Event"
      />

      <WizardModernVertical />
      {/* <div>sdfghjl;</div> */}
    </Fragment>
  );
};

export default AddEvent;
