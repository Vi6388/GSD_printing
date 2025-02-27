// ** React Imports
import { useState } from 'react';
import { Link } from 'react-router-dom';

// ** Icons Imports
import { AlignJustify, Rss, Info, Image, Users, ChevronLeft } from 'react-feather';

// ** Reactstrap Imports
import { Card, Collapse, Navbar, Nav, NavItem, NavLink, Button } from 'reactstrap';

const ManageHeader = ({ data, active, toggleTab }) => {
  // ** States
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Card className="profile-header mb-2">
      <div className="profile-header-nav">
        <Navbar
          container={false}
          className="justify-content-end justify-content-md-between w-100"
          expand="md"
          light
        >
          <Link to="/courses/usercourses">
            <div className="me-2 d-flex align-items-center">
              <ChevronLeft size={21} />
              <span>Back</span>
            </div>
          </Link>
          <Button color="" className="btn-icon navbar-toggler" onClick={toggle}>
            <AlignJustify size={21} />
          </Button>
          <Collapse isOpen={isOpen} navbar>
            <div className="d-flex justify-content-between flex-wrap mt-1 mt-md-0">
              <Nav className="mb-0" pills>
                {/* <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={active === '1'}
                    onClick={() => toggleTab('1')}
                  >
                    <span className="d-none d-md-block">Dashboard</span>
                    <Rss className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem> */}
                <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={active === '2'}
                    onClick={() => toggleTab('2')}
                  >
                    <span className="d-none d-md-block">Courses</span>
                    <Info className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={active === '3'}
                    onClick={() => toggleTab('3')}
                  >
                    <span className="d-none d-md-block">Category</span>
                    <Image className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink
                    className="fw-bold"
                    active={active === '4'}
                    onClick={() => toggleTab('4')}
                  >
                    <span className="d-none d-md-block">Students</span>
                    <Users className="d-block d-md-none" size={14} />
                  </NavLink>
                </NavItem> */}
              </Nav>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </Card>
  );
};

export default ManageHeader;
