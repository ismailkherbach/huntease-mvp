import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import {
  Col,
  Button,
  Input,
  Label,
  FormGroup,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Dropdown,
} from "reactstrap";
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
      secondStepStatus: false,
    };

    this.handleChangeFirst = this.handleChangeFirst.bind(this);
    this.handleChangeLast = this.handleChangeLast.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleChangeIndustry = this.handleChangeIndustry.bind(this);
    this.handleChangeMemberCount = this.handleChangeMemberCount.bind(this);
  }

  handleChangeFirst(e) {
    this.setState({
      userInfos: {
        ...this.state.userInfos,
        firstName: e.target.value,
      },
    });
  }
  handleChangeLast(e) {
    this.setState({
      userInfos: {
        ...this.state.userInfos,
        lastName: e.target.value,
      },
    });
  }
  handleChangeEmail(e) {
    this.setState({
      userInfos: {
        ...this.state.userInfos,
        email: e.target.value,
      },
    });
  }
  handleChangePassword(e) {
    this.setState({
      userInfos: {
        ...this.state.userInfos,
        password: e.target.value,
      },
    });
  }
  handleChangeNumber(e) {
    this.setState({
      userInfos: {
        ...this.state.userInfos,
        phone: e.target.value,
      },
    });
  }
  handleChangeMemberCount(e) {
    this.setState({
      userInfos: {
        ...this.state.userInfos,
        memberCount: e.target.value,
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

  onUserRegister = () => {
    let userData = this.state.userInfos;
    this.props.registerUser(userData, this.props.history);
  };

  secondStep = () => {
    this.setState({ secondStepStatus: true });
  };

  render() {
    return (
      <div>
        {!this.state.secondStepStatus ? (
          <Fragment>
            <div className="auth-container">
              {" "}
              <h4>ALL INPUTS ARE REQUIREDS</h4>
              <div className="inlineBtn-center">
                <input
                  className="auth-input"
                  placeholder="firstName"
                  type="text"
                  onChange={this.handleChangeFirst}
                />

                <input
                  className="auth-input"
                  placeholder="lastName"
                  type="text"
                  onChange={this.handleChangeLast}
                />
              </div>
              <div className="inlineBtn-center">
                <input
                  className="auth-input"
                  placeholder="Company name"
                  type="text"
                  onChange={this.handleChangeEmail}
                />

                <input
                  className="auth-input"
                  placeholder="Phone phone"
                  type="text"
                  onChange={this.handleChangeNumber}
                />
              </div>
              <input
                className="auth-input-large"
                placeholder="Work Email"
                type="text"
                onChange={this.handleChangeEmail}
              />
              <input
                className="auth-input-large"
                placeholder="Paasword"
                type="password"
                onChange={this.handleChangePassword}
              />
              <div className="condition-term">
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" /> I agree to Huntease
                    Terms and Privacy Policy.
                  </Label>
                </FormGroup>
              </div>
              <Button className={"btn-get-started"} onClick={this.secondStep}>
                Create your company account
              </Button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="auth-container">
              {" "}
              <h3>How many people are in your team?</h3>
              <div className="inlineBtn-center">
                <Btn class={"btn-choice-company"}>
                  <h3>1</h3>
                </Btn>
                <Btn class={"btn-choice-company"}>
                  <h3>5 - 10</h3>
                </Btn>
                <Btn class={"btn-choice-company"}>
                  <h3>2 - 6</h3>
                </Btn>
                <Btn class={"btn-choice-company"}>
                  <h3>10 - 50</h3>
                </Btn>
                <Btn class={"btn-choice-company"}>
                  <h3>+50</h3>
                </Btn>
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
                onChange={this.handleChangeMemberCount}
              />
              <Button
                className={"btn-get-started"}
                onClick={this.onUserRegister}
              >
                <div
                  className="btn-get-started-text"
                  onClick={this.onUserRegister}
                >
                  Access my account
                </div>
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
