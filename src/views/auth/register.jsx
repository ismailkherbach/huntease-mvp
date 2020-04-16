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
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions";
import Btn from "../../components/small.componenets/Btn";
import axios from "axios";

export const secondStepView = props => {
  return (
    <Fragment>
      <main className="auth-container-align">
        <div className="inlineBtn-col-center">
          <Button className="auth-button" onClick={this.onUserLogin}>
            <div className="btn-get-started-text">Add a company</div>
          </Button>

          <Button className="auth-button" onClick={this.onUserLogin}>
            <div className="btn-get-started-text">Join a company</div>
          </Button>
        </div>
        <div className="auth-container">
          {" "}
          <div className="inlineBtn-center">
            <Btn class={"btn-get-started"} onClick={this.onUserLogin}>
              <div className="btn-get-started-text">1</div>
            </Btn>
          </div>
          <div className="inlineBtn-center">
            <input
              className="auth-input"
              placeholder="Work Email"
              type="text"
              onChange={this.handleChangeEmail}
            />

            <input
              className="auth-input"
              placeholder="Paasword"
              type="password"
              onChange={this.handleChangePassword}
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
                <Input type="radio" name="radio1" /> I agree to Huntease Terms
                and Privacy Policy.
              </Label>
            </FormGroup>
          </div>
          <Btn class={"btn-get-started"} onClick={this.onUserLogin}>
            <div className="btn-get-started-text">
              Create your company account
            </div>
          </Btn>
        </div>
      </main>
    </Fragment>
  );
};

export const firstStepView = props => {
  return (
    <Fragment>
      <main className="auth-container-align">
        <div className="inlineBtn-col-center">
          <Button className="auth-button" onClick={this.onUserLogin}>
            <div className="btn-get-started-text">Add a company</div>
          </Button>

          <Button className="auth-button" onClick={this.onUserLogin}>
            <div className="btn-get-started-text">Join a company</div>
          </Button>
        </div>
        <div className="auth-container">
          {" "}
          <div className="inlineBtn-center">
            <input
              className="auth-input"
              placeholder="Work Email"
              type="text"
              onChange={this.handleChangeEmail}
            />

            <input
              className="auth-input"
              placeholder="Paasword"
              type="password"
              onChange={this.handleChangePassword}
            />
          </div>
          <div className="inlineBtn-center">
            <input
              className="auth-input"
              placeholder="Work Email"
              type="text"
              onChange={this.handleChangeEmail}
            />

            <input
              className="auth-input"
              placeholder="Paasword"
              type="password"
              onChange={this.handleChangePassword}
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
                <Input type="radio" name="radio1" /> I agree to Huntease Terms
                and Privacy Policy.
              </Label>
            </FormGroup>
          </div>
          <Btn class={"btn-get-started"} onClick={this.onUserLogin}>
            <div className="btn-get-started-text">
              Create your company account
            </div>
          </Btn>
        </div>
      </main>
    </Fragment>
  );
};
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      secondStepStatus: true
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
      <div>
        <Fragment>
          <main className="auth-container-align">
            <div className="inlineBtn-col-center">
              <Button className="auth-button" onClick={this.onUserLogin}>
                <div className="btn-get-started-text">Add a company</div>
              </Button>

              <Button className="auth-button" onClick={this.onUserLogin}>
                <div className="btn-get-started-text">Join a company</div>
              </Button>
            </div>
            <div className="auth-container">
              {" "}
              <div className="inlineBtn-center">
                <Btn class={"btn-choice-company"} onClick={this.onUserLogin}>
                  <h3>1</h3>
                </Btn>
                <Btn class={"btn-choice-company"} onClick={this.onUserLogin}>
                  <h3>5 - 10</h3>
                </Btn>
                <Btn class={"btn-choice-company"} onClick={this.onUserLogin}>
                  <h3>2 - 6</h3>
                </Btn>
                <Btn class={"btn-choice-company"} onClick={this.onUserLogin}>
                  <h3>10 - 50</h3>
                </Btn>
                <Btn class={"btn-choice-company"} onClick={this.onUserLogin}>
                  <h3>+50</h3>
                </Btn>
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
              <Btn class={"btn-get-started"} onClick={this.onUserLogin}>
                <div className="btn-get-started-text">Access my account</div>
              </Btn>
            </div>
          </main>
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(mapStateToProps, {
  registerUser
})(Register);
