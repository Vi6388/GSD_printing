// ** React Imports
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// ** Data
import { locationById, useUpdateLocation } from '../../../../requests/location/LocationAPI';
import { getMemberShipList } from '../../../../requests/memberships/membershipAPI';
import { fetchMemberdata } from '../../../../requests/member/GetMembers';
import { fetchUsersdata } from '../../../../requests/users/UsersAPI';
import { fetchEventAction } from '../../../event/store/actions';
import {
  fetchOperationByLocationId,
  fetchOperatordata
} from '../../../../requests/operators/OperatorsAPI';

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap';
import { Spinner } from 'reactstrap';

// ** User View Components
import UserTabs from './Tabs';
import LocationInfoCard from './LocationInfoCard';

// ** Styles
import '@styles/react/apps/app-users.scss';

const LocationView = () => {
  // ** Hooks
  const { id } = useParams();
  const dispatch = useDispatch();

  const eventData = useSelector((state) => state?.eventMain.eventListingData);
  const { data: locationData, isLoading: locationFetching } = locationById(id);
  const { data: locationOperators } = fetchOperationByLocationId(id);
  const { mutate: updateLocation } = useUpdateLocation();
  const { data: membershipData } = getMemberShipList();
  const { data: operatorsData } = fetchOperatordata();
  const { data: memberData } = fetchMemberdata();
  const { data: usersData } = fetchUsersdata();

  const [active, setActive] = useState('1');
  const [filter, setFilter] = useState({
    eventType: '',
    search: '',
    year: '',
    month: '',
    status: ''
  });

  useEffect(() => dispatch(fetchEventAction(new URLSearchParams(filter))), [filter]);
  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  if (locationFetching) {
    return (
      <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
        <Spinner type="grow" color="danger" />;
      </div>
    );
  }

  return locationData !== null && locationData !== undefined ? (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <LocationInfoCard
            locationOperators={locationOperators}
            selectedLocation={locationData[0]}
            updateLocation={updateLocation}
            operatorsData={operatorsData}
            locationID={id}
          />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs
            locationOperators={locationOperators}
            selectedLocation={locationData[0]}
            membershipData={membershipData}
            memberData={memberData}
            toggleTab={toggleTab}
            eventData={eventData}
            usersData={usersData}
            locationID={id}
            active={active}
          />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">User not found</h4>
      <div className="alert-body">User with id: {id} doesn't exist. Check list of all Users</div>
    </Alert>
  );
};
export default LocationView;
