import React, { Fragment } from "react";
import IntlMessages from "../../../helpers/IntlMessages";
const AddTeam = ({ children }) => {
  return (
    <Fragment>
      <div id="top-weekly-performers">
        <h1 id="card-title">
          {" "}
          <IntlMessages id="topweeklyperformers" />
        </h1>
        <div className="inlineBtn-col-center">
          <img
            alt={"shape"}
            className="shape"
            src={require("../../../assets/img/shapeteam.svg")}
          />
          <h3>
            Invite your teammate to view the top weekly performers amongst your
            team !
          </h3>
          <p id="btn-dark">Add your team</p>
        </div>
      </div>
    </Fragment>
  );
};

export default AddTeam;
