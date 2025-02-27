// ** Third Party Components
import classnames from 'classnames';
import { TrendingUp, Box, DollarSign, FileText } from 'react-feather';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap';

const StatsCard = ({ cols }) => {
  const data = [
    {
      title: '0',
      subtitle: 'Sales',
      color: 'light-primary',
      icon: <TrendingUp size={24} />
    },
    {
      title: '0',
      subtitle: 'Invoices',
      color: 'light-info',
      icon: <FileText size={24} />
    },
    {
      title: '0',
      subtitle: 'Dummy',
      color: 'light-danger',
      icon: <Box size={24} />
    },
    {
      title: '0',
      subtitle: 'Revenue',
      color: 'light-success',
      icon: <DollarSign size={24} />
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
              <CardText className="font-small-3 mb-1">{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">Forms</CardTitle>
        <CardText className="card-text font-small-2 me-25 mb-0">Updated 1 month ago</CardText>
      </CardHeader>
      <CardBody className="statistics-body d-flex justify-content-center">
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
