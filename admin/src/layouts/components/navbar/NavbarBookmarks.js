// ** React Imports
import { Link } from "react-router-dom";
import { Fragment, useEffect, useState, useContext } from "react";

// ** React Redux
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// ** Context
import { AbilityContext } from "@src/utility/context/Can";

// ** Ajax Request
import { customInterIceptors } from "../../../lib/AxiosProvider";
const API = customInterIceptors();

import Avatar from "@components/avatar";
import SelectUserTypeModal from "./SelectUserTypeModal";

// ** Third Party Components
import * as Icon from "react-feather";
import { toast, Slide } from "react-toastify";
// ** Reactstrap Imports
import {
  NavItem,
  NavLink,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown,
} from "reactstrap";

import {
  getBookmarks,
  updateBookmarked,
  handleSearchQuery,
} from "@store/navbar";

// ** Utils
import { getHomeRouteForLoggedInUser } from "@utils";

import {
  handleChangeLocation,
  handleRoading,
} from "../../../redux/authentication";

const ToastContent = ({ name, userType }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Icon.Coffee size={12} />} />
        <h6 className="toast-title fw-bold">Welcome, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        You have successfully logged in as an{" "}
        <span className="text-danger text-decoration-underline">
          {userType}
        </span>{" "}
        to My Manager. Now you can start to explore. Enjoy!
      </span>
    </div>
  </Fragment>
);

const NavbarBookmarks = (props) => {
  // ** Props
  const { setMenuVisibility } = props;

  const dispatch = useDispatch();
  const ability = useContext(AbilityContext);
  const history = useHistory();

  // ** State
  const [value, setValue] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [addressArr, setAddressArr] = useState([]);
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  // ** Store Vars
  const store = useSelector((state) => state.navbar);
  // ** Redux store
  const authStore = useSelector((state) => state.auth);

  useEffect(() => {
    authStore.userData?.locations &&
      setAddressArr(authStore.userData?.locations);
  }, [authStore]);

  // ** ComponentDidMount
  useEffect(() => {
    dispatch(getBookmarks());
  }, []);

  // ** Loops through Bookmarks Array to return Bookmarks
  // const renderBookmarks = () => {
  //   if (store.bookmarks.length) {
  //     return store.bookmarks
  //       .map((item) => {
  //         const IconTag = Icon[item.icon];
  //         return (
  //           <NavItem key={item.target} className="d-none d-lg-block">
  //             <NavLink tag={Link} to={item.link} id={item.target}>
  //               <IconTag className="ficon" />
  //               <UncontrolledTooltip target={item.target}>{item.title}</UncontrolledTooltip>
  //             </NavLink>
  //           </NavItem>
  //         );
  //       })
  //       .slice(0, 10);
  //   } else {
  //     return null;
  //   }
  // };

  // ** If user has more than 10 bookmarks then add the extra Bookmarks to a dropdown
  // const renderExtraBookmarksDropdown = () => {
  //   if (store.bookmarks.length && store.bookmarks.length >= 11) {
  //     return (
  //       <NavItem className="d-none d-lg-block">
  //         <NavLink tag="span">
  //           <UncontrolledDropdown>
  //             <DropdownToggle tag="span">
  //               <Icon.ChevronDown className="ficon" />
  //             </DropdownToggle>
  //             <DropdownMenu end>
  //               {store.bookmarks
  //                 .map((item) => {
  //                   const IconTag = Icon[item.icon];
  //                   return (
  //                     <DropdownItem tag={Link} to={item.link} key={item.id}>
  //                       <IconTag className="me-50" size={14} />
  //                       <span className="align-middle">{item.title}</span>
  //                     </DropdownItem>
  //                   );
  //                 })
  //                 .slice(10)}
  //             </DropdownMenu>
  //           </UncontrolledDropdown>
  //         </NavLink>
  //       </NavItem>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  // ** Removes query in store
  const handleClearQueryInStore = () => dispatch(handleSearchQuery(""));

  // ** Loops through Bookmarks Array to return Bookmarks
  const onKeyDown = (e) => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      setTimeout(() => {
        setOpenSearch(false);
        handleClearQueryInStore();
      }, 1);
    }
  };

  // ** Function to toggle Bookmarks
  const handleBookmarkUpdate = (id) => dispatch(updateBookmarked(id));

  // ** Function to handle Bookmarks visibility
  const handleBookmarkVisibility = () => {
    setOpenSearch(!openSearch);
    setValue("");
    handleClearQueryInStore();
  };

  // ** Function to handle Input change
  const handleInputChange = (e) => {
    setValue(e.target.value);
    dispatch(handleSearchQuery(e.target.value));
  };

  // ** Function to handle external Input click
  const handleExternalClick = () => {
    if (openSearch === true) {
      setOpenSearch(false);
      handleClearQueryInStore();
    }
  };

  // ** Function to clear input value
  const handleClearInput = (setUserInput) => {
    if (!openSearch) {
      setUserInput("");
      handleClearQueryInStore();
    }
  };

  // ** Change location of user
  // ** Handlers
  const handleAddressClick = async (e, addressId) => {
    handleRoading(true);
    let tmpUsertype = [],
      count = 0;
    if (authStore.userData?.options && authStore.userData.options.length > 0) {
      authStore.userData.options.map((option, index) => {
        if (option.locationId == addressId) {
          tmpUsertype.push(option.userType);
        } else return;
      });
    }
    if (tmpUsertype.length === 0) {
      toast.error("The user who is in that location don't have any permission");
      return;
    } else if (tmpUsertype.length === 1) {
      const permissions = await API.get("/permission", {
        params: { userType: tmpUsertype[0] },
      });

      let newAbility = [
        {
          action: "read",
          subject: "base",
        },
      ];

      permissions.data &&
        permissions.data.length > 0 &&
        permissions.data.map((permission) => {
          if (permission.read === true) {
            newAbility.push({
              action: "read",
              subject: permission.defaultId,
            });
            if (permission.write === true) {
              newAbility.push({
                action: "write",
                subject: permission.defaultId,
              });
            }
            if (permission.update === true) {
              newAbility.push({
                action: "update",
                subject: permission.defaultId,
              });
            }
            if (permission.delete === true) {
              newAbility.push({
                action: "delete",
                subject: permission.defaultId,
              });
            }
          }
        });
      const data = {
        ability: newAbility,
        userType: tmpUsertype[0],
      };
      dispatch(handleChangeLocation(data));
      ability.update(newAbility);

      history.push(getHomeRouteForLoggedInUser(tmpUsertype[0]));
      toast.success(
        <ToastContent
          name={authStore.userData?.fullName || "John Doe"}
          userType={tmpUsertype[0] || "admin"}
        />,
        {
          icon: false,
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000,
        }
      );
    } else if (tmpUsertype.length > 1) {
      let selectedLocation = authStore.userData.locations.find(
        (item) => item._id == addressId
      );
      setSelectedAddress(selectedLocation.address);
      setSelectModalOpen(true);
      setSelectedUserType(tmpUsertype);
    }
  };

  return (
    <Fragment>
      <ul className="navbar-nav d-xl-none">
        <NavItem className="mobile-menu me-auto">
          <NavLink
            className="nav-menu-main menu-toggle hidden-xs is-active"
            onClick={() => setMenuVisibility(true)}
          >
            <Icon.Menu className="ficon" />
          </NavLink>
        </NavItem>
      </ul>
      {/* <ul className="nav navbar-nav bookmark-icons">
        {renderExtraBookmarksDropdown()}
        {authStore.userData?.userType == 'admin' ? (
          renderBookmarks()
        ) : (
          <UncontrolledDropdown href="/" tag="li" className="dropdown-address nav-item">
            <DropdownToggle
              href="/"
              tag="a"
              className="nav-link d-flex font-small-4"
              onClick={(e) => e.preventDefault()}
            >
              <div className="text-body select-location p-25 border-light cursor-pointer align-items-center d-flex">
                <Icon.MapPin size={15} className="me-25" />
                <span>Select Location</span>
              </div>
            </DropdownToggle>

            <DropdownMenu className="mt-0" start>
              {addressArr.map((item, index) => {
                return (
                  <DropdownItem
                    href="/"
                    tag="h4"
                    onClick={(e) => handleAddressClick(e, item._id)}
                    key={'dropdownItem' + index}
                  >
                    <span className="ms-1 font-small-2">
                      {item.address.city + ' ' + item.address.street}
                    </span>
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        )}
      </ul> */}
      <SelectUserTypeModal
        selectModalOpen={selectModalOpen}
        setSelectModalOpen={setSelectModalOpen}
        selectedUserType={selectedUserType}
        selectedAddress={selectedAddress}
        ToastContent={ToastContent}
      />
    </Fragment>
  );
};

export default NavbarBookmarks;
