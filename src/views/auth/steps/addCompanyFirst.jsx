import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import {
  Col,
  Button,
  Input,
  Label,
  FormGroup,
  Spinner,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Dropdown,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import Btn from "../../../components/small.componenets/Btn";
import axios from "axios";
import AddCompanySecondStep from "./addCompanySecond";

import { connect } from "react-redux";
import { registerUser } from "../../../redux/actions";

class AddCompanyFirstStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfos: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        companyName: "",
        memberCount: "20",
        industry: "Tech",
      },
      userValues: {},
      secondStepStatus: false,
    };

    this.handleChangeIndustry = this.handleChangeIndustry.bind(this);
    this.handleChangeMemberCount = this.handleChangeMemberCount.bind(this);
  }

  handleChangeMemberCount(e) {
    this.setState({
      userInfos: {
        ...this.state.userInfos,
        memberCount: e,
      },
    });
  }
  handleChangeIndustry(e) {
    this.setState({
      userInfos: {
        ...this.state.userInfos,
        industry: e.target.value,
      },
    });
  }

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
  onUserRegister = () => {
    let userData = this.state.userValues;
    let firstName = userData.firstName;
    let lastName = userData.lastName;
    let email = userData.email;
    let phone = userData.phone;
    let companyName = userData.companyName;
    let memberCount = this.state.userInfos.memberCount;
    let industry = this.state.userInfos.industry;
    let password = userData.password;
    let dataSend = {
      firstName,
      lastName,
      email,
      phone,
      password,
      memberCount,
      industry,
    };

    console.log(dataSend);
    this.props.registerUser(dataSend, this.props.history);
  };

  secondStep = (values) => {
    this.setState({ secondStepStatus: true, userValues: values });
  };

  render() {
    const {
      lastName,
      firstName,
      phone,
      companyName,
      password,
      email,
    } = this.state.userInfos;
    const initialValues = {
      lastName,
      firstName,
      phone,
      companyName,
      password,
      email,
    };
    return (
      <div>
        {!this.state.secondStepStatus ? (
          <Fragment>
            <div className="auth-container">
              {" "}
              <h4>ALL INPUTS ARE REQUIREDS</h4>
              <Formik initialValues={initialValues} onSubmit={this.secondStep}>
                {({ errors, touched }) => (
                  <Form class>
                    <FormGroup>
                      <div className="inlineBtn-center">
                        <Field
                          className={
                            errors.firstName && touched.firstName
                              ? "auth-input-error"
                              : "auth-input"
                          }
                          name="firstName"
                          //validate={this.validateEmail}
                          placeholder="First name"
                        />

                        <Field
                          className={
                            errors.lastName && touched.lastName
                              ? "auth-input-error"
                              : "auth-input"
                          }
                          name="lastName"
                          //validate={this.validateEmail}
                          placeholder="Last name"
                        />
                      </div>

                      <div className="inlineBtn-center">
                        <Field
                          className={
                            errors.companyName && touched.companyName
                              ? "auth-input-error"
                              : "auth-input"
                          }
                          name="companyName"
                          //validate={this.validateEmail}
                          placeholder="Company name"
                        />

                        <Field
                          className={
                            errors.phone && touched.phone
                              ? "auth-input-error"
                              : "auth-input"
                          }
                          name="phone"
                          //validate={this.validateEmail}
                          placeholder="Phone number"
                        />
                      </div>

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
                      {errors.email && touched.email && (
                        <p className="error-message inlineBtn-left">
                          {errors.email}
                        </p>
                      )}
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
                        {errors.password && touched.password && (
                          <p className="error-message">{errors.password}</p>
                        )}
                      </div>

                      <div className="condition-term">
                        <FormGroup check>
                          <Label check>
                            <Input type="radio" name="radio1" /> I agree to
                            Huntease Terms and Privacy Policy.
                          </Label>
                        </FormGroup>
                      </div>
                    </FormGroup>
                    <div className="inlineBtn-center">
                      <Button className={"btn-get-started"}>
                        Create your company account
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>{" "}
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="auth-container">
              {" "}
              <h3>How many people are in your team?</h3>
              <div className="inlineBtn-center">
                <Button
                  className={"btn-choice-company"}
                  onClick={this.handleChangeMemberCount.bind(this, 1)}
                >
                  <h3>1</h3>
                </Button>
                <Button
                  className={"btn-choice-company"}
                  onClick={this.handleChangeMemberCount.bind(this, "1")}
                >
                  <h3>5 - 10</h3>
                </Button>
                <Button
                  className={"btn-choice-company"}
                  onClick={this.handleChangeMemberCount.bind(this, "5-10")}
                >
                  <h3>2 - 6</h3>
                </Button>
                <Button
                  className={"btn-choice-company"}
                  onClick={this.handleChangeMemberCount.bind(this, "10-50")}
                >
                  <h3>10 - 50</h3>
                </Button>
                <Button
                  className={"btn-choice-company"}
                  onClick={this.handleChangeMemberCount.bind(this, "+50")}
                >
                  <h3>+50</h3>
                </Button>
              </div>
              <input
                className="auth-input-large"
                placeholder="Industy"
                type="text"
                onChange={this.handleChangeIndustry}
              />
              <input
                className="auth-input-large"
                placeholder="Role"
                type="text"
                //onChange={this.handleChangeMemberCount}
              />
              <Button
                className={"btn-get-started"}
                onClick={this.onUserRegister}
              >
                {this.props.loading ? (
                  <Spinner animation="border" />
                ) : (
                  <h3 className="btn-get-started-text">Access my account</h3>
                )}
              </Button>
            </div>
          </Fragment>
        )}{" "}
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(mapStateToProps, {
  registerUser,
})(AddCompanyFirstStep);
