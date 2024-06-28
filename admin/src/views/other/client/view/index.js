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
  const [client, setClient] = useState(null);

  // First Check User Details on Store
  // useMemo(() => {
  //     if (id) {
  //         if (store.singleClient.client) {
  //             setClient(store.singleClient.client)
  //         } else {
  //             let ClientData = store?.contacts?.list?.find(
  //                 (x) => String(x._id) === String(id)
  //             )
  //             if (ClientData) {
  //                 setClient(ClientData)
  //             }
  //         }
  //     }
  // }, [id, history, store])

  // ** Get suer on mount
  useEffect(() => {
    dispatch(fetchSingleClientAction(id));
  }, [dispatch, id]);

  // useMemo(() =>{
  //     let ClientData = {
  //         "_id": "63d150bec681252e78d0be07",
  //         "userId": "63ca9114e88b09d5d926009f",
  //         "fullName": "Shiv",
  //         "email": "cmatkd187th@gmail.com",
  //         "phone": "",
  //         "photo": "",
  //         "gender": "male",
  //         "address": {
  //           "zipCode": "",
  //           "state": "",
  //           "street": "",
  //           "city": "",
  //           "country": ""
  //         },
  //         "status": "active",
  //         "note": "",
  //         "tags": [],
  //         "companyPhone": "",
  //         "companyEmail": "",
  //         "type": "individual",
  //         "company": "ijdkljd",
  //         "position": "Owner",
  //         "isFormer": false,
  //         "isDelete": false,
  //         "socialLinks": [],
  //         "ranks": [],
  //         "files": [],
  //         "others": [],
  //         "paymentMethods": [],
  //         "__v": 0
  //       }
  //     console.log(ClientData);
  //     setClient(ClientData)
  // })

  useEffect(() => {
    let ClientData = {
      _id: '63d150bec681252e78d0be07',
      userId: '63ca9114e88b09d5d926009f',
      fullName: 'Shiv',
      email: 'cmatkd187th@gmail.com',
      phone: '',
      photo: '',
      gender: 'male',
      address: {
        zipCode: '',
        state: '',
        street: '',
        city: '',
        country: ''
      },
      status: 'active',
      note: '',
      tags: [],
      companyPhone: '',
      companyEmail: '',
      type: 'individual',
      company: 'ijdkljd',
      position: 'Owner',
      isFormer: false,
      isDelete: false,
      socialLinks: [],
      ranks: [],
      files: [],
      others: [],
      paymentMethods: [],
      __v: 0
    };
    setClient(ClientData);
  }, []);

  const [active, setActive] = useState('1');

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return client !== null && client !== undefined ? (
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
  ) : (
    // ) : store.singleClient.loading ? (
    //     <Spinner />
    <Alert color="danger">
      <h4 className="alert-heading">User not found</h4>
      <div className="alert-body">
        User with id: {id} doesn't exist. Check list of all Users:{' '}
        <Link to="/contacts/clients/list">Client List</Link>
      </div>
    </Alert>
  );
};
export default UserView;
