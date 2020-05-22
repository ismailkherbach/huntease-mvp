import React from "react";
import { Button } from "reactstrap";
import "boxicons";
class UploadPicturePopup extends React.Component {
  render() {
    return (
      <div className="popup-chooseGuide">
        <div className="popup_inner-chooseGuide">
          <h4 className="float-right" onClick={this.props.closePopup}>
            x
          </h4>

          <h4>Choose Guide</h4>
          <div className="inlineBtn-col-left ml-4">
            <div className="historyCard">
              <box-icon name="notepad" type="solid" color="#091ad4"></box-icon>

              <p>Guide N°01</p>
            </div>
            <div className="historyCard">
              <box-icon name="notepad" type="solid" color="#091ad4"></box-icon>

              <p>Guide N°02</p>
            </div>
            <div className="historyCard">
              <box-icon name="notepad" type="solid" color="#091ad4"></box-icon>
              <p>Guide N°03</p>
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

export default UploadPicturePopup;
