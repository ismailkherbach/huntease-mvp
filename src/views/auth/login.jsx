import React, { Fragment } from "react";
import { FormGroup, Button, Spinner } from "reactstrap";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { NotificationManager } from "../../components/common/react-notifications";

import { loginUser } from "../../redux/actions";
//import Btn from "../../components/small.componenets/Btn";

//import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  /*handleSubmit = () => {
    axios({
      method: "post",
      url: "/api/v1/auth/login",
      data: {
        email: this.state.email,
        password: this.state.password
      }
    }).then(
      response => {
        console.log(response);
        localStorage.setItem("token", response.data.success[0].token);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.success[0].user)
        );

        this.props.history.push("/app");
      },
      error => {
        console.log(error);
      }
    );
  };*/
  onUserLogin = (values) => {
    if (!this.props.loading) {
      if (values.email !== "" && values.password !== "") {
        this.props.loginUser(values, this.props.history);
      }
    }
  };

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Please enter your password";
    } else if (value.length < 7) {
      error = "Value must be longer than 8 characters";
    }
    return error;
  };
  componentDidUpdate() {
    /*   if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        "Login Error",
        3000,
        null,
        null,
        ""
      );
    }*/
  }
  render() {
    const { password, email } = this.state;
    const initialValues = { email, password };
    return (
      <Fragment>
        <div className="auth-bloc-container flex fdc aic jcfs">
          {" "}
          <h2 className="">Welcome Back!</h2>
          <Formik initialValues={initialValues} onSubmit={this.onUserLogin}>
            {({ errors, touched }) => (
              <Form className="flex jcc aic fdc">
                <FormGroup>
                  <Field
                    className={
                      errors.email && touched.email
                        ? "auth-input-large-error"
                        : "auth-input-large"
                    }
                    name="email"
                    validate={this.validateEmail}
                    placeholder="Email"
                  />
                  <label
                    errored={`${errors.email && touched.email}`}
                    errinfo={errors.email}
                  ></label>
                  <div className="inlineBtn-col-left">
                    <Field
                      className={
                        errors.password && touched.password
                          ? "auth-input-large-error"
                          : "auth-input-large"
                      }
                      type="password"
                      name="password"
                      validate={this.validatePassword}
                    />
                    <label
                      errored={`${errors.password && touched.password}`}
                      errinfo={errors.password}
                    ></label>
                  </div>
                </FormGroup>

                {this.props.error && (
                  <div className="inlineBtn-center">
                    <div className="error-block">{this.props.error}</div>
                  </div>
                )}

                <Button className="Auth-button flex aic jcc">
                  {this.props.loading ? (
                    <div className="loading-main-button"></div>
                  ) : (
                    <h5>Login</h5>
                  )}
                </Button>
              </Form>
            )}
          </Formik>{" "}
          <div className="condition-term">
            <Link to={"/user/forgot-password"}>
              <p>Forgot your password ?</p>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user, loading, error } = authUser;
  return { user, loading, error };
};

export default connect(mapStateToProps, {
  loginUser,
})(Login);
