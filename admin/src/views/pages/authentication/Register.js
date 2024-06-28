// ** React Imports
import { useContext, useMemo, useState, Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";
import JwtService from "../../../@core/auth/jwt/jwtService";

// ** Store & Actions
import { useDispatch } from "react-redux";
import { handleLogin } from "@store/authentication";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import { Facebook, Twitter, Mail, GitHub } from "react-feather";

// ** Context
import { AbilityContext } from "@src/utility/context/Can";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";
import LogoLogin from "../../../assets/images/logo/logo.png";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Label,
  Button,
  Form,
  Input,
  FormFeedback,
} from "reactstrap";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

// Custom Hooks
import useAuth from "../../../utility/hooks/useAuth";
import { toast, Slide } from "react-toastify";
import axios from "axios";
const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  terms: false,
  password: "",
  otp: "",
};

const Register = () => {
  // ** Hooks
  // console.log(fetchLocationdata());
  // const locationData = fetchLocationdata()?.data?.map((dataItem) => {
  //   return { value: dataItem._id, label: dataItem.name };
  // });
  // const locationOption = [
  //   { label: 'Select Location', value: '', disabled: true },
  //   ...(locationData ? locationData : [])
  // ];
  const ability = useContext(AbilityContext);
  const { skin } = useSkin();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
    clearErrors,
    getValues,
    setValue,
  } = useForm({ defaultValues });

  const illustration =
      skin === "dark" ? "register-v2-dark.svg" : "register-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  // JWT
  const jwtConfig = {
    loginEndpoint: `${process.env.REACT_APP_API}auth/signin`,
    registerEndpoint: `${process.env.REACT_APP_API}jwt/register`,
    refreshEndpoint: `${process.env.REACT_APP_API}jwt/refresh-token`,
    logoutEndpoint: `${process.env.REACT_APP_API}jwt/logout`,
  };

  const jwt = new JwtService(jwtConfig);
  const { sendSignupOtp, registrationReqeust } = useAuth();
  const [isOtpSended, setIsOtpSended] = useState(false);
  const [countryCode, setCountryCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function resetForm() {
    // Reset Form Data
    // setValue('firstName', '')
    // setValue('lastName', '')
    // setValue('email', '')
  }

  // Toast
  const ToastContent = ({ message }) => (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="toast-title fw-bold">{message}</h6>
        </div>
      </div>
    </Fragment>
  );

  const onSubmit = async () => {
    // console.log('Submiting')
    let data = getValues();
    // console.log('Submiting')
    const tempData = { ...data };
    // console.log(tempData)
    delete tempData.terms;
    delete tempData.otp;
    delete tempData.password;

    setIsLoading(true);
    registrationReqeust(data)
        .then((response) => {
          setIsLoading(false);
          if(response?.data?.status) {
            resetForm();
            toast.success(
              <ToastContent
                message={String(`Account Created Successfully! Please Login`)}
              />
            );
            history.push("/login");
          } else {
            toast.error(
              <ToastContent
                message={String(`${response?.data?.msg}`)}
              />
            );
          }
        })
        .catch((err) => {
          // console.log(err)
          setIsLoading(false);
          toast.error(<ToastContent message={String(err)} />);
        });
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <img src={LogoLogin} alt="mycma" style={{ height: "10vh" }} />

          {/* <h2
                        onClick={resetForm}
                        className="brand-text text-primary ms-1"
                    >
                        MyCMA
                    </h2> */}
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Create Your Account 🚀
            </CardTitle>
            <CardText className="mb-2">
              Make your app management easy and fun!
            </CardText>

            <Form action="/" className="auth-register-form mt-2">
              {/* First Name */}
              {!isOtpSended && (
                <div className="mb-1">
                  <Label className="form-label" for="register-username">
                    First Name
                  </Label>
                  <Controller
                    id="firstName"
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        placeholder="john"
                        invalid={errors.firstName && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.firstName ? (
                    <FormFeedback>{errors.firstName.message}</FormFeedback>
                  ) : null}
                </div>
              )}

              {/* Last Name */}
              {!isOtpSended && (
                <div className="mb-1">
                  <Label className="form-label" for="register-username">
                    Last Name
                  </Label>
                  <Controller
                    id="lastName"
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        placeholder="doe"
                        invalid={errors.lastName && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.lastName ? (
                    <FormFeedback>{errors.lastName.message}</FormFeedback>
                  ) : null}
                </div>
              )}

              {/* Email Address */}
              {!isOtpSended && (
                <div className="mb-1">
                  <Label className="form-label" for="register-email">
                    Email Address
                  </Label>
                  <Controller
                    id="email"
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        invalid={errors.email && true}
                        {...field}
                      />
                    )}
                  />
                  {errors.email ? (
                    <FormFeedback>{errors.email.message}</FormFeedback>
                  ) : null}
                </div>
              )}

              {/* Password */}
              {!isOtpSended && (
                <div className="mb-1">
                  <Label className="form-label" for="register-password">
                    Password
                  </Label>
                  <Controller
                    id="password"
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <InputPasswordToggle
                        className="input-group-merge"
                        invalid={errors.password && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              )}

              {/* User Agreement Check */}
              {!isOtpSended && (
                <div className="form-check mb-1">
                  <Controller
                    name="terms"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="terms"
                        type="checkbox"
                        checked={field.value}
                        invalid={errors.terms && true}
                      />
                    )}
                  />
                  <Label className="form-check-label" for="terms">
                    I agree to
                    <a
                      className="ms-25"
                      href="/"
                      onClick={(e) => e.preventDefault()}
                    >
                      privacy policy & terms
                    </a>
                  </Label>
                </div>
              )}

              {/* OTP */}
              {isOtpSended && (
                <div className="mb-1">
                  <Label className="form-label" for="register-password">
                    OTP
                  </Label>
                  <Controller
                    id="otp"
                    name="otp"
                    control={control}
                    render={({ field }) => (
                      <Input
                        className="input-group-merge"
                        invalid={errors.otp && true}
                        {...field}
                      />
                    )}
                  />
                </div>
              )}

              <Button
                type="button"
                onClick={onSubmit}
                block
                color="primary"
                disabled={isLoading}
              >
                {isLoading
                  ? "Processing..."
                  : isOtpSended
                  ? "Complete"
                  : "Sign up"}
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">Already have an account?</span>
              <Link to="/login">
                <span>Sign in instead</span>
              </Link>
            </p>
            <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
