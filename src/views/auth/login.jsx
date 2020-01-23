import React, { Fragment } from "react";
import { Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginButton: true
    };
  }
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
              />
            </Col>{" "}
            <Col>
              <input
                className="auth-input"
                placeholder="Paasword"
                type="text"
              />
            </Col>
            <Button
              className="btn-get-started"
              style={{
                backgroundColor: "#ffc371",
                border: "none",
                borderRadius: "15px"
              }}
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
