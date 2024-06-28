import { Fragment } from 'react';
import BreadCrumbs from '@components/breadcrumbs';
import WizardModernVertical from './WizardModernVertical';
import { useLocation } from 'react-router-dom';

const AddEvent = () => {
  const location = useLocation();
  return (
    <Fragment>
      <BreadCrumbs
        breadCrumbTitle="Member"
        breadCrumbParent="Membership"
        breadCrumbActive="Add Membership"
      />

      <WizardModernVertical memberId={location?.state?.memberId} url={location?.state?.url} />
    </Fragment>
  );
};

export default AddEvent;
