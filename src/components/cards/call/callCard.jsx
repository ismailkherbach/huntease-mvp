import React, { Fragment } from "react";
import leads from "../../../constants/leads";
import PerfectScrollbar from "react-perfect-scrollbar";
import ActionLead from "../dashboard/actionLead";
import CallProcess from "./callProcess";
import { Spinner } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  getLeads,
  selectedLeadsItemsChange,
  syncLeads,
} from "../../../redux/actions";
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
const Twilio = require("twilio-client");

class CallCard extends React.Component {
  constructor() {
    super();
    this.state = {
      visibleLeadId: {},
      visibleLeadInfos: {},
      shownLead: false,
      callSection: false,
      shownLeadInfos: false,
      noLeads: false,

      muted: false,
      visibleIconId: null,
      lastChecked: null,
      delecteAction: false,
      searchField: "",

      leadListing: true,
      emptyLead: true,
      callIcon: false,
      onPhone: false,
      number: "",
      search: false,
    };
    this.handleHoverOn = this.handleHoverOn.bind(this);
    this.handleHoverOff = this.handleHoverOff.bind(this);
    this.handleCallClick = this.handleCallClick.bind(this);
  }
  toggleSearch() {
    this.setState({ search: !this.state.search });
  }
  handleSearchChange(e) {
    this.setState({ searchField: e.target.value });
  }
  handleHoverOn(id) {
    this.setState({ callIcon: true, visibleIconId: id });
  }
  handleKeyPress(target) {
    if (target.charCode == 13) {
      this.toggleSearch();
    }
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
  handleCallClick(lead) {
    this.setState({
      callSection: true,
      shownLeadInfos: false,
      leadListing: false,
      visibleLeadId: lead,
    });
  }

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
          this.props.call.leads.map((x) => x.id)
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
  handleChangeNumber(e) {
    console.log(this.state.number);
    this.setState({
      number: e.target.value,
    });
  }
  onSyncLeads() {
    this.props.syncLeads();
  }
  async componentDidMount() {
    await this.props.getLeads();
    console.log(this.props.call.leads);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported");
      // target
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        /***** success callback ******/
        // create a media stream
        .then(function(stream) {
          //if callback succeed, the following code will run :
          // create a new Media Recorder instance
          // with MediaRecorder() constructor
          // this instance is the entry point
          // into using the MediaRecorder API
        }) /***** error callback *****/
        .catch(function(err) {
          console.log("error : " + err);
        });
    } else {
      console.log("getUserMedia : missing");
    }
    Twilio.Device.setup(JSON.parse(localStorage.getItem("twilioToken")), {
      debug: true,
      audioConstraints: true,
      audioHelper: true,
      pstream: true,
    });
  }
  render() {
    const { searchField } = this.state;

    return (
      <Fragment>
        <div className="CallLead">
          {this.props.call.isEmptyLeads ? (
            <div className="noLeads flex fdc">
              <div className="flex fdr aic jcfs">
                <h3>Leads</h3>
              </div>
              <div className="flex fdc aic jcc">
                <img
                  alt="empty-leads"
                  src={require("../../../assets/img/emptyLeads.svg")}
                />
                <h2>You have no leads</h2>
              </div>
              <div className="importLeads flex fdc aic jcc">
                <Button className="Save-changes-btn">
                  <img
                    alt="empty-leads"
                    src={require("../../../assets/img/hubspotLogo.svg")}
                  />
                  Import contacts from Hubspot
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {!this.state.callSection && (
                <div>
                  {this.state.leadListing ? (
                    <div className="LeadListing flex fdc">
                      <div className="flex fdr aic jcfs">
                        {this.props.call.leads && this.state.delecteAction ? (
                          <CustomInput
                            className="custom-checkbox"
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
                        {!this.state.search ? (
                          <div className="topLeft flex fdr aic ">
                            <h3>
                              Your leads (
                              {this.props.call.leads
                                ? this.props.call.leads.length
                                : "..."}
                              )
                            </h3>

                            <div
                              className="edit flex fdc aic jcc"
                              onClick={this.toggleSearch.bind(this)}
                            >
                              <box-icon
                                name="search"
                                color="#0026bc"
                              ></box-icon>
                            </div>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                color="empty"
                                className="dropdown-toggle-split"
                              >
                                <div className="edit flex fdc aic jcc">
                                  <box-icon
                                    name="pencil"
                                    color="#0026bc"
                                  ></box-icon>
                                </div>
                              </DropdownToggle>
                              <DropdownMenu className="btn" right>
                                <DropdownItem
                                  onClick={this.deleteCheckBox.bind(this)}
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem
                                  onClick={this.onSyncLeads.bind(this)}
                                >
                                  Sync leads
                                </DropdownItem>
                                <DropdownItem>Delete</DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
                        ) : (
                          <div className="searchBar flex fdr aic">
                            <input
                              alt={"search"}
                              placeholder="Enter your search here"
                              type="text"
                              src={require("../../../assets/img/search.svg")}
                              onChange={this.handleSearchChange.bind(this)}
                              onKeyPress={this.handleKeyPress.bind(this)}
                            />
                            <UncontrolledDropdown>
                              <DropdownToggle
                                color="empty"
                                className="dropdown-toggle-split"
                              >
                                <div className="edit flex fdc aic jcc">
                                  <box-icon
                                    name="pencil"
                                    color="#0026bc"
                                  ></box-icon>
                                </div>
                              </DropdownToggle>
                              <DropdownMenu className="btn" right>
                                <DropdownItem
                                  onClick={this.deleteCheckBox.bind(this)}
                                >
                                  Edit
                                </DropdownItem>
                                <DropdownItem>Delete</DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
                        )}
                      </div>
                      {this.props.call.leads ? (
                        <PerfectScrollbar>
                          <div className="scroll-leads">
                            {this.props.call.leads
                              .filter((x) =>
                                x.firstName
                                  .toLowerCase()
                                  .includes(searchField.toLowerCase())
                              )
                              .map((lead, i) => {
                                return (
                                  <div
                                    className="LeadList flex fdr aic jcfs"
                                    onMouseEnter={this.handleHoverOn.bind(
                                      this,
                                      i
                                    )}
                                    onMouseLeave={this.handleHoverOff}
                                    key={i}
                                  >
                                    {this.state.delecteAction && (
                                      <CustomInput
                                        className="custom-checkbox mb-0 d-inline-block"
                                        type="checkbox"
                                        key={i}
                                        id={lead.id}
                                        checked={
                                          this.props.call.loading
                                            ? this.props.call.selectedItems.includes(
                                                lead.id
                                              )
                                            : false
                                        }
                                        onChange={(event) =>
                                          this.handleCheckChange(event, lead.id)
                                        }
                                        label=""
                                      />
                                    )}

                                    <img
                                      src={lead.picture}
                                      onClick={this.handleLeadClick.bind(
                                        this,
                                        lead
                                      )}
                                    />
                                    <div
                                      className="SubInfos flex fdc aifs jcc curs_pointer"
                                      onClick={this.handleLeadClick.bind(
                                        this,
                                        lead
                                      )}
                                    >
                                      <h4>
                                        {lead.firstName +
                                          " " +
                                          lead.lastName.split("(")[0]}
                                      </h4>
                                      <h5>{lead.jobtitle}</h5>
                                    </div>
                                    {this.state.callIcon &&
                                      this.state.visibleIconId == i && (
                                        <div
                                          className="directCall flex fdc aic jcc curs_pointer"
                                          onClick={this.handleCallClick.bind(
                                            this,
                                            lead
                                          )}
                                        >
                                          <box-icon
                                            name="phone"
                                            type="solid"
                                            color="white"
                                          ></box-icon>{" "}
                                        </div>
                                      )}
                                  </div>
                                );
                              })}
                          </div>
                        </PerfectScrollbar>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <div className="leadDisplay flex fdc aic jcc">
                      <div className="topBloc flex fdc ">
                        <div className="cancelInfos flex fdr aifs jcfs">
                          <h4>Contact infos</h4>
                          <img
                            onClick={this.toogleLead.bind(this)}
                            className="float-right curs_pointer"
                            alt="empty-leads"
                            src={require("../../../assets/img/bx-x.svg")}
                          />
                        </div>
                        <div className="leadDetailTop flex fdr aic jcc">
                          <img src={this.state.visibleLeadId.picture} />
                          <div className="middleTop flex fdc aifs jcc">
                            <h2>
                              {this.state.visibleLeadId.firstName +
                                " " +
                                this.state.visibleLeadId.lastName.split("(")[0]}
                            </h2>
                            <h5>{this.state.visibleLeadId.jobtitle}</h5>
                          </div>
                          <div
                            className="directCall flex fdc aic jcc curs_pointer"
                            onClick={this.handleCallClick.bind(
                              this,
                              this.state.visibleLeadId
                            )}
                          >
                            <box-icon
                              name="phone"
                              type="solid"
                              color="white"
                            ></box-icon>{" "}
                          </div>
                        </div>

                        <div className="toggleWindow flex fdr aic jcc curs_pointer">
                          <h5>General info</h5>
                          <h5>|</h5>
                          <h5>Activity</h5>
                        </div>
                      </div>
                      <div className="social flex fdr aic jcc curs_pointer">
                        <img
                          className="float-right"
                          alt="empty-leads"
                          src={require("../../../assets/img/bxl-linkedin-square.svg")}
                        />
                        <h5>Linkedin</h5>
                        <img
                          className="float-right"
                          alt="empty-leads"
                          src={require("../../../assets/img/feather-globe.svg")}
                        />
                        <h5>Website</h5>
                        <Button className="Save-changes-btn">
                          View in Hubspot
                        </Button>
                      </div>
                      <div className="full-input flex fdr aic jcc">
                        <img
                          className="float-right"
                          alt="empty-leads"
                          src={require("../../../assets/img/bxs-phone.svg")}
                        />
                        <input
                          placeholder="type number"
                          onChange={this.handleChangeNumber.bind(this)}
                        />
                        {/*    <select>
                          {this.state.visibleLeadId.phones.fixe.map((phone) => {
                            if (phone != null) {
                              return <option>{phone}</option>;
                            } else return;
                          })}
                          {this.state.visibleLeadId.phones.other.map(
                            (phone) => {
                              if (phone != null) {
                                return <option>{phone}</option>;
                              } else return;
                            }
                          )}
                        </select>*/}
                      </div>
                      <div className="full-input flex fdr aic jcc">
                        <img
                          className="float-right"
                          alt="empty-leads"
                          src={require("../../../assets/img/bxs-envelope.svg")}
                        />

                        <select>
                          {this.state.visibleLeadId.emails.map((email) => {
                            return <option>{email}</option>;
                          })}
                        </select>
                      </div>
                      <div className="leadStatus flex fdc aifs jcc">
                        <h4>Lead status</h4>
                      </div>

                      <div className="Status flex fdr aifs jcfs">
                        {leadStatus.map((status, i) => {
                          return (
                            <div
                              className={`StatusOne ${
                                this.state.visibleLeadId.status === leadKey[i]
                                  ? "activeStatus"
                                  : ""
                              } flex fdr aic jcc`}
                            >
                              {status}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {this.state.callSection && (
                <CallTwilio
                  muted={this.state.muted}
                  visibleLeadId={this.state.visibleLeadId}
                  number={this.state.number}
                />
              )}
            </div>
          )}
        </div>
        {/*   <div id="calls-list-card">
          {this.state.leadListing && (
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
                  {this.props.call.leads ? this.props.call.leads.length : "..."}
                  )
                </h3>
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
                    <DropdownItem onClick={this.deleteCheckBox.bind(this)}>
                      Edit
                    </DropdownItem>
                    <DropdownItem>Delete</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Col>
            </div>
          )}
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
                                  id={lead.id}
                                  checked={
                                    this.props.call.loading
                                      ? this.props.call.selectedItems.includes(
                                          lead.id
                                        )
                                      : false
                                  }
                                  onChange={(event) =>
                                    this.handleCheckChange(event, lead.id)
                                  }
                                  label=""
                                />
                              )}

                              <Col className="col-4">
                                <img
                                  // alt={lead.id}
                                  src={lead.picture}
                                  className="lead-avatar"
                                  onClick={this.handleLeadClick.bind(
                                    this,
                                    lead
                                  )}
                                />
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
                                    onClick={this.handleCallClick.bind(
                                      this,
                                      lead
                                    )}
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
                    className="ml-4"
                    alt="avatar"
                    src={this.state.visibleLeadId.picture}
                  />
                  <div className="inlineBtn-col col-8">
                    <h3>
                      {" "}
                      {this.state.visibleLeadId.firstName +
                        " " +
                        this.state.visibleLeadId.lastName.split("(")[0]}
                    </h3>
                    <p>{this.state.visibleLeadId.jobtitle}</p>
                  </div>
                  <img
                    alt="make-call"
                    className="make-call"
                    src={require("../../../assets/img/make-call.png")}
                    onClick={this.handleCallClick.bind(
                      this,
                      this.state.visibleLeadId
                    )}
                  />
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
                <div className="inlineBtn-col-center mt-2">
                  <div className="email-dropdown inlineBtn-center">
                    <img src={require("../../../assets/img/bxs-phone.png")} />
                    <input
                      className="lead-input"
                      placeholder={this.state.visibleLeadId.phones.fixe[1]}
                      type="text"
                      disabled
                    />{" "}
                  </div>

                  <div className="email-dropdown inlineBtn-center">
                    <img
                      src={require("../../../assets/img/bxs-envelope.png")}
                    />

                    <input
                      className="lead-input"
                      placeholder={this.state.visibleLeadId.emails[0]}
                      type="text"
                      disabled
                    />
                  </div>
                </div>
                <div className="leadStatus">
                  <h4>Lead status</h4>
                  <div className="inlineBtn-left">
                    <div
                      className={
                        this.state.visibleLeadId.status == "NEW"
                          ? "lead-status-active"
                          : "lead-status"
                      }
                    >
                      New
                    </div>
                    <div
                      className={
                        this.state.visibleLeadId.status == "OPEN"
                          ? "lead-status-active"
                          : "lead-status"
                      }
                    >
                      Open
                    </div>
                    <div
                      className={
                        this.state.visibleLeadId.status == "UNQUALIFIED"
                          ? "lead-status-active"
                          : "lead-status"
                      }
                    >
                      Unqualified
                    </div>
                    <div
                      className={
                        this.state.visibleLeadId.status == "CONNECTED"
                          ? "lead-status-active"
                          : "lead-status"
                      }
                    >
                      Connected
                    </div>
                    <div
                      className={
                        this.state.visibleLeadId.status == "OPEN_DEAL"
                          ? "lead-status-active"
                          : "lead-status"
                      }
                    >
                      Open deal
                    </div>
                  </div>
                  <div className="inlineBtn-left">
                    <div
                      className={
                        this.state.visibleLeadId.status == "IN_PROGRESS"
                          ? "lead-status-active"
                          : "lead-status"
                      }
                    >
                      In progress
                    </div>
                    <div
                      className={
                        this.state.visibleLeadId.status ==
                        "ATTEMPTED_TO_CONTACT"
                          ? "lead-status-active"
                          : "lead-status"
                      }
                    >
                      Attempted to contact
                    </div>
                    <div
                      className={
                        this.state.visibleLeadId.status == "BAD_TIME"
                          ? "lead-status-active"
                          : "lead-status"
                      }
                    >
                      Bad time
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {this.state.callSection && (
            <div className="lead-infos inlineBtn-col-center">
              <CallTwilio
                muted={this.state.muted}
                visibleLeadId={this.state.visibleLeadId}
              />
            </div>
          )}

          <div></div>
        </div>
          */}{" "}
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
  syncLeads,
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

const leadStatus = [
  "New",
  "Open",
  "Unqualified",
  "Connected",
  "Open deal",
  "In progress",
  "Attempted to contact",
  "Bad timing",
];

const leadKey = [
  "NEW",
  "OPEN",
  "UNQUALIFIED",
  "CONNECTED",
  "OPEN_DEAL",
  "IN_PROGRESS",
  "ATTEMPTED_TO_CONTACT",
  "BAD_TIMING",
];
