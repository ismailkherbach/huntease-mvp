import React, { Fragment } from "react";
import leads from "../../../constants/leads";
import PerfectScrollbar from "react-perfect-scrollbar";
import ActionLead from "../dashboard/actionLead";
import CallProcess from "./callProcess";
class CallCard extends React.Component {
  constructor() {
    super();
    this.state = {
      visibleLeadId: {},
      visibleLeadInfos: {},
      shownLead: false,
      noLeads: true
    };
  }
  handleLeadClick = (lead, leadInfos) => {
    // do different stuffs on the id you get here
    this.setState({
      visibleLeadId: lead,
      visibleLeadInfos: leadInfos,
      shownLead: true
    });
    console.log(this.state.visibleLeadId);
  };
  render() {
    return (
      <Fragment>
        <div id="calls-list-card">
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
           */
