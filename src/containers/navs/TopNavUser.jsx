import React from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
export default class TopNavUser extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonText: "Sign in"
    };
  }
  render() {
    return (
      <div>
        <Col>
          <Link to={"/user/login"}>
            <img
              className="login-logo"
              src={require("../../assets/img/huntease_logo_line_white.png")}
            />
            <div className="login-signup-input">{this.state.buttonText}</div>
          </Link>
        </Col>
      </div>
    );
  }
}
