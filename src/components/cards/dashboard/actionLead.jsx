import React, { Fragment } from "react";
class ActionLead extends React.Component {
  render() {
    const { visibleLeadInfos, visibleLeadId } = this.props;
    return (
      <Fragment>
        <div className="callSection">
          <img className="mt-4" alt={1} src={visibleLeadId.avatar} />
          <img
            id="callButton"
            src={require("../../../components/svg/callButton.svg")}
            alt="call"
          />
        </div>
        <h5 className="mt-3">{visibleLeadId.name}</h5>
        <h4 className="pb-5">{visibleLeadId.role}</h4>
        <h3>Email</h3>
        <p>{visibleLeadInfos.email}</p>
        <h3>phone number</h3>
        <div className="inlineBtn-left">
          <img
            alt={"indicatif"}
            id="icon"
            className="inlineBtn-left"
            src={require("../../../assets/img/indicatif/fr.png")}
          />
          <p>{visibleLeadInfos.phoneNumber}</p>
        </div>
        <h3>Social Links</h3>

        <div className="inlineBtn-left">
          <img
            alt={"linkedin"}
            id="social"
            className="inlineBtn-left"
            src={require("../../../assets/img/indicatif/linkedin.png")}
          />
          <img
            id="social"
            alt={"website"}
            className="inlineBtn-left"
            src={require("../../../assets/img/indicatif/website.png")}
          />
        </div>
        <p></p>

        <h3>Lead status</h3>
        <div className="inlineBtn-left">
          <div className="lead-status">In progress</div>
          <div className="lead-status">Open</div>
          <div className="lead-status">New</div>
        </div>
      </Fragment>
    );
  }
}

export default ActionLead;
