import React from "react";
import { Button } from "reactstrap";
import "boxicons";
class IntegrationHubspotPopup extends React.Component {
  render() {
    return (
      <div className="popup-integration">
        <div className="popup_inner-integration">
          <h4 className="float-right" onClick={this.props.closePopup}>
            x
          </h4>

          <h4>Hubspot integration</h4>
          <div className="inlineBtn-left ml-4">
            <img
              alt={"hubspot"}
              src={require("../../assets/img/hubspot.svg")}
            />
            <div className="inlinetBtn-center mt-3">
              <h5>Hubspot</h5>
              <p>Hubspot</p>
            </div>
          </div>
          <div className="inlineBtn-center">
            <input
              className="auth-input-large"
              placeholder="API KEY"
              type="text"
              onChange={this.handleChangeEmail}
            />
          </div>
          <div className="inlineBtn-col-center">
            <Button className="confirm-btn">Integrate</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default IntegrationHubspotPopup;
