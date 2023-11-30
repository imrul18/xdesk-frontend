// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { Link, useNavigate } from "react-router-dom";

// ** Icons Imports
import { Facebook, GitHub, Mail, Twitter } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Button, CardText, CardTitle, Col, Form, Input, Label, Row
} from "reactstrap";

// ** Illustrations Imports
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";

// ** Styles
import themeConfig from "@src/configs/themeConfig";
import "@styles/react/pages/page-authentication.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Signin } from "./store";

const Login = () => {
  const { skin } = useSkin();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const [data, setData] = useState(null)
  const [errors, setErrors] = useState(null);

  
  const onChange = (e) => {
    setData({...data, [e?.target?.name]: e.target?.value})
  }
  
  const LogIn = async(e) => {
    e.preventDefault();
    const res = await dispatch(Signin(data));
    if (res?.payload?.status) {
      navigate('/dashboard')
    } else {
      setErrors(res?.payload?.data?.errors)
    }   
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" onClick={(e) => e.preventDefault()}>
        <img src={themeConfig.app.appLogoImage} alt="logo" height="28"/>
          <h2 className="brand-text text-primary ms-1">{themeConfig?.app?.appName}</h2>
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
              Welcome to XDesk!
            </CardTitle>
            <CardText className="mb-2">
              Please sign-in to your account and start the adventure
            </CardText>
            <Form className="auth-login-form mt-2">
              <div className="mb-1">
                <Label className="form-label" for="username">
                  Username
                </Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="016XXXXXXXX"
                  autoFocus
                  onChange={onChange}
                />
                    <small className="text-danger">{errors?.username}</small>

              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    Password
                  </Label>
                  <Link to="/forgot-password">
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                  name="password"
                  onChange={onChange}
                />
                    <small className="text-danger">{errors?.password}</small>

              </div>
              <div className="form-check mb-1">                  
                <Input type="checkbox" id="remember-me" name="remember_me" onChange={onChange}/>
                <Label className="form-check-label" for="remember-me">
                  Remember Me
                </Label>
              </div>
              <Button color="primary" name="signin"  onClick={LogIn}>
                Sign in
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">New on our platform?</span>
              <Link to="/register">
                <span>Create an account</span>
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

export default Login;
