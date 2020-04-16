import React, { Fragment } from "react";
import { Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Btn from "../../components/small.componenets/Btn";

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
<main className="auth-container-align">
  <div className="auth-container">
    {" "}
    <h3 className="btn-get-started-textt">Reset your password</h3>
    <input
      className="auth-input-large"
      placeholder="Work Email"
      type="text"
      onChange={this.handleChangeEmail}
    />

    <Btn class={"btn-get-started"} onClick={this.onUserLogin}>
      <div className="btn-get-started-text" onClick={this.onUserLogin}>
        Reset your password
      </div>
    </Btn>
    <div className="condition-term">
    <Link
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
