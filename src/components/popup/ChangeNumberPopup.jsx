import React from "react";
import { Button } from "reactstrap";

class ChangeNumberPopup extends React.Component {
  render() {
    return (
      <div className="popup-change-password">
        <div className="popup_inner-change-password">
          <h4 className="float-right" onClick={this.props.closePopup}>
            x
          </h4>

          <h4>Change Number</h4>
          <div className="inlineBtn-col-center">
            <div className="inlinBtn-col-center">
              <div id="field-top">Phone number</div>

              <input
                className="profile-input"
                placeholder=""
                type="text"
                onChange={this.handleChangeEmail}
              />
            </div>
            <div className="inlinBtn-col-center">
              <div id="field-top">Confirmation code</div>

              <input
                className="profile-input"
                placeholder=""
                type="text"
                onChange={this.handleChangeEmail}
              />
            </div>

            <Button className="confirm-btn">Confim number</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangeNumberPopup;
