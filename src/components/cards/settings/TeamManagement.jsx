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
        <Row>
          <div id="settings-card">
            <div className="add-member-container">
              <h3>Add your team members</h3>
              <p>
                You can add your team members by inviting them to join your
                company profile
              </p>{" "}
              <input
                className="member-input"
                placeholder="First name"
                type="text"
                onChange={this.handleChangeFirst}
              />
              <input
                className="member-input"
                placeholder="Last name"
                type="text"
                onChange={this.handleChangeLast}
              />{" "}
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
              <Button onClick={this.onAddMember} className="send-invite">
                Send this invite
              </Button>
            </div>
            <PerfectScrollbar>
              <div className="scroll-team">
                <div className="team-listing ">
                  <Row>
                    <Col>
                      <h4>MEMBER</h4>
                    </Col>
                    <Col>
                      <h4>PLAN</h4>
                    </Col>
                    <Col>
                      <h4>STATUS</h4>
                    </Col>
                    <Col>
                      <h4>EDIT</h4>
                    </Col>
                  </Row>
                  {this.props.team.loading ? (
                    <div className="inlineBtn-center">
                      <Spinner animation="border" />
                    </div>
                  ) : null}
                  {this.props.team.teamMembers &&
                    this.props.team.teamMembers.map((user) => {
                      return (
                        <Row>
                          <Col>
                            <div className="inlineBtn-left-center">
                              <img
                                alt={"avatar"}
                                src={require("../../../assets/img/0.jpeg")}
                              />
                              {user.user.requests.length == 0 ||
                              user.user.requests[1].status == "approved" ? (
                                <div className="inlineBtn-left ml-2">
                                  {" "}
                                  <p>
                                    {user.user.firstName +
                                      " " +
                                      user.user.lastName}
                                  </p>
                                </div>
                              ) : (
                                <div className="inlineBtn-left mx-0 no-gutters ml-3">
                                  <p className="new">
                                    {user.user.requests[1].fields[0].value +
                                      " " +
                                      user.user.requests[1].fields[1].value +
                                      " "}
                                  </p>
                                  <p className="prev ml-1 mr-1">
                                    {" "}
                                    {" Previously "}{" "}
                                  </p>
                                  <p>
                                    {user.user.firstName +
                                      " " +
                                      user.user.lastName}
                                  </p>
                                </div>
                              )}
                            </div>{" "}
                          </Col>
                          {user.user.requests.length == 0 ||
                          user.user.requests[1].status == "approved" ? (
                            <Col>
                              <h5>Pro</h5>
                            </Col>
                          ) : null}
                          {user.user.requests.length == 0 ||
                          user.user.requests[1].status == "approved" ? (
                            <Col>
                              {user.status == "pending" ? (
                                <p id="invitation-sent">Invitation sent</p>
                              ) : (
                                <h5>Active</h5>
                              )}
                            </Col>
                          ) : null}
                          {user.user.requests.length == 0 ||
                          user.user.requests[1].status == "approved" ? (
                            <Col className="inlineBtn-center">
                              <UncontrolledDropdown className="ml-5">
                                <DropdownToggle
                                  color="empty"
                                  className="dropdown-toggle-split"
                                >
                                  <div id="edit" className="inlineBtn-center">
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
                            </Col>
                          ) : (
                            <Col className="inlineBtn-center col-4">
                              <div>
                                <Button
                                  id="accept"
                                  onClick={this.onRequestResponse.bind(
                                    this,
                                    user.user.requests[1]._id,
                                    "approve"
                                  )}
                                >
                                  Approve
                                </Button>
                                <Button
                                  id="decline"
                                  onClick={this.onRequestResponse.bind(
                                    this,
                                    user.user.requests[1]._id,
                                    "reject"
                                  )}
                                >
                                  Decline
                                </Button>
                              </div>
                            </Col>
                          )}
                        </Row>
                      );
                    })}
                </div>
              </div>
            </PerfectScrollbar>
          </div>
        </Row>
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
