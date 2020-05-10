import React from "react";
import { Button } from "reactstrap";
import "boxicons";
class SchedulesPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emptySchedule: false,
      addSchedule: false,
    };
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleBackClick() {
    this.setState({ addSchedule: !this.state.addSchedule });
  }
  render() {
    return (
      <div className="popup-scheduls">
        <div className="popup_inner-scheduls">
          {!this.state.addSchedule && (
            <div>
              {" "}
              <div className="float-right mr-3 mt-3">
                <img
                  onClick={this.handleBackClick}
                  alt="avatar"
                  src={require("../../assets/img/add_schedule.png")}
                />
              </div>
              <h4>Schedules</h4>
              <div className="inlineBtn-col-left ml-4">
                <div className="schedule-list">
                  <img
                    alt="avatar"
                    src={require("../../assets/img/female-icon.png")}
                  />

                  <p>Andreea Coleman</p>
                  <div id="edit" className="inlineBtn-center">
                    <box-icon name="pencil" color="#0026bc"></box-icon>
                  </div>
                </div>
                <div className="schedule-list">
                  <img
                    alt="avatar"
                    src={require("../../assets/img/female-icon.png")}
                  />

                  <p>Andreea Coleman</p>
                  <div id="edit" className="inlineBtn-center">
                    <box-icon name="pencil" color="#0026bc"></box-icon>
                  </div>
                </div>
                <div className="schedule-list">
                  <img
                    alt="avatar"
                    src={require("../../assets/img/female-icon.png")}
                  />
                  <p>Andreea Coleman</p>
                  <div id="edit" className="inlineBtn-center">
                    <box-icon name="pencil" color="#0026bc"></box-icon>
                  </div>
                </div>
              </div>
              <div className="inlineBtn-col-center">
                <Button className="add-schedule-btn">Confim changes</Button>
              </div>
            </div>
          )}{" "}
          {this.state.addSchedule && (
            <div>
              <div className="inlineBtn-left pl-3 pt-3">
                <box-icon
                  onClick={this.handleBackClick}
                  name="left-arrow-alt"
                  type="logo"
                  color="#091ad4"
                ></box-icon>
                <h5>Add a schedule</h5>
              </div>
              <div className="inlineBtn-col-center">
                <div className="inlinBtn-col-center">
                  <div id="field-top">Calendar owner</div>

                  <input
                    className="profile-input"
                    placeholder=""
                    type="text"
                    onChange={this.handleChangeEmail}
                  />
                </div>
                <div className="inlinBtn-col-center">
                  <div id="field-top">Calendar link</div>

                  <input
                    className="profile-input"
                    placeholder=""
                    type="text"
                    onChange={this.handleChangeEmail}
                  />
                </div>
                <Button className="add-schedule-btn">Confim changes</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SchedulesPopup;
