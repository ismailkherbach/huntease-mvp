import React, { Fragment } from "react";

import { Row, Col } from "reactstrap";
import { NotificationManager } from "../../common/react-notifications";
import styled from "styled-components";
import Subscribed from "./subsciption/Subscribed";
import ChoosePlan from "./subsciption/ChoosePlan";

const Wrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  svg {
    width: 100%;
    polygon {
      fill: #f2f2f2;
    }
    polyline {
      stroke: #777;
      stroke-width: 2.5;
      fill: none;
    }
  }
`;
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
