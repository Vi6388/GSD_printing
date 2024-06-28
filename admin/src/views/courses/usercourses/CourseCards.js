// ** React Imports
import { Link } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';

// ** Reactstrap Imports
import { Card, CardBody, Button } from 'reactstrap';

// ** Icons Impots
import { Star } from 'react-feather';
import { GiNotebook } from 'react-icons/gi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { VscTypeHierarchy } from 'react-icons/vsc';
import { MdOutlineWatchLater } from 'react-icons/md';

const CourseCards = (props) => {
  // ** Props
  const { activeView, filteredCourses } = props;

  // ** Renders courses
  const renderProducts = () => {
    if (filteredCourses?.length) {
      return filteredCourses?.map((item) => {
        return (
          <Card className="ecommerce-card" key={item.courseName}>
            <div className="item-img text-center mx-auto">
              <Link to={`/courses/course-detail/${item._id}`}>
                <img className="img-fluid card-img-top" src={item.courseImage} alt={item.name} />
              </Link>
            </div>
            <CardBody>
              <div className="item-wrapper">
                <div className="item-rating">
                  <ul className="unstyled-list list-inline">
                    {new Array(5).fill().map((listItem, index) => {
                      return (
                        <li key={index} className="ratings-list-item me-25">
                          <Star
                            className={classnames({
                              'filled-star': index + 1 <= item.rating,
                              'unfilled-star': index + 1 > item.rating
                            })}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <h6 className="item-name mb-2">
                <Link className="text-body" to={`/courses/course-detail/${item._id}`}>
                  {item.courseName}
                </Link>
              </h6>

              <h6 className="d-flex justify-content-between mb-1">
                <span className="d-flex align-items-center">
                  <FaChalkboardTeacher className="me-1" /> Instructor
                </span>
                <span>{item?.instructor ? item?.instructor : '--'}</span>
              </h6>
              <h6 className="d-flex justify-content-between mb-1">
                <span className="d-flex align-items-center">
                  <VscTypeHierarchy className="me-1" /> Type
                </span>
                <span>{item.courseType}</span>
              </h6>
              <h6 className="d-flex justify-content-between mb-1">
                <span className="d-flex align-items-center">
                  <MdOutlineWatchLater className="me-1" /> Duration
                </span>
                <span>{item?.duration ? item?.duration : '-- h : -- m'}</span>
              </h6>
              <h6 className="d-flex justify-content-between mb-1">
                <span className="d-flex align-items-center">
                  <GiNotebook className="me-1" /> Lesson
                </span>
                <span>{item?.lesson?.length ? item?.lesson?.length : '--'}</span>
              </h6>
            </CardBody>
            <div className="item-options text-center d-flex justify-content-center mb-1">
              <div className="item-wrapper">
                <Link to={`/courses/course-detail/${item._id}`}>
                  <Button color="primary">Watch Now</Button>
                </Link>
              </div>
            </div>
          </Card>
        );
      });
    }
  };

  return (
    <div
      className={classnames({
        'grid-view': activeView === 'grid',
        'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
    </div>
  );
};

export default CourseCards;
