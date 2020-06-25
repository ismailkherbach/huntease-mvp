import React from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { updatePassword } from "../../redux/actions";
class ChangePassPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      old: null,
      new: null,
    };
  }

  handleChangeNew(e) {
    this.setState({
      new: e.target.value,
    });
  }
  handleChangeOld(e) {
    this.setState({
      old: e.target.value,
    });
  }

  onUpdatePassword() {
    let old = this.state.old;
    let newPass = this.state.new;
    this.props.updatePassword({ old, newPass });
  }
  render() {
    return (
      <div className="popup-container flex aic jcc fdc">
        <div className="popup_inner-change-password flex fdc aic jcc">
          <h3>Change password</h3>
          <div className="fdc flex aifs jcfs margin-top25">
            <h5>Current password</h5>

            <input
              className="profile-input"
              placeholder=""
              type="password"
              onChange={this.handleChangeOld.bind(this)}
            />
          </div>
          <h5>New password</h5>
          <input
            className="profile-input"
            placeholder=""
            type="password"
            onChange={this.handleChangeNew.bind(this)}
          />
          <h5>Confirm password</h5>
          <input
            className="profile-input"
            placeholder=""
            type="password"
            onChange={this.handleChangeNew.bind(this)}
          />
          <div className=" flex fdc aic jcc">
            <Button
              onClick={this.onUpdatePassword.bind(this)}
              className="Change-profile-btn"
            >
              Confim changes
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  return {
    settings,
  };
};

export default connect(mapStateToProps, {
  updatePassword,
})(ChangePassPopup);
