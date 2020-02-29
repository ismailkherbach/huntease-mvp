import React, { Fragment } from "react";
import IntlMessages from "../../../helpers/IntlMessages";
import { connect } from "react-redux";
import { addTeamMember } from "../../../redux/actions";
import { Input, Col } from "reactstrap";
class AddTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", form: false };
  }

  addTeamMember = async () => {
    const teamMember = {
      email: this.state.email
    };
    this.props.addTeamMember(teamMember);
    this.setState({ email: "" });
  };

  changeState = () => {
    this.setState({ form: !this.state.form });
  };
  render() {
    return (
      <Fragment>
        <div id="top-weekly-performers">
          <h1 id="card-title">
            {" "}
            <IntlMessages id="topweeklyperformers" />
          </h1>

          {this.state.form ? (
            <div className="mt-4">
              <div className="inlineBtn-center">
                <Input
                  id="field"
                  type="text"
                  defaultValue={this.state.email}
                  onChange={event => {
                    this.setState({ email: event.target.value });
                  }}
                />
                <div
                  id="send_team"
                  className="ml-2"
                  onClick={() => this.addTeamMember()}
                >
                  <img
                    alt="send"
                    src={require("../../../assets/img/send_team.png")}
                  />
                </div>
              </div>
              <div className="inlineBtn-center">
                <Input
                  id="field"
                  type="text"
                  defaultValue={this.state.email}
                  onChange={event => {
                    this.setState({ email: event.target.value });
                  }}
                />
                <div
                  id="send_team"
                  className="ml-2"
                  onClick={() => this.addTeamMember()}
                >
                  <img
                    alt="send"
                    src={require("../../../assets/img/send_team.png")}
                  />
                </div>
              </div>
              <div className="inlineBtn-center">
                <Input
                  id="field"
                  type="text"
                  defaultValue={this.state.email}
                  onChange={event => {
                    this.setState({ email: event.target.value });
                  }}
                />
                <div
                  id="send_team"
                  className="ml-2"
                  onClick={() => this.addTeamMember()}
                >
                  <img
                    alt="send"
                    src={require("../../../assets/img/send_team.png")}
                  />
                </div>
              </div>
              <div className="inlineBtn-col-center mt-2">
                <p id="btn-dark" onClick={this.changeState}>
                  Done
                </p>
              </div>
            </div>
          ) : (
            <div className="inlineBtn-col-center">
              <img
                alt={"shape"}
                className="shape"
                src={require("../../../assets/img/shapeteam.svg")}
              />
              <h3>
                Invite your teammate to view the top weekly performers amongst
                your team !
              </h3>
              <p id="btn-dark" onClick={this.changeState}>
                Add your team
              </p>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ dashboard }) => {
  return {
    dashboard
  };
};
export default connect(mapStateToProps, {
  addTeamMember
})(AddTeam);
