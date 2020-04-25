import React from "react";
import { Button } from "reactstrap";
import "boxicons";
class SchedulesPopup extends React.Component {
  render() {
    return (
      <div className="popup-scheduls">
        <div className="popup_inner-scheduls">
          <div className="float-right mr-3 mt-3">
            <box-icon
              onClick={this.props.closePopup}
              name="box"
              type="solid"
              color="#0026BC"
            ></box-icon>
          </div>
          <h4>Schedules</h4>
          <div className="inlineBtn-col-left ml-4">
            <div className="historyCard">
              <box-icon name="notepad" type="solid" color="#091ad4"></box-icon>

              <p>Andreea Coleman</p>
            </div>
            <div className="historyCard">
              <box-icon name="notepad" type="solid" color="#091ad4"></box-icon>

              <p>Andreea Coleman</p>
            </div>
            <div className="historyCard">
              <box-icon name="notepad" type="solid" color="#091ad4"></box-icon>
              <p>Andreea Coleman</p>
            </div>
          </div>
          <div className="inlineBtn-col-center">
            <Button className="confirm-btn">Confim changes</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SchedulesPopup;
