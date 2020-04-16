import React, { Fragment } from "react";
import { Row, Col, Input } from "reactstrap";
import Terms from "./Terms";
import Helps from "./Helps";

class PrivacySetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(localStorage.getItem("user_id"))
    };
  }
  render() {
    return (
      <Fragment>
        <Row>
          <div id="settings-card"></div>
        </Row>
      </Fragment>
    );
  }
}
export default PrivacySetting;
