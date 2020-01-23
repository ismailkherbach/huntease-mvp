import React, { PureComponent, Fragment } from "react";
import PerformanceGraph from "../../chart/Line";
import IntlMessages from "../../../helpers/IntlMessages";
import { Button } from "reactstrap";

const Performance = ({ children }) => {
  return (
    <Fragment>
      <div id="performance">
        {" "}
        <h1 id="card-title">
          {" "}
          <IntlMessages id="performance" />
        </h1>
        <div className="inlineBtn-left">
          <div className="date-filter">Weekly</div>
          <div className="date-filter">Monthly</div>
        </div>
        <PerformanceGraph />
      </div>
    </Fragment>
  );
};
export default Performance;

// <PerformanceGraph />
