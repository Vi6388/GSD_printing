// ** Third Party Components
import classnames from 'classnames';

// ** Icons
import { GrUserAdmin } from 'react-icons/gr';
import { HiOutlineUsers } from 'react-icons/hi';
import { MdCardMembership } from 'react-icons/md';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap';

const StatsCard = ({
  locationOperators,
  membershipData,
  locationID,
  memberData,
  usersData,
  cols
}) => {
  const statData = {
    membership: membershipData?.filter((mem) => mem.locationId == locationID),
    operators: locationOperators,
    member: memberData,
    user: usersData
  };

  const data = [
    {
      title: statData.membership?.length > 0 ? statData.membership?.length : '0',
      subtitle: 'Sold Memberships',
      color: 'light-danger',
      icon: <MdCardMembership size={24} />
    },
    {
      title: statData.operators?.length > 0 ? statData.operators?.length : '0',
      subtitle: 'Operators',
      color: 'light-success',
      icon: <GrUserAdmin size={24} />
    },
    {
      title: statData.member?.length > 0 ? statData.member?.length : '0',
      subtitle: 'Member',
      color: 'light-primary',
      icon: <HiOutlineUsers size={24} />
    },
    {
      title: statData.user?.length > 0 ? statData.user?.length : '0',
      subtitle: 'Users',
      color: 'light-success',
      icon: <HiOutlineUsers size={24} />
    }
  ];

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols);
      const margin = index === 2 ? 'sm' : colMargin[0];

      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
        >
          <div className="d-flex align-items-center">
            <Avatar color={item.color} icon={item.icon} className="me-2" />
            <div className="my-auto">
              <h4 className="fw-bolder mb-0">{item.title}</h4>
              <CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">Statistics</CardTitle>
        <CardText className="card-text font-small-2 me-25 mb-0">Updated 1 Sec ago</CardText>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
