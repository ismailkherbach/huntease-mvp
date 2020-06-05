import React, { Fragment } from "react";

import { Row, Col } from "reactstrap";
import { NotificationManager } from "../../common/react-notifications";
import styled from "styled-components";
import Subscribed from "./subsciption/Subscribed";
import ChoosePlan from "./subsciption/ChoosePlan";

class SubscriptionContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <div
          id="subscription-card"
          className="no-gutters mx-0 inlineBtn-col-center-top "
        >
          <ChoosePlan />
        </div>
      </Fragment>
    );
  }
}

export default SubscriptionContent;
