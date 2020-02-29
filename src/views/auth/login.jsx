import React, { Fragment } from "react";
import { Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions";
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
        <main>
          <div className="auth-container">
            {" "}
            <h3 className="signin-text">Welcome Back!</h3>
            <Col>
              <input
                className="auth-input"
                placeholder="Work Email"
                type="text"
                onChange={this.handleChangeEmail}
              />
            </Col>{" "}
            <Col>
              <input
                className="auth-input"
                placeholder="Paasword"
                type="password"
                onChange={this.handleChangePassword}
              />
            </Col>
            <Button
              className="btn-get-started"
              style={{
                backgroundColor: "#ffc371",
                border: "none",
                borderRadius: "15px"
              }}
              onClick={this.onUserLogin}
            >
              <div className="btn-get-started-text">Sign in</div>
            </Button>
            <div className="condition-term">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/user/forgot-password"}
              >
                <p>Forgot your password ?</p>
              </Link>

              <p> Or continue with: </p>
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

import { connect } from "react-redux";
import { loginUser } from "../../redux/actions";
