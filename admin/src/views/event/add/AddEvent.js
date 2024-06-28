// ** React Imports
import { Fragment } from 'react';

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs';

// ** Components
import WizardModernVertical from './WizardModernVertical';

const AddEvent = () => {
  return (
    <Fragment>
      <BreadCrumbs breadCrumbParent="Events" breadCrumbActive="Add Event" />
      <WizardModernVertical />
    </Fragment>
  );
};

export default AddEvent;
