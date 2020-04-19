import React, { Fragment } from "react";
import leads from "../../../constants/leads";
import PerfectScrollbar from "react-perfect-scrollbar";
import ActionLead from "../dashboard/actionLead";
import CallProcess from "./callProcess";
import Button from "reactstrap/lib/Button";
class CallCard extends React.Component {
  constructor() {
    super();
    this.state = {
      visibleLeadId: {},
      visibleLeadInfos: {},
      shownLead: false,
      callSection: false,
      leadListing: true,
      shownLeadInfos: false,
      noLeads: false,
      callIcon: false,
      onPhone: false,
      muted: false,
    };
    this.handleHoverOn = this.handleHoverOn.bind(this);
    this.handleHoverOff = this.handleHoverOff.bind(this);
  }

  handleHoverOn() {
    this.setState({ callIcon: true });
  }

  handleHoverOff() {
    this.setState({ callIcon: false });
  }
  handleLeadClick = (lead, leadInfos) => {
    // do different stuffs on the id you get here
    this.setState({
      visibleLeadId: lead,
      visibleLeadInfos: leadInfos,
      shownLeadInfos: true,

      leadListing: false,
    });
    console.log(this.state.visibleLeadId);
  };
  handleCallClick = () => {
    this.setState({
      callSection: true,
      shownLead: true,
      shownLeadInfos: false,
      leadListing: false,
    });
  };
  render() {
    return (
      <Fragment>
        <div id="calls-list-card">
          {this.state.leadListing && (
            <div className="lead-listing">
              <h3 id="card-title">Your leads</h3>
              <div
                className="inlineBtn-left"
                onMouseEnter={this.handleHoverOn}
                onMouseLeave={this.handleHoverOff}
              >
                <div className="icon" onClick={this.handleLeadClick}>
                  <box-icon name="headphone" color="#091ad4"></box-icon>
                </div>
                <div className="inlineBtn-col-left">
                  <h4>Ismail kherbach</h4>
                  <p>Tech lead</p>
                </div>
                {this.state.callIcon && (
                  <div className="icon-call" onClick={this.handleCallClick}>
                    <box-icon
                      name="phone"
                      type="solid"
                      color="white"
                    ></box-icon>{" "}
                  </div>
                )}
              </div>{" "}
              <div
                className="inlineBtn-left"
                onMouseEnter={this.handleHoverOn}
                onMouseLeave={this.handleHoverOff}
              >
                <div className="icon">
                  <box-icon name="headphone" color="#091ad4"></box-icon>
                </div>
                <div className="inlineBtn-col-left">
                  <h4>Ismail kherbach</h4>
                  <p>Tech lead</p>
                </div>
                {this.state.callIcon && (
                  <div className="icon-call">
                    <box-icon
                      name="phone"
                      type="solid"
                      color="white"
                    ></box-icon>{" "}
                  </div>
                )}
              </div>{" "}
              <div
                className="inlineBtn-left"
                onMouseEnter={this.handleHoverOn}
                onMouseLeave={this.handleHoverOff}
              >
                <div className="icon">
                  <box-icon name="headphone" color="#091ad4"></box-icon>
                </div>
                <div className="inlineBtn-col-left">
                  <h4>Ismail kherbach</h4>
                  <p>Tech lead</p>
                </div>
                {this.state.callIcon && (
                  <div className="icon-call">
                    <box-icon
                      name="phone"
                      type="solid"
                      color="white"
                    ></box-icon>{" "}
                  </div>
                )}
              </div>{" "}
              <div
                className="inlineBtn-left"
                onMouseEnter={this.handleHoverOn}
                onMouseLeave={this.handleHoverOff}
              >
                <div className="icon">
                  <box-icon name="headphone" color="#091ad4"></box-icon>
                </div>
                <div className="inlineBtn-col-left">
                  <h4>Ismail kherbach</h4>
                  <p>Tech lead</p>
                </div>
                {this.state.callIcon && (
                  <div className="icon-call">
                    <box-icon
                      name="phone"
                      type="solid"
                      color="white"
                    ></box-icon>{" "}
                  </div>
                )}
              </div>{" "}
              <div
                className="inlineBtn-left"
                onMouseEnter={this.handleHoverOn}
                onMouseLeave={this.handleHoverOff}
              >
                <div className="icon">
                  <box-icon name="headphone" color="#091ad4"></box-icon>
                </div>
                <div className="inlineBtn-col-left">
                  <h4>Ismail kherbach</h4>
                  <p>Tech lead</p>
                </div>
                {this.state.callIcon && (
                  <div className="icon-call">
                    <box-icon
                      name="phone"
                      type="solid"
                      color="white"
                    ></box-icon>{" "}
                  </div>
                )}
              </div>{" "}
              <div
                className="inlineBtn-left"
                onMouseEnter={this.handleHoverOn}
                onMouseLeave={this.handleHoverOff}
              >
                <div className="icon">
                  <box-icon name="headphone" color="#091ad4"></box-icon>
                </div>
                <div className="inlineBtn-col-left">
                  <h4>Ismail kherbach</h4>
                  <p>Tech lead</p>
                </div>
                {this.state.callIcon && (
                  <div className="icon-call">
                    <box-icon
                      name="phone"
                      type="solid"
                      color="white"
                    ></box-icon>{" "}
                  </div>
                )}
              </div>
            </div>
          )}

          {this.state.shownLeadInfos && (
            <div className="lead-infos inlineBtn-col-center">
              <div className="firstBlock">
                <p>Contact infos</p>{" "}
                <div className="inlineBtn-center">
                  <img
                    alt="avatar"
                    src={require("../../../assets/img/0.jpeg")}
                  />
                  <div className="inlineBtn-col">
                    <h3>Ismail kherbach</h3>
                    <p>Tech lead</p>
                  </div>
                  <div className="icon-call">
                    <box-icon
                      name="phone"
                      type="solid"
                      color="white"
                    ></box-icon>{" "}
                  </div>{" "}
                </div>
                <div className="inlineBtn-center">
                  <p>General</p>
                  <p> | </p>
                  <p>Activity</p>
                </div>
              </div>

              <div className="inlineBtn-col-center">
                <div className="inlineBtn-center mt-4">
                  <div className="inlineBtn-center">
                    <box-icon
                      name="linkedin-square"
                      type="logo"
                      color="#091ad4"
                    ></box-icon>
                    <h4>LinkedIn</h4>
                  </div>
                  <div className="inlineBtn-center">
                    <box-icon name="world" color="#091ad4"></box-icon>
                    <h4>Website</h4>
                  </div>
                  <Button className="hubspot">View in hubspot</Button>
                </div>
                <input
                  className="lead-input"
                  placeholder="+44 7911123456"
                  type="text"
                />{" "}
                <input
                  className="lead-input"
                  placeholder="gi_kherbach@esi.dz"
                  type="text"
                />
              </div>
            </div>
          )}
          {this.state.shownLead && this.state.callSection && (
            <div className="lead-infos inlineBtn-col-center">
              <div className="firstBlock">
                <img alt="avatar" src={require("../../../assets/img/0.jpeg")} />
                <h3>Ismail kherbach</h3>
                <p>Tech lead</p>
                <h2>00:54</h2>

                <div className="inlineBtn-center">
                  <p>General</p>
                  <p> | </p>
                  <p>Activity</p>
                </div>
              </div>
              {this.state.shownLead && (
                <div className="inlineBtn-col-center">
                  <div className="inlineBtn-center mt-4">
                    <div className="inlineBtn-center">
                      <box-icon
                        name="linkedin-square"
                        type="logo"
                        color="#091ad4"
                      ></box-icon>
                      <h4>LinkedIn</h4>
                    </div>
                    <div className="inlineBtn-center">
                      <box-icon name="world" color="#091ad4"></box-icon>
                      <h4>Website</h4>
                    </div>
                    <Button className="hubspot">View in hubspot</Button>
                  </div>
                  <input
                    className="lead-input"
                    placeholder="+44 7911123456"
                    type="text"
                  />{" "}
                  <input
                    className="lead-input"
                    placeholder="gi_kherbach@esi.dz"
                    type="text"
                  />
                </div>
              )}
              {this.state.callSection && (
                <div>
                  <div className="inlineBtn-center mt-5">
                    <div className="inlineBtn-col-center mt-3">
                      <div className="emotion-block">
                        <h3>+30</h3>
                        <h4>Enthusiasm</h4>
                        <img
                          alt="emotion"
                          src={require("../../../assets/img/emotion-green.svg")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="call-section inlineBtn-center ">
                    <div className="icon-call-section">
                      <box-icon
                        name="face"
                        type="solid"
                        color="#8BA3FF"
                      ></box-icon>
                    </div>

                    <div className="icon-call-section">
                      <box-icon
                        name="video-recording"
                        type="solid"
                        color="#8BA3FF"
                      ></box-icon>
                    </div>
                    <div className="icon-call-section">
                      <box-icon
                        name={
                          this.state.muted ? "microphone-off" : "microphone"
                        }
                        type="solid"
                        color="#8BA3FF"
                      ></box-icon>
                    </div>
                    <div className="icon-call-section">
                      <box-icon
                        name="time-five"
                        type="solid"
                        color="#8BA3FF"
                      ></box-icon>
                    </div>
                    <div className="icon-call-section-off">
                      <box-icon
                        name="phone"
                        type="solid"
                        color="white"
                      ></box-icon>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="inlineBtn-cnter"></div>
        </div>
      </Fragment>
    );
  }
}
export default CallCard;

/*
  {this.state.shownLead && (
            <div className="callProcess inlineBtn-col">
              <CallProcess />
            </div>
          )}

              {!this.state.shownLead && (
            <div>
              <h1 id="card-title">Leads</h1>
              <PerfectScrollbar>
                <div className="scroll-leads">
                  {" "}
                  {leads.map((lead, id) => {
                    return (
                      <div
                        className="inlineBtn-left"
                        key={lead.id}
                        onClick={() =>
                          this.handleLeadClick(lead, lead.leadInfos)
                        }
                      >
                        <img alt={lead.id} src={lead.avatar} />
                        <div>
                          <h5>{lead.name}</h5>
                          <p>{lead.role}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </PerfectScrollbar>{" "}
            </div>
          )}
          {this.state.shownLead && (
            <div className="leadInfos">
              <ActionLead
                visibleLeadId={this.state.visibleLeadId}
                visibleLeadInfos={this.state.visibleLeadInfos}
              />
            </div>
          )}
           */
