import React, { Fragment } from "react";
import leads from "../../../constants/leads";
import PerfectScrollbar from "react-perfect-scrollbar";
import ActionLead from "../dashboard/actionLead";
import CallProcess from "./callProcess";
import { connect } from "react-redux";
import { getLeads } from "../../../redux/actions";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
  Row,
} from "reactstrap";
import "boxicons";

import Button from "reactstrap/lib/Button";
import CallTwilio from "./CallTwilio";

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
      shownLeadInfos: false,
      leadListing: false,
    });
  };
  componentDidMount() {
    this.props.getLeads();
    console.log(this.props.call.leads);
  }
  render() {
    return (
      <Fragment>
        <div id="calls-list-card">
          {this.state.leadListing && (
            <PerfectScrollbar>
              <div className="scroll-leads">
                <div className="lead-listing">
                  <div className="inlineBtn-center">
                    <Col className="col-8">
                      <h3 id="card-title">Your leads (50)</h3>
                    </Col>
                    <Col className="col-1">
                      <div id="edit" className="inlineBtn-center">
                        <box-icon name="search" color="#0026bc"></box-icon>
                      </div>
                    </Col>
                    <Col className="col-1 mr-4">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          color="empty"
                          className="dropdown-toggle-split"
                        >
                          <div id="edit" className="inlineBtn-center">
                            <box-icon name="pencil" color="#0026bc"></box-icon>
                          </div>
                        </DropdownToggle>
                        <DropdownMenu className="btn" right>
                          <DropdownItem>Edit</DropdownItem>
                          <DropdownItem>Delete</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Col>
                  </div>
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
                  {this.props.call.leads
                    ? this.props.call.leads.map((lead, i) => {
                        return (
                          <div
                            className="inlineBtn-left no-gutters mx-0"
                            onMouseEnter={this.handleHoverOn}
                            onMouseLeave={this.handleHoverOff}
                          >
                            <div className="inlineBtn-left mx-0 col-5 no-gutters">
                              <div
                                className="icon"
                                onClick={this.handleLeadClick}
                              >
                                <box-icon
                                  name="headphone"
                                  color="#091ad4"
                                ></box-icon>
                              </div>
                              <div className="inlineBtn-col-left">
                                <h4>
                                  {lead.firstName +
                                    " " +
                                    lead.lastName.split("(")[0]}
                                </h4>
                                <p>{lead.jobtitle}</p>
                              </div>
                            </div>

                            <Col className="mx-0 col-1 no-gutters">
                              {this.state.callIcon && (
                                <div
                                  className="icon-call"
                                  onClick={this.handleCallClick}
                                >
                                  <box-icon
                                    name="phone"
                                    type="solid"
                                    color="white"
                                  ></box-icon>{" "}
                                </div>
                              )}
                            </Col>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </PerfectScrollbar>
          )}

          {this.state.shownLeadInfos && (
            <div className="lead-infos inlineBtn-col-center">
              <div className="firstBlock-leadinfos">
                <h4>Contact infos</h4>{" "}
                <div className="inlineBtn-center">
                  <img
                    alt="avatar"
                    src={require("../../../assets/img/0.jpeg")}
                  />
                  <div className="inlineBtn-col ">
                    <h3>Ismail kherbach</h3>
                    <p>Tech lead</p>
                  </div>
                  <div className="icon-call" onClick={this.handleCallClick}>
                    <box-icon
                      name="phone"
                      type="solid"
                      color="white"
                    ></box-icon>{" "}
                  </div>{" "}
                </div>
                <div className="inlineBtn-center">
                  <h5>General</h5>
                  <h5> | </h5>
                  <h5>Activity</h5>
                </div>
              </div>
              <div className="">
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
                <div className="leadStatus">
                  <h4>Lead status</h4>
                  <div className="inlineBtn-left">
                    <div className="lead-status">New</div>
                    <div className="lead-status">Open</div>
                    <div className="lead-status">Unqualified</div>
                    <div className="lead-status">Connected</div>{" "}
                    <div className="lead-status">Open deal</div>{" "}
                  </div>
                  <div className="inlineBtn-left">
                    <div className="lead-status">In progress</div>
                    <div className="lead-status-active">
                      Attempted to contact
                    </div>
                    <div className="lead-status">Bad time</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {this.state.callSection && (
            <div className="lead-infos inlineBtn-col-center">
              <CallTwilio muted={this.state.muted} />
            </div>
          )}

          <div></div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ call }) => {
  return {
    call,
  };
};

export default connect(mapStateToProps, {
  getLeads,
})(CallCard);

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
