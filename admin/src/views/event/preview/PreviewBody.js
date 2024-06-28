// ** React Imports
import { Fragment } from 'react';

// ** Components
import CardEventInfo from './CardEventInfo';
import CardHost from './CardHost';

// ** Reactstrap Imports
import { Card, CardBody } from 'reactstrap';

// ** Images
import illustration from '@src/assets/images/banner/banner-4.jpg';

const PreviewBody = (props) => {
  const { eventInfo } = props;

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="meetup-img-wrapper rounded-top text-center">
            <img src={illustration} className="img-fluid" width="100%" height="auto" />
          </div>
          <div className="mt-1 mb-3">
            <h3>{eventInfo?.title}</h3>
          </div>
          <h2 className="mb-1">Event Description</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto totam suscipit at
            ea sapiente, libero recusandae dignissimos nulla possimus ut voluptatibus reprehenderit
            voluptates facere vel blanditiis quis illo amet a!
          </p>
          <ul>
            <li>Lorem ipsumrrupti eos!</li>
            <li>quod peri enim eos!</li>
            <li>ipsumrrupti quod!</li>
          </ul>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto totam suscipit at
            ea sapiente, libero recusandae dignissimos nulla possimus ut voluptatibus reprehenderit
            voluptates facere vel blanditiis quis illo amet a! Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Architecto totam suscipit at ea sapiente, libero
            recusandae dignissimos nulla possimus ut voluptatibus reprehenderit voluptates facere
            vel blanditiis quis illo amet a! Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Architecto totam suscipit at ea sapiente, libero recusandae dignissimos nulla
            possimus ut voluptatibus reprehenderit voluptates facere vel blanditiis quis illo amet
            a!
          </p>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default PreviewBody;
