// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import Select from "react-select";
import Cleave from "cleave.js/react";
import { useForm, Controller } from "react-hook-form";
import { object, string, number, date, InferType } from "yup";
import "cleave.js/dist/addons/cleave-phone.us";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback
} from "reactstrap";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Demo Components
import DeleteAccount from "./DeleteAccount";
import { updateUserProfileAction } from "./store/actions";
import { useDispatch } from "react-redux";
import { fetchUserProfileData } from "../../../../requests/settings/account";
import { toast } from "react-toastify";

const countryOptions = [
  { value: "UK", label: "UK" },
  { value: "USA", label: "USA" },
  { value: "France", label: "France" },
  { value: "Russia", label: "Russia" },
  { value: "Canada", label: "Canada" }
];

const languageOptions = [
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Dutch", label: "Dutch" }
];

const currencyOptions = [
  { value: "USD", label: "USD" },
  { value: "Euro", label: "Euro" },
  { value: "Pound", label: "Pound" },
  { value: "Bitcoin", label: "Bitcoin" }
];

const timeZoneOptions = [
  {
    value: "(GMT-12:00) International Date Line West",
    label: "(GMT-12:00) International Date Line West"
  },
  {
    value: "(GMT-11:00) Midway Island, Samoa",
    label: "(GMT-11:00) Midway Island, Samoa"
  },
  { value: "(GMT-10:00) Hawaii", label: "(GMT-10:00) Hawaii" },
  { value: "(GMT-09:00) Alaska", label: "(GMT-09:00) Alaska" },
  {
    value: "(GMT-08:00) Pacific Time (US & Canada)",
    label: "(GMT-08:00) Pacific Time (US & Canada)"
  },
  {
    value: "(GMT-08:00) Tijuana, Baja California",
    label: "(GMT-08:00) Tijuana, Baja California"
  },
  { value: "(GMT-07:00) Arizona", label: "(GMT-07:00) Arizona" },
  {
    value: "(GMT-07:00) Chihuahua, La Paz, Mazatlan",
    label: "(GMT-07:00) Chihuahua, La Paz, Mazatlan"
  },
  {
    value: "(GMT-07:00) Mountain Time (US & Canada)",
    label: "(GMT-07:00) Mountain Time (US & Canada)"
  },
  {
    value: "(GMT-06:00) Central America",
    label: "(GMT-06:00) Central America"
  },
  {
    value: "(GMT-06:00) Central Time (US & Canada)",
    label: "(GMT-06:00) Central Time (US & Canada)"
  },
  {
    value: "(GMT-06:00) Guadalajara, Mexico City, Monterrey",
    label: "(GMT-06:00) Guadalajara, Mexico City, Monterrey"
  },
  { value: "(GMT-06:00) Saskatchewan", label: "(GMT-06:00) Saskatchewan" },
  {
    value: "(GMT-05:00) Bogota, Lima, Quito, Rio Branco",
    label: "(GMT-05:00) Bogota, Lima, Quito, Rio Branco"
  },
  {
    value: "(GMT-05:00) Eastern Time (US & Canada)",
    label: "(GMT-05:00) Eastern Time (US & Canada)"
  },
  { value: "(GMT-05:00) Indiana (East)", label: "(GMT-05:00) Indiana (East)" },
  {
    value: "(GMT-04:00) Atlantic Time (Canada)",
    label: "(GMT-04:00) Atlantic Time (Canada)"
  },
  {
    value: "(GMT-04:00) Caracas, La Paz",
    label: "(GMT-04:00) Caracas, La Paz"
  },
  { value: "(GMT-04:00) Manaus", label: "(GMT-04:00) Manaus" },
  { value: "(GMT-04:00) Santiago", label: "(GMT-04:00) Santiago" },
  { value: "(GMT-03:30) Newfoundland", label: "(GMT-03:30) Newfoundland" }
];

const Account = () => {
  const { data } = fetchUserProfileData();

  const [profileDetails, setProfileDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    zipCode: "",
    country: "",
    language: "",
    timezone: "",
    currency: "",
  });
  const [companyDetails, setcompanyDetails] = useState({
    companyName: "",
    corporateName: "",
    taxID: "",
    phoneNumber: "",
    alternativeNumber: "",
    address: "",
    state: "",
    zipCode: "",
    country: "",
    currency: "",
  })

  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(
    require("@src/assets/images/avatars/avatar-blank.png").default
  );
  const [companyLogo, setCompanyLogo] = useState(
    require("@src/assets/images/avatars/avatar-blank.png").default
  );
  const [headerImg, setHeaderImg] = useState(
    require("@src/assets/images/avatars/avatar-blank.png").default
  );
  const defaultValues = {
      firstName: data?.user?.firstName,
      lastName: data?.user?.lastName,
      email: data?.email,
      company: data?.user.company?.name,
      phoneNumber: data?.phone,
      address: data?.user?.address?.address,
      state: data?.user?.address?.state,
      zipCode: data?.user?.address?.zipCode,
      country: data?.user?.address?.country
        ? { value: data.user.address.country, label: data.user.address.country }
        : countryOptions[0],
      language: data?.user?.language
        ? { value: data.user.language, label: data.user.language }
        : languageOptions[0],
      timeZone: data?.user?.timeZone
        ? { value: data.user.timeZone, label: data.user.timeZone }
        : timeZoneOptions[0],
      currency: data?.user?.currency
        ? { value: data.user.currency, label: data.user.currency }
        : currencyOptions[0],
      companyName: data?.company?.companyName,
      corporateName: data?.company?.corporateName,
      taxID: data?.company?.taxID,
      cPhoneNumber: data?.company?.phoneNumber,
      cAlternativeNumber: data?.company?.alternativeNumber,
      cAddress: data?.company?.address,
      cState: data?.company?.state,
      cZipCode: data?.company?.zipCode,
      cCountry: data?.company?.country ? { value: data.company.country, label: data.company.country } : countryOptions[0],
      cCurrency: data?.company?.currency,
  };

  useEffect(() => {
    setAvatar(
      data?.user
        ? data.user.avatar
        : require("@src/assets/images/avatars/avatar-blank.png").default
    );
    setHeaderImg(
      data?.user
        ? data.user.company.headerPhoto
        : require("@src/assets/images/avatars/avatar-blank.png").default
    );
    setCompanyLogo(
      data?.user
        ? data.user.company.cLogo
        : require("@src/assets/images/avatars/avatar-blank.png").default
    );
  }, [data]);

  const {
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues });

  for (let key in defaultValues) {
    setValue(key, defaultValues[key]);
  }
  const onChange = (e, setState) => {
    const reader = new FileReader(),
      files = e.target.files;
    reader.onload = function () {
      setState(reader?.result);
    };
    reader?.readAsDataURL(files[0]);
  };
  const handleResetData = () => {
    return null;
  };

  const onSubmit = (data) => {
    console.log("innnn", data);
    toast.success(
      <div className="toastify-header">
         <div className="title-wrapper">
         <h6 className="toast-title fw-bold">Update Successfully.</h6>
         </div>
      </div>
   );

    // if (
    //   Object?.values(data)?.every((field) => field?.length > 0) ||
    //   avatar !== require("@src/assets/images/avatars/avatar-blank.png").default
    // ) {
    //   let payload = {
    //     profileDetails: {
    //       firstName: data.firstName,
    //       lastName: data.lastName,
    //       email: data.email,
    //       phoneNumber: data.phoneNumber,
    //       language: data.language.value,
    //       timeZone: data.timeZone.value,
    //       currency: data.currency.value,
    //       address: data.address,
    //       state: data.accountState,
    //       zipCode: data.zipCode,
    //       country: data.country.value
    //     },
    //     avatar: avatar,        
    //     company: {
    //       companyName: data.companyName,
    //       corporateName: data.corporateName,
    //       taxID: data.taxID,
    //       address: data.cAddress,
    //       state: data.cState,
    //       zipCode: data.cZipCode,
    //       country: data.cCountry.value,
    //       headerPhoto: headerImg,
    //       otherPhoneNumber: data.cAlternativeNumber,
    //       phoneNumber: data.cPhoneNumber,
    //       cLogo: companyLogo,
    //     }
    //   };
    //   console.log(payload);
    //   // dispatch(updateUserProfileAction(payload, userProfileDataRefetch));
    //   return null;
    // } else {
    //   for (const key in data) {
    //     if (data[key]?.length === 0) {
    //       setError(key, {
    //         type: "manual"
    //       });
    //     }
    //   }
    // }
  };

  const handleImgReset = (setState) => {
    setState(require("@src/assets/images/avatars/avatar-blank.png").default);
  };

  return (
    <Fragment>
      <Card className="bg-white">
        <Row>
          <Col md="6" className="mb-1" style={{ paddingRight: "0px" }}>
            <Card style={{ borderRight: "1px solid#d3d3d3" }}>
              <CardHeader className="border-bottom">
                <CardTitle tag="h4">Profile Details</CardTitle>
              </CardHeader>
              <CardBody className="py-2 my-25">
                <div className="d-flex">
                  <div className="me-25 d-flex flex-column">
                    <img
                      className="rounded me-50"
                      src={avatar}
                      alt="Generic placeholder image"
                      height="100"
                      width="100"
                    />
                  </div>
                  <div className="d-flex align-items-end mt-75 ms-1">
                    <div>
                      <Button
                        tag={Label}
                        className="mb-75 me-75"
                        size="sm"
                        color="primary"
                      >
                        Upload
                        <Input
                          type="file"
                          onChange={(e) => onChange(e, setAvatar)}
                          hidden
                          accept="image/*"
                        />
                      </Button>
                      <Button
                        className="mb-75"
                        color="secondary"
                        size="sm"
                        outline
                        onClick={() => handleImgReset(setAvatar)}
                      >
                        Reset
                      </Button>
                      <p className="mb-0">
                        Allowed JPG, GIF or PNG. Max size of 800kB
                      </p>
                    </div>
                  </div>
                </div>
                <Form className="mt-2 pt-50" onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="firstName">
                        First Name
                      </Label>
                      <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="firstName"
                            htmlFor="firstName"
                            placeholder="John"
                            invalid={errors.firstName && true}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.firstName && (
                        <FormFeedback>
                          Please enter a valid First Name
                        </FormFeedback>
                      )}
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="lastName">
                        Last Name
                      </Label>
                      <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="lastName"
                            htmlFor="lastName"
                            placeholder="Doe"
                            invalid={errors.lastName && true}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.lastName && (
                        <FormFeedback>
                          Please enter a valid Last Name
                        </FormFeedback>
                      )}
                    </Col>

                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="email">
                        E-mail
                      </Label>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="email"
                            htmlFor="email"
                            placeholder="Email"
                            disabled
                            invalid={errors.email && true}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.email && (
                        <FormFeedback>Please enter a valid Email</FormFeedback>
                      )}
                    </Col>

                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="phone">
                        Phone Number
                      </Label>
                      <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                          <Cleave
                            id="phoneNumber"
                            name="phoneNumber"
                            className="form-control"
                            placeholder="1 234 567 8900"
                            options={{ phone: true, phoneRegionCode: "US" }}
                            invalid={errors.phone && true}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.phone && (
                        <FormFeedback>
                          Please enter a valid Phone Name
                        </FormFeedback>
                      )}
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="address">
                        Address
                      </Label>
                      <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="address"
                            htmlFor="address"
                            placeholder="address Name"
                            invalid={errors.address && true}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.address && (
                        <FormFeedback>
                          Please enter a valid Address Name
                        </FormFeedback>
                      )}
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="state">
                        State
                      </Label>
                      <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="state"
                            htmlFor="state"
                            placeholder="state Name"
                            invalid={errors.state && true}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.accountState && (
                        <FormFeedback>Please enter a valid State</FormFeedback>
                      )}
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="zipCode">
                        Zip Code
                      </Label>
                      <Controller
                        name="zipCode"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="zipCode"
                            htmlFor="zipCode"
                            placeholder="zipCode"
                            invalid={errors.zipCode && true}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.zipCode && (
                        <FormFeedback>
                          Please enter a valid zipCode
                        </FormFeedback>
                      )}
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="country">
                        Country
                      </Label>
                      <Controller
                        name="country"
                        control={control}
                        render={({ field }) => (
                          <Select
                            id="country"
                            name="country"
                            isClearable={false}
                            className="react-select"
                            classNamePrefix="select"
                            options={countryOptions}
                            theme={selectThemeColors}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="language">
                        Language
                      </Label>
                      <Controller
                        name="language"
                        control={control}
                        render={({ field }) => (
                          <Select
                            id="language"
                            name="language"
                            isClearable={false}
                            className="react-select"
                            classNamePrefix="select"
                            options={languageOptions}
                            theme={selectThemeColors}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="timeZone">
                        Timezone
                      </Label>
                      <Controller
                        name="timeZone"
                        control={control}
                        render={({ field }) => (
                          <Select
                            id="timeZone"
                            name="timeZone"
                            isClearable={false}
                            className="react-select"
                            classNamePrefix="select"
                            options={timeZoneOptions}
                            theme={selectThemeColors}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="currency">
                        Currency
                      </Label>{" "}
                      <Controller
                        name="currency"
                        control={control}
                        render={({ field }) => (
                          <Select
                            id="currency"
                            name="currency"
                            isClearable={false}
                            className="react-select"
                            classNamePrefix="select"
                            options={currencyOptions}
                            theme={selectThemeColors}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                    <Col className="mt-2" sm="12">
                      <Button type="submit" className="me-1" color="primary">
                        Save changes
                      </Button>
                      <Button
                        color="secondary"
                        onClick={handleResetData}
                        outline
                      >
                        Discard
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" className="mb-1" style={{ paddingLeft: "0px" }}>
            <Card>
              <CardHeader className="border-bottom">
                <CardTitle tag="h4">Company Details</CardTitle>
              </CardHeader>
              <CardBody className="py-2 my-25">
                <Row>
                  <Col md="6">
                    <div className="d-flex">
                      <div className="me-25 d-flex flex-column">
                        <p className="mb-0">Logo</p>
                        <img
                          className="rounded me-50"
                          src={companyLogo}
                          alt="Generic placeholder image"
                          height="100"
                          width="100"
                        />
                      </div>
                      <div className="d-flex align-items-end mt-75 ms-1">
                        <div>
                          <Button
                            tag={Label}
                            className="mb-75 me-75"
                            size="sm"
                            color="primary"
                          >
                            Upload
                            <Input
                              type="file"
                              onChange={(e) => onChange(e, setCompanyLogo)}
                              hidden
                              accept="image/*"
                            />
                          </Button>
                          <Button
                            className="mb-75"
                            color="secondary"
                            size="sm"
                            outline
                            onClick={() => handleImgReset(setCompanyLogo)}
                          >
                            Reset
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="d-flex">
                      <div className="me-25 d-flex flex-column">
                        <p className="mb-0">Header Photo</p>
                        <img
                          className="rounded me-50"
                          src={headerImg}
                          alt="Generic placeholder image"
                          height="100"
                          width="100"
                        />
                      </div>
                      <div className="d-flex align-items-end mt-75 ms-1">
                        <div>
                          <Button
                            tag={Label}
                            className="mb-75 me-75"
                            size="sm"
                            color="primary"
                          >
                            Upload
                            <Input
                              type="file"
                              onChange={(e) => onChange(e, setHeaderImg)}
                              hidden
                              accept="image/*"
                            />
                          </Button>
                          <Button
                            className="mb-75"
                            color="secondary"
                            size="sm"
                            outline
                            onClick={() => handleImgReset(setHeaderImg)}
                          >
                            Reset
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Form className="mt-2 pt-50" onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="companyName">
                        Company Name
                      </Label>
                      <Controller
                        name="companyName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="companyName"
                            htmlFor="companyName"
                            placeholder="Company Name"
                            invalid={errors.companyName && true}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.companyName && (
                        <FormFeedback>
                          Please enter a valid Company Name
                        </FormFeedback>
                      )}
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="corporateName">
                        Corporate Name
                      </Label>
                      <Controller
                        name="corporateName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="corporateName"
                            htmlFor="corporateName"
                            placeholder="corporateName Name"
                            invalid={errors.corporateName && true}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.corporateName && (
                        <FormFeedback>
                          Please enter a valid Corporate Name
                        </FormFeedback>
                      )}
                    </Col>

                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="taxID">
                        Tax ID
                      </Label>
                      <Controller
                        name="taxID"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="taxID"
                            htmlFor="taxID"
                            placeholder="taxID"
                            invalid={errors.taxID && true}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.taxID && (
                        <FormFeedback>Please enter a valid Tax id</FormFeedback>
                      )}
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="cPhoneNumber">
                        Phone Number
                      </Label>
                      <Controller
                        name="cPhoneNumber"
                        control={control}
                        render={({ field }) => (
                          <Cleave
                            id="cPhoneNumber"
                            name="cPhoneNumber"
                            className="form-control"
                            placeholder="1 234 567 8900"
                            options={{
                              cPhoneNumber: true,
                              phoneRegionCode: "US"
                            }}
                            invalid={errors.cPhoneNumber && true}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.cPhoneNumber && (
                        <FormFeedback>
                          Please enter a valid Phone Name
                        </FormFeedback>
                      )}
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="cAlternativeNumber">
                        Alternative Number
                      </Label>
                      <Controller
                        name="cAlternativeNumber"
                        control={control}
                        render={({ field }) => (
                          <Cleave
                            id="cAlternativeNumber"
                            name="cAlternativeNumber"
                            className="form-control"
                            placeholder="1 234 567 8900"
                            options={{ cAlternativeNumber: true, phoneRegionCode: "US" }}
                            invalid={errors.cAlternativeNumber && true}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.cAlternativeNumber && (
                        <FormFeedback>
                          Please enter a valid Alternative Name
                        </FormFeedback>
                      )}
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="cAddress">
                        Address
                      </Label>
                      <Controller
                        name="cAddress"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="cAddress"
                            htmlFor="cAddress"
                            placeholder="address Name"
                            invalid={errors.cAddress && true}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.cAddress && (
                        <FormFeedback>
                          Please enter a valid Address Name
                        </FormFeedback>
                      )}
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="cState">
                        State
                      </Label>
                      <Controller
                        name="cState"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="cState"
                            htmlFor="cState"
                            placeholder=" Company State Name"
                            invalid={errors.cState && true}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.cState && (
                        <FormFeedback>Please enter a valid State</FormFeedback>
                      )}
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="cZipCode">
                        Zip Code
                      </Label>
                      <Controller
                        name="cZipCode"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="cZipCode"
                            htmlFor="cZipCode"
                            placeholder="cZipCode"
                            // invalid={errors.cZipCode && true}
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.cZipCode && (
                        <FormFeedback>
                          Please enter a valid zipCode
                        </FormFeedback>
                      )}
                    </Col>
                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="cCountry">
                        Country
                      </Label>
                      <Controller
                        name="cCountry"
                        control={control}
                        render={({ field }) => (
                          <Select
                            id="cCountry"
                            name="cCountry"
                            isClearable={false}
                            className="react-select"
                            classNamePrefix="select"
                            options={countryOptions}
                            theme={selectThemeColors}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                    {/* <Col sm="6" className="mb-1">
                      <Label className="form-label" for="language">
                        Language
                      </Label>
                      <Controller
                        name="language"
                        control={control}
                        render={({ field }) => (
                          <Select
                            id="language"
                            name="language"
                            isClearable={false}
                            className="react-select"
                            classNamePrefix="select"
                            options={languageOptions}
                            theme={selectThemeColors}
                            {...field}
                          />
                        )}
                      />
                    </Col> */}

                    <Col sm="6" className="mb-1">
                      <Label className="form-label" for="cCurrency">
                        Currency
                      </Label>{" "}
                      <Controller
                        name="cCurrency"
                        control={control}
                        render={({ field }) => (
                          <Select
                            id="cCurrency"
                            name="cCurrency"
                            isClearable={false}
                            className="react-select"
                            classNamePrefix="select"
                            options={currencyOptions}
                            theme={selectThemeColors}
                            {...field}
                          />
                        )}
                      />
                    </Col>
                    {/* <Col className="mt-2" sm="12">
                    <Button type="submit" className="me-1" color="primary">
                      Save changes
                    </Button>
                    <Button color="secondary" onClick={handleResetData} outline>
                      Discard
                    </Button>
                  </Col> */}
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Card>
      <DeleteAccount />
    </Fragment>
  );
};

export default Account;
