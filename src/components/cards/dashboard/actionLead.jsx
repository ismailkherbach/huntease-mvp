import React, { Fragment } from "react";

const ActionLead = props => {
  return (
    <Fragment>
      <img alt={props.visibleLeadId.id} src={props.visibleLeadId.avatar} />
      <h5>{props.visibleLeadId.name}</h5>
      <h4>{props.visibleLeadId.role}</h4>
      <h3>Email</h3>
      <p>{props.visibleLeadInfos.email}</p>
      <h3>phone number</h3>
      <p>{props.visibleLeadInfos.phoneNumber}</p>
      <h3>Lead status</h3>
      <p>{props.visibleLeadInfos.leadStatus}</p>
    </Fragment>
  );
};
export default ActionLead;
