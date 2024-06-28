// ** React Imports
import { Fragment, useContext } from 'react';

// ** Reactstrap Imports
import { Row, Col, Card } from 'reactstrap';

// ** Utils
import { kFormatter } from '@utils';

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors';

// ** Custom Components
import StatsCard from './StatsCard';
import RecentEvent from './RecentEvent';
import RecentProgression from './RecentProgression';

// ** Icons Imports
import { Heart, Award, Truck, Activity, ShoppingBag, AlertOctagon } from 'react-feather';

const OverviewTab = ({ users }) => {
  // ** Context
  const context = useContext(ThemeColors);

  return (
    <Fragment>
      <Row>
        <Col lg="12" sm="12">
          <StatsCard cols={{ md: '3', sm: '6', xs: '12' }} users={users} />
        </Col>
      </Row>
      <Card className="mt-0">
        <RecentEvent />
      </Card>

      <Card className="mt-0">
        <RecentProgression />
      </Card>
    </Fragment>
  );
};

export default OverviewTab;
