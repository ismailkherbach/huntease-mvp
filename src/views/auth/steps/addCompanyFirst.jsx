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
            <div className="auth-bloc-container flex fdc aic jcfs">
              {" "}
              <p>ALL INPUTS ARE REQUIREDS</p>
              <Formik initialValues={initialValues} onSubmit={this.secondStep}>
                {({ errors, touched }) => (
                  <Form class>
                    <FormGroup>
                      <div className="small-inputs flex fdr aic jcc">
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

                      <div className="small-inputs flex fdr aic jcc">
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

                      <div className="flex fdc aic jcc">
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
                        <Field
                          className={
                            errors.password && touched.password
                              ? "auth-input-large-error"
                              : "auth-input-large"
                          }
                          type="password"
                          name="password"
                          placeholder="Password"
                          validate={this.validatePassword}
                        />
                        <label
                          errored={`${errors.password && touched.password}`}
                          errinfo={errors.password}
                        ></label>
                      </div>

                      <div className="condition-term">
                        <FormGroup check></FormGroup>
                      </div>
                    </FormGroup>
                    <div className="flex aic jcc">
                      <Button className={"Auth-button flex aic jcc"}>
                        <h5>Create your company account</h5>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>{" "}
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="auth-bloc-container flex fdc aic jcfs">
              {" "}
              <h5>How many people are in your team?</h5>
              <div className=" fdr flex aic jcc">
                <div
                  className={"company-size flex aic jcc"}
                  onClick={this.handleChangeMemberCount.bind(this, "1")}
                >
                  <h4>1</h4>
                </div>
                <div
                  className={"company-size flex aic jcc"}
                  onClick={this.handleChangeMemberCount.bind(this, "2-5")}
                >
                  <h4>2 - 5</h4>
                </div>
                <div
                  className={"company-size flex aic jcc"}
                  onClick={this.handleChangeMemberCount.bind(this, "5-10")}
                >
                  <h4>5 - 10</h4>
                </div>
                <div
                  className={"company-size flex aic jcc"}
                  onClick={this.handleChangeMemberCount.bind(this, "10-50")}
                >
                  <h4>10 - 50</h4>
                </div>
                <div
                  className={"company-size flex aic jcc"}
                  onClick={this.handleChangeMemberCount.bind(this, "50+")}
                >
                  <h4>50+</h4>
                </div>
              </div>
              <div className="selectOptions">
                <select
                  value="h"
                  //onChange={this.handleChangeMemberCount}
                >
                  <option>Hello</option>
                  <option>World</option>
                  <option>Ho</option>
                </select>
              </div>
              <div className="selectOptions">
                <select
                  value="h"
                  //onChange={this.handleChangeMemberCount}
                >
                  <option>Hello</option>
                  <option>Hello</option>
                  <option>Hello</option>
                </select>
              </div>
              <Button
                className={"Auth-button flex aic jcc"}
                onClick={this.onUserRegister}
              >
                {this.props.loading ? (
                  <Spinner animation="border" />
                ) : (
                  <h5 className="btn-get-started-text">Access my account</h5>
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
