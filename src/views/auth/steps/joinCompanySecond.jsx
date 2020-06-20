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
import { Link, withRouter } from "react-router-dom";

import Btn from "../../../components/small.componenets/Btn";
import { connect } from "react-redux";
import { registerSimpleUser } from "../../../redux/actions";
import axios from "axios";

export default class JoinCompanySecondStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      secondStepStatus: false,
    };

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(
      this
    );
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  handleChangeConfirmPassword(e) {
    this.setState({ confirmPassword: e.target.value });
  }

  onUserRegister = () => {
    let email = "ismailkhrbach.98@gmail.com";
    let token = "rmqIwX2Tit06UpKJLkRV8.bgIh.jRKq2";
    let password = this.state.password;
    let role = "user";
    let history = this.props.history;
    this.props.registerUser({ email, password, role, token, history });
  };
  secondStep = () => {
    this.setState({ secondStepStatus: true });
  };

  /*handleSubmit = () => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/v1/auth/register",
      data: {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      }
    }).then(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  };*/

  render() {
    return (
      <Fragment>
        <div className="auth-bloc-container flex fdc aic jcfs">
          {" "}
          <input
            placeholder="Password"
            type="password"
            onChange={this.handleChangePassword}
          />
          <input
            placeholder="Repeat Password"
            type="password"
            onChange={this.handleChangeConfirmPassword}
          />
          <Button
            className={"Auth-button flex aic jcc"}
            onClick={this.onUserRegister}
          >
            <h5>Complete my profile</h5>
          </Button>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  return { authUser };
};
withRouter(
  connect(mapStateToProps, {
    registerSimpleUser,
  })
)(JoinCompanySecondStep);
