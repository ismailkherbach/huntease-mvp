import React, { Fragment } from "react";
import Btn from "../../small.componenets/Btn";
import { Button, Input } from "reactstrap";
import ChooseGuidePopup from "../../popup/ChooseGuidePopup";
import { connect } from "react-redux";
import { getGuide } from "../../../redux/actions";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import SchedulesPopup from "../../popup/SchedulesPopup";

class ScriptCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      withoutGuide: false,
      schedulePopup: false,
      guide: null,
      result: false,
      checked: false,
      responses: [{ response: "" }],
    };
  }
  toggleWithoutGuide() {
    this.setState({ withoutGuide: true, showPopup: false });
  }
  toggleSchedule() {
    this.setState({
      schedulePopup: !this.state.schedulePopup,
      showPopup: false,
    });
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
      withoutGuide: false,
      schedulePopup: false,
    });
  }
  handleChangeResponse(i, event) {
    let responses = [...this.state.responses];
    responses[i] = event.target.value;
    this.setState({ responses });
    console.log(this.state.responses);
  }

  addClick(i) {
    for (let j = 0; j < i; j++) {
      this.setState((prevState) => ({
        responses: [...prevState.responses, { response: "" }],
      }));
    }
  }
  guideCallback(guide) {
    this.setState({ guide: guide }, console.log(this.state.guide));
    this.addClick(guide.length);
  }
  componentDidMount() {
    this.props.getGuide();
    console.log(this.props.guide.guides);
    if (this.props.guide.guides) {
      if (this.props.guide.guides.length != 0) {
        this.setState({ guide: this.props.guide.guides[0] });
      }
    }
  }
  componentDidUpdate() {
    if (this.props.call.callEnded && !this.state.checked) {
      this.setState({ result: true, checked: true });
      console.log("hidhfsdjfhdskjfhsjkd");
    }
  }
  render() {
    return (
      <Fragment>
        {this.state.showPopup ? (
          <div className="popup-chooseGuide">
            <div className="popup_inner-chooseGuide">
              <h4 className="float-right" onClick={this.togglePopup.bind(this)}>
                x
              </h4>

              <h4>Choose Guide</h4>
              {this.props.guide.guides.length != 0 &&
                this.props.guide.guides.map((guide, x) => {
                  return (
                    <div className="inlineBtn-col-left ml-4">
                      <div
                        className="historyCard"
                        onClick={this.guideCallback.bind(this, guide)}
                      >
                        <box-icon
                          name="notepad"
                          type="solid"
                          color="#091ad4"
                        ></box-icon>
                        <p>{guide.title}</p>{" "}
                      </div>
                    </div>
                  );
                })}

              {this.props.guide.guides.length == 0 && (
                <div className="inlineBtn-col-center mt-5">
                  <img
                    className="empty-guide mt-5"
                    alt="no-guide"
                    src={require("../../../assets/img/no_guide.png")}
                  />
                  <p className="empty-text mt-3">
                    You don't have guides click on add guide to create one
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : null}

        <div id="calls-card">
          {!this.state.result &&
            this.props.guide.guides &&
            this.props.guide.guides.length != 0 && (
              <div>
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
                    <Input
                      className="notes-text-area"
                      placeholder="Notes"
                      type="textarea"
                      name="text"
                    />
                  )}
                </div>{" "}
                <div className="guide-response inlineBtn-col-center">
                  {!this.state.result &&
                  !this.state.withoutGuide &&
                  !this.state.guide &&
                  this.props.guide.guides.length != 0 ? (
                    <div>
                      <h3>{this.props.guide.guides[0].title}</h3>
                      {this.props.guide.guides[0].questions.map(
                        (question, x) => {
                          return (
                            <div>
                              <h5>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: question,
                                  }}
                                />
                              </h5>
                              <input
                                key={x}
                                className="guide-response-text-area"
                                placeholder="Guide response"
                                type="text"
                                onChange={this.handleChangeResponse.bind(
                                  this,
                                  x
                                )}
                              />
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : null}
                </div>
                <div className="guide-response inlineBtn-col-center">
                  {!this.state.withoutGuide && this.state.guide ? (
                    <div>
                      <h3>{this.state.guide.title}</h3>
                      {this.state.guide.questions.map((question, x) => {
                        return (
                          <div>
                            <h5>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: question,
                                }}
                              />
                            </h5>
                            <input
                              key={x}
                              className="guide-response-text-area"
                              placeholder="Guide response"
                              type="text"
                              onChange={this.handleChangeResponse.bind(this, x)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            )}

          <div className="inlineBtn-col-center">
            {this.state.schedulePopup ? (
              <SchedulesPopup
                text='Click "Close Button" to hide popup'
                closePopup={this.toggleSchedule.bind(this)}
              />
            ) : null}
          </div>
          {!this.state.result && this.props.guide.guides ? (
            <div>
              {this.props.guide.guides.length == 0 && !this.state.withoutGuide && (
                <div className="inlineBtn-col-center mt-5">
                  <img
                    className="empty-guide mt-5"
                    alt="no-guide"
                    src={require("../../../assets/img/no_guide.png")}
                  />
                  <p className="empty-text mt-3">
                    You don't have guides click on add guide to create one
                  </p>

                  <Button
                    className="btn-unclicked"
                    onClick={this.toggleWithoutGuide.bind(this)}
                  >
                    Continue without guide
                  </Button>
                </div>
              )}
              <div className="inlineBtn-center">
                <Button
                  onClick={this.toggleSchedule.bind(this)}
                  className="confirm-btn"
                >
                  Book a meeting
                </Button>
              </div>
            </div>
          ) : (
            ""
          )}

          {this.state.result && (
            <div className="res-guide ">
              <PerfectScrollbar>
                <div className="scroll-guide-result">
                  <div className="guide-result">
                    <h3 id="card-title">Guide N°1</h3>
                    <p>Question 1</p>
                    <h4>Did you book a meeting with Sara?</h4> <p>Question 1</p>
                    <h4>Did you book a meeting with Sara?</h4> <p>Question 1</p>
                    <h4>Did you book a meeting with Sara?</h4> <p>Question 1</p>
                    <h4>Did you book a meeting with Sara?</h4> <p>Question 1</p>
                    <h4>Did you book a meeting with Sara?</h4> <p>Question 1</p>
                    <h4>Did you book a meeting with Sara?</h4> <p>Question 1</p>
                    <h4>Did you book a meeting with Sara?</h4>
                    <p> {this.props.call.callEnded ? "Ended" : "On call"}</p>
                  </div>
                </div>
              </PerfectScrollbar>

              <div className="inlineBtn-center">
                <div className="inlineBtn-col-center meeting-verification">
                  <h3>Did you book a meeting with Sara?</h3>
                  <div>
                    <Button id="accept">Yes</Button>
                    <Button id="decline">No</Button>
                  </div>
                </div>
              </div>

              <div className="inlineBtn-center">
                <Button
                  onClick={this.toggleSchedule.bind(this)}
                  className="guideRes"
                >
                  Book a meeting
                </Button>

                <Button
                  onClick={this.toggleSchedule.bind(this)}
                  className="guideRes"
                >
                  Looks good
                </Button>
              </div>
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = ({ call, guide }) => {
  return {
    call,
    guide,
  };
};

export default connect(mapStateToProps, {
  getGuide,
})(ScriptCard);

/*
 <div className="inlineBtn-col-center mt-5">
                      <img
                        className="empty-guide mt-5"
                        alt="no-guide"
                        src={require("../../../assets/img/no_guide.png")}
                      />
                      <h3 className="empty-text mt-3">
                        You don't have guides click on add guide to create one
                      </h3>
                      <p> {this.props.call.callEnded ? "Ended" : "On call"}</p>
                    </div>
*/
