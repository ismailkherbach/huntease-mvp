import React, { Fragment } from "react";
import leads from "../../../constants/leads";
import PerfectScrollbar from "react-perfect-scrollbar";
import Meetings from "../dashboard/meetings";
import ActionLead from "../dashboard/actionLead";
class CallCard extends React.Component {
  constructor() {
    super();
    this.state = {
      visibleLeadId: {},
      visibleLeadInfos: {}
    };
  }
  handleLeadClick = (lead, leadInfos) => {
    // do different stuffs on the id you get here
    this.setState({ visibleLeadId: lead, visibleLeadInfos: leadInfos });
    console.log(this.state.visibleLeadId);
  };
  render() {
    return (
      <Fragment>
        <div id="calls-list-card">
          <h1 id="card-title">Leads</h1>
          <PerfectScrollbar>
            <div className="scroll-leads">
              {" "}
              {leads.map((lead, id) => {
                return (
                  <div
                    className="inlineBtn-left"
                    key={lead.id}
                    onClick={() => this.handleLeadClick(lead, lead.leadInfos)}
                  >
                    <img alt={lead.id} src={lead.avatar} />
                    <div>
                      <h5>{lead.name}</h5>
                      <p>{lead.role}</p>
                    </div>
                  </div>
                );
              })}
              <div className="leadInfos">
                <ActionLead
                  visibleLeadId={this.state.visibleLeadId}
                  visibleLeadInfos={this.state.visibleLeadInfos}
                />
              </div>
            </div>
          </PerfectScrollbar>{" "}
        </div>
      </Fragment>
    );
  }
}
export default CallCard;
