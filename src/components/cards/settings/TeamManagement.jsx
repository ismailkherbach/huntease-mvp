import React, { Fragment } from "react";
import { Row, Col, Input, Button } from "reactstrap";
import Terms from "./Terms";
import Helps from "./Helps";

class TeamManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
              />
              <input
                className="member-input"
                placeholder="Last name"
                type="text"
              />{" "}
              <input
                className="email-input"
                placeholder="email name"
                type="text"
              />
              <input
                className="email-input"
                placeholder="@huntease.io"
                type="text"
              />{" "}
              <Button className="send-invite">Send this invite</Button>
            </div>
          </div>
        </Row>
      </Fragment>
    );
  }
}
export default TeamManagement;
