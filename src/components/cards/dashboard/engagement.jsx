import React, { PureComponent, Fragment } from "react";
import IntlMessages from "../../../helpers/IntlMessages";

const Engagement = ({ children }) => {
  return (
    <Fragment>
      <div id="engagement-rate">
        {" "}
        <h1 id="card-title">
          {" "}
          <IntlMessages id="engagementRate" />
        </h1>
        <div className="inlineBtn-right">
          <div className="date-filter">Daily</div>
          <div className="date-filter">Weekly</div>
          <div className="date-filter">Monthly</div>
        </div>
      </div>
    </Fragment>
  );
};
export default Engagement;
