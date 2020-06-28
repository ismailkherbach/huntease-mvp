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
          <div className="topBloc flex fdr aic jcfs">
            <h3>Change password</h3>
            <img
              className="curs_pointer"
              onClick={this.props.closePopup}
              src={require("../../assets/img/bx-x.svg")}
            />
          </div>

          <div className="fdc flex aifs jcfs margin-top25">
            <h5>Current password</h5>

            <input
              className="profile-input"
              placeholder=""
              type="password"
              onChange={this.handleChangeOld.bind(this)}
            />
          </div>
          <div className="fdc flex aifs jcfs">
            <h5>New password</h5>
            <input
              className="profile-input"
              placeholder=""
              type="password"
              onChange={this.handleChangeNew.bind(this)}
            />
          </div>
          <div className="fdc flex aifs jcfs">
            <h5>Confirm password</h5>
            <input
              className="profile-input"
              placeholder=""
              type="password"
              onChange={this.handleChangeNew.bind(this)}
            />
          </div>

          <Button
            onClick={this.onUpdatePassword.bind(this)}
            className="Change-profile-btn"
          >
            Confim changes
          </Button>
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
