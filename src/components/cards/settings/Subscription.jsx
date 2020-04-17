import React, { Fragment } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import {
  Row,
  Col,
  Input,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button
} from "reactstrap";


class SubscriptionContent extends React.Component {
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
          <Col>
            <div id="settings-card" className="no-gutters mx-0">
        </div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}


export default SubscriptionContent
