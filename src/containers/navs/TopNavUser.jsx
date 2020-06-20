import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
export default class TopNavUser extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonText: "Sign in",
    };
  }
  render() {
    return (
      <div className="topnav">
        <Link to={"/user/login"}>
          <img
            alt={"logo"}
            className="login-logo"
            src={require("../../assets/img/huntease_logo_line_white.png")}
          />
        </Link>
      </div>
    );
  }
}
