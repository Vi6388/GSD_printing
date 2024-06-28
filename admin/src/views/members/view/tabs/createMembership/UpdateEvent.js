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
        breadCrumbTitle="Member"
        breadCrumbParent="Membership"
        breadCrumbActive="Add Membership"
      />

      <WizardModernVertical />
      {/* <div>sdfghjl;</div> */}
    </Fragment>
  );
};

export default AddEvent;
