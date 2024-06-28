// ** React Imports
import { Fragment } from "react";

// ** Custom Components
import NavbarUser from "./NavbarUser";
import NavbarBookmarks from "./NavbarBookmarks";
import { Row } from "reactstrap";
// ** Third Party Components
import Select from "react-select";

// ** Utils
import { selectThemeColors } from "@utils";
const ThemeNavbar = (props) => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props;
  const colourOptions = [
    { value: "Try Gold", label: "Try Gold" },
    { value: "blue", label: "Blue" },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" },
  ];
  const colourOptions2 = [
    { value: "Get Help", label: "Get Help" },
    { value: "blue", label: "Blue" },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" },
  ];
  const colourOptions3 = [
    { value: "Free Membership Plan", label: "Free Membership Plan" },
    { value: "blue", label: "Blue" },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" },
  ];

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
      </div>
      <div className="bookmark-wrapper d-flex align-items-center">
        {/* <Select
          theme={selectThemeColors}
          className="react-select rs-1"
          classNamePrefix="select"
          defaultValue={colourOptions[0]}
          options={colourOptions}
          isClearable={false}
        />
        <Select
          theme={selectThemeColors}
          className="react-select rs-1"
          classNamePrefix="select"
          defaultValue={colourOptions2[0]}
          options={colourOptions2}
          isClearable={false}
        />
        <Select
          theme={selectThemeColors}
          className="react-select rs-1"
          classNamePrefix="select"
          defaultValue={colourOptions3[0]}
          options={colourOptions3}
          isClearable={false}
        /> */}
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  );
};

export default ThemeNavbar;
