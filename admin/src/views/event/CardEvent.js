// ** Custom Components
import Avatar from '@components/avatar';
import AvatarGroup from '@components/avatar-group';

// ** Icons Imports
import { Calendar, MapPin } from 'react-feather';

// ** Reactstrap Imports
import { Card, CardTitle, CardBody, CardText } from 'reactstrap';

// ** Images
import illustration from '@src/assets/images/illustration/email.svg';
import { useSelector } from 'react-redux';

const CardEvent = (props) => {
  const { event, registrantData } = props;

  let data = [];

  registrantData?.map((item, index) => {
    if (index < 5)
      data.push({
        _id: item.member[0]._id,
        title:
          item.member[0].firstName +
          (item.member[0].middleName ? ' ' + item.member[0].middleName : '') +
          (item.member[0].lastName ? ' ' + item.member[0].lastName : ''),
        placement: 'bottom',
        img: item.member[0].profilePhoto
          ? item.member[0].profilePhoto
          : require('@src/assets/images/portrait/small/avatar-s-7.jpg').default,
        imgHeight: 33,
        imgWidth: 33
      });
  });
  registrantData?.length > 5 && data.push({ meta: '+' + (registrantData.length - 5).toString() });

  // const data = [
  //   {
  //     title: 'Billy Hopkins',
  //     placement: 'bottom',
  //     img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default,
  //     imgHeight: 33,
  //     imgWidth: 33
  //   },
  //   {
  //     title: 'Amy Carson',
  //     placement: 'bottom',
  //     img: require('@src/assets/images/portrait/small/avatar-s-6.jpg').default,
  //     imgHeight: 33,
  //     imgWidth: 33
  //   },
  //   {
  //     title: 'Brandon Miles',
  //     placement: 'bottom',
  //     img: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default,
  //     imgHeight: 33,
  //     imgWidth: 33
  //   },
  //   {
  //     title: 'Daisy Weber',
  //     placement: 'bottom',
  //     img: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default,
  //     imgHeight: 33,
  //     imgWidth: 33
  //   },
  //   {
  //     title: 'Jenny Looper',
  //     placement: 'bottom',
  //     img: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default,
  //     imgHeight: 33,
  //     imgWidth: 33
  //   },
  //   {
  //     meta: '+42'
  //   }
  // ];

  const getEventTime = () => {
    const startTime = new Date(event.start);
    return startTime;
  };

  const dayOfWeekAsString = (dayIndex) => {
    return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][dayIndex] || '';
  };

  const monthAsString = (monthIndex) => {
    return (
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][
        monthIndex
      ] || ''
    );
  };

  const formatDate = (date) => {
    return (
      dayOfWeekAsString(date.getDay()) +
      ', ' +
      monthAsString(date.getMonth()) +
      ' ' +
      date.getDate() +
      ', ' +
      date.getFullYear()
    );
  };

  return (
    <Card className="card-developer-meetup">
      <div className="meetup-img-wrapper rounded-top text-center">
        <img src={event?.eventImage} height="175" />
      </div>
      <CardBody>
        <div className="meetup-header d-flex align-items-center">
          {/* <div className="meetup-day">
            <h6 className="mb-0">{dayOfWeekAsString(getEventTime().getDay())}</h6>
            <h3 className="mb-0">{getEventTime().getDate()}</h3>
          </div> */}
          <div className="my-auto">
            <CardTitle tag="h4" className="mb-25">
              {event.eventName ? event.eventName : 'Event Name'}
            </CardTitle>
            {/* <CardText className="mb-0">{event.note}</CardText> */}
          </div>
        </div>
        <div className="d-flex">
          <Avatar color="light-primary" className="rounded me-1" icon={<Calendar size={18} />} />
          <div className="d-flex  flex-row">
            <div>
              <h6 className="mb-0">{new Date(event?.startTime).toLocaleDateString()}</h6>
              <small>{new Date(event?.startTime).toLocaleTimeString()}</small>
            </div>
            <div className="mx-2">{'~'}</div>
            <div>
              <h6 className="mb-0">{new Date(event?.endTime).toLocaleDateString()}</h6>
              <small>{new Date(event?.endTime).toLocaleTimeString()}</small>
            </div>
          </div>
        </div>
        <div className="d-flex mt-2">
          <Avatar color="light-primary" className="rounded me-1" icon={<MapPin size={18} />} />
          <div>
            <h6 className="mb-0">{event.state ? event.state : 'State'}</h6>
            <small>
              {event.street ? event.street : 'Street'}, {event.city ? event.city : 'City'},{' '}
              {event.state ? event.state : 'State'}
            </small>
          </div>
        </div>
        {registrantData?.length > 0 ? <AvatarGroup data={data} /> : <h3> Not Member</h3>}
      </CardBody>
    </Card>
  );
};

export default CardEvent;
