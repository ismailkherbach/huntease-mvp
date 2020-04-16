import React, { Fragment } from "react";
import { Col, Row, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions";
import Btn from "../../components/small.componenets/Btn";

import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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

  onUserLogin = () => {
    this.props.loginUser(this.state, this.props.history);
  };

  render() {
    return (
      <Fragment>
        <main className="auth-container-align">
          <div className="auth-container">
            {" "}
            <h3 className="btn-get-started-textt">Welcome Back!</h3>
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
              <div className="btn-get-started-text" onClick={this.onUserLogin}>
                Login
              </div>
            </Btn>
            <div className="condition-term">
              <Link
               
                to={"/user/forgot-password"}
              >
                <p>Forgot your password ?</p>
              </Link>
            </div>
          </div>
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(mapStateToProps, {
  loginUser
})(Login);
