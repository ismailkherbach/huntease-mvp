import React from "react";
import { Button } from "reactstrap";

class ChangePassPopup extends React.Component {
  render() {
    return (
      <div className="popup-change-password">
        <div className="popup_inner-change-password">
          <h4 className="float-right" onClick={this.props.closePopup}>
            x
          </h4>

          <h4>Change password</h4>
          <div className="inlineBtn-col-center">
            <div className="inlinBtn-col-center">
              <div id="field-top">Current password</div>

              <input
                className="profile-input"
                placeholder=""
                type="text"
                onChange={this.handleChangeEmail}
              />
            </div>
            <div className="inlinBtn-col-center">
              <div id="field-top">New password</div>

              <input
                className="profile-input"
                placeholder=""
                type="text"
                onChange={this.handleChangeEmail}
              />
            </div>
            <div className="inlinBtn-col-center">
              <div id="field-top">Confirm new password</div>

              <input
                className="profile-input"
                placeholder=""
                type="text"
                onChange={this.handleChangeEmail}
              />
            </div>
            <Button className="confirm-btn">Confim changes</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePassPopup;
