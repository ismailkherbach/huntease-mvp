import React, { Fragment } from "react";
import Btn from "../../small.componenets/Btn";
import { Button } from "reactstrap";
import ChooseGuidePopup from "../../popup/ChooseGuidePopup";

class ScriptCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      withoutGuide: false,
    };
  }
  toggleWithoutGuide() {
    this.setState({ withoutGuide: true, showPopup: false });
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
      withoutGuide: false,
    });
  }
  render() {
    return (
      <Fragment>
        {this.state.showPopup ? (
          <ChooseGuidePopup
            text='Click "Close Button" to hide popup'
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}
        <div id="calls-card">
          <div className="inlineBtn-left">
            <Button
              className={
                this.state.withoutGuide ? "btn-clicked" : "btn-unclicked"
              }
              onClick={this.togglePopup.bind(this)}
            >
              <box-icon
                name="notepad"
                type="solid"
                color={this.state.withoutGuide ? "#8BA3FF" : "#254ebe"}
              ></box-icon>
              <h3
                className={
                  this.state.withoutGuide
                    ? "btn-text-clicked"
                    : "btn-text-unclicked"
                }
              >
                Choose a guide
              </h3>
            </Button>
            <Button
              className={
                this.state.withoutGuide ? "btn-unclicked" : "btn-clicked"
              }
              onClick={this.toggleWithoutGuide.bind(this)}
            >
              <box-icon
                name="note"
                type="solid"
                color={this.state.withoutGuide ? "#254ebe" : "#8BA3FF"}
              ></box-icon>
              <h3
                className={
                  this.state.withoutGuide
                    ? "btn-text-unclicked"
                    : "btn-text-clicked"
                }
              >
                Continue without guide
              </h3>
            </Button>
          </div>
          <div className="notes inlineBtn-col-center">
            {this.state.withoutGuide && (
              <input
                className="notes-text-area"
                placeholder="Notes"
                type="text"
              />
            )}
          </div>{" "}
          <div className="guide-response inlineBtn-col-center">
            {!this.state.withoutGuide && (
              <input
                className="guide-response-text-area"
                placeholder="Guide response"
                type="text"
              />
            )}
          </div>{" "}
          <div className="inlineBtn-col-center">
            <Button className="confirm-btn">Book a meeting</Button>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default ScriptCard;
