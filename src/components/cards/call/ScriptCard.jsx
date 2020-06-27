import React, { Fragment } from "react";
import Btn from "../../small.componenets/Btn";
import { Button, Input } from "reactstrap";
import ChooseGuidePopup from "../../popup/ChooseGuidePopup";
import { connect } from "react-redux";
import { getGuide, getSchedules, addSchedules } from "../../../redux/actions";
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
      responses: [{ propmt: "", response: "" }],
      answers: [],
      meetingBooked: false,
      notesResponse: "",
      emptySchedule: false,
      addSchedule: false,
      link: "",
      name: "",
    };
  }

  toggleBackSchedule() {
    this.setState({
      addSchedule: false,
    });
  }

  toggleAddSchedule() {
    this.setState({
      addSchedule: true,
    });
  }
  handleChangeLink(e) {
    this.setState({ link: e.target.value });
  }
  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }
  toggleWithoutGuide() {
    this.setState({ withoutGuide: true, showPopup: false });
  }
  toggleChooseGuide() {
    this.setState({ withoutGuide: false, showPopup: false });
    this.togglePopup();
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
  meetingsStatus(status) {
    if ((status = true)) {
      this.setState({ meetingBooked: false });
    } else {
      this.setState({ meetingBooked: true });
    }
  }
  handleChangeNotes(e) {
    e.preventDefault();
    this.setState({
      notesResponse: e.target.value,
    });
    console.log(this.state.notesResponse);
  }

  onAddSchedule() {
    let name = this.state.name;
    let link = this.state.link;
    this.props.addSchedules({ name, link });
  }
  extracNote() {
    if (!this.state.withoutGuide) {
      var notes = "";
      let answers = this.state.answers;
      for (let j = 0; j < answers.length; j++) {
        notes =
          notes +
          this.state.guide.questions[answers[j].questionId] +
          "\n" +
          answers[j].answer +
          "\n";
      }
      this.setState(
        { notesResponse: notes, result: true },
        console.log(this.state.notesResponse)
      );
    } else {
      this.setState({ result: true });
    }
    //  this.setState({ result: true });
  }
  handleChangeResponse(i, event) {
    let answers = this.state.answers;
    const id = answers.findIndex((e) => e.questionId == i);
    if (id >= 0) {
      answers[id] = { questionId: i, answer: event.target.value };
    } else answers.push({ questionId: i, answer: event.target.value });

    let responses = [...this.state.responses];

    responses[i] = event.target.value;
    this.setState({ responses, answers });
    console.log(this.state.answers);
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
    this.togglePopup();

    this.addClick(guide.length);
  }
  componentDidMount() {
    this.props.getGuide();
    this.props.getSchedules();
    console.log(this.props.call.schedules);
    if (this.props.guide.guides) {
      if (!this.props.guide.isGuideEmpty) {
        this.setState({ guide: this.props.guide.guides[0] });
        console.log(this.state.guide);
      }
    }
  }
  sendToHubspot() {
    console.log(this.props.call.callSid);
    console.log(this.props.call.leadId);
    console.log(this.state.notesResponse);
    console.log(this.state.meetingBooked);
  }
  componentDidUpdate() {
    if (this.props.guide.guides && this.state.guide === null) {
      if (!this.props.guide.isGuideEmpty) {
        this.setState({ guide: this.props.guide.guides[0] });
        console.log(this.state.guide);
      }
    }
  }
  render() {
    return (
      <Fragment>
        {this.state.showPopup ? (
          <div className="popup-container flex aic jcc fdc">
            <div className="chooseGuidePopup">
              <h3 className="float-right" onClick={this.togglePopup.bind(this)}>
                <img src={require("../../../assets/img/bx-plus.svg")} />
              </h3>

              <h3>Choose Guide</h3>
              <div className="popupInner flex fdc">
                {this.props.guide.guides
                  ? !this.props.guide.isGuideEmpty &&
                    this.props.guide.guides.map((guide, x) => {
                      return (
                        <div
                          className="guidList flex fdr aic"
                          onClick={this.guideCallback.bind(this, guide)}
                        >
                          <img
                            src={require("../../../assets/img/bx-notepad.svg")}
                          />

                          <h5>{guide.title}</h5>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        ) : null}

        <div className="GuideCall">
          {this.props.guide.isGuideEmpty && !this.state.withoutGuide ? (
            <div className="EmptyGuide flex fdc aic jcc">
              <img
                alt="no-guide"
                src={require("../../../assets/img/no_guide.png")}
              />
              <h3>You haven't created any conversational guides yet.</h3>
              <h5>What's a conversational guide?</h5>
              <Button
                onClick={this.toggleWithoutGuide.bind(this)}
                className="integrate-button"
              >
                <img src={require("../../../assets/img/bx-plus.svg")} />
                Continue without guide
              </Button>
            </div>
          ) : (
            ""
          )}

          {this.props.guide.isGuideEmpty && this.state.withoutGuide ? (
            <div className="withoutGuide">
              <h3>Notes</h3>
              <textarea
                type="textarea"
                className="notesArea"
                onChange={(e) => {
                  this.handleChangeNotes(e);
                }}
              />
            </div>
          ) : (
            ""
          )}

          {this.state.result ? (
            <div className="ScriptCallEditor ">
              {this.state.withoutGuide ? (
                <div className="flex fdc aifs jcfs">
                  <h3 className="guideResTitle">Notes</h3>

                  <textarea
                    type="textarea"
                    className="guideResArea"
                    value={this.state.notesResponse}
                    onChange={(e) => {
                      this.handleChangeNotes(e);
                    }}
                  />
                </div>
              ) : (
                <div className="flex fdc aifs jcfs">
                  <h3 className="guideResTitle">{this.state.guide.title}</h3>
                  <PerfectScrollbar>
                    <div className="GuideResponse scroll-callScriptRes">
                      {this.state.answers.map((ans, index) => {
                        return (
                          <div>
                            <h5>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: this.state.guide.questions[
                                    ans.questionId
                                  ],
                                }}
                              />
                            </h5>
                            <h4>{ans.answer}</h4>
                          </div>
                        );
                      })}
                    </div>
                  </PerfectScrollbar>
                </div>
              )}
              <div className="DidyouBook flex aic jcc fdc">
                <h3>Did you book a meeting with Sara?</h3>
                <div className="flex fdr aic jcc">
                  <Button
                    className="Change-profile-btn"
                    onClick={() => {
                      this.meetingsStatus.bind(this, true);
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    className="decline Change-profile-btn"
                    onClick={() => {
                      this.meetingsStatus.bind(this, false);
                    }}
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {" "}
              {this.state.withoutGuide && !this.props.guide.isGuideEmpty && (
                <div className="ScriptCallEditor">
                  <div className="flex fdr aic jcfs">
                    <Button
                      onClick={this.toggleChooseGuide.bind(this)}
                      className={`integrate-button ${!this.state.withoutGuide &&
                        "Clicked"} `}
                    >
                      <img
                        src={require("../../../assets/img/bxs-notepad.svg")}
                      />
                      Choose a guide
                    </Button>
                    <Button
                      onClick={this.toggleWithoutGuide.bind(this)}
                      className={`integrate-button ${this.state.withoutGuide &&
                        "Clicked"} `}
                    >
                      <img src={require("../../../assets/img/bxs-note.svg")} />
                      Continue without guide
                    </Button>
                  </div>
                  <div className="withoutGuide">
                    <h3>Notes</h3>
                    <textarea
                      type="textarea"
                      className="notesArea"
                      onChange={(e) => {
                        this.handleChangeNotes(e);
                      }}
                    />
                  </div>
                </div>
              )}
              {!this.state.withoutGuide && !this.props.guide.isGuideEmpty && (
                <div className="ScriptCallEditor">
                  <div className="flex fdr aic jcfs">
                    <Button
                      onClick={this.toggleChooseGuide.bind(this)}
                      className={`integrate-button ${!this.state.withoutGuide &&
                        "Clicked"} `}
                    >
                      <img
                        src={require("../../../assets/img/bxs-notepad.svg")}
                      />
                      Choose a guide
                    </Button>
                    <Button
                      onClick={this.toggleWithoutGuide.bind(this)}
                      className={`integrate-button ${this.state.withoutGuide &&
                        "Clicked"} `}
                    >
                      <img src={require("../../../assets/img/bxs-note.svg")} />
                      Continue without guide
                    </Button>
                  </div>

                  {this.props.guide.guides && this.state.guide != null ? (
                    <div className="">
                      {this.state.guide != null ? (
                        <PerfectScrollbar>
                          <div className="scroll-callScript">
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
                                  <textarea
                                    key={x}
                                    className="guide-response-text-area"
                                    placeholder="Write notes"
                                    type="text"
                                    onChange={this.handleChangeResponse.bind(
                                      this,
                                      x
                                    )}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </PerfectScrollbar>
                      ) : (
                        <PerfectScrollbar>
                          {this.props.guide.guides ? (
                            <div className="scroll-callScript">
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
                                    <textarea
                                      key={x}
                                      className="guide-response-text-area"
                                      placeholder="Write notes"
                                      type="text"
                                      onChange={this.handleChangeResponse.bind(
                                        this,
                                        x
                                      )}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            ""
                          )}
                        </PerfectScrollbar>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}{" "}
            </div>
          )}
          {this.state.schedulePopup ? (
            <div className=" Bottom-bloc Schedules flex jcc">
              {this.props.call.schedules ? (
                <div className="inner">
                  {this.props.call.isEmptyschedules &&
                  !this.state.addSchedule ? (
                    <div className="emptySchedules flex fdc aic jcc">
                      <img
                        className=""
                        alt="no-guide"
                        src={require("../../../assets/img/calendar.svg")}
                      />
                      <h5>You have no schedules saved</h5>
                      <Button
                        className="integrate-button"
                        onClick={this.toggleAddSchedule.bind(this)}
                      >
                        <img
                          className=""
                          alt="no-guide"
                          src={require("../../../assets/img/bxs-calendar-plus.svg")}
                        />
                        Add a schedule
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                  {this.state.addSchedule && (
                    <div className="AddSchedule">
                      <div className="flex fdr aic jcfs margin-bottom25">
                        <img
                          onClick={this.toggleBackSchedule.bind(this)}
                          className=""
                          alt="no-guide"
                          src={require("../../../assets/img/bx-left-arrow-alt.svg")}
                        />
                        <h4>Add a schedule</h4>
                      </div>
                      <div className="flex fdc">
                        <h5>Calendar owner</h5>
                        <input
                          placeholder="Ismail kherbach"
                          onChange={this.handleChangeName.bind(this)}
                        />
                        <h5>Calendar link</h5>
                        <input
                          placeholder="https://.."
                          onChange={this.handleChangeLink.bind(this)}
                        />
                      </div>
                      <div className="flex fdc aic jcc">
                        <Button
                          className="integrate-button"
                          onClick={this.onAddSchedule.bind(this)}
                        >
                          Save schedule{" "}
                          <img
                            className=""
                            alt="no-guide"
                            src={require("../../../assets/img/bx-check.svg")}
                          />
                        </Button>
                      </div>
                    </div>
                  )}

                  {!this.props.call.isEmptyschedules &&
                    !this.state.addSchedule && (
                      <div className="SchedulesList flex fdc aifs jcfs">
                        <div className="blocList flex fdr aic margin-bottom25">
                          <h4>Add a schedule</h4>
                          <img
                            onClick={this.toggleAddSchedule.bind(this)}
                            className=""
                            alt="no-guide"
                            src={require("../../../assets/img/addSchedule.svg")}
                          />
                        </div>
                        <PerfectScrollbar>
                          <div className="scroll-schedule">
                            {this.props.call.schedules.map((schedule) => {
                              return (
                                <div className="blocListSchedule flex fdr aic jcfs">
                                  <img
                                    // onClick={this.toggleAddSchedule.bind(this)}
                                    className=""
                                    alt="no-guide"
                                    src={require("../../../assets/img/male.svg")}
                                  />
                                  <a target="_blank" href={schedule.link}>
                                    {schedule.name}
                                  </a>
                                </div>
                              );
                            })}
                          </div>
                        </PerfectScrollbar>
                      </div>
                    )}
                </div>
              ) : (
                ""
              )}
            </div>
          ) : null}
          <div className="Bottom-bloc">
            <div className=" flex fdr aic jcc">
              {this.props.guide.isGuideEmpty && (
                <Button
                  onClick={this.toggleSchedule.bind(this)}
                  className="integrate-button"
                >
                  <img src={require("../../../assets/img/bx-plus.svg")} />
                  New Guide
                </Button>
              )}
              <Button
                onClick={this.toggleSchedule.bind(this)}
                className="Save-changes-btn Schedules"
              >
                <img src={require("../../../assets/img/bxs-calendar.svg")} />
                Schedules
              </Button>

              {this.props.call.callEnded && !this.state.result && (
                <Button
                  onClick={this.extracNote.bind(this)}
                  className="Save-changes-btn "
                >
                  <img src={require("../../../assets/img/bxs-calendar.svg")} />
                  Looks good!
                </Button>
              )}
              {this.props.call.callEnded && this.state.result && (
                <Button
                  onClick={this.sendToHubspot.bind(this)}
                  className="Save-changes-btn"
                >
                  <img src={require("../../../assets/img/bxs-calendar.svg")} />
                  Send to hubspot
                </Button>
              )}
            </div>
          </div>
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
  getSchedules,
  addSchedules,
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
