import React, { useState } from 'react';
import logo from '../../../assets/images/logo/mycmalogo.png';
import logo2 from '../../../assets/images/logo/favicon.png';
import { Link } from 'react-router-dom';
// import{AiOutlineArrowRight} from 'react-icon/ai'
import { ArrowRight, Menu } from 'react-feather';
import { useHistory } from 'react-router-dom';

function Navbar() {
  const [show, setShow] = useState('');
  const history = useHistory();
  const handleClick = () => {
    history.push('/login');
  };

  const shownav = () => {
    if (show == '') {
      setShow('show');
    } else {
      setShow('');
    }
  };
  const closenav = () => {
    setShow('');
  };
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  onresize = () => {
    setWindowSize(window.innerWidth);
  };
  const [listStyle, setListStyle] = useState({
    home: false,
    aboutus: false,
    news: false,
    event: false,
    certification: false,
    rules: false
  });

  return (
    <nav className="navbar navbar-expand-lg bg-white fixed-top py-2 ">
      <div className="container-fluid mx-2 ">
        <a className="navbar-brand" href="#">
          {windowSize > 600 ? (
            <img src={logo} alt="Bootstrap" height="60" />
          ) : (
            <>
              {' '}
              <img src={logo2} alt="Bootstrap" height="60" />{' '}
            </>
          )}

          {/* */}
        </a>
        <button
          className="navbar-toggler text-danger "
          type="button"
          onClick={shownav}
          aria-expanded="false"
          aria-label="Toggle navigation "
        >
          <Menu size={30} />
        </button>
        <div
          className={`prep__navbar collapse navbar-collapse ${show}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
            <li
              onMouseEnter={() => {
                setListStyle({ ...listStyle, home: true });
              }}
              onMouseLeave={() => setListStyle({ ...listStyle, home: false })}
              className="nav-item ms-2"
            >
              <a href="/" className="nav-link text-black  " aria-current="page" onClick={closenav}>
                <b className={`${listStyle?.home ? 'text-danger' : 'text-black'}`}>Home</b>
              </a>
            </li>
            <li
              onMouseEnter={() => {
                setListStyle({ ...listStyle, aboutus: true });
              }}
              onMouseLeave={() => setListStyle({ ...listStyle, aboutus: false })}
              className=" nav-item ms-2 "
            >
              <a onClick={closenav} className="nav-link text-black" href="/">
                <b className={`${listStyle?.aboutus ? 'text-danger' : 'text-black'}`}>About Us</b>
              </a>
            </li>
            <li
              onMouseEnter={() => {
                setListStyle({ ...listStyle, news: true });
              }}
              onMouseLeave={() => setListStyle({ ...listStyle, news: false })}
              className="nav-item ms-2"
            >
              <Link aria-current="page" className="nav-link text-black" to="/">
                <b className={`${listStyle?.news ? 'text-danger' : 'text-black'}`}>News</b>
              </Link>
            </li>
            <li
              onMouseEnter={() => {
                setListStyle({ ...listStyle, event: true });
              }}
              onMouseLeave={() => setListStyle({ ...listStyle, event: false })}
              className="nav-item ms-2"
            >
              <Link aria-current="page" className="nav-link text-black" to="/">
                <b className={`${listStyle?.event ? 'text-danger' : 'text-black'}`}>Events</b>
              </Link>
            </li>
            <li
              onMouseEnter={() => {
                setListStyle({ ...listStyle, certification: true });
              }}
              onMouseLeave={() => setListStyle({ ...listStyle, certification: false })}
              className=" nav-item ms-2"
            >
              <Link aria-current="page" className="nav-link text-black" to="/">
                <b className={`${listStyle?.certification ? 'text-danger' : 'text-black'}`}>
                  Certification
                </b>
              </Link>
            </li>
            <li
              onMouseEnter={() => {
                setListStyle({ ...listStyle, rules: true });
              }}
              onMouseLeave={() => setListStyle({ ...listStyle, rules: false })}
              className="nav-item ms-2"
            >
              <Link aria-current="page" className="nav-link text-black" to="/">
                <b className={`${listStyle?.rules ? 'text-danger' : 'text-black'}`}>Rules</b>
              </Link>
            </li>
          </ul>
          <div className="d-flex ">
            <a href="/register " className="btn btn-danger mx-1" role="button">
              Register <ArrowRight size={14} />
            </a>
            <a href="/login " className="btn btn-primary" role="button">
              Login <ArrowRight size={14} />
            </a>
            {/* <button onClick={handleClick} className="btn btn-primary">
              Go to new page
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
