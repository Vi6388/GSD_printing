// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap';

// ** Pages
import ManageHeader from './ManageHeader';
import Statistics from './Statistics';
import Courses from './Courses';
import Category from './Category';
import Students from './Students';

// ** Redux
import { useSelector, useDispatch } from 'react-redux';
import { courseFetchAction, courseCategoriesFetchAction } from '../store/actions';

// ** Styles
import '@styles/react/pages/page-profile.scss';

const ManageCourse = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.course);

  const [active, setActive] = useState('2');

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  useEffect(() => {
    dispatch(courseFetchAction());
    dispatch(courseCategoriesFetchAction());
  }, []);

  return (
    <Fragment>
      {store !== null ? (
        <div id="user-profile">
          <Row>
            <Col sm="12">
              <ManageHeader data={store} active={active} toggleTab={toggleTab} />
            </Col>
          </Row>
          <TabContent activeTab={active}>
            <TabPane tabId="1">
              <Statistics />
            </TabPane>
            <TabPane tabId="2">
              <Courses />
            </TabPane>
            <TabPane tabId="3">
              <Category />
            </TabPane>
            <TabPane tabId="4">
              <Students />
            </TabPane>
          </TabContent>
        </div>
      ) : (
        'Something is wrong with the server!'
      )}
    </Fragment>
  );
};

export default ManageCourse;
