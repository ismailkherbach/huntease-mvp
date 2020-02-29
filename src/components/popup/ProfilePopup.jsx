import React from "react";

class ProfilePopup extends React.Component {
  render() {
    return (
      <div className="popup-profile">
        <div className="popup_inner-profile">
          <div className="top-profile">
            <h4 className="float-right" onClick={this.props.closePopup}>
              x
            </h4>
            <img
              alt="profile-avatar"
              src={require("../../assets/img/0.jpeg")}
            />
            <h3>Ismail kherbach</h3>
            <h4>Designer</h4>
          </div>
          <div className="middle-profile">
            <div className="inlineBtn-left">
              <img
                id="icon"
                alt="profile-icon"
                src={require("../../assets/img/profile-icon.png")}
              />
              <h4>Weekly score:</h4>
            </div>
            <h2>655 points</h2>
            <div className="inlineBtn-left">
              <img
                id="icon"
                alt="profile-icon"
                src={require("../../assets/img/icon-profile-badge.png")}
              />
              <h4>Badges:</h4>
            </div>
            <img
              alt="profile-avatar"
              src={require("../../assets/img/profile-badge.png")}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePopup;
