import React, { Fragment } from "react";
import { Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
export default class FotgotPassword extends React.Component {
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
          <div className="auth-container ">
            <h3 className="signin-text">Recover your password</h3>
            <h4> Enter the email you're using for your account.</h4>
            <Col>
              <input
                className="auth-input"
                placeholder="Work Email"
                type="text"
              />
            </Col>{" "}
            <Button
              className="btn-get-started"
              style={{
                backgroundColor: "#ffc371",
                border: "none",
                borderRadius: "15px"
              }}
            >
              <div className="btn-get-started-text">Continue</div>
            </Button>
            <div className="condition-term">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={"/user/login"}
              >
                <p>Go back to Sign in</p>
              </Link>
            </div>
          </div>
        </main>
      </Fragment>
    );
  }
}
