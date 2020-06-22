import React, { Fragment } from "react";

import { Row, Col } from "reactstrap";
import { NotificationManager } from "../../common/react-notifications";
import styled from "styled-components";
import Subscribed from "./subsciption/Subscribed";
import ChoosePlan from "./subsciption/ChoosePlan";
import DND from "./DND";

class SubscriptionContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        {<ChoosePlan />}
        {/*<Subscribed />*/}
        {/*<DND />*/}
      </Fragment>
    );
  }
}

export default SubscriptionContent;
