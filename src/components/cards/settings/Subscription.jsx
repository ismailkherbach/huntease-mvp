import React, { Fragment } from "react";

import { Row, Col } from "reactstrap";
import { NotificationManager } from "../../common/react-notifications";
import styled from "styled-components";
import Subscribed from "./subsciption/Subscribed";
import ChoosePlan from "./subsciption/ChoosePlan";
import DND from "./DND";
import { connect } from "react-redux";
import { getProfile } from "../../../redux/actions";
class SubscriptionContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getProfile();
  }
  render() {
    return (
      <Fragment>
        {this.props.profile ? (
          <div>
            {this.props.profile.isPaid ? <Subscribed /> : <ChoosePlan />}
          </div>
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { profile } = settings;
  return {
    profile,
  };
};
export default connect(mapStateToProps, {
  getProfile,
})(SubscriptionContent);
