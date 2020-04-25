import React, { Fragment } from "react";

import { Row, Col } from "reactstrap";

class SubscriptionContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(localStorage.getItem("user_id")),
    };
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col>
            <div id="settings-card" className="no-gutters mx-0"></div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default SubscriptionContent;
