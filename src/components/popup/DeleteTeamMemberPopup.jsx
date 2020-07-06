import React from "react";
import { Button } from "reactstrap";
import "boxicons";
import { connect } from "react-redux";
import { deleteTeam } from "../../redux/actions";
import { Link, withRouter } from "react-router-dom";

class DeleteTeamMemberPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      user: JSON.parse(localStorage.getItem("user")),
      secondStep: false,
      success: false,
      password: "",
    };
  }
  handleChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onDeleteTeamMember() {
    let id = this.props.id;
    let password = this.state.password;
    let history = this.props.history;
    this.props.deleteTeam({ id, password, history });
  }
  render() {
    return (
      <div className="popup-container flex aic jcc">
        <div className="deleteTeamMemberopup flex fdc aic jcc">
          <h4>Confirm delete member</h4>
          <p>Please enter your password</p>
          <input
            placeholder="Enter your password"
            onChange={this.handleChangePassword.bind(this)}
          />
          <div className="flex fdc aic jcc">
            <Button
              className="Change-profile-btn decline flex aic jcc"
              onClick={this.onDeleteTeamMember.bind(this)}
            >
              Delete team member
            </Button>
            <Button
              className="Change-profile-btn flex aic jcc"
              onClick={this.props.closePopup}
            >
              Cancel{" "}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ payment, team }) => {
  return {
    payment,
    team,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    deleteTeam,
  })(DeleteTeamMemberPopup)
);
