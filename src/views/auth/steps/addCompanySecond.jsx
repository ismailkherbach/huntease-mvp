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

class AddCompanySecondStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberCount: "20",
      industry: "Tech",
      userData: {},
      secondStepStatus: false,
    };

    this.handleChangeIndustry = this.handleChangeIndustry.bind(this);
    this.handleChangeMemberCount = this.handleChangeMemberCount.bind(this);
  }

  handleChangeMemberCount(e) {
    this.setState({ memberCount: e.target.value });
  }
  handleChangeIndustry(e) {
    this.setState({ industry: e.target.value });
  }

  onUserRegister = () => {
    console.log(this.props.userData);
    //this.props.registerUser(user, this.props.history);
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
          <Btn class={"btn-get-started"} onClick={this.onUserRegister}>
            <div className="btn-get-started-text" onClick={this.onUserRegister}>
              Access my account
            </div>
          </Btn>
        </div>
      </Fragment>
    );
  }
}

export default AddCompanySecondStep;
