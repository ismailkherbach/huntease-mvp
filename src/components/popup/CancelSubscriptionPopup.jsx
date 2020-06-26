import React from "react";
import { Button } from "reactstrap";
import "boxicons";
import { connect } from "react-redux";
import { cancelSubscription } from "../../redux/actions";

class CancelSubscriptionPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      user: JSON.parse(localStorage.getItem("user")),
      secondStep: false,
      success: false,
    };
  }

  onCancelSubscription() {
    this.props.cancelSubscription();
  }

  render() {
    return (
      <div className="popup-container flex aic jcc">
        <div className="canceSubscriptionPopup flex fdc aic jcc">
          <h4>Are you sure you want to cancel your subscription? </h4>
          <p>Your team will no longer be able to use this workspace.</p>
          <Button
            className="Change-profile-btn flex aic jcc"
            onClick={this.props.closePopup}
          >
            Keep my plan
          </Button>
          <Button
            className="Change-profile-btn decline flex aic jcc"
            onClick={this.onCancelSubscription.bind(this)}
          >
            Cancel my plan
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ payment }) => {
  return {
    payment,
  };
};

export default connect(mapStateToProps, {
  cancelSubscription,
})(CancelSubscriptionPopup);
