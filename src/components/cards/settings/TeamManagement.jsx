import React, { Fragment } from "react";
import {
  Row,
  Col,
  Button,
  Spinner,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import {
  addTeam,
  getTeamMembers,
  changeNameResponse,
} from "../../../redux/actions";
import "boxicons";

class TeamManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newMember: { firstName: "", lastName: "", email: "" },

      domain: "@" + JSON.parse(localStorage.getItem("domain")),
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeFirst = this.handleChangeFirst.bind(this);
    this.handleChangeLast = this.handleChangeLast.bind(this);
  }

  handleChangeFirst(e) {
    this.setState({
      newMember: {
        ...this.state.newMember,
        firstName: e.target.value,
      },
    });
  }
  handleChangeLast(e) {
    this.setState({
      newMember: {
        ...this.state.newMember,
        lastName: e.target.value,
      },
    });
  }
  handleChangeEmail(e) {
    this.setState({
      newMember: {
        ...this.state.newMember,
        email: e.target.value,
      },
    });
  }

  onAddMember = () => {
    console.log(this.state.newMember);
    this.props.addTeam(this.state.newMember);
  };

  onRequestResponse(id, desicion) {
    let changeResponse = { id, desicion };
    this.props.changeNameResponse(changeResponse);
    //console.log(changeResponse);
  }

  componentDidMount() {
    this.props.getTeamMembers();
    console.log(this.props.team.teamMembers);
  }

  render() {
    return (
      <Fragment>
        <div className="AddMember">
          <h3>Add your team members</h3>
          <h5>
            You can add your team members by inviting them to join your company
            profile
          </h5>
          <div className="flex fdr ">
            <input
              placeholder="First name"
              type="text"
              onChange={this.handleChangeFirst}
            />
            <input
              placeholder="Last name"
              type="text"
              onChange={this.handleChangeLast}
            />
            <div className="margin-left30">
              {" "}
              <input
                className="email-input"
                placeholder="email name"
                type="text"
                onChange={this.handleChangeEmail}
              />
              <input
                className="email-input"
                placeholder={this.state.domain}
                type="text"
                disabled
              />{" "}
              <Button onClick={this.onAddMember} className="SendInvite">
                Send this invite
              </Button>
            </div>
          </div>
        </div>
        {
          <div className="TeamListing">
            {this.props.team.loading ? <div className="loading"></div> : null}
            <div className="TeamTable">
              <table>
                <tbody>
                  <tr>
                    <th>MEMBER</th>
                    <th>PLAN</th>
                    <th>STATUS</th>
                    <th>EDIT</th>
                  </tr>
                </tbody>
              </table>
            </div>{" "}
            <PerfectScrollbar>
              <div className="scroll-team">
                <div className="TeamTable">
                  {this.props.team.teamMembers &&
                    this.props.team.teamMembers.map((user) => {
                      return (
                        <div>
                          {user.user.requests.length != 0 &&
                          user.user.requests[user.user.requests.length - 1]
                            .status === "pending" ? (
                            <div className="RequestNameChange">
                              <tr>
                                <td>
                                  <img
                                    alt={"avatar"}
                                    src={require("../../../assets/img/0.jpeg")}
                                  />
                                  <span className="Corange">
                                    {user.user.requests[
                                      user.user.requests.length - 1
                                    ].fields[0].value +
                                      " " +
                                      user.user.requests[
                                        user.user.requests.length - 1
                                      ].fields[1].value}
                                  </span>{" "}
                                  previously
                                  <span className="Cmain">
                                    {" "}
                                    {user.user.firstName +
                                      " " +
                                      user.user.lastName}
                                  </span>
                                </td>
                                <td>
                                  <Button
                                    className="DeclineBtn Accept"
                                    onClick={this.onRequestResponse.bind(
                                      this,
                                      user.user.requests[
                                        user.user.requests.length - 1
                                      ]._id,
                                      "approve"
                                    )}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    className="DeclineBtn"
                                    onClick={this.onRequestResponse.bind(
                                      this,
                                      user.user.requests[
                                        user.user.requests.length - 1
                                      ]._id,
                                      "reject"
                                    )}
                                  >
                                    Decline
                                  </Button>
                                </td>
                              </tr>
                            </div>
                          ) : (
                            <table>
                              <tbody>
                                <tr>
                                  <td>
                                    <span>
                                      {" "}
                                      <img
                                        alt={"avatar"}
                                        src={require("../../../assets/img/0.jpeg")}
                                      />
                                    </span>
                                    {user.user.firstName +
                                      " " +
                                      user.user.lastName}
                                  </td>
                                  <td>Growth</td>
                                  {user.status === "pending" ? (
                                    <td>
                                      <span className="Corange">
                                        Invitation sent
                                      </span>
                                    </td>
                                  ) : (
                                    <td>Active</td>
                                  )}
                                  <td>
                                    {" "}
                                    <UncontrolledDropdown>
                                      <DropdownToggle
                                        color="empty"
                                        className="dropdown-toggle-split"
                                      >
                                        <div
                                          id="edit"
                                          className="inlineBtn-center"
                                        >
                                          <box-icon
                                            name="pencil"
                                            color="#0026bc"
                                          ></box-icon>
                                        </div>
                                      </DropdownToggle>
                                      <DropdownMenu className="btn" right>
                                        <DropdownItem>Edit</DropdownItem>
                                        <DropdownItem>Delete</DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </PerfectScrollbar>
          </div>
        }
      </Fragment>
    );
  }
}
const mapStateToProps = ({ team, authUser }) => {
  return {
    team,
    authUser,
  };
};

export default connect(mapStateToProps, {
  addTeam,
  getTeamMembers,
  changeNameResponse,
})(TeamManagement);
