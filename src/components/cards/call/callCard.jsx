import React, { Fragment } from "react";
import leads from "../../../constants/leads";
import PerfectScrollbar from "react-perfect-scrollbar";
import ActionLead from "../dashboard/actionLead";
import CallProcess from "./callProcess";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getLeads, selectedLeadsItemsChange } from "../../../redux/actions";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
  CustomInput,
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
      visibleIconId: null,
      lastChecked: null,
      selectedItems: [],
      delecteAction: false,
    };
    this.handleHoverOn = this.handleHoverOn.bind(this);
    this.handleHoverOff = this.handleHoverOff.bind(this);
  }

  handleHoverOn(id) {
    this.setState({ callIcon: true, visibleIconId: id });
  }

  handleHoverOff() {
    this.setState({ callIcon: false });
  }
  handleLeadClick(lead) {
    // do different stuffs on the id you get here
    this.setState(
      {
        visibleLeadId: lead,
        shownLeadInfos: true,
        leadListing: false,
      },
      console.log(this.state.visibleLeadId)
    );
  }

  toogleLead() {
    this.setState(
      {
        visibleLeadId: null,
        shownLeadInfos: false,
        leadListing: true,
      },
      console.log(this.state.visibleLeadId)
    );
  }
  handleCallClick = () => {
    this.setState({
      callSection: true,
      shownLeadInfos: false,
      leadListing: false,
    });
  };

  handleCheckChange = (event, id) => {
    if (this.state.lastChecked == null) {
      this.setState({
        lastChecked: id,
      });
    }

    let selectedItems = Object.assign([], this.props.call.selectedItems);
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter((x) => x !== id);
    } else {
      selectedItems.push(id);
    }
    this.props.selectedLeadsItemsChange(selectedItems);

    if (event.shiftKey) {
      var items = this.props.call.leads;
      var start = this.getIndex(id, items, "id");
      var end = this.getIndex(this.state.lastChecked, items, "id");
      items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...items.map((item) => {
          return item.id;
        })
      );
      selectedItems = Array.from(new Set(selectedItems));
      this.props.selectedLeadsItemsChange(selectedItems);
    }
    console.log(this.props.call.selectedItems);

    return;
  };
  handleChangeSelectAll = () => {
    if (this.props.call.loading) {
      if (
        this.props.call.selectedItems.length >= this.props.call.leads.length
      ) {
        this.props.selectedLeadsItemsChange([]);
      } else {
        this.props.selectedLeadsItemsChange(
          this.props.call.leads.map((x) => x._id)
        );
        console.log(this.props.call.selectedItems);
      }
    }
  };

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }
  deleteCheckBox() {
    this.setState({ delecteAction: !this.state.delecteAction });
  }

  componentDidMount() {
    this.props.getLeads();
    console.log(this.props.call.leads);
  }
  render() {
    return (
      <Fragment>
        <div id="calls-list-card">
          <div className="inlineBtn-center">
            {this.props.call.leads && this.state.delecteAction ? (
              <CustomInput
                className="custom-checkbox mb-0 d-inline-block"
                type="checkbox"
                id="checkAll"
                checked={
                  this.props.call.selectedItems.length >=
                  this.props.call.leads.length
                }
                onClick={() => this.handleChangeSelectAll()}
                onChange={() => this.handleChangeSelectAll()}
                label=""
              />
            ) : null}

            <Col className="col-8">
              <h3 id="card-title">
                Your leads (
                {this.props.call.leads ? this.props.call.leads.length : "..."})
              </h3>
            </Col>
            <Col className="col-1">
              <div id="edit" className="inlineBtn-center">
                <box-icon name="search" color="#0026bc"></box-icon>
              </div>
            </Col>
            <Col className="col-1 mr-4">
              <UncontrolledDropdown>
                <DropdownToggle color="empty" className="dropdown-toggle-split">
                  <div id="edit" className="inlineBtn-center">
                    <box-icon name="pencil" color="#0026bc"></box-icon>
                  </div>
                </DropdownToggle>
                <DropdownMenu className="btn" right>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem onClick={this.deleteCheckBox.bind(this)}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
          </div>
          {this.state.leadListing && (
            <PerfectScrollbar>
              <div className="scroll-leads">
                <div className="lead-listing">
                  {this.props.call.leads ? (
                    this.props.call.leads.length != 0 ? (
                      this.props.call.leads.map((lead, i) => {
                        return (
                          <div
                            className="inlineBtn-left no-gutters mx-0 lead-item"
                            onMouseEnter={this.handleHoverOn.bind(this, i)}
                            onMouseLeave={this.handleHoverOff}
                            key={i}
                          >
                            <Col className="inlineBtn-left mx-0 col-6 no-gutters">
                              {this.state.delecteAction && (
                                <CustomInput
                                  className="custom-checkbox mb-0 d-inline-block"
                                  type="checkbox"
                                  key={i}
                                  id={lead._id}
                                  checked={
                                    this.props.call.loading
                                      ? this.props.call.selectedItems.includes(
                                          lead._id
                                        )
                                      : false
                                  }
                                  onChange={(event) =>
                                    this.handleCheckChange(event, lead._id)
                                  }
                                  label=""
                                />
                              )}
                              <Col
                                className="icon col-2"
                                onClick={this.handleLeadClick.bind(this, lead)}
                              >
                                <box-icon
                                  name="headphone"
                                  color="#091ad4"
                                ></box-icon>
                              </Col>
                              <Col className="inlineBtn-col-left">
                                <h4>
                                  {lead.firstName +
                                    " " +
                                    lead.lastName.split("(")[0]}
                                </h4>
                                <p>{lead.jobtitle}</p>
                              </Col>
                            </Col>

                            <Col className="mx-0 col-1 no-gutters">
                              {this.state.callIcon &&
                                this.state.visibleIconId == i && (
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
                    ) : (
                      <div className="inlineBtn-col-center mt-5">
                        <img
                          className="illustration mt-5"
                          alt="empty-leads"
                          src={require("../../../assets/img/empty_leads.png")}
                        />
                        <Link to={"/app/settings/application"}>
                          <Button className="import-leads mt-3">
                            Import contacts from Hubspot
                          </Button>
                        </Link>
                      </div>
                    )
                  ) : (
                    <div className="inlineBtn-center">
                      <Spinner animation="border" />
                    </div>
                  )}
                </div>
              </div>
            </PerfectScrollbar>
          )}

          {this.state.shownLeadInfos && (
            <div className="lead-infos inlineBtn-col-center">
              <div className="firstBlock-leadinfos">
                <h2
                  className="float-right mr-2 pr-2"
                  onClick={this.toogleLead.bind(this)}
                >
                  X
                </h2>
                <h4>Contact infos</h4>{" "}
                <div className="inlineBtn-center">
                  <img
                    alt="avatar"
                    src={require("../../../assets/img/0.jpeg")}
                  />
                  <Col className="inlineBtn-col col-4 ">
                    <h3>
                      {" "}
                      {this.state.visibleLeadId.firstName +
                        " " +
                        this.state.visibleLeadId.lastName.split("(")[0]}
                    </h3>
                    <p>{this.state.visibleLeadId.jobtitle}</p>
                  </Col>
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
                  placeholder={this.state.visibleLeadId.emails[0]}
                  type="text"
                />
                <div className="leadStatus">
                  <h4>Lead status</h4>
                  <div className="inlineBtn-left">
                    <div className="lead-status">New</div>
                    <div className="lead-status">Open</div>
                    <div className="lead-status">Unqualified</div>
                    <div className="lead-status">Connected</div>
                    <div className="lead-status">Open deal</div>
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
  selectedLeadsItemsChange,
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

/*      <div
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
                  </div>{" "}*/
