import React, { Fragment } from "react";
import { Row, Col } from "reactstrap";
import SubscriptionContent from "../../../components/cards/settings/Subscription";
export default class Subscription extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="Subscription">
          <SubscriptionContent />
        </div>
      </Fragment>
    );
  }
}
