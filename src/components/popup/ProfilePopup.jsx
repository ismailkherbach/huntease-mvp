import React from "react";

class ProfilePopup extends React.Component {
  render() {
    return (
      <div className="popup-profile">
        <div className="popup\_inner-profile">
          <h1>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}

export default ProfilePopup;
