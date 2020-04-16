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
  Dropdown
} from "reactstrap";
import Btn from "../../../components/small.componenets/Btn";
import axios from "axios";




class JoinCompanySecondStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      secondStepStatus: false
    };

    this.handleChangeFirst = this.handleChangeFirst.bind(this);
    this.handleChangeLast = this.handleChangeLast.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleChangeFirst(e) {
    this.setState({ firstname: e.target.value });
  }
  handleChangeLast(e) {
    this.setState({ lastname: e.target.value });
  }
  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onUserRegister = () => {
    this.props.registerUser(this.state, this.props.history);
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
        
       
            <div className="auth-container">
              {" "}
        
              <input
                className="auth-input-large"
                placeholder="Password"
                type="password"
                onChange={this.handleChangePassword}
              />
              <input
                className="auth-input-large"
                placeholder="Repeat Password"
                type="password"
                onChange={this.handleChangePassword}
              />
              <Btn class={"btn-get-started"} onClick={this.onUserLogin}>
                <div className="btn-get-started-text">Complete my profile</div>
              </Btn>
            </div>
        </Fragment>
  );
  }
}



export default JoinCompanySecondStep

