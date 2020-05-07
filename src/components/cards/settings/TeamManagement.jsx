import React, { Fragment } from "react";
import { Row, Col, Input, Button, Table } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { connect } from "react-redux";
import { addTeam } from "../../../redux/actions";
import "boxicons";

class TeamManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeFirst = this.handleChangeFirst.bind(this);
    this.handleChangeLast = this.handleChangeLast.bind(this);
  }

  handleChangeFirst(e) {
    this.setState({
      firstname: e.target.value,
    });
  }
  handleChangeLast(e) {
    this.setState({
      lastname: e.target.value,
    });
  }
  handleChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onAddMember = () => {
    let member = this.state;
    let emailPro = member.lastname + "@hunteas.io";
    console.log(member);
    this.props.addTeam(this.state);
  };
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
                placeholder="@huntease.io"
                type="text"
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
                  <Row>
                    <Col>
                      <div className="inlineBtn-left-center">
                        <img
                          alt={"avatar"}
                          src={require("../../../assets/img/0.jpeg")}
                        />
                        <p>Ismail kherbach</p>
                      </div>{" "}
                    </Col>
                    <Col>
                      <h4>Pro</h4>
                    </Col>
                    <Col>
                      <h4>Active</h4>
                    </Col>
                    <Col>
                      <div id="edit" className="inlineBtn-center">
                        <box-icon name="pencil" color="#0026bc"></box-icon>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="inlineBtn-left-center">
                        <img
                          alt={"avatar"}
                          src={require("../../../assets/img/0.jpeg")}
                        />
                        <p>Ismail kherbach</p>
                      </div>{" "}
                    </Col>
                    <Col>
                      <h4>Pro</h4>
                    </Col>
                    <Col>
                      <h4>Active</h4>
                    </Col>
                    <Col>
                      <div id="edit" className="inlineBtn-center">
                        <box-icon name="pencil" color="#0026bc"></box-icon>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <div className="inlineBtn-left-center">
                        <img
                          alt={"avatar"}
                          src={require("../../../assets/img/0.jpeg")}
                        />
                        <p>Ismail kherbach</p>
                      </div>{" "}
                    </Col>
                    <Col>
                      <h4>Pro</h4>
                    </Col>
                    <Col>
                      <h4>Active</h4>
                    </Col>
                    <Col>
                      <div id="edit" className="inlineBtn-center">
                        <box-icon name="pencil" color="#0026bc"></box-icon>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="inlineBtn-left-center">
                        <img
                          alt={"avatar"}
                          src={require("../../../assets/img/0.jpeg")}
                        />
                        <p>Ismail kherbach</p>
                      </div>{" "}
                    </Col>
                    <Col>
                      <h4>Pro</h4>
                    </Col>
                    <Col>
                      <p id="invitation-sent">Invitation sent</p>
                    </Col>
                    <Col>
                      <div id="edit" className="inlineBtn-center">
                        <box-icon name="pencil" color="#0026bc"></box-icon>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="inlineBtn-left-center">
                        <img
                          alt={"avatar"}
                          src={require("../../../assets/img/0.jpeg")}
                        />
                        <p>Ismail kherbach previously kherbach haja</p>
                      </div>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                      <Button id="accept">Approuve</Button>
                      <Button id="decline">Decline</Button>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <div className="inlineBtn-left-center">
                        <img
                          alt={"avatar"}
                          src={require("../../../assets/img/0.jpeg")}
                        />
                        <p>Ismail kherbach</p>
                      </div>{" "}
                    </Col>
                    <Col>
                      <h4>Pro</h4>
                    </Col>
                    <Col>
                      <h4>Active</h4>
                    </Col>
                    <Col>
                      <div id="edit" className="inlineBtn-center">
                        <box-icon name="pencil" color="#0026bc"></box-icon>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="inlineBtn-left-center">
                        <img
                          alt={"avatar"}
                          src={require("../../../assets/img/0.jpeg")}
                        />
                        <p>Ismail kherbach</p>
                      </div>{" "}
                    </Col>
                    <Col>
                      <h4>Pro</h4>
                    </Col>
                    <Col>
                      <h4>Active</h4>
                    </Col>
                    <Col>
                      <div id="edit" className="inlineBtn-center">
                        <box-icon name="pencil" color="#0026bc"></box-icon>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <div className="inlineBtn-left-center">
                        <img
                          alt={"avatar"}
                          src={require("../../../assets/img/0.jpeg")}
                        />
                        <p>Ismail kherbach</p>
                      </div>{" "}
                    </Col>
                    <Col>
                      <h4>Pro</h4>
                    </Col>
                    <Col>
                      <p id="invitation-sent">Invitation sent</p>
                    </Col>
                    <Col>
                      <div id="edit" className="inlineBtn-center">
                        <box-icon name="pencil" color="#0026bc"></box-icon>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="inlineBtn-left-center">
                        <img
                          alt={"avatar"}
                          src={require("../../../assets/img/0.jpeg")}
                        />
                        <p>Ismail kherbach previously kherbach haja</p>
                      </div>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                    <Col>
                      <Button id="accept">Approuve</Button>
                      <Button id="decline">Decline</Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </PerfectScrollbar>
          </div>
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ team }) => {
  const { member, loading } = team;
  return { member, loading };
};

export default connect(mapStateToProps, {
  addTeam,
})(TeamManagement);
