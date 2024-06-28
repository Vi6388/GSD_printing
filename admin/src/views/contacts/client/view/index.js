// ** React Imports
import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// ** Store & Actions
// import { getUser } from '../store'
import { useSelector, useDispatch } from 'react-redux';

// ** Reactstrap Imports
import { Row, Col, Alert, Spinner } from 'reactstrap';

// ** User View Components
import UserTabs from './Tabs';
import Connections from './Connections';
import UserInfoCard from './UserInfoCard';

import { fetchSingleClientAction } from '../store/actions';

// ** Styles
import '@styles/react/apps/app-users.scss';

const UserView = () => {
  // ** Store Vars
  const store = useSelector((state) => state.clientContact);
  const dispatch = useDispatch();

  // ** Hooks
  const { id } = useParams();
  const [client, setClient] = useState();

  // First Check User Details on Store
  setClient({
    _id: '643acef5aa79f809c20a64cc',
    userId: '63ed36488c8161f81d3647bc',
    title: 'mrs',
    firstName: 'test',
    middleName: 't',
    lastName: 'Test3',
    gender: 'man',
    profilePhoto: 'C:\\fakepath\\download (2).jpg',
    contact: {
      primary: '1',
      secondary: '2',
      email: 'test@gmail.com'
    },
    dateOfBirth: '2008-04-01T00:00:00.000Z',
    nationality: 'usa',
    height: {
      unit: 'centimeters',
      value: 190
    },
    weight: {
      unit: 'kilograms',
      value: 90
    },
    differentlyAbled: 'no',
    shareDisability: true,
    dominantHand: 'left',
    specialDiet: true,
    medicalCondition: 'yes',
    communicationType: 'call',
    isActive: false,
    isDeleted: false,
    createdAt: '2023-04-15T16:21:09.947Z',
    updatedAt: '2023-04-19T18:37:49.029Z'
  });
  // useMemo(() => {
  //   if (id) {
  //     if (store.singleClient.client) {
  //       setClient(store.singleClient.client);
  //     } else {
  //       let ClientData = store?.contacts?.list?.find((x) => String(x._id) === String(id));
  //       if (ClientData) {
  //         setClient('ClientData');
  //       }
  //     }
  //   }
  // }, [id, history, store]);

  // ** Get suer on mount
  useEffect(() => {
    dispatch(fetchSingleClientAction(id));
  }, [dispatch, id]);

  const [active, setActive] = useState('1');

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={client} />
          <Connections contact={client} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs selectedUser={client} active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
    // ) : store.singleClient.loading ? (
    //   <Spinner />
    // ) : (
    //   <Alert color="danger">
    //     <h4 className="alert-heading">User not found</h4>
    //     <div className="alert-body">
    //       User with id: {id} doesn't exist. Check list of all Users:{' '}
    //       <Link to="/contacts/clients/list">Client List</Link>
    //     </div>
    //   </Alert>
  );
};
export default UserView;
